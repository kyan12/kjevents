"use client";

import { useEffect, useMemo, useState } from "react";
import type { RefObject } from "react";
import { STYLE_PRESETS } from "@/lib/proposal/themes";
import { getIn, setIn } from "@/lib/proposal/ops";
import {
  computeOptionTotal,
  formatPriceRange,
  type TImageAsset,
  type TProposal,
  type TSection,
} from "@/lib/proposal/schema";
import type { Chip, CommandDef, Question, Selection, TurnEntry } from "./types";
import s from "./canvas.module.css";

const slotToPath = (slot: string) => slot.replace(/\[(\d+)\]/g, ".$1");

/* ================================================= section rail */

export function SectionRail({
  doc,
  selection,
  onSelect,
  onMove,
  onToggleHidden,
  onRemove,
}: {
  doc: TProposal;
  selection: Selection;
  onSelect: (id: string) => void;
  onMove: (id: string, beforeId: string | null) => void;
  onToggleHidden: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  return (
    <aside className={s.rail}>
      <div className={s.railLabel}>Chapters — drag to reorder</div>
      {doc.sections.map((sec) => {
        const name = ("title" in sec && sec.title) || sec.type;
        return (
          <div
            key={sec.id}
            className={s.railChip}
            data-selected={selection?.sectionId === sec.id || undefined}
            data-hidden={sec.hidden || undefined}
            data-drop={overId === sec.id && dragId !== sec.id ? "true" : undefined}
            draggable
            onDragStart={(e) => {
              setDragId(sec.id);
              e.dataTransfer.effectAllowed = "move";
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setOverId(sec.id);
            }}
            onDragLeave={() => setOverId((o) => (o === sec.id ? null : o))}
            onDrop={(e) => {
              e.preventDefault();
              if (dragId && dragId !== sec.id) onMove(dragId, sec.id);
              setDragId(null);
              setOverId(null);
            }}
            onDragEnd={() => {
              setDragId(null);
              setOverId(null);
            }}
            onClick={() => onSelect(sec.id)}
          >
            <span className={s.railType}>{sec.type.slice(0, 3)}</span>
            <span className={s.railName}>{name}</span>
            <span className={s.railActions}>
              <button
                type="button"
                className={s.railIconBtn}
                title={sec.hidden ? "Unhide" : "Hide (kept in the document)"}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleHidden(sec.id);
                }}
              >
                {sec.hidden ? "◌" : "👁"}
              </button>
              <button
                type="button"
                className={s.railIconBtn}
                title="Remove section"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(sec.id);
                }}
              >
                ✕
              </button>
            </span>
          </div>
        );
      })}
    </aside>
  );
}

/* ================================================= command bar */

export function CommandBar({
  value,
  setValue,
  inputRef,
  streaming,
  onStop,
  selLabel,
  onClearSelection,
  commands,
  onCommand,
  onSubmit,
  onRecallLast,
}: {
  value: string;
  setValue: (v: string) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  streaming: boolean;
  onStop: () => void;
  selLabel: string;
  onClearSelection: () => void;
  commands: CommandDef[];
  onCommand: (name: string) => void;
  onSubmit: (text: string) => void;
  onRecallLast: () => void;
}) {
  const [active, setActive] = useState(0);
  const isCmd = value.startsWith("/");
  const matches = useMemo(
    () =>
      isCmd
        ? commands.filter((c) => c.name.startsWith(value.slice(1).trim().toLowerCase()))
        : [],
    [commands, isCmd, value]
  );
  useEffect(() => setActive(0), [value]);

  return (
    <>
      {isCmd && matches.length ? (
        <div className={s.palette}>
          {matches.map((c, i) => (
            <button
              key={c.name}
              type="button"
              className={s.paletteRow}
              data-active={i === active || undefined}
              onMouseEnter={() => setActive(i)}
              onClick={() => onCommand(c.name)}
            >
              <span className={s.paletteCmd}>/{c.name}</span>
              <span className={s.paletteDesc}>{c.desc}</span>
            </button>
          ))}
        </div>
      ) : null}
      <div className={s.bar}>
        {selLabel ? (
          <span className={s.selChip} title={selLabel}>
            {selLabel}
            <button type="button" className={s.chipBtn} onClick={onClearSelection} title="Clear selection (Esc)">
              ✕
            </button>
          </span>
        ) : null}
        {streaming ? <span className={s.spinner} /> : null}
        <input
          ref={inputRef}
          className={s.barInput}
          value={value}
          placeholder={
            streaming
              ? "Streaming ops…"
              : selLabel
                ? "Refine the selection — or / for commands"
                : "Describe a change — or / for commands"
          }
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp") {
              if (!value) {
                e.preventDefault();
                onRecallLast();
              } else if (isCmd && matches.length) {
                e.preventDefault();
                setActive((a) => (a - 1 + matches.length) % matches.length);
              }
            } else if (e.key === "ArrowDown" && isCmd && matches.length) {
              e.preventDefault();
              setActive((a) => (a + 1) % matches.length);
            } else if (e.key === "Enter") {
              e.preventDefault();
              const text = value.trim();
              if (!text) return;
              if (isCmd) {
                if (matches.length) onCommand(matches[active].name);
              } else if (!streaming) {
                onSubmit(text);
              }
            } else if (e.key === "Escape") {
              (e.target as HTMLInputElement).blur();
            }
          }}
        />
        {streaming ? (
          <button type="button" className={s.stopBtn} onClick={onStop}>
            Stop
          </button>
        ) : (
          <span className={s.barHint}>⌘K</span>
        )}
      </div>
    </>
  );
}

