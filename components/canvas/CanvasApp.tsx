"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ProposalView from "@/components/proposal/ProposalView";
import { Proposal, type TProposal, type TSection, type TImageAsset } from "@/lib/proposal/schema";
import {
  applyOp,
  getIn,
  setIn,
  verifyInvestmentTotals,
  type TOp,
} from "@/lib/proposal/ops";
import type { Chip, CommandDef, Question, SaveState, Selection, TurnEntry } from "./types";
import {
  ChipsTray,
  CommandBar,
  HistoryDrawer,
  Inspector,
  SectionRail,
  ShareSheet,
  ThemeSheet,
  VenueTray,
} from "./CanvasPanels";
import s from "./canvas.module.css";

/**
 * The canvas builder — the rendered proposal IS the editor (canvas-spec §1).
 * ProposalView renders untouched; this component adds the interaction layer:
 * selection, the ⌘K bar streaming ops from /api/ai/ops, chips/questions,
 * turn snapshots + undo, inline text editing, the section rail, inspector,
 * imagery intake, and the share gate.
 */

const COMMANDS: CommandDef[] = [
  { name: "share", desc: "Checklist gate → mark sent & copy the client link" },
  { name: "pdf", desc: "Open the print view (/p/slug?static=1)" },
  { name: "theme", desc: "Restyle with a preset — never rewrites copy" },
  { name: "preview", desc: "Client-eye view — selection affordances off" },
  { name: "history", desc: "Toggle the history drawer" },
  { name: "status", desc: "Cycle draft → sent → archived" },
  { name: "link-venue", desc: "Link the selected venue to its Google listing" },
  { name: "upload", desc: "Upload an image into the selected slot" },
  { name: "export", desc: "Download the document as JSON" },
  { name: "import", desc: "Replace the document from a JSON file" },
];

const STATUS_CYCLE: TProposal["status"][] = ["draft", "sent", "archived"];

function selectionLabel(doc: TProposal, sel: Selection): string {
  if (!sel) return "";
  const sec = doc.sections.find((x) => x.id === sel.sectionId);
  const base = sec ? ("title" in sec && sec.title ? sec.title : sec.type) : sel.sectionId;
  if (sel.kind === "item") return `${base} › ${sel.path}`;
  if (sel.kind === "imageSlot") return `${base} › ${sel.slot}`;
  return String(base);
}

/** slot string ("items[2].image", "options[0].hero") → dot path for setIn */
const slotToPath = (slot: string) => slot.replace(/\[(\d+)\]/g, ".$1");

