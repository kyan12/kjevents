"use client";

import type {
  TImageAsset,
  TLineItem,
  TSection,
} from "@/lib/proposal/schema";
import { computeOptionTotal, formatPriceRange } from "@/lib/proposal/schema";
import { Area, Check, Field, ListEditor, LinesArea, NumberInput, Select, TagsInput, Text } from "./fields";
import s from "./admin.module.css";

type Props = {
  section: TSection;
  onChange: (next: TSection) => void;
};

const BADGES = ["", "UPGRADE", "ADD-ON", "INCLUDED", "OPTIONAL"] as const;

function ImageFields({
  label,
  value,
  onChange,
}: {
  label: string;
  value: TImageAsset | undefined;
  onChange: (v: TImageAsset | undefined) => void;
}) {
  if (!value) {
    return (
      <div style={{ marginBottom: "0.7rem" }}>
        <button
          type="button"
          className={`${s.btn} ${s.btnSm}`}
          onClick={() => onChange({ url: "", alt: "", source: "upload", hasBakedText: false })}
        >
          + Add {label.toLowerCase()}
        </button>
      </div>
    );
  }
  return (
    <div className={s.itemRow}>
      <div className={s.itemRowHead}>
        <span className={s.fieldLabel} style={{ marginRight: "auto" }}>
          {label}
        </span>
        <button type="button" className={s.iconBtn} title="Remove" onClick={() => onChange(undefined)}>
          ✕
        </button>
      </div>
      <div className={s.formRow}>
        <Text label="Image URL" value={value.url} onChange={(url) => onChange({ ...value, url })} />
        <Text label="Alt text" value={value.alt} onChange={(alt) => onChange({ ...value, alt })} />
      </div>
      <Check
        label="Typography is baked into the image (render as-is, no text overlay)"
        checked={!!value.hasBakedText}
        onChange={(hasBakedText) => onChange({ ...value, hasBakedText })}
      />
    </div>
  );
}