/* ================================================= chips + questions */

export function ChipsTray({
  chips,
  questions,
  onChipCorrect,
  onChipAccept,
  onQuestionChoice,
  onQuestionDismiss,
}: {
  chips: Chip[];
  questions: Question[];
  onChipCorrect: (c: Chip) => void;
  onChipAccept: (c: Chip) => void;
  onQuestionChoice: (q: Question, choice: string) => void;
  onQuestionDismiss: (q: Question) => void;
}) {
  if (!chips.length && !questions.length) return null;
  return (
    <div className={s.tray}>
      {questions.map((q) => (
        <div key={q.id} className={s.questionCard}>
          {q.text}
          <div className={s.questionChoices}>
            {(q.choices ?? []).map((c) => (
              <button key={c} type="button" className={s.choiceBtn} onClick={() => onQuestionChoice(q, c)}>
                {c}
              </button>
            ))}
            <button type="button" className={s.chipBtn} onClick={() => onQuestionDismiss(q)} title="Dismiss">
              ✕
            </button>
          </div>
        </div>
      ))}
      {chips.map((c) => (
        <div key={c.id} className={s.chip}>
          <span className={s.chipText} onClick={() => onChipCorrect(c)} title="Click to correct">
            {c.text}
          </span>
          <button type="button" className={s.chipBtn} onClick={() => onChipAccept(c)} title="Accept assumption">
            ✓
          </button>
        </div>
      ))}
    </div>
  );
}

/* ================================================= history drawer */

