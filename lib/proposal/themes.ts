import type { TTheme, TThemeTokens } from "./schema";

/**
 * Style presets — the single source of truth for theme token values.
 * The art-direction style guides (.claude/skills/art-direction/references/)
 * quote these; if they ever disagree, this file wins.
 *
 * Values map onto the CSS custom properties defined on `.root` in
 * components/proposal/proposal.module.css. Fonts reference variables loaded
 * once in the root layout — presets never introduce new font loads.
 */

const FONT = {
  cormorant: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
  jost: 'var(--font-jost), Jost, "Century Gothic", sans-serif',
  bebas: 'var(--font-bebas), "Bebas Neue", "Arial Narrow", sans-serif',
  dm: 'var(--font-dm), "DM Sans", sans-serif',
  geist: "var(--font-sans), system-ui, sans-serif",
} as const;

export type ResolvedTokens = Required<Omit<TThemeTokens, "monogramFilter">> &
  Pick<TThemeTokens, "monogramFilter">;

export const STYLE_PRESETS: Record<string, ResolvedTokens> = {
  "classic-kj": {
    bg: "#f3efea",
    bg2: "#ece6dd",
    card: "#fcfaf7",
    tint: "#f8efe6",
    ink: "#2f2a28",
    inkSoft: "#55504b",
    muted: "#7a6b61",
    accent: "#6e0f17",
    accentDeep: "#5a2b31",
    highlight: "#f3e4d4",
    hairline: "#ddd3c6",
    hairlineSoft: "#e7dfd4",
    fontDisplay: FONT.cormorant,
    fontBody: FONT.jost,
  },
  noir: {
    bg: "#141114",
    bg2: "#1c181b",
    card: "#201a1d",
    tint: "#241d20",
    ink: "#f0e9de",
    inkSoft: "#cfc5b7",
    // contrast-audited for #141114 ground: small letterspaced caps must
    // survive without any opacity modifiers stacked on top
    muted: "#a89b8d",
    accent: "#c39a5e",
    accentDeep: "#4a1620",
    highlight: "#e8d5b0",
    hairline: "#4a423e",
    hairlineSoft: "#332c2a",
    fontDisplay: FONT.bebas,
    fontBody: FONT.jost,
    monogramFilter: "invert(0.9) sepia(0.25) brightness(1.35)",
  },
  botanical: {
    bg: "#f4f1e8",
    bg2: "#ece9dc",
    card: "#fbf9f2",
    tint: "#e7ecdc",
    ink: "#262b20",
    inkSoft: "#4a5142",
    muted: "#77806a",
    accent: "#4a5d3a",
    accentDeep: "#2e3b26",
    highlight: "#e9dfc8",
    hairline: "#d8d4c2",
    hairlineSoft: "#e2dfd0",
    fontDisplay: FONT.cormorant,
    fontBody: FONT.jost,
  },
  editorial: {
    bg: "#f6f6f2",
    bg2: "#eeeee8",
    card: "#ffffff",
    tint: "#f0f0ea",
    ink: "#111111",
    inkSoft: "#3c3c38",
    muted: "#7a7a72",
    accent: "#de3919",
    accentDeep: "#1c1c1c",
    highlight: "#e8e8e0",
    hairline: "#d6d6cc",
    hairlineSoft: "#e4e4da",
    fontDisplay: FONT.geist,
    fontBody: FONT.dm,
  },
  festival: {
    bg: "#fff6ec",
    bg2: "#f9ecdc",
    card: "#fffdf8",
    tint: "#fbe8d4",
    ink: "#2b1f1a",
    inkSoft: "#55423a",
    muted: "#8a6f5f",
    accent: "#c8321e",
    accentDeep: "#7c1a10",
    highlight: "#e9b95c",
    hairline: "#e5d3bd",
    hairlineSoft: "#efe1cf",
    fontDisplay: FONT.bebas,
    fontBody: FONT.dm,
  },
};

const TOKEN_TO_VAR: Record<keyof ResolvedTokens, string> = {
  bg: "--p-bg",
  bg2: "--p-bg-2",
  card: "--p-card",
  tint: "--p-blush",
  ink: "--p-ink",
  inkSoft: "--p-ink-soft",
  muted: "--p-taupe",
  accent: "--p-garnet",
  accentDeep: "--p-maroon",
  highlight: "--p-champagne",
  hairline: "--p-hairline",
  hairlineSoft: "--p-hairline-soft",
  fontDisplay: "--p-serif",
  fontBody: "--p-sans",
  monogramFilter: "--p-monogram-filter",
};

/**
 * Resolve a document theme into CSS custom-property overrides for the
 * renderer root. No theme → empty object (the stylesheet's classic-kj
 * defaults apply untouched).
 */
export function resolveThemeVars(theme?: TTheme): Record<string, string> {
  if (!theme) return {};
  const preset = STYLE_PRESETS[theme.style] ?? STYLE_PRESETS["classic-kj"];
  const tokens = { ...preset, ...stripUndefined(theme.tokens ?? {}) };
  const vars: Record<string, string> = {};
  for (const [key, value] of Object.entries(tokens)) {
    if (value) vars[TOKEN_TO_VAR[key as keyof ResolvedTokens]] = value;
  }
  return vars;
}

function stripUndefined<T extends object>(obj: T): Partial<T> {
  const out: Partial<T> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) (out as Record<string, unknown>)[k] = v;
  }
  return out;
}