export default function SectionEditor({ section, onChange }: Props) {
  // convenience: patch top-level fields of the current section
  const set = (patch: Record<string, unknown>) => onChange({ ...section, ...patch } as TSection);

  switch (section.type) {
    case "cover":
      return (
        <>
          <Area label="Eyebrow line" value={section.eyebrow} onChange={(v) => set({ eyebrow: v })} rows={2} />
          <Field label="Facts row (Date / Time / Location / Guest count …)">
            <ListEditor
              items={section.facts}
              onChange={(facts) => set({ facts })}
              makeNew={() => ({ label: "Label", value: "" })}
              addLabel="fact"
              render={(f, setF) => (
                <div className={s.formRow}>
                  <Text label="Label" value={f.label} onChange={(label) => setF({ ...f, label })} />
                  <Text label="Value" value={f.value} onChange={(value) => setF({ ...f, value })} />
                </div>
              )}
            />
          </Field>
        </>
      );

    case "vision":
      return (
        <>
          <div className={s.formRow}>
            <Text label="Eyebrow" value={section.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <Text label="Title" value={section.title} onChange={(v) => set({ title: v })} />
          </div>
          <Area label="Narrative" value={section.body} onChange={(v) => set({ body: v })} rows={6} />
          <Field label="Facts row (Event type / Dress code / Format …)">
            <ListEditor
              items={section.facts}
              onChange={(facts) => set({ facts })}
              makeNew={() => ({ label: "Label", value: "" })}
              addLabel="fact"
              render={(f, setF) => (
                <div className={s.formRow}>
                  <Text label="Label" value={f.label} onChange={(label) => setF({ ...f, label })} />
                  <Text label="Value" value={f.value} onChange={(value) => setF({ ...f, value })} />
                </div>
              )}
            />
          </Field>
        </>
      );

    case "palette":
      return (
        <>
          <div className={s.formRow}>
            <Text label="Eyebrow (optional)" value={section.eyebrow ?? ""} onChange={(v) => set({ eyebrow: v || undefined })} />
            <Text label="Title (optional)" value={section.title ?? ""} onChange={(v) => set({ title: v || undefined })} />
          </div>
          <Area label="Intro (optional)" value={section.intro ?? ""} onChange={(v) => set({ intro: v || undefined })} rows={2} />
          <Field label="Theme options">
            <ListEditor
              items={section.options}
              onChange={(options) => set({ options })}
              addLabel="theme option"
              makeNew={() => ({
                name: "New Theme",
                badge: "",
                description: "",
                colors: [],
                gallery: [],
              })}
              render={(o, setO) => (
                <>
                  <div className={s.formRow}>
                    <Text label="Name" value={o.name} onChange={(name) => setO({ ...o, name })} />
                    <Text
                      label="Badge (e.g. Option 01 — Recommended)"
                      value={o.badge ?? ""}
                      onChange={(badge) => setO({ ...o, badge: badge || undefined })}
                    />
                  </div>
                  <Area label="Description" value={o.description} onChange={(description) => setO({ ...o, description })} rows={4} />
                  <ImageFields label="Hero image" value={o.hero} onChange={(hero) => setO({ ...o, hero })} />
                  <ImageFields label="Mood board image" value={o.board} onChange={(board) => setO({ ...o, board })} />
                  <Field label="Palette colors">
                    <ListEditor
                      items={o.colors}
                      onChange={(colors) => setO({ ...o, colors })}
                      addLabel="color"
                      makeNew={() => ({ name: "Color", hex: "#cccccc" })}
                      render={(c, setC) => (
                        <div className={s.formRow}>
                          <Text label="Name" value={c.name} onChange={(name) => setC({ ...c, name })} />
                          <Text label="Hex" value={c.hex} onChange={(hex) => setC({ ...c, hex })} />
                          <Field label="Pick">
                            <input
                              type="color"
                              value={/^#[0-9a-fA-F]{6}$/.test(c.hex) ? c.hex : "#cccccc"}
                              onChange={(e) => setC({ ...c, hex: e.target.value })}
                              style={{ width: "100%", height: 34, border: "none", background: "none", cursor: "pointer" }}
                            />
                          </Field>
                        </div>
                      )}
                    />
                  </Field>
                </>
              )}
            />
          </Field>
        </>
      );

    case "venues":
      return (
        <>
          <div className={s.formRow}>
            <Text label="Eyebrow" value={section.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <Text label="Title" value={section.title} onChange={(v) => set({ title: v })} />
          </div>
          <Area label="Intro (optional)" value={section.intro ?? ""} onChange={(v) => set({ intro: v || undefined })} rows={2} />
          <Field label="Venues">
            <ListEditor
              items={section.items}
              onChange={(items) => set({ items })}
              addLabel="venue"
              makeNew={() => ({ name: "New Venue", area: "", description: "", tags: [] })}
              render={(v, setV) => (
                <>
                  <div className={s.formRow}>
                    <Text label="Name" value={v.name} onChange={(name) => setV({ ...v, name })} />
                    <Text label="Area / address line" value={v.area ?? ""} onChange={(area) => setV({ ...v, area: area || undefined })} />
                  </div>
                  <Area label="Description" value={v.description} onChange={(description) => setV({ ...v, description })} rows={3} />
                  <TagsInput label="Tags" value={v.tags} onChange={(tags) => setV({ ...v, tags })} />
                </>
              )}
            />
          </Field>
        </>
      );

    case "moments":
      return (
        <>
          <div className={s.formRow}>
            <Text label="Eyebrow" value={section.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <Text label="Title" value={section.title} onChange={(v) => set({ title: v })} />
          </div>
          <Field label="Moments">
            <ListEditor
              items={section.items}
              onChange={(items) => set({ items })}
              addLabel="moment"
              makeNew={() => ({ title: "New Moment", description: "" })}
              render={(m, setM) => (
                <>
                  <Text label="Title" value={m.title} onChange={(title) => setM({ ...m, title })} />
                  <Area label="Description" value={m.description} onChange={(description) => setM({ ...m, description })} rows={3} />
                </>
              )}
            />
          </Field>
        </>
      );

    case "runOfShow":
      return (
        <>
          <div className={s.formRow}>
            <Text label="Eyebrow" value={section.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <Text label="Title" value={section.title} onChange={(v) => set({ title: v })} />
          </div>
          <Field label="Timeline">
            <ListEditor
              items={section.items}
              onChange={(items) => set({ items })}
              addLabel="time slot"
              makeNew={() => ({ time: "7:00 PM", title: "", description: "" })}
              render={(r, setR) => (
                <>
                  <div className={s.formRow}>
                    <Text label="Time" value={r.time} onChange={(time) => setR({ ...r, time })} />
                    <Text label="Title" value={r.title} onChange={(title) => setR({ ...r, title })} />
                  </div>
                  <Area
                    label="Description (optional)"
                    value={r.description ?? ""}
                    onChange={(description) => setR({ ...r, description: description || undefined })}
                    rows={2}
                  />
                </>
              )}
            />
          </Field>
        </>
      );

    case "investment":
      return (
        <>
          <div className={s.formRow}>
            <Text label="Eyebrow" value={section.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <Text label="Title" value={section.title} onChange={(v) => set({ title: v })} />
          </div>
          <Area label="Intro (optional)" value={section.intro ?? ""} onChange={(v) => set({ intro: v || undefined })} rows={2} />
          <Area
            label="Disclaimer callout (optional)"
            value={section.disclaimer ?? ""}
            onChange={(v) => set({ disclaimer: v || undefined })}
            rows={3}
          />
          <Field label="Pricing options">
            <ListEditor
              items={section.options}
              onChange={(options) => set({ options })}
              addLabel="pricing option"
              makeNew={() => ({ name: `Option ${String.fromCharCode(65 + section.options.length)}`, items: [] })}
              render={(o, setO) => {
                const computed = computeOptionTotal(o);
                return (
                  <>
                    <div className={s.formRow}>
                      <Text label="Name" value={o.name} onChange={(name) => setO({ ...o, name })} />
                      <Text
                        label="Tagline (optional)"
                        value={o.tagline ?? ""}
                        onChange={(tagline) => setO({ ...o, tagline: tagline || undefined })}
                      />
                    </div>
                    <div className={s.formRow}>
                      <NumberInput
                        label="Total min ($)"
                        value={o.total?.min}
                        onChange={(min) =>
                          setO({ ...o, total: min == null ? undefined : { min, max: o.total?.max } })
                        }
                      />
                      <NumberInput
                        label="Total max ($)"
                        value={o.total?.max}
                        onChange={(max) => setO({ ...o, total: { min: o.total?.min ?? 0, max } })}
                      />
                      <Field label={`Sum of items: ${formatPriceRange(computed)}`}>
                        <button type="button" className={`${s.btn} ${s.btnSm}`} onClick={() => setO({ ...o, total: computed })}>
                          Use computed total
                        </button>
                      </Field>
                    </div>
                    <Field label="Line items">
                      <ListEditor
                        items={o.items}
                        onChange={(items) => setO({ ...o, items })}
                        addLabel="line item"
                        makeNew={(): TLineItem => ({ name: "New line item", description: "" })}
                        render={(li, setLi) => (
                          <>
                            <div className={s.formRow}>
                              <Text label="Name" value={li.name} onChange={(name) => setLi({ ...li, name })} />
                              <Select
                                label="Badge"
                                value={li.badge ?? ""}
                                options={BADGES.map((b) => ({ value: b, label: b || "—" }))}
                                onChange={(badge) =>
                                  setLi({ ...li, badge: (badge || undefined) as TLineItem["badge"] })
                                }
                              />
                            </div>
                            <Area
                              label="Description (optional)"
                              value={li.description ?? ""}
                              onChange={(description) => setLi({ ...li, description: description || undefined })}
                              rows={2}
                            />
                            <div className={s.formRow}>
                              <NumberInput
                                label="Min ($)"
                                value={li.price?.min}
                                onChange={(min) =>
                                  setLi({ ...li, price: min == null ? undefined : { min, max: li.price?.max } })
                                }
                              />
                              <NumberInput
                                label="Max ($, optional)"
                                value={li.price?.max}
                                onChange={(max) =>
                                  setLi({ ...li, price: { min: li.price?.min ?? 0, max } })
                                }
                              />
                              <Text
                                label="Price text override"
                                value={li.priceText ?? ""}
                                onChange={(priceText) => setLi({ ...li, priceText: priceText || undefined })}
                                placeholder="e.g. Complimentary"
                              />
                            </div>
                            <Text
                              label="Starred note (optional)"
                              value={li.note ?? ""}
                              onChange={(note) => setLi({ ...li, note: note || undefined })}
                              placeholder="★ You will be charged $9,000"
                            />
                          </>
                        )}
                      />
                    </Field>
                  </>
                );
              }}
            />
          </Field>
          <Area label="Footnote (optional)" value={section.footnote ?? ""} onChange={(v) => set({ footnote: v || undefined })} rows={2} />
        </>
      );

    case "scope":
      return (
        <>
          <div className={s.formRow}>
            <Text label="Eyebrow" value={section.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <Text label="Title" value={section.title} onChange={(v) => set({ title: v })} />
          </div>
          <LinesArea label="Included items (one per line)" value={section.items} onChange={(items) => set({ items })} rows={8} />
        </>
      );

    case "services":
      return (
        <>
          <div className={s.formRow}>
            <Text label="Eyebrow" value={section.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <Text label="Title" value={section.title} onChange={(v) => set({ title: v })} />
          </div>
          <Area label="Intro (optional)" value={section.intro ?? ""} onChange={(v) => set({ intro: v || undefined })} rows={2} />
          <Field label="Service tiers">
            <ListEditor
              items={section.tiers}
              onChange={(tiers) => set({ tiers })}
              addLabel="tier"
              makeNew={() => ({ name: "New Tier", description: "", includes: [] })}
              render={(t, setT) => (
                <>
                  <div className={s.formRow}>
                    <Text label="Name" value={t.name} onChange={(name) => setT({ ...t, name })} />
                    <Text
                      label="Alt name (e.g. 中文)"
                      value={t.nameAlt ?? ""}
                      onChange={(nameAlt) => setT({ ...t, nameAlt: nameAlt || undefined })}
                    />
                  </div>
                  <Area label="Description" value={t.description} onChange={(description) => setT({ ...t, description })} rows={3} />
                  <LinesArea label="Includes (one per line)" value={t.includes} onChange={(includes) => setT({ ...t, includes })} rows={4} />
                  <Text
                    label="Price line (freeform)"
                    value={t.price ?? ""}
                    onChange={(price) => setT({ ...t, price: price || undefined })}
                    placeholder="Begins at $800"
                  />
                </>
              )}
            />
          </Field>
        </>
      );

    case "closing":
      return (
        <>
          <div className={s.formRow}>
            <Text label="Title" value={section.title} onChange={(v) => set({ title: v })} />
          </div>
          <Area label="Body" value={section.body} onChange={(v) => set({ body: v })} rows={3} />
          <div className={s.formRow}>
            <Text label="Contact name" value={section.contactName} onChange={(v) => set({ contactName: v })} />
            <Text label="Contact email" value={section.contactEmail} onChange={(v) => set({ contactEmail: v })} />
            <Text label="Website" value={section.website} onChange={(v) => set({ website: v })} />
          </div>
        </>
      );

    case "custom":
      return (
        <>
          <div className={s.formRow}>
            <Text label="Eyebrow (optional)" value={section.eyebrow ?? ""} onChange={(v) => set({ eyebrow: v || undefined })} />
            <Text label="Title (optional)" value={section.title ?? ""} onChange={(v) => set({ title: v || undefined })} />
          </div>
          <Area label="Body (optional)" value={section.body ?? ""} onChange={(v) => set({ body: v || undefined })} rows={5} />
          <Field label="Cards (optional)">
            <ListEditor
              items={section.items}
              onChange={(items) => set({ items })}
              addLabel="card"
              makeNew={() => ({ title: "", description: "" })}
              render={(c, setC) => (
                <>
                  <Text label="Title" value={c.title ?? ""} onChange={(title) => setC({ ...c, title: title || undefined })} />
                  <Area
                    label="Description"
                    value={c.description ?? ""}
                    onChange={(description) => setC({ ...c, description: description || undefined })}
                    rows={2}
                  />
                </>
              )}
            />
          </Field>
        </>
      );

    default:
      return null;
  }
}
