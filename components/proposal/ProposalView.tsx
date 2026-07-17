"use client";

import { motion, useReducedMotion } from "framer-motion";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type {
  TProposal,
  TSection,
  TPaletteOption,
  TInvestmentOption,
  TLineItem,
  TImageAsset,
} from "@/lib/proposal/schema";
import { computeOptionTotal, formatPriceRange } from "@/lib/proposal/schema";
import { resolveThemeVars } from "@/lib/proposal/themes";
import s from "./proposal.module.css";

const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

/** Static mode: no entrance animations — used by screenshots, previews, PDF capture. */
const StaticCtx = createContext(false);

const pad2 = (n: number) => String(n).padStart(2, "0");

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const isStatic = useContext(StaticCtx);
  if (isStatic) {
    return (
      <div data-reveal className={className}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      data-reveal
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px 0px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Mount-time rise used on the cover (animates immediately, not on scroll). */
function Rise({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const isStatic = useContext(StaticCtx);
  if (isStatic || reduce) {
    return <div data-reveal>{children}</div>;
  }
  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function PullQuoteBlock({ quote }: { quote: { text: string; attribution?: string } }) {
  return (
    <Reveal>
      <blockquote className={s.pullQuote}>
        <p className={s.pullQuoteText} data-edit="quote.text">
          {quote.text}
        </p>
        {quote.attribution ? (
          <cite className={s.pullQuoteCite} data-edit="quote.attribution">
            {quote.attribution}
          </cite>
        ) : null}
      </blockquote>
    </Reveal>
  );
}

function Caption({ image }: { image: TImageAsset }) {
  if (!image.alt && !image.attribution) return null;
  return (
    <figcaption className={s.figCaption}>
      {image.alt}
      {image.attribution ? (
        <span className={s.figCredit}>
          {image.alt ? " · " : ""}Photo: {image.attribution}
        </span>
      ) : null}
    </figcaption>
  );
}

function SpreadFigure({ image }: { image: TImageAsset }) {
  return (
    <Reveal>
      <figure className={s.spreadFigure}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.url} alt={image.alt} className={s.spreadImg} />
        <Caption image={image} />
      </figure>
    </Reveal>
  );
}

function Paragraphs({
  text,
  className,
  dataEdit,
}: {
  text: string;
  className?: string;
  /** canvas inline-edit hook — dot path within the section (e.g. "body") */
  dataEdit?: string;
}) {
  return (
    <div className={className} data-edit={dataEdit}>
      {text
        .split(/\n{2,}/)
        .filter(Boolean)
        .map((p, i) => (
          <p key={i}>{p}</p>
        ))}
    </div>
  );
}

/* ------------------------------------------------ chapter shell */

/**
 * Every numbered section opens like a chapter of a typeset report:
 * a hairline with a running head + folio, then the eyebrow / title /
 * intro opener with a ghost chapter numeral on the right.
 */
function SectionShell({
  num,
  total,
  running,
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  num?: number;
  total: number;
  running: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`${s.section} ${className ?? ""}`}>
      <Reveal>
        <div className={s.chapterHead}>
          <div className={s.chapterMetaRow}>
            <span className={s.chapterRunning}>{running}</span>
            {num ? (
              <span className={s.chapterFolio}>
                {pad2(num)} / {pad2(total)}
              </span>
            ) : null}
          </div>
          <div className={s.chapterOpen}>
            <div className={s.chapterText}>
              {eyebrow ? (
                <div className={s.eyebrow} data-edit="eyebrow">
                  {eyebrow}
                </div>
              ) : null}
              {title ? (
                <h2 className={s.sectionTitle} data-edit="title">
                  {title}
                </h2>
              ) : null}
              {intro ? (
                <p className={s.sectionIntro} data-edit="intro">
                  {intro}
                </p>
              ) : null}
            </div>
            {num ? (
              <div className={s.chapterNum} aria-hidden="true">
                {pad2(num)}
              </div>
            ) : null}
          </div>
        </div>
      </Reveal>
      {children}
    </section>
  );
}

type ShellProps = { num?: number; total: number; running: string };

/* ------------------------------------------------ cover */

function Cover({
  proposal,
  section,
}: {
  proposal: TProposal;
  section: Extract<TSection, { type: "cover" }>;
}) {
  const bg = section.background;
  return (
    <header className={s.cover} data-has-bg={bg ? "true" : undefined}>
      {bg ? (
        <div className={s.coverBg} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={bg.url} alt="" className={s.coverBgImg} />
          <div className={s.coverBgScrim} />
        </div>
      ) : (
        <svg className={s.coverArcs} viewBox="0 0 600 600" fill="none" aria-hidden="true">
          {[190, 285, 380].map((r) => (
            <circle
              key={r}
              cx="600"
              cy="600"
              r={r}
              style={{ stroke: "var(--p-taupe)" }}
              strokeWidth="0.8"
              opacity="0.5"
            />
          ))}
        </svg>
      )}
      <div className={s.coverTop}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/proposals/kj-monogram.png" alt="Kira Jia Events" className={s.coverMonogram} />
        <div className={s.coverIssue}>
          Proposal · {proposal.event.date ?? "Date to be confirmed"}
        </div>
      </div>
      <div className={s.coverBottom}>
        <Rise>
          <div className={s.eyebrow}>{section.eyebrow}</div>
          <div className={s.eyebrowRule} />
          <h1 className={s.coverName}>{proposal.client.name}</h1>
          <div className={s.coverSubtitle}>{proposal.event.title}</div>
        </Rise>
        <Rise delay={0.18}>
          {section.facts.length ? (
            <div className={s.coverFactBand}>
              {section.facts.map((f) => (
                <div className={s.coverFact} key={f.label + f.value}>
                  <div className={s.factLabel}>{f.label}</div>
                  <div className={s.factValue}>{f.value}</div>
                </div>
              ))}
            </div>
          ) : null}
        </Rise>
        <div className={s.coverFoot}>
          <span>
            {proposal.event.type === "wedding" ? "kirajiaweddings" : "kirajiaevents"}.com
          </span>
          <span>{proposal.confidential ? "Private & Confidential" : "Prepared with care"}</span>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------ vision */

function Vision({
  section,
  shell,
}: {
  section: Extract<TSection, { type: "vision" }>;
  shell: ShellProps;
}) {
  return (
    <SectionShell {...shell} eyebrow={section.eyebrow} title={section.title}>
      <Reveal>
        <div className={s.visionSpread}>
          <Paragraphs text={section.body} className={s.visionBody} dataEdit="body" />
          {section.facts.length ? (
            <div className={s.visionFactCol}>
              {section.facts.map((f) => (
                <div className={s.visionFact} key={f.label + f.value}>
                  <div className={s.factLabel}>{f.label}</div>
                  <div className={s.factValue}>{f.value}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </Reveal>
      {section.image ? <SpreadFigure image={section.image} /> : null}
      {section.quote ? <PullQuoteBlock quote={section.quote} /> : null}
    </SectionShell>
  );
}

/* ------------------------------------------------ palette */

function PaletteOptionBlock({ option, idx }: { option: TPaletteOption; idx: number }) {
  const hero = option.hero;
  return (
    <Reveal className={s.paletteOption}>
      {hero ? (
        <div className={s.paletteHero} data-slot={`options[${idx}].hero`}>
          {hero.hasBakedText ? (
            // legacy asset with typography inside the pixels — show as-is
            // eslint-disable-next-line @next/next/no-img-element
            <img src={hero.url} alt={hero.alt} className={s.paletteHeroBaked} />
          ) : (
            <div className={s.paletteHeroFramed}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hero.url} alt={hero.alt} className={s.paletteHeroImg} />
              <div className={s.paletteHeroShade} />
              <div className={s.paletteHeroContent}>
                {option.badge ? <span className={s.paletteBadge}>{option.badge}</span> : null}
                <div className={s.paletteName} data-edit={`options.${idx}.name`}>
                  {option.name}
                </div>
                <p className={s.paletteDesc} data-edit={`options.${idx}.description`}>
                  {option.description}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          {option.badge ? (
            <>
              <div className={s.eyebrow}>{option.badge}</div>
              <div className={s.eyebrowRule} />
            </>
          ) : null}
          <h3 className={s.sectionTitle}>{option.name}</h3>
          <p className={s.sectionIntro}>{option.description}</p>
        </div>
      )}
      {option.board ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={option.board.url} alt={option.board.alt} className={s.paletteBoard} />
      ) : null}
      {option.gallery.length ? (
        <div className={s.paletteGallery}>
          {option.gallery.map((g, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={g.url + i}
              src={g.url}
              alt={g.alt}
              className={s.paletteGalleryImg}
              data-slot={`options[${idx}].gallery[${i}]`}
            />
          ))}
        </div>
      ) : null}
      {option.colors.length ? (
        <div className={s.plateRow}>
          {option.colors.map((c, i) => (
            <div className={s.plate} key={c.hex + c.name}>
              <span className={s.plateChip} style={{ background: c.hex }} />
              <span className={s.plateIndex}>{pad2(i + 1)}</span>
              <span className={s.plateName}>{c.name}</span>
              <span className={s.plateHex}>{c.hex.toUpperCase()}</span>
            </div>
          ))}
        </div>
      ) : null}
    </Reveal>
  );
}

function Palette({
  section,
  shell,
}: {
  section: Extract<TSection, { type: "palette" }>;
  shell: ShellProps;
}) {
  return (
    <SectionShell {...shell} eyebrow={section.eyebrow} title={section.title} intro={section.intro}>
      {section.options.map((o, i) => (
        <PaletteOptionBlock option={o} idx={i} key={o.name + i} />
      ))}
    </SectionShell>
  );
}

/* ------------------------------------------------ venues */

function Venues({
  section,
  shell,
}: {
  section: Extract<TSection, { type: "venues" }>;
  shell: ShellProps;
}) {
  return (
    <SectionShell {...shell} eyebrow={section.eyebrow} title={section.title} intro={section.intro}>
      <div className={s.venueList}>
        {section.items.map((v, i) => (
          <Reveal className={s.venueRow} key={v.name} delay={Math.min(i * 0.05, 0.25)}>
            <div className={s.venueIndex} aria-hidden="true">
              {pad2(i + 1)}
            </div>
            <div className={s.venueBody} data-item={`items[${i}]`}>
              <h3 className={s.venueName} data-edit={`items.${i}.name`}>
                {v.name}
              </h3>
              {v.area ? (
                <div className={s.venueArea} data-edit={`items.${i}.area`}>
                  {v.area}
                </div>
              ) : null}
              <p className={s.venueDesc} data-edit={`items.${i}.description`}>
                {v.description}
              </p>
              {v.facts?.length ? (
                <div className={s.venueFacts}>
                  {v.facts.map((f) => (
                    <div key={f.label + f.value}>
                      <div className={s.factLabel}>{f.label}</div>
                      <div className={s.factValue}>{f.value}</div>
                    </div>
                  ))}
                </div>
              ) : null}
              {v.tags.length ? <div className={s.venueMeta}>{v.tags.join("  ·  ")}</div> : null}
            </div>
            {v.image ? (
              <figure className={s.venueFigure} data-slot={`items[${i}].image`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.image.url} alt={v.image.alt} className={s.venueImg} />
                <Caption image={v.image} />
              </figure>
            ) : null}
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

/* ------------------------------------------------ moments */

function MomentItem({
  title,
  description,
  image,
  index,
}: {
  title?: string;
  description?: string;
  image?: TImageAsset;
  index: number;
}) {
  const base = `items.${index}`;
  return (
    <Reveal className={s.momentItem} delay={Math.min(index * 0.04, 0.2)}>
      <div data-item={`items[${index}]`}>
        {image ? (
          <figure className={s.momentFigure} data-slot={`items[${index}].image`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.url} alt={image.alt} className={s.momentImg} />
          </figure>
        ) : null}
        <div className={s.momentIndex}>{pad2(index + 1)}</div>
        {title ? (
          <h3 className={s.momentTitle} data-edit={`${base}.title`}>
            {title}
          </h3>
        ) : null}
        {description ? (
          <p className={s.momentDesc} data-edit={`${base}.description`}>
            {description}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}

function Moments({
  section,
  shell,
}: {
  section: Extract<TSection, { type: "moments" }>;
  shell: ShellProps;
}) {
  return (
    <SectionShell {...shell} eyebrow={section.eyebrow} title={section.title} intro={section.intro}>
      <div className={s.momentGrid}>
        {section.items.map((m, i) => (
          <MomentItem key={m.title} index={i} title={m.title} description={m.description} image={m.image} />
        ))}
      </div>
    </SectionShell>
  );
}

/* ------------------------------------------------ run of show */

function RunOfShow({
  section,
  shell,
}: {
  section: Extract<TSection, { type: "runOfShow" }>;
  shell: ShellProps;
}) {
  return (
    <SectionShell {...shell} eyebrow={section.eyebrow} title={section.title} intro={section.intro}>
      <div className={s.rosSpine}>
        {(() => {
          const rows: ReactNode[] = [];
          let lastPhase: string | undefined;
          section.items.forEach((r, i) => {
            if (r.phase && r.phase !== lastPhase) {
              lastPhase = r.phase;
              rows.push(
                <Reveal className={s.rosPhase} key={`phase-${r.phase}-${i}`}>
                  <span className={s.rosPhaseLabel}>{r.phase}</span>
                </Reveal>
              );
            }
            rows.push(
              <Reveal className={s.rosRow} key={r.time + i}>
                <div className={s.rosTime} data-edit={`items.${i}.time`}>
                  {r.time}
                </div>
                <div className={s.rosNode} aria-hidden="true" />
                <div className={s.rosBody} data-item={`items[${i}]`}>
                  <div className={s.rosTitle} data-edit={`items.${i}.title`}>
                    {r.title}
                  </div>
                  {r.description ? (
                    <p className={s.rosDesc} data-edit={`items.${i}.description`}>
                      {r.description}
                    </p>
                  ) : null}
                </div>
              </Reveal>
            );
          });
          return rows;
        })()}
      </div>
    </SectionShell>
  );
}

/* ------------------------------------------------ investment */

function LineItemRow({ item, editBase }: { item: TLineItem; editBase: string }) {
  const price = item.priceText ?? (item.price ? formatPriceRange(item.price) : "");
  return (
    <div className={s.exRow} data-item={editBase.replace(/\.items\.(\d+)$/, ".items[$1]")}>
      <div className={s.exName}>
        <span data-edit={`${editBase}.name`}>{item.name}</span>
        {item.badge ? <sup className={s.exBadge}>{item.badge}</sup> : null}
      </div>
      {price ? <div className={s.exPrice}>{price}</div> : null}
      {item.description ? (
        <p className={s.exDesc} data-edit={`${editBase}.description`}>
          {item.description}
        </p>
      ) : null}
      {item.note ? <div className={s.exNote}>{item.note}</div> : null}
    </div>
  );
}

function InvestmentOptionBlock({ option, idx }: { option: TInvestmentOption; idx: number }) {
  const total = option.total ?? computeOptionTotal(option);
  return (
    <Reveal className={s.exhibit}>
      <header className={s.exhibitHead}>
        <div>
          <div className={s.exhibitName} data-edit={`options.${idx}.name`}>
            {option.name}
          </div>
          {option.tagline ? (
            <div className={s.exhibitTagline} data-edit={`options.${idx}.tagline`}>
              {option.tagline}
            </div>
          ) : null}
        </div>
        <div className={s.exhibitTotalFig}>{formatPriceRange(total)}</div>
      </header>
      <div className={s.exhibitRows}>
        {option.items.map((item, i) => (
          <LineItemRow item={item} editBase={`options.${idx}.items.${i}`} key={item.name + i} />
        ))}
      </div>
      <div className={s.exTotal}>
        <div className={s.exTotalLabel}>Total — {option.name}</div>
        <div className={s.exTotalValue}>{formatPriceRange(total)}</div>
      </div>
    </Reveal>
  );
}

function Investment({
  section,
  shell,
}: {
  section: Extract<TSection, { type: "investment" }>;
  shell: ShellProps;
}) {
  return (
    <SectionShell {...shell} eyebrow={section.eyebrow} title={section.title} intro={section.intro}>
      {section.disclaimer ? (
        <Reveal>
          <div className={s.footnoteBlock}>
            <span className={s.fnGlyph}>†</span>
            <span data-edit="disclaimer">{section.disclaimer}</span>
          </div>
        </Reveal>
      ) : null}
      {section.options.map((o, i) => (
        <InvestmentOptionBlock option={o} idx={i} key={o.name + i} />
      ))}
      {section.footnote ? (
        <p className={s.exFootnote}>
          <span className={s.fnGlyph}>‡</span>
          <span data-edit="footnote">{section.footnote}</span>
        </p>
      ) : null}
    </SectionShell>
  );
}

/* ------------------------------------------------ scope */

function Scope({
  section,
  shell,
}: {
  section: Extract<TSection, { type: "scope" }>;
  shell: ShellProps;
}) {
  const groups = section.groups;
  let n = 0;
  return (
    <SectionShell {...shell} eyebrow={section.eyebrow} title={section.title} intro={section.intro}>
      {groups?.length ? (
        <div className={s.scopeGroups}>
          {groups.map((g) => (
            <Reveal className={s.scopeGroup} key={g.title}>
              <h3 className={s.scopeGroupTitle} data-edit={`groups.${groups.indexOf(g)}.title`}>
                {g.title}
              </h3>
              {g.blurb ? (
                <p className={s.scopeGroupBlurb} data-edit={`groups.${groups.indexOf(g)}.blurb`}>
                  {g.blurb}
                </p>
              ) : null}
              <div className={s.scopeGroupItems}>
                {g.items.map((item, ii) => {
                  n += 1;
                  return (
                    <div className={s.scopeItem} key={item}>
                      <span className={s.scopeIndex}>{pad2(n)}</span>
                      <span
                        className={s.scopeText}
                        data-edit={`groups.${groups.indexOf(g)}.items.${ii}`}
                      >
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className={s.scopeList}>
          {section.items.map((item, i) => (
            <Reveal className={s.scopeItem} key={item}>
              <span className={s.scopeIndex}>{pad2(i + 1)}</span>
              <span className={s.scopeText} data-edit={`items.${i}`}>
                {item}
              </span>
            </Reveal>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

/* ------------------------------------------------ services */

function Services({
  section,
  shell,
}: {
  section: Extract<TSection, { type: "services" }>;
  shell: ShellProps;
}) {
  return (
    <SectionShell {...shell} eyebrow={section.eyebrow} title={section.title} intro={section.intro}>
      <div className={s.tierGrid}>
        {section.tiers.map((t, i) => (
          <Reveal className={s.tierCol} key={t.name} delay={Math.min(i * 0.06, 0.3)}>
            <div className={s.tierIndex}>{pad2(i + 1)}</div>
            <div className={s.tierName}>{t.name}</div>
            {t.nameAlt ? <div className={s.tierNameAlt}>{t.nameAlt}</div> : null}
            <p className={s.tierDesc}>{t.description}</p>
            {t.includes.length ? (
              <ul className={s.tierList}>
                {t.includes.map((inc) => (
                  <li key={inc}>{inc}</li>
                ))}
              </ul>
            ) : null}
            {t.price ? <div className={s.tierPrice}>{t.price}</div> : null}
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

/* ------------------------------------------------ custom */

function Custom({
  section,
  shell,
}: {
  section: Extract<TSection, { type: "custom" }>;
  shell: ShellProps;
}) {
  const variant = section.variant ?? "vignettes";
  return (
    <SectionShell {...shell} eyebrow={section.eyebrow} title={section.title}>
      {section.body ? (
        <Reveal>
          <Paragraphs text={section.body} className={s.customBody} dataEdit="body" />
        </Reveal>
      ) : null}
      {section.image ? <SpreadFigure image={section.image} /> : null}
      {section.items.length ? (
        variant === "index" ? (
          <div className={s.indexGrid}>
            {section.items.map((item, i) => (
              <Reveal className={s.indexRow} key={(item.title ?? "") + i}>
                <span className={s.scopeIndex}>{pad2(i + 1)}</span>
                <span className={s.indexText} data-item={`items[${i}]`}>
                  {item.title ? (
                    <span className={s.indexTitle} data-edit={`items.${i}.title`}>
                      {item.title}
                    </span>
                  ) : null}
                  {item.title && item.description ? " — " : ""}
                  {item.description ? (
                    <span data-edit={`items.${i}.description`}>{item.description}</span>
                  ) : null}
                </span>
                {item.meta ? (
                  <span className={s.indexMeta} data-edit={`items.${i}.meta`}>
                    {item.meta}
                  </span>
                ) : null}
              </Reveal>
            ))}
          </div>
        ) : variant === "schedule" ? (
          <div className={s.schedRows}>
            {section.items.map((item, i) => (
              <Reveal className={s.schedRow} key={(item.title ?? "") + i}>
                <div className={s.schedMeta} data-edit={`items.${i}.meta`}>
                  {item.meta}
                </div>
                <div data-item={`items[${i}]`}>
                  {item.title ? (
                    <div className={s.schedTitle} data-edit={`items.${i}.title`}>
                      {item.title}
                    </div>
                  ) : null}
                  {item.description ? (
                    <p className={s.schedDesc} data-edit={`items.${i}.description`}>
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className={s.momentGrid}>
            {section.items.map((item, i) => (
              <MomentItem
                key={(item.title ?? "") + i}
                index={i}
                title={item.title}
                description={item.description}
                image={item.image}
              />
            ))}
          </div>
        )
      ) : null}
      {section.quote ? <PullQuoteBlock quote={section.quote} /> : null}
    </SectionShell>
  );
}

/* ------------------------------------------------ closing */

function Closing({
  proposal,
  section,
}: {
  proposal: TProposal;
  section: Extract<TSection, { type: "closing" }>;
}) {
  const texture = section.texture;
  return (
    <section className={s.closing} data-has-texture={texture ? "true" : undefined}>
      {texture ? (
        <div className={s.closingTexture} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={texture.url} alt="" className={s.closingTextureImg} />
          <div className={s.closingTextureScrim} />
        </div>
      ) : null}
      <div className={s.closingInner}>
        <Reveal>
          <h2 className={s.closingTitle} data-edit="title">
            {section.title}
          </h2>
          <p className={s.closingBody} data-edit="body">
            {section.body}
          </p>
          <div className={s.closingContact}>
            <div className={s.closingName} data-edit="contactName">
              {section.contactName}
            </div>
            <a className={s.closingLink} href={`mailto:${section.contactEmail}`}>
              {section.contactEmail}
            </a>
            <div className={s.closingSite}>{section.website}</div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/proposals/kj-monogram.png" alt="" className={s.closingMonogram} />
          <div className={s.closingFoot}>
            Kira Jia Events · Prepared exclusively for {proposal.client.name}
            {proposal.confidential ? " · Confidential" : ""}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------ root */

export default function ProposalView({
  proposal,
  staticRender = false,
  fullPage = false,
}: {
  proposal: TProposal;
  staticRender?: boolean;
  /** page-level render (public /p/[slug]) — themes the html/body backdrop too,
   *  so overscroll and print bleed match the document ground. Leave false when
   *  embedded (admin preview, canvas). */
  fullPage?: boolean;
}) {
  const themeVars = resolveThemeVars(proposal.theme);
  const themedBg = themeVars["--p-bg"];
  const styleKey = proposal.theme?.style ?? "classic-kj";
  const running = `Kira Jia Events — ${proposal.event.title}`;

  // chapter numbering: every visible section except cover & closing gets a folio
  const visible = proposal.sections.filter((sec) => !sec.hidden);
  const numbered = visible.filter((sec) => sec.type !== "cover" && sec.type !== "closing");
  const total = numbered.length;
  const numberOf = new Map<string, number>(numbered.map((sec, i) => [sec.id, i + 1]));

  const renderSection = (section: TSection) => {
    const shell: ShellProps = { num: numberOf.get(section.id), total, running };
    const body = (() => {
      switch (section.type) {
        case "cover":
          return <Cover proposal={proposal} section={section} />;
        case "vision":
          return <Vision section={section} shell={shell} />;
        case "palette":
          return <Palette section={section} shell={shell} />;
        case "venues":
          return <Venues section={section} shell={shell} />;
        case "moments":
          return <Moments section={section} shell={shell} />;
        case "runOfShow":
          return <RunOfShow section={section} shell={shell} />;
        case "investment":
          return <Investment section={section} shell={shell} />;
        case "scope":
          return <Scope section={section} shell={shell} />;
        case "services":
          return <Services section={section} shell={shell} />;
        case "custom":
          return <Custom section={section} shell={shell} />;
        case "closing":
          return <Closing proposal={proposal} section={section} />;
        default:
          return null;
      }
    })();
    if (!body) return null;
    // data-sec is the canvas's selection + diff anchor; inert on the client page
    return (
      <div key={section.id} data-sec={section.id} data-sec-type={section.type}>
        {body}
      </div>
    );
  };

  return (
    <StaticCtx.Provider value={staticRender}>
      {fullPage && themedBg ? (
        <style>{`html, body { background: ${themedBg} !important; }`}</style>
      ) : null}
      <div className={s.root} data-style={styleKey} style={themeVars}>
        <div className={s.topBand} />
        <div className={s.frame}>{visible.map(renderSection)}</div>
      </div>
    </StaticCtx.Provider>
  );
}