export default function CanvasApp({ initial }: { initial: TProposal }) {
  const [doc, setDocState] = useState<TProposal>(initial);
  const docRef = useRef(doc);

  const [selection, setSelection] = useState<Selection>(null);
  const [chips, setChips] = useState<Chip[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [turns, setTurns] = useState<TurnEntry[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [preview, setPreview] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [venueTrayOpen, setVenueTrayOpen] = useState(false);
  const [toast, setToastState] = useState<string | null>(null);
  const [mathWarn, setMathWarn] = useState<string[]>([]);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [barValue, setBarValue] = useState("");

  const undoStack = useRef<TProposal[]>([]);
  const redoStack = useRef<TProposal[]>([]);
  const snapshotsByTurn = useRef<Map<number, TProposal>>(new Map());
  const turnCounter = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const barInputRef = useRef<HTMLInputElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const lastInstruction = useRef("");

  /* ------------------------------------------------ primitives */

  const toastMsg = useCallback((msg: string) => {
    setToastState(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastState(null), 4200);
  }, []);

  const scheduleSave = useCallback(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSaveState("saving");
    saveTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/proposals/${docRef.current.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ proposal: docRef.current }),
        });
        setSaveState(res.ok ? "saved" : "error");
        if (!res.ok) toastMsg("Autosave failed — the document is still safe in this tab.");
      } catch {
        setSaveState("error");
      }
    }, 800);
  }, [toastMsg]);

  const setDoc = useCallback(
    (next: TProposal) => {
      docRef.current = next;
      setDocState(next);
      scheduleSave();
    },
    [scheduleSave]
  );

  const pushSnapshot = useCallback((turnN?: number) => {
    const snap = structuredClone(docRef.current);
    undoStack.current.push(snap);
    if (undoStack.current.length > 60) undoStack.current.shift();
    redoStack.current = [];
    if (turnN != null) snapshotsByTurn.current.set(turnN, snap);
  }, []);

  const undo = useCallback(() => {
    const snap = undoStack.current.pop();
    if (!snap) return toastMsg("Nothing to undo.");
    redoStack.current.push(structuredClone(docRef.current));
    setDoc(snap);
  }, [setDoc, toastMsg]);

  const redo = useCallback(() => {
    const snap = redoStack.current.pop();
    if (!snap) return toastMsg("Nothing to redo.");
    undoStack.current.push(structuredClone(docRef.current));
    setDoc(snap);
  }, [setDoc, toastMsg]);

  const flash = useCallback((ids: string[]) => {
    if (!ids.length) return;
    setTimeout(() => {
      const vp = viewportRef.current;
      if (!vp) return;
      for (const id of ids) {
        const el = vp.querySelector(`[data-sec="${id}"]`) as HTMLElement | null;
        if (!el) continue;
        el.classList.remove("kjChanged");
        void el.offsetWidth; // restart the animation
        el.classList.add("kjChanged");
        setTimeout(() => el.classList.remove("kjChanged"), 1400);
      }
    }, 40);
  }, []);

  const addSystemTurn = useCallback((instruction: string, touched: string[] = []) => {
    const n = ++turnCounter.current;
    snapshotsByTurn.current.set(n, structuredClone(docRef.current));
    setTurns((prev) => [
      ...prev,
      { n, instruction, notes: [], touched, system: true, ts: new Date().toISOString() },
    ]);
    return n;
  }, []);

  /* ------------------------------------------------ model turns */

  const handleModelOp = useCallback(
    (op: TOp, turn: TurnEntry) => {
      switch (op.op) {
        case "note":
          turn.notes.push(op.text);
          return;
        case "assume":
          setChips((prev) => [
            ...prev,
            { id: crypto.randomUUID(), sectionId: op.id, field: op.field, text: op.text },
          ]);
          turn.notes.push(`assumed · ${op.text}`);
          return;
        case "ask":
          setQuestions((prev) => [
            ...prev,
            { id: crypto.randomUUID(), sectionId: op.id, text: op.text, choices: op.choices },
          ]);
          return;
        case "done":
          turn.summary = op.summary;
          return;
        case "error":
          turn.error = op.message;
          toastMsg(op.message);
          return;
        case "setImagery": {
          turn.touched.push(op.id);
          turn.notes.push(
            `imagery requested · ${op.slot} — "${op.request.prompt.slice(0, 90)}…" (generation service lands with deploy; request logged)`
          );
          flash([op.id]);
          return;
        }
        default: {
          const res = applyOp(docRef.current, op);
          if (res.error) {
            turn.notes.push(`⚠ dropped ${op.op}: ${res.error}`);
            return;
          }
          setDoc(res.doc);
          turn.touched.push(...res.touched);
          flash(res.touched);
          if (op.op === "replace") {
            const sec = res.doc.sections.find((x) => x.id === op.id);
            if (sec) setMathWarn(verifyInvestmentTotals(sec));
          }
        }
      }
    },
    [flash, setDoc, toastMsg]
  );

  const runTurn = useCallback(
    async (instruction: string) => {
      if (streaming) return;
      lastInstruction.current = instruction;
      const n = ++turnCounter.current;
      pushSnapshot(n);
      const turn: TurnEntry = {
        n,
        instruction,
        notes: [],
        touched: [],
        ts: new Date().toISOString(),
      };
      setStreaming(true);
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch("/api/ai/ops", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ instruction, proposal: docRef.current, selection, turn: n }),
          signal: controller.signal,
        });
        if (!res.ok || !res.body) {
          const j = await res.json().catch(() => null);
          toastMsg(j?.error ?? `The model request failed (${res.status}).`);
          undoStack.current.pop();
          snapshotsByTurn.current.delete(n);
          setStreaming(false);
          return;
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buf = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          let nl: number;
          while ((nl = buf.indexOf("\n")) >= 0) {
            const line = buf.slice(0, nl).trim();
            buf = buf.slice(nl + 1);
            if (!line) continue;
            try {
              handleModelOp(JSON.parse(line) as TOp, turn);
            } catch {
              /* malformed line — server already validated; ignore */
            }
          }
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          const keep = window.confirm(
            "Stopped mid-stream. Keep the changes applied so far?\n\nOK = keep · Cancel = roll back the turn"
          );
          if (!keep) {
            const snap = snapshotsByTurn.current.get(n);
            if (snap) setDoc(structuredClone(snap));
            turn.notes.push("stopped — rolled back");
          } else {
            turn.notes.push("stopped — kept partial changes");
          }
        } else {
          turn.error = err instanceof Error ? err.message : "Stream failed.";
          toastMsg(turn.error);
        }
      } finally {
        abortRef.current = null;
        setStreaming(false);
        setTurns((prev) => [...prev, turn]);
      }
    },
    [handleModelOp, pushSnapshot, selection, setDoc, streaming, toastMsg]
  );

  const stopStream = useCallback(() => abortRef.current?.abort(), []);

  /* ------------------------------------------------ local (non-model) mutations */

  const applyLocal = useCallback(
    (op: TOp, label: string) => {
      pushSnapshot();
      const res = applyOp(docRef.current, op);
      if (res.error) {
        undoStack.current.pop();
        toastMsg(res.error);
        return false;
      }
      setDoc(res.doc);
      flash(res.touched);
      addSystemTurn(label, res.touched);
      return true;
    },
    [addSystemTurn, flash, pushSnapshot, setDoc, toastMsg]
  );

  const replaceSection = useCallback(
    (sectionId: string, next: TSection, label: string) =>
      applyLocal({ op: "replace", id: sectionId, section: next }, label),
    [applyLocal]
  );

  const patchDocMeta = useCallback(
    (patch: Partial<TProposal>, label: string) => {
      pushSnapshot();
      try {
        const next = Proposal.parse({ ...docRef.current, ...patch });
        setDoc(next);
        addSystemTurn(label);
      } catch {
        undoStack.current.pop();
        toastMsg("That change didn't validate.");
      }
    },
    [addSystemTurn, pushSnapshot, setDoc, toastMsg]
  );

  const setSlotAsset = useCallback(
    (sectionId: string, slot: string, asset: TImageAsset | undefined, label: string) => {
      const sec = docRef.current.sections.find((x) => x.id === sectionId);
      if (!sec) return;
      const next = setIn(sec, slotToPath(slot), asset) as TSection;
      replaceSection(sectionId, next, label);
    },
    [replaceSection]
  );

  /* ------------------------------------------------ inline editing */

  /** Returns true when the document changed (React will own the DOM again). */
  const commitInlineEdit = useCallback(
    (sectionId: string, path: string, text: string): boolean => {
      const sec = docRef.current.sections.find((x) => x.id === sectionId);
      if (!sec) return false;
      const current = getIn(sec, path);
      if (typeof current === "string" && current === text) return false;
      const next = setIn(sec, path, text) as TSection;
      return replaceSection(sectionId, next, `✎ inline edit — ${path}`);
    },
    [replaceSection]
  );

  const startInlineEdit = useCallback(
    (el: HTMLElement, sectionId: string) => {
      const path = el.getAttribute("data-edit");
      if (!path) return;
      // React never re-writes DOM text it didn't see change — keep the original
      // around so cancel/no-op edits can restore it by hand.
      const original = el.innerText;
      el.setAttribute("contenteditable", "plaintext-only");
      el.classList.add("kjEditing");
      el.focus();
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);

      const finish = (commit: boolean) => {
        el.removeEventListener("blur", onBlur);
        el.removeEventListener("keydown", onKey);
        el.removeAttribute("contenteditable");
        el.classList.remove("kjEditing");
        const changed = commit && commitInlineEdit(sectionId, path, (el.innerText ?? "").trim());
        if (!changed) el.innerText = original;
      };
      const onBlur = () => finish(true);
      const onKey = (ev: KeyboardEvent) => {
        ev.stopPropagation();
        if (ev.key === "Escape") {
          ev.preventDefault();
          el.removeEventListener("blur", onBlur);
          finish(false);
        } else if (ev.key === "Enter" && path !== "body") {
          ev.preventDefault();
          el.blur();
        }
      };
      el.addEventListener("blur", onBlur);
      el.addEventListener("keydown", onKey);
    },
    [commitInlineEdit]
  );

  /* ------------------------------------------------ viewport events */

  const onViewportClick = useCallback(
    (e: React.MouseEvent) => {
      if (preview) return;
      const t = e.target as HTMLElement;
      if (t.closest("[contenteditable]")) return;
      if (t.closest("a")) e.preventDefault();
      const secEl = t.closest("[data-sec]");
      if (!secEl) {
        setSelection(null);
        return;
      }
      const sectionId = secEl.getAttribute("data-sec")!;
      const slotEl = t.closest("[data-slot]");
      const itemEl = t.closest("[data-item]");
      if (slotEl) {
        setSelection({ kind: "imageSlot", sectionId, slot: slotEl.getAttribute("data-slot")! });
      } else if (itemEl) {
        setSelection({ kind: "item", sectionId, path: itemEl.getAttribute("data-item")! });
      } else {
        setSelection({ kind: "section", sectionId });
      }
    },
    [preview]
  );

  const onViewportDblClick = useCallback(
    (e: React.MouseEvent) => {
      if (preview) return;
      const el = (e.target as HTMLElement).closest("[data-edit]") as HTMLElement | null;
      if (!el || el.getAttribute("contenteditable")) return;
      const secEl = el.closest("[data-sec]");
      if (!secEl) return;
      e.preventDefault();
      startInlineEdit(el, secEl.getAttribute("data-sec")!);
    },
    [preview, startInlineEdit]
  );

  // selection ring
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    vp.querySelectorAll(".kjSelected, .kjSelectedItem").forEach((el) =>
      el.classList.remove("kjSelected", "kjSelectedItem")
    );
    if (!selection || preview) return;
    const secEl = vp.querySelector(`[data-sec="${selection.sectionId}"]`);
    if (!secEl) return;
    secEl.classList.add("kjSelected");
    if (selection.kind === "item") {
      secEl.querySelector(`[data-item="${selection.path}"]`)?.classList.add("kjSelectedItem");
    } else if (selection.kind === "imageSlot") {
      secEl.querySelector(`[data-slot="${selection.slot}"]`)?.classList.add("kjSelectedItem");
    }
  }, [selection, doc, preview]);

  /* ------------------------------------------------ commands */

  const download = useCallback(() => {
    const blob = new Blob([JSON.stringify(docRef.current, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${docRef.current.slug}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  }, []);

  const findVenueTarget = useCallback((): { sectionId: string; index: number } | null => {
    const sel = selection;
    if (!sel) return null;
    const sec = docRef.current.sections.find((x) => x.id === sel.sectionId);
    if (!sec || sec.type !== "venues") return null;
    if (sel.kind === "item" || sel.kind === "imageSlot") {
      const m = (sel.kind === "item" ? sel.path : sel.slot).match(/items\[(\d+)\]/);
      if (m) return { sectionId: sec.id, index: Number(m[1]) };
    }
    return sec.items.length === 1 ? { sectionId: sec.id, index: 0 } : null;
  }, [selection]);

  const runCommand = useCallback(
    (name: string) => {
      setBarValue("");
      switch (name) {
        case "share":
          setShareOpen(true);
          break;
        case "pdf":
          window.open(`/p/${docRef.current.slug}?static=1`, "_blank");
          break;
        case "theme":
          setThemeOpen(true);
          break;
        case "preview":
          setPreview((p) => !p);
          setSelection(null);
          break;
        case "history":
          setDrawerOpen((o) => !o);
          break;
        case "status": {
          const cur = STATUS_CYCLE.indexOf(docRef.current.status);
          const next = STATUS_CYCLE[(cur + 1) % STATUS_CYCLE.length];
          patchDocMeta({ status: next }, `status → ${next}`);
          toastMsg(`Status: ${next}`);
          break;
        }
        case "link-venue": {
          if (!findVenueTarget()) {
            toastMsg("Select a venue row first (click a venue in a venues section).");
            break;
          }
          setVenueTrayOpen(true);
          break;
        }
        case "upload": {
          const sel = selection;
          if (!sel || (sel.kind !== "imageSlot" && !findVenueTarget())) {
            toastMsg("Select an image slot (or a venue row) first, then /upload.");
            break;
          }
          uploadInputRef.current?.click();
          break;
        }
        case "export":
          download();
          break;
        case "import":
          importInputRef.current?.click();
          break;
        default:
          toastMsg(`Unknown command /${name}`);
      }
    },
    [download, findVenueTarget, patchDocMeta, selection, toastMsg]
  );

  const onImportFile = useCallback(
    async (file: File) => {
      try {
        const parsed = Proposal.parse(JSON.parse(await file.text()));
        pushSnapshot();
        setDoc({ ...parsed, id: docRef.current.id, slug: docRef.current.slug });
        addSystemTurn("imported document from JSON");
        toastMsg("Document imported.");
      } catch {
        toastMsg("That file is not a valid proposal document.");
      }
    },
    [addSystemTurn, pushSnapshot, setDoc, toastMsg]
  );

  const onUploadFile = useCallback(
    async (file: File) => {
      const sel = selection;
      const venueTarget = findVenueTarget();
      const form = new FormData();
      form.append("file", file);
      form.append("kind", "canvas");
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const j = await res.json().catch(() => null);
      if (!res.ok || !j?.url) {
        toastMsg(j?.error ?? "Upload failed.");
        return;
      }
      const asset: TImageAsset = { url: j.url, alt: "", source: "upload" };
      if (sel?.kind === "imageSlot") {
        setSlotAsset(sel.sectionId, sel.slot, asset, `uploaded image → ${sel.slot}`);
      } else if (venueTarget) {
        setSlotAsset(
          venueTarget.sectionId,
          `items[${venueTarget.index}].image`,
          asset,
          `uploaded image → venue ${venueTarget.index + 1}`
        );
      }
      toastMsg("Image uploaded and placed. Double-click nearby text to caption it via alt in the inspector.");
    },
    [findVenueTarget, selection, setSlotAsset, toastMsg]
  );

  /* ------------------------------------------------ keyboard map */

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const inField =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        barInputRef.current?.focus();
        return;
      }
      if (e.key === "Escape" && !inField) {
        if (shareOpen || themeOpen || venueTrayOpen) {
          setShareOpen(false);
          setThemeOpen(false);
          setVenueTrayOpen(false);
        } else if (drawerOpen) setDrawerOpen(false);
        else setSelection(null);
        return;
      }
      if (inField) return;
      if (mod && !e.shiftKey && e.key.toLowerCase() === "z") {
        e.preventDefault();
        undo();
      } else if (mod && e.shiftKey && e.key.toLowerCase() === "z") {
        e.preventDefault();
        redo();
      } else if (mod && e.key.toLowerCase() === "s") {
        e.preventDefault();
        scheduleSave();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, redo, scheduleSave, shareOpen, themeOpen, undo, venueTrayOpen]);

  /* ------------------------------------------------ derived */

  const selLabel = useMemo(() => selectionLabel(doc, selection), [doc, selection]);

  const restoreToBefore = useCallback(
    (n: number) => {
      const snap = snapshotsByTurn.current.get(n);
      if (!snap) return toastMsg("No snapshot for that turn.");
      pushSnapshot();
      setDoc(structuredClone(snap));
      addSystemTurn(`restored to before turn ${n}`);
    },
    [addSystemTurn, pushSnapshot, setDoc, toastMsg]
  );

  /* ------------------------------------------------ render */

  return (
    <div className={s.canvasRoot}>
      <div className={s.topBar}>
        <Link href={`/admin/quotes/${doc.id}`} className={s.topBtn}>
          ← Form editor
        </Link>
        <div className={s.topTitle}>{doc.event.title}</div>
        <div className={s.topMeta}>{doc.client.name}</div>
        <span className={s.statusPill} data-status={doc.status}>
          {doc.status}
        </span>
        <div className={s.topSpacer} />
        <span className={s.saveState}>
          {saveState === "saving" ? "saving…" : saveState === "saved" ? "saved" : saveState === "error" ? "save failed" : ""}
        </span>
        <button type="button" className={s.topBtn} onClick={() => runCommand("preview")}>
          {preview ? "Exit preview" : "Preview"}
        </button>
        <button type="button" className={s.topBtn} onClick={() => setDrawerOpen((o) => !o)}>
          History
        </button>
        <button type="button" className={s.topBtn} onClick={() => setShareOpen(true)}>
          Share
        </button>
      </div>

      <div className={s.workspace}>
        {!preview ? (
          <SectionRail
            doc={doc}
            selection={selection}
            onSelect={(id) => {
              setSelection({ kind: "section", sectionId: id });
              viewportRef.current
                ?.querySelector(`[data-sec="${id}"]`)
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            onMove={(id, beforeId) =>
              applyLocal(
                beforeId ? { op: "move", id, before: beforeId } : { op: "move", id },
                "reordered sections"
              )
            }
            onToggleHidden={(id) => {
              const sec = docRef.current.sections.find((x) => x.id === id);
              if (!sec) return;
              replaceSection(id, { ...sec, hidden: !sec.hidden } as TSection, sec.hidden ? "unhid section" : "hid section");
            }}
            onRemove={(id) => {
              if (!window.confirm("Remove this section? (Undo restores it.)")) return;
              applyLocal({ op: "remove", id }, "removed section");
              setSelection(null);
            }}
          />
        ) : null}

        <div
          ref={viewportRef}
          className={s.viewport}
          data-preview={preview}
          onClick={onViewportClick}
          onDoubleClick={onViewportDblClick}
        >
          <ProposalView proposal={doc} />
        </div>

        {!preview && selection ? (
          <Inspector
            doc={doc}
            selection={selection}
            mathWarn={mathWarn}
            onPatchMeta={patchDocMeta}
            onReplaceSection={replaceSection}
            onSetSlotAsset={setSlotAsset}
            onOpenVenueTray={() => runCommand("link-venue")}
            onUpload={() => runCommand("upload")}
          />
        ) : null}

        {drawerOpen ? (
          <HistoryDrawer turns={turns} onRestore={restoreToBefore} onClose={() => setDrawerOpen(false)} />
        ) : null}
      </div>

      {!preview ? (
        <div className={s.barDock}>
          <ChipsTray
            chips={chips}
            questions={questions}
            onChipCorrect={(chip) => {
              setBarValue(`Correct the assumption (${chip.field}): `);
              barInputRef.current?.focus();
              setChips((prev) => prev.filter((c) => c.id !== chip.id));
            }}
            onChipAccept={(chip) => setChips((prev) => prev.filter((c) => c.id !== chip.id))}
            onQuestionChoice={(q, choice) => {
              setQuestions((prev) => prev.filter((x) => x.id !== q.id));
              void runTurn(`Re: "${q.text}" — ${choice}`);
            }}
            onQuestionDismiss={(q) => setQuestions((prev) => prev.filter((x) => x.id !== q.id))}
          />
          <CommandBar
            value={barValue}
            setValue={setBarValue}
            inputRef={barInputRef}
            streaming={streaming}
            onStop={stopStream}
            selLabel={selLabel}
            onClearSelection={() => setSelection(null)}
            commands={COMMANDS}
            onCommand={runCommand}
            onSubmit={(text) => {
              setBarValue("");
              void runTurn(text);
            }}
            onRecallLast={() => setBarValue(lastInstruction.current)}
          />
        </div>
      ) : null}

      {shareOpen ? (
        <ShareSheet
          doc={doc}
          chips={chips}
          questions={questions}
          mathWarn={mathWarn}
          onClose={() => setShareOpen(false)}
          onMarkSent={() => {
            patchDocMeta({ status: "sent" }, "shared — status → sent");
            navigator.clipboard
              .writeText(`${window.location.origin}/p/${docRef.current.slug}`)
              .then(() => toastMsg("Client link copied."));
            setShareOpen(false);
          }}
        />
      ) : null}

      {themeOpen ? (
        <ThemeSheet
          current={doc.theme?.style ?? "classic-kj"}
          onClose={() => setThemeOpen(false)}
          onPick={(style) => {
            setThemeOpen(false);
            applyLocal({ op: "setTheme", theme: { style } }, `theme → ${style}`);
          }}
        />
      ) : null}

      {venueTrayOpen ? (
        <VenueTray
          doc={doc}
          target={findVenueTarget()}
          onClose={() => setVenueTrayOpen(false)}
          onLink={(sectionId, index, placeId) => {
            const sec = docRef.current.sections.find((x) => x.id === sectionId);
            if (!sec || sec.type !== "venues") return;
            const next = setIn(sec, `items.${index}.placeId`, placeId) as TSection;
            replaceSection(sectionId, next, `linked venue ${index + 1} to its Google listing`);
          }}
          onImported={(sectionId, index, asset) => {
            setSlotAsset(sectionId, `items[${index}].image`, asset, `imported listing photo → venue ${index + 1}`);
            toastMsg("Listing photo imported — the generated take was replaced.");
          }}
          onToast={toastMsg}
        />
      ) : null}

      {toast ? <div className={s.toast}>{toast}</div> : null}

      <input
        ref={importInputRef}
        type="file"
        accept="application/json"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          e.target.value = "";
          if (f) void onImportFile(f);
        }}
      />
      <input
        ref={uploadInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          e.target.value = "";
          if (f) void onUploadFile(f);
        }}
      />
    </div>
  );
}
