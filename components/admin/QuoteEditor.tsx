"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ZodError } from "zod";
import type { SectionType, TProposal, TSection } from "@/lib/proposal/schema";
import { newSectionId, Proposal } from "@/lib/proposal/schema";
import ProposalView from "@/components/proposal/ProposalView";
import SectionEditor from "./SectionEditor";
import { Area, Check, Field, Select, Text } from "./fields";
import s from "./admin.module.css";

/* ------------------------------------------------ helpers */

const EVENT_TYPES = [
  "wedding",
  "birthday",
  "graduation",
  "corporate",
  "private",
  "festival",
  "cultural",
  "other",
] as const;

const SECTION_TYPES: { value: SectionType; label: string }[] = [
  { value: "cover", label: "Cover" },
  { value: "vision", label: "Vision" },
  { value: "palette", label: "Theme & Palette" },
  { value: "venues", label: "Venues" },
  { value: "moments", label: "Signature Moments" },
  { value: "runOfShow", label: "Run of Show" },
  { value: "investment", label: "Investment" },
  { value: "scope", label: "Planning Scope" },
  { value: "services", label: "Service Tiers" },
  { value: "custom", label: "Custom" },
  { value: "closing", label: "Closing" },
];

function newSection(type: SectionType): TSection {
  const id = newSectionId();
  switch (type) {
    case "cover":
      return { id, type, eyebrow: "Event Proposal · Prepared by Kira Jia Events", facts: [] };
    case "vision":
      return { id, type, eyebrow: "The Vision", title: "The Vision", body: "", facts: [] };
    case "palette":
      return { id, type, options: [{ name: "Theme", description: "", colors: [], gallery: [] }] };
    case "venues":
      return { id, type, eyebrow: "Venue", title: "Shortlisted Spaces", items: [] };
    case "moments":
      return { id, type, eyebrow: "Signature Moments", title: "The Highlights", items: [] };
    case "runOfShow":
      return { id, type, eyebrow: "Run of Show", title: "Night Overview", items: [] };
    case "investment":
      return { id, type, eyebrow: "Investment", title: "Investment", options: [{ name: "Option A", items: [] }] };
    case "scope":
      return { id, type, eyebrow: "What's Included", title: "Planning Scope", items: [] };
    case "services":
      return { id, type, eyebrow: "Services", title: "Services", tiers: [] };
    case "closing":
      return {
        id,
        type,
        title: "Ready to move forward?",
        body: "Review, confirm your option, and sign the agreement to secure the date.",
        contactName: "Kira Jia",
        contactEmail: "kira@kirajiaevents.com",
        website: "kirajiaevents.com",
      };
    case "custom":
      return { id, type, items: [] };
  }
}

function sectionSnippet(sec: TSection, proposal: TProposal): string {
  switch (sec.type) {
    case "cover":
      return proposal.client.name;
    case "palette":
      return sec.options.map((o) => o.name).join(" · ") || "—";
    case "closing":
      return sec.title;
    case "custom":
      return sec.title ?? "—";
    default:
      return "title" in sec && sec.title ? sec.title : "—";
  }
}

function zodMessage(err: unknown): string {
  if (err instanceof ZodError) {
    return err.issues
      .slice(0, 5)
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("\n");
  }
  return String(err);
}

/* ------------------------------------------------ component */

