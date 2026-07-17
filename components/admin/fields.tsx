"use client";

import type { ReactNode } from "react";
import s from "./admin.module.css";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={s.field}>
      <span className={s.fieldLabel}>{label}</span>
      {children}
    </div>
  );
}

export function Text({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <Field label={label}>
      <input
        className={s.input}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}

export function Area({
  label,
  value,
  onChange,
  rows,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <Field label={label}>
      <textarea
        className={s.textarea}
        value={value}
        rows={rows ?? 3}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}

export function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <Field label={label}>
      <select className={s.select} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className={s.checkbox}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

export function NumberInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: number | undefined;
  onChange: (v: number | undefined) => void;
  placeholder?: string;
}) {
  return (
    <Field label={label}>
      <input
        className={s.input}
        type="number"
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => {
          const raw = e.target.value;
          onChange(raw === "" ? undefined : Number(raw));
        }}
      />
    </Field>
  );
}

/**
 * Generic ordered-list editor: per-item card with move/delete controls.
 */
export function ListEditor<T>({
  items,
  onChange,
  render,
  makeNew,
  addLabel,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  render: (item: T, set: (next: T) => void, index: number) => ReactNode;
  makeNew: () => T;
  addLabel: string;
}) {
  function setAt(i: number, next: T) {
    const copy = items.slice();
    copy[i] = next;
    onChange(copy);
  }
  function removeAt(i: number) {
    onChange(items.filter((_, idx) => idx !== i));
  }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const copy = items.slice();
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
  }
  return (
    <div>
      {items.map((item, i) => (
        <div className={s.itemRow} key={i}>
          <div className={s.itemRowHead}>
            <button className={s.iconBtn} onClick={() => move(i, -1)} disabled={i === 0} title="Move up" type="button">
              ↑
            </button>
            <button
              className={s.iconBtn}
              onClick={() => move(i, 1)}
              disabled={i === items.length - 1}
              title="Move down"
              type="button"
            >
              ↓
            </button>
            <button className={s.iconBtn} onClick={() => removeAt(i)} title="Remove" type="button">
              ✕
            </button>
          </div>
          {render(item, (next) => setAt(i, next), i)}
        </div>
      ))}
      <button className={`${s.btn} ${s.btnSm}`} onClick={() => onChange([...items, makeNew()])} type="button">
        + {addLabel}
      </button>
    </div>
  );
}

/** Comma-separated editor for short string arrays (tags). */
export function TagsInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <Field label={label}>
      <input
        className={s.input}
        value={value.join(", ")}
        placeholder="Comma, separated, tags"
        onChange={(e) =>
          // keep empty segments while typing (cursor stability); trim on render
          onChange(e.target.value.split(",").map((t) => t.trim()))
        }
        onBlur={(e) =>
          onChange(
            e.target.value
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          )
        }
      />
    </Field>
  );
}

/** Multiline editor for string arrays (one item per line). */
export function LinesArea({
  label,
  value,
  onChange,
  rows,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  rows?: number;
}) {
  return (
    <Field label={label}>
      <textarea
        className={s.textarea}
        rows={rows ?? 5}
        value={value.join("\n")}
        placeholder="One item per line"
        onChange={(e) => onChange(e.target.value.split("\n"))}
        onBlur={(e) => onChange(e.target.value.split("\n").filter((l) => l.trim() !== ""))}
      />
    </Field>
  );
}