export function HistoryDrawer({
  turns,
  onRestore,
  onClose,
}: {
  turns: TurnEntry[];
  onRestore: (n: number) => void;
  onClose: () => void;
}) {
  return (
    <div className={s.drawer}>
      <div className={s.drawerTitle}>
        History
        <button type="button" className={s.topBtn} onClick={onClose}>
          Close
        </button>
      </div>
      {turns.length === 0 ? <div className={s.insMuted}>No turns yet — prompt the bar below.</div> : null}
      {[...turns].reverse().map((t) => (
        <div key={t.n} className={s.turn}>
          <div className={s.turnInstruction}>
            {t.system ? "· " : "❯ "}
            {t.instruction}
          </div>
          {t.notes.map((n, i) => (
            <div key={i} className={s.turnNote}>
              {n}
            </div>
          ))}
          {t.summary ? <div className={s.turnNote}>✓ {t.summary}</div> : null}
          {t.error ? <div className={`${s.turnNote} ${s.turnError}`}>✕ {t.error}</div> : null}
          <div className={s.turnMeta}>
            <span>
              {t.touched.length ? `${new Set(t.touched).size} section(s) touched · ` : ""}
              {new Date(t.ts).toLocaleTimeString()}
            </span>
            <button type="button" className={s.turnRestore} onClick={() => onRestore(t.n)}>
              Restore to before
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ================================================= inspector */

function Field({
  label,
  value,
  onCommit,
  placeholder,
}: {
  label: string;
  value: string;
  onCommit: (v: string) => void;
  placeholder?: string;
}) {
  const [v, setV] = useState(value);
  useEffect(() => setV(value), [value]);
  return (
    <>
      <label className={s.insLabel}>{label}</label>
      <input
        className={s.insInput}
        value={v}
        placeholder={placeholder}
        onChange={(e) => setV(e.target.value)}
        onBlur={() => {
          if (v !== value) onCommit(v);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") (e.target as HTMLInputElement).blur();
        }}
      />
    </>
  );
}

function NumField({
  label,
  value,
  onCommit,
}: {
  label: string;
  value: number | undefined;
  onCommit: (v: number | undefined) => void;
}) {
  const [v, setV] = useState(value == null ? "" : String(value));
  useEffect(() => setV(value == null ? "" : String(value)), [value]);
  return (
    <input
      className={s.insInput}
      inputMode="numeric"
      aria-label={label}
      value={v}
      placeholder={label}
      onChange={(e) => setV(e.target.value.replace(/[^\d]/g, ""))}
      onBlur={() => {
        const n = v === "" ? undefined : Number(v);
        if (n !== value) onCommit(n);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") (e.target as HTMLInputElement).blur();
      }}
    />
  );
}

export function Inspector({
  doc,
  selection,
  mathWarn,
  onPatchMeta,
  onReplaceSection,
  onSetSlotAsset,
  onOpenVenueTray,
  onUpload,
}: {
  doc: TProposal;
  selection: Exclude<Selection, null>;
  mathWarn: string[];
  onPatchMeta: (patch: Partial<TProposal>, label: string) => void;
  onReplaceSection: (sectionId: string, next: TSection, label: string) => void;
  onSetSlotAsset: (
    sectionId: string,
    slot: string,
    asset: TImageAsset | undefined,
    label: string
  ) => void;
  onOpenVenueTray: () => void;
  onUpload: () => void;
}) {
  const sec = doc.sections.find((x) => x.id === selection.sectionId);
  if (!sec) return null;

  const patchSection = (path: string, value: unknown, label: string) =>
    onReplaceSection(sec.id, setIn(sec, path, value) as TSection, label);

  /* image slot — alt / attribution / replace / remove */
  if (selection.kind === "imageSlot") {
    const asset = getIn(sec, slotToPath(selection.slot)) as TImageAsset | undefined;
    return (
      <aside className={s.inspector}>
        <div className={s.insTitle}>Image · {selection.slot}</div>
        {asset ? (
          <div className={s.insGroup}>
            <div className={s.insMuted} style={{ wordBreak: "break-all" }}>
              {asset.url}
              <br />
              source: {asset.source}
            </div>
            <Field
              label="Caption / alt"
              value={asset.alt ?? ""}
              onCommit={(v) =>
                onSetSlotAsset(sec.id, selection.slot, { ...asset, alt: v }, "edited image caption")
              }
            />
            <Field
              label="Photo credit"
              value={asset.attribution ?? ""}
              onCommit={(v) =>
                onSetSlotAsset(
                  sec.id,
                  selection.slot,
                  { ...asset, attribution: v || undefined },
                  "edited photo credit"
                )
              }
            />
          </div>
        ) : (
          <div className={s.insMuted}>Empty slot.</div>
        )}
        <button type="button" className={s.insBtn} onClick={onUpload}>
          Upload image…
        </button>
        {sec.type === "venues" ? (
          <button type="button" className={s.insBtn} onClick={onOpenVenueTray}>
            Venue listing photos…
          </button>
        ) : null}
        {asset ? (
          <button
            type="button"
            className={s.insBtn}
            onClick={() => onSetSlotAsset(sec.id, selection.slot, undefined, "removed image")}
          >
            Remove image
          </button>
        ) : null}
        <div className={s.insMuted} style={{ marginTop: "0.8rem" }}>
          Generated art direction goes through the bar — describe the shot and the model files a
          setImagery request.
        </div>
      </aside>
    );
  }

  /* cover → document meta */
  if (sec.type === "cover") {
    return (
      <aside className={s.inspector}>
        <div className={s.insTitle}>Document</div>
        <div className={s.insGroup}>
          <Field
            label="Client"
            value={doc.client.name}
            onCommit={(v) => onPatchMeta({ client: { ...doc.client, name: v } }, "client name")}
          />
          <Field
            label="Event title"
            value={doc.event.title}
            onCommit={(v) => onPatchMeta({ event: { ...doc.event, title: v } }, "event title")}
          />
          <Field
            label="Date"
            value={doc.event.date ?? ""}
            placeholder="Saturday, May 16, 2026"
            onCommit={(v) => onPatchMeta({ event: { ...doc.event, date: v || undefined } }, "event date")}
          />
          <Field
            label="Time"
            value={doc.event.time ?? ""}
            placeholder="7:30 PM — 1:00 AM"
            onCommit={(v) => onPatchMeta({ event: { ...doc.event, time: v || undefined } }, "event time")}
          />
          <Field
            label="Location"
            value={doc.event.location ?? ""}
            onCommit={(v) => onPatchMeta({ event: { ...doc.event, location: v || undefined } }, "event location")}
          />
          <Field
            label="Guests"
            value={doc.event.guests ?? ""}
            placeholder="60–80 Guests"
            onCommit={(v) => onPatchMeta({ event: { ...doc.event, guests: v || undefined } }, "guest count")}
          />
          <label className={s.insLabel}>
            <input
              type="checkbox"
              checked={doc.confidential}
              onChange={(e) => onPatchMeta({ confidential: e.target.checked }, "confidential flag")}
            />{" "}
            Private & confidential
          </label>
        </div>
        <div className={s.insMuted}>
          Cover facts mirror these fields when you next ask the bar to “sync the cover facts”.
        </div>
      </aside>
    );
  }

  /* investment → price editor */
  if (sec.type === "investment") {
    return (
      <aside className={s.inspector}>
        <div className={s.insTitle}>Investment · precision</div>
        {mathWarn.length ? (
          <div className={s.insWarn}>Check math: stated totals differ from line-item sums ({mathWarn.join(", ")}).</div>
        ) : null}
        {sec.options.map((opt, oi) => {
          const sum = computeOptionTotal(opt);
          return (
            <div key={opt.name + oi} className={s.insGroup}>
              <div className={s.insTitle}>{opt.name}</div>
              {opt.items.map((item, ii) => (
                <div key={item.name + ii}>
                  <div className={s.insItemName}>{item.name}</div>
                  <div className={s.insRow}>
                    <NumField
                      label="min"
                      value={item.price?.min}
                      onCommit={(v) =>
                        patchSection(
                          `options.${oi}.items.${ii}.price`,
                          v == null ? undefined : { min: v, max: item.price?.max },
                          `price · ${item.name}`
                        )
                      }
                    />
                    <NumField
                      label="max"
                      value={item.price?.max}
                      onCommit={(v) =>
                        item.price
                          ? patchSection(
                              `options.${oi}.items.${ii}.price.max`,
                              v,
                              `price · ${item.name}`
                            )
                          : undefined
                      }
                    />
                  </div>
                </div>
              ))}
              <div className={s.insMuted} style={{ marginTop: "0.5rem" }}>
                Sum of items: {formatPriceRange(sum)}
                {opt.total ? ` · stated: ${formatPriceRange(opt.total)}` : ""}
              </div>
              <button
                type="button"
                className={s.insBtn}
                onClick={() => patchSection(`options.${oi}.total`, sum, `recomputed total · ${opt.name}`)}
              >
                Set total = sum
              </button>
            </div>
          );
        })}
      </aside>
    );
  }

  /* closing → contact precision */
  if (sec.type === "closing") {
    return (
      <aside className={s.inspector}>
        <div className={s.insTitle}>Closing · contact</div>
        <Field label="Contact name" value={sec.contactName} onCommit={(v) => patchSection("contactName", v, "contact name")} />
        <Field label="Email" value={sec.contactEmail} onCommit={(v) => patchSection("contactEmail", v, "contact email")} />
        <Field label="Website" value={sec.website} onCommit={(v) => patchSection("website", v, "website")} />
      </aside>
    );
  }

  /* default — orientation + gentle handoff to the bar */
  return (
    <aside className={s.inspector}>
      <div className={s.insTitle}>
        {sec.type} {selection.kind === "item" ? `· ${selection.path}` : ""}
      </div>
      <div className={s.insMuted}>
        Double-click any text to edit it in place. For structural changes — new items, different
        layout, imagery — describe it in the bar; the selection scopes the change to this chapter.
      </div>
      {sec.type === "venues" ? (
        <button type="button" className={s.insBtn} onClick={onOpenVenueTray}>
          Link venue / import listing photos…
        </button>
      ) : null}
    </aside>
  );
}

/* ================================================= share sheet */

function collectExternalImages(doc: TProposal): number {
  let count = 0;
  const walk = (v: unknown) => {
    if (Array.isArray(v)) return v.forEach(walk);
    if (v && typeof v === "object") {
      const rec = v as Record<string, unknown>;
      if (typeof rec.url === "string" && /^https?:\/\//.test(rec.url)) count++;
      Object.values(rec).forEach(walk);
    }
  };
  walk(doc.sections);
  return count;
}

export function ShareSheet({
  doc,
  chips,
  questions,
  mathWarn,
  onClose,
  onMarkSent,
}: {
  doc: TProposal;
  chips: Chip[];
  questions: Question[];
  mathWarn: string[];
  onClose: () => void;
  onMarkSent: () => void;
}) {
  const external = collectExternalImages(doc);
  const gateOpen = chips.length === 0 && questions.length === 0;
  const link = typeof window !== "undefined" ? `${window.location.origin}/p/${doc.slug}` : `/p/${doc.slug}`;
  return (
    <div className={s.sheetScrim} onClick={onClose}>
      <div className={s.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={s.sheetTitle}>Share with {doc.client.name}</div>
        <div className={s.sheetSub}>{link}</div>
        <div className={chips.length ? `${s.checkRow} ${s.checkBad}` : `${s.checkRow} ${s.checkOk}`}>
          {chips.length ? "▲" : "✓"} {chips.length} unresolved assumption chip(s)
        </div>
        <div className={questions.length ? `${s.checkRow} ${s.checkBad}` : `${s.checkRow} ${s.checkOk}`}>
          {questions.length ? "▲" : "✓"} {questions.length} open question(s)
        </div>
        <div className={mathWarn.length ? `${s.checkRow} ${s.checkBad}` : `${s.checkRow} ${s.checkOk}`}>
          {mathWarn.length ? "▲" : "✓"} totals {mathWarn.length ? `need review (${mathWarn.join(", ")})` : "verified"}
        </div>
        <div className={external ? `${s.checkRow} ${s.checkBad}` : `${s.checkRow} ${s.checkOk}`}>
          {external ? "▲" : "✓"} {external ? `${external} image(s) on external URLs` : "all imagery persisted"}
        </div>
        <div className={s.sheetActions}>
          <button type="button" className={s.primaryBtn} disabled={!gateOpen} onClick={onMarkSent}>
            Mark sent & copy link
          </button>
          <button type="button" className={s.topBtn} onClick={() => window.open(`/p/${doc.slug}?static=1`, "_blank")}>
            Open print view
          </button>
          <button type="button" className={s.topBtn} onClick={onClose}>
            Close
          </button>
        </div>
        {!gateOpen ? (
          <div className={s.insWarn} style={{ marginTop: "0.7rem" }}>
            Resolve or accept the chips and questions above before the link copies — the one gate in
            the flow.
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ================================================= theme sheet */

export function ThemeSheet({
  current,
  onClose,
  onPick,
}: {
  current: string;
  onClose: () => void;
  onPick: (style: "classic-kj" | "noir" | "botanical" | "editorial" | "festival") => void;
}) {
  const styles = ["classic-kj", "noir", "botanical", "editorial", "festival"] as const;
  return (
    <div className={s.sheetScrim} onClick={onClose}>
      <div className={s.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={s.sheetTitle}>Theme</div>
        <div className={s.sheetSub}>
          Restyles tokens and layout accents only — copy is never rewritten by a theme change.
        </div>
        <div className={s.themeGrid}>
          {styles.map((name) => {
            const p = STYLE_PRESETS[name];
            return (
              <button
                key={name}
                type="button"
                className={s.themeCard}
                style={{
                  background: p.bg,
                  color: p.ink,
                  borderColor: name === current ? "#5a8de0" : undefined,
                }}
                onClick={() => onPick(name)}
              >
                <div className={s.themeName}>
                  {name}
                  {name === current ? " · current" : ""}
                </div>
                <div className={s.themeSwatches}>
                  {[p.bg2, p.ink, p.accent, p.highlight].map((c, i) => (
                    <span key={i} style={{ background: c }} />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
        <div className={s.sheetActions}>
          <button type="button" className={s.topBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================================================= venue tray */

type PlaceResult = {
  placeId: string;
  name: string;
  address: string;
  mapsUri: string;
  photos: { name: string; widthPx?: number; heightPx?: number; attribution: string }[];
};

export function VenueTray({
  doc,
  target,
  onClose,
  onLink,
  onImported,
  onToast,
}: {
  doc: TProposal;
  target: { sectionId: string; index: number } | null;
  onClose: () => void;
  onLink: (sectionId: string, index: number, placeId: string) => void;
  onImported: (sectionId: string, index: number, asset: TImageAsset) => void;
  onToast: (msg: string) => void;
}) {
  const sec = doc.sections.find((x) => x.id === target?.sectionId);
  const venue = sec?.type === "venues" && target ? sec.items[target.index] : null;
  const [q, setQ] = useState(venue ? `${venue.name} ${venue.area ?? doc.event.location ?? ""}` : "");
  const [results, setResults] = useState<PlaceResult[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/places/search?q=${encodeURIComponent(query)}`);
      const j = await res.json().catch(() => null);
      if (!res.ok) {
        setError(j?.error ?? `Search failed (${res.status})`);
        setResults(null);
      } else {
        setResults(j.places ?? []);
      }
    } catch {
      setError("Search failed — network error.");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (venue) void search(`${venue.name} ${venue.area ?? doc.event.location ?? ""}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!target || !venue) return null;

  const importPhoto = async (place: PlaceResult, photo: PlaceResult["photos"][number]) => {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/places/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photoName: photo.name,
          venue: venue.name,
          attribution: photo.attribution,
        }),
      });
      const j = await res.json().catch(() => null);
      if (!res.ok || !j?.url) {
        onToast(j?.error ?? "Import failed.");
        return;
      }
      onLink(target.sectionId, target.index, place.placeId);
      onImported(target.sectionId, target.index, {
        url: j.url,
        alt: j.alt ?? `${venue.name} — house photo from the venue's Google listing`,
        source: "google",
        attribution: j.attribution ?? photo.attribution ?? undefined,
      });
      onClose();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={s.sheetScrim} onClick={onClose}>
      <div className={s.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={s.sheetTitle}>Link venue — {venue.name}</div>
        <div className={s.sheetSub}>
          Search the venue's Google Business Profile, link the listing, and import a real interior.
          Imported photos replace generated atmosphere (reality first) and keep the photographer's
          credit as a visible caption.
        </div>
        <div className={s.insRow}>
          <input
            className={s.insInput}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") void search(q);
            }}
          />
          <button type="button" className={s.topBtn} onClick={() => void search(q)} disabled={busy}>
            {busy ? "…" : "Search"}
          </button>
        </div>
        {error ? (
          <div className={s.insWarn} style={{ marginTop: "0.7rem" }}>
            {error}
          </div>
        ) : null}
        <div style={{ marginTop: "0.8rem" }}>
          {(results ?? []).map((p) => (
            <div key={p.placeId} className={s.trayResult}>
              <div className={s.trayName}>{p.name}</div>
              <div className={s.trayAddr}>{p.address}</div>
              <div className={s.trayPhotos}>
                <button
                  type="button"
                  className={s.trayPhotoBtn}
                  onClick={() => {
                    onLink(target.sectionId, target.index, p.placeId);
                    onToast(`Linked ${venue.name} to its listing.`);
                  }}
                >
                  Link listing only
                </button>
                {p.photos.slice(0, 6).map((ph, i) => (
                  <button
                    key={ph.name}
                    type="button"
                    className={s.trayPhotoBtn}
                    disabled={busy}
                    title={ph.attribution ? `Photo: ${ph.attribution}` : undefined}
                    onClick={() => void importPhoto(p, ph)}
                  >
                    Import photo {i + 1}
                    {ph.widthPx && ph.heightPx ? ` · ${ph.widthPx}×${ph.heightPx}` : ""}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {results && !results.length ? <div className={s.insMuted}>No listings found.</div> : null}
        </div>
        <div className={s.sheetActions}>
          <button type="button" className={s.topBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