export default function QuoteEditor({ initial }: { initial: TProposal }) {
  const [draft, setDraft] = useState<TProposal>(initial);
  const [savedJson, setSavedJson] = useState(() => JSON.stringify(initial));
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [addType, setAddType] = useState<SectionType>("vision");
  const [showPreview, setShowPreview] = useState(true);
  const [modal, setModal] = useState<"import" | "export" | null>(null);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState<string | null>(null);

  // AI panel
  const [brief, setBrief] = useState("");
  const [aiMode, setAiMode] = useState<"generate" | "refine">("generate");
  const [aiBusy, setAiBusy] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const dirty = useMemo(() => JSON.stringify(draft) !== savedJson, [draft, savedJson]);

  const patch = useCallback((fn: (d: TProposal) => void) => {
    setDraft((prev) => {
      const next = structuredClone(prev);
      fn(next);
      return next;
    });
  }, []);

  /* ---------- save ---------- */

  const save = useCallback(async () => {
    setError(null);
    try {
      Proposal.parse(draft); // readable client-side validation first
    } catch (err) {
      setError(zodMessage(err));
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/proposals/${draft.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposal: draft }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      setDraft(data.proposal);
      setSavedJson(JSON.stringify(data.proposal));
      setSavedAt(new Date().toLocaleTimeString());
    } catch (err) {
      setError(String(err));
    } finally {
      setSaving(false);
    }
  }, [draft]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        save();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [save]);

  useEffect(() => {
    function beforeUnload(e: BeforeUnloadEvent) {
      if (dirty) e.preventDefault();
    }
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [dirty]);

  /* ---------- sections ---------- */

  function moveSection(i: number, dir: -1 | 1) {
    patch((d) => {
      const j = i + dir;
      if (j < 0 || j >= d.sections.length) return;
      [d.sections[i], d.sections[j]] = [d.sections[j], d.sections[i]];
    });
  }

  function deleteSection(i: number) {
    if (!confirm("Delete this section?")) return;
    patch((d) => {
      d.sections.splice(i, 1);
    });
  }

  /* ---------- AI ---------- */

  async function runAI() {
    setAiBusy(true);
    setAiError(null);
    try {
      const res = await fetch("/api/ai/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          aiMode === "refine" ? { brief, proposal: draft } : { brief }
        ),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      const p = data.proposal as TProposal;
      // identity stays server/session-controlled
      setDraft({
        ...p,
        id: draft.id,
        slug: draft.slug,
        createdAt: draft.createdAt,
        status: draft.status,
      });
      setBrief("");
    } catch (err) {
      setAiError(String(err));
    } finally {
      setAiBusy(false);
    }
  }

  /* ---------- import / export ---------- */

  function doImport() {
    setImportError(null);
    try {
      const raw = JSON.parse(importText);
      const doc = raw?.proposal ?? raw;
      const parsed = Proposal.parse({
        ...doc,
        id: draft.id,
        slug: draft.slug,
        createdAt: draft.createdAt,
        status: draft.status,
        updatedAt: new Date().toISOString(),
      });
      setDraft(parsed);
      setModal(null);
      setImportText("");
    } catch (err) {
      setImportError(zodMessage(err));
    }
  }

  /* ---------- render ---------- */

  return (
    <>
      <div className={s.editorTop}>
        <div className={s.editorTitle}>
          {draft.client.name} — {draft.event.title}
          {dirty ? <span className={s.dirtyDot} title="Unsaved changes" /> : null}
        </div>
        {savedAt && !dirty ? <span className={s.savedNote}>Saved {savedAt}</span> : null}
        <Link className={`${s.btn} ${s.btnSm} ${s.btnPrimary}`} href={`/admin/quotes/${draft.id}/canvas`}>
          Open canvas ✦
        </Link>
        <button className={`${s.btn} ${s.btnSm}`} onClick={() => setShowPreview((v) => !v)}>
          {showPreview ? "Hide preview" : "Show preview"}
        </button>
        <button className={`${s.btn} ${s.btnSm}`} onClick={() => setModal("export")}>
          Export JSON
        </button>
        <button className={`${s.btn} ${s.btnSm}`} onClick={() => { setModal("import"); setImportError(null); }}>
          Import JSON
        </button>
        <a className={`${s.btn} ${s.btnSm}`} href={`/p/${draft.slug}`} target="_blank" rel="noreferrer">
          Open page ↗
        </a>
        <button
          className={`${s.btn} ${s.btnSm}`}
          onClick={() => navigator.clipboard.writeText(`${window.location.origin}/p/${draft.slug}`)}
          title="Copy the client-facing link"
        >
          Copy link
        </button>
        <button className={`${s.btn} ${s.btnPrimary}`} onClick={save} disabled={saving || !dirty}>
          {saving ? "Saving…" : "Save"}
        </button>
      </div>

      {error ? <div className={s.error} style={{ marginBottom: "0.8rem" }}>{error}</div> : null}

      <div className={`${s.split} ${showPreview ? "" : s.splitFull}`}>
        <div className={s.editorCol}>
          {/* ------- AI panel ------- */}
          <div className={s.panel}>
            <div className={s.panelHead}>
              <span className={s.panelTitle}>AI Draft</span>
              <div style={{ display: "flex", gap: "0.3rem" }}>
                <button
                  className={`${s.btn} ${s.btnSm} ${aiMode === "generate" ? s.btnPrimary : ""}`}
                  onClick={() => setAiMode("generate")}
                >
                  Generate
                </button>
                <button
                  className={`${s.btn} ${s.btnSm} ${aiMode === "refine" ? s.btnPrimary : ""}`}
                  onClick={() => setAiMode("refine")}
                >
                  Refine current
                </button>
              </div>
            </div>
            <Area
              label={
                aiMode === "generate"
                  ? "Describe the event — client, occasion, date, city, guests, budget, vibe, anything case-specific"
                  : "What should change? (works on the current document)"
              }
              value={brief}
              onChange={setBrief}
              rows={5}
              placeholder={
                aiMode === "generate"
                  ? "e.g. Sofia Chen, 30th birthday, ~40 guests, West Village townhouse vibe, mid-Sept, wants live jazz + omakase stations, budget around 60k, two pricing tiers…"
                  : "e.g. Add a live painter add-on to Option B and make the run of show end at 1 AM"
              }
            />
            {aiError ? <div className={s.error}>{aiError}</div> : null}
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginTop: "0.5rem" }}>
              <button className={`${s.btn} ${s.btnPrimary}`} onClick={runAI} disabled={aiBusy || !brief.trim()}>
                {aiBusy ? "Drafting…" : aiMode === "generate" ? "Generate proposal" : "Refine proposal"}
              </button>
              <span className={s.subtle}>
                {aiMode === "generate"
                  ? "Replaces the document below — review every number before sending."
                  : "Applies your instruction to the current document."}
              </span>
            </div>
          </div>

          {/* ------- meta panel ------- */}
          <div className={s.panel}>
            <div className={s.panelHead}>
              <span className={s.panelTitle}>Client & Event</span>
            </div>
            <div className={s.formRow}>
              <Text label="Client name" value={draft.client.name} onChange={(v) => patch((d) => void (d.client.name = v))} />
              <Text
                label="Client email (optional)"
                value={draft.client.email ?? ""}
                onChange={(v) => patch((d) => void (d.client.email = v || undefined))}
              />
            </div>
            <div className={s.formRow}>
              <Text label="Event title" value={draft.event.title} onChange={(v) => patch((d) => void (d.event.title = v))} />
              <Select
                label="Event type"
                value={draft.event.type}
                options={EVENT_TYPES.map((t) => ({ value: t, label: t }))}
                onChange={(v) => patch((d) => void (d.event.type = v as TProposal["event"]["type"]))}
              />
              <Select
                label="Status"
                value={draft.status}
                options={["draft", "sent", "archived"].map((v) => ({ value: v, label: v }))}
                onChange={(v) => patch((d) => void (d.status = v as TProposal["status"]))}
              />
            </div>
            <div className={s.formRow}>
              <Text label="Date (display)" value={draft.event.date ?? ""} onChange={(v) => patch((d) => void (d.event.date = v || undefined))} placeholder="Saturday, May 16, 2026" />
              <Text label="Time (display)" value={draft.event.time ?? ""} onChange={(v) => patch((d) => void (d.event.time = v || undefined))} placeholder="7:30 PM — 12:00 AM" />
            </div>
            <div className={s.formRow}>
              <Text label="Location" value={draft.event.location ?? ""} onChange={(v) => patch((d) => void (d.event.location = v || undefined))} />
              <Text label="Guests (display)" value={draft.event.guests ?? ""} onChange={(v) => patch((d) => void (d.event.guests = v || undefined))} placeholder="60–80 Guests" />
            </div>
            <div style={{ display: "flex", gap: "1.2rem", alignItems: "center", flexWrap: "wrap" }}>
              <Check label="Confidential footer" checked={draft.confidential} onChange={(v) => patch((d) => void (d.confidential = v))} />
              <span className={s.subtle}>
                Public link: <span className={s.mono}>/p/{draft.slug}</span>
              </span>
            </div>
          </div>

          {/* ------- sections ------- */}
          <div className={s.panel}>
            <div className={s.panelHead}>
              <span className={s.panelTitle}>Sections</span>
              <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                <select className={s.select} value={addType} onChange={(e) => setAddType(e.target.value as SectionType)} style={{ width: "auto" }}>
                  {SECTION_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
                <button
                  className={`${s.btn} ${s.btnSm}`}
                  onClick={() => {
                    const sec = newSection(addType);
                    patch((d) => void d.sections.push(sec));
                    setExpanded(sec.id);
                  }}
                >
                  + Add
                </button>
              </div>
            </div>

            {draft.sections.map((sec, i) => (
              <div className={s.sectionCard} key={sec.id} style={{ marginBottom: "0.55rem" }}>
                <div className={s.sectionCardHead} onClick={() => setExpanded(expanded === sec.id ? null : sec.id)}>
                  <span className={s.sectionType}>{SECTION_TYPES.find((t) => t.value === sec.type)?.label ?? sec.type}</span>
                  <span className={s.sectionCardTitle}>{sectionSnippet(sec, draft)}</span>
                  {sec.hidden ? <span className={s.sectionHiddenTag}>hidden</span> : null}
                  <button
                    className={s.iconBtn}
                    title={sec.hidden ? "Show section" : "Hide section"}
                    onClick={(e) => {
                      e.stopPropagation();
                      patch((d) => void (d.sections[i].hidden = d.sections[i].hidden ? undefined : true));
                    }}
                  >
                    {sec.hidden ? "◉" : "○"}
                  </button>
                  <button className={s.iconBtn} title="Move up" disabled={i === 0} onClick={(e) => { e.stopPropagation(); moveSection(i, -1); }}>
                    ↑
                  </button>
                  <button
                    className={s.iconBtn}
                    title="Move down"
                    disabled={i === draft.sections.length - 1}
                    onClick={(e) => { e.stopPropagation(); moveSection(i, 1); }}
                  >
                    ↓
                  </button>
                  <button className={s.iconBtn} title="Delete section" onClick={(e) => { e.stopPropagation(); deleteSection(i); }}>
                    ✕
                  </button>
                </div>
                {expanded === sec.id ? (
                  <div className={s.sectionCardBody}>
                    <SectionEditor
                      section={sec}
                      onChange={(next) => patch((d) => void (d.sections[i] = next))}
                    />
                  </div>
                ) : null}
              </div>
            ))}
            {draft.sections.length === 0 ? (
              <div className={s.subtle}>No sections — add one above or draft with AI.</div>
            ) : null}
          </div>
        </div>

        {/* ------- live preview ------- */}
        {showPreview ? (
          <div className={s.previewCol}>
            <div className={s.previewScroll}>
              <ProposalView proposal={draft} staticRender />
            </div>
          </div>
        ) : null}
      </div>

      {/* ------- modals ------- */}
      {modal ? (
        <div className={s.modalBack} onClick={() => setModal(null)}>
          <div className={s.modal} onClick={(e) => e.stopPropagation()}>
            <div className={s.panelHead}>
              <span className={s.panelTitle}>{modal === "import" ? "Import proposal JSON" : "Proposal JSON"}</span>
              <button className={s.iconBtn} onClick={() => setModal(null)}>
                ✕
              </button>
            </div>
            {modal === "import" ? (
              <>
                <div className={s.subtle}>
                  Paste a proposal document (e.g. one drafted with Claude). The current id, link and
                  status are kept; everything else is replaced.
                </div>
                <textarea
                  className={s.textarea}
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder='{ "client": { "name": "…" }, "event": { … }, "sections": [ … ] }'
                  spellCheck={false}
                />
                {importError ? <div className={s.error}>{importError}</div> : null}
                <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                  <button className={s.btn} onClick={() => setModal(null)}>
                    Cancel
                  </button>
                  <button className={`${s.btn} ${s.btnPrimary}`} onClick={doImport} disabled={!importText.trim()}>
                    Import
                  </button>
                </div>
              </>
            ) : (
              <>
                <textarea className={`${s.textarea} ${s.mono}`} readOnly value={JSON.stringify(draft, null, 2)} spellCheck={false} />
                <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                  <button
                    className={`${s.btn} ${s.btnPrimary}`}
                    onClick={() => navigator.clipboard.writeText(JSON.stringify(draft, null, 2))}
                  >
                    Copy to clipboard
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
