/**
 * JSON Schema for the AI's structured output — a Proposal draft WITHOUT
 * server-controlled fields (id, slug, timestamps, status) and without
 * section ids (regenerated server-side).
 *
 * Constraints honored (structured-outputs rules): every object has
 * `additionalProperties: false` + `required`; no regex patterns or
 * min/max constraints (real validation happens in zod afterwards).
 */

const fact = {
  type: "object",
  additionalProperties: false,
  required: ["label", "value"],
  properties: {
    label: { type: "string" },
    value: { type: "string" },
  },
} as const;

const colorSwatch = {
  type: "object",
  additionalProperties: false,
  required: ["name", "hex"],
  properties: {
    name: { type: "string" },
    hex: { type: "string", description: "6-digit hex like #B9D9EB" },
  },
} as const;

const priceRange = {
  type: "object",
  additionalProperties: false,
  required: ["min"],
  properties: {
    min: { type: "number", description: "dollars" },
    max: { type: "number", description: "dollars; omit for a flat price" },
  },
} as const;

const lineItem = {
  type: "object",
  additionalProperties: false,
  required: ["name"],
  properties: {
    name: { type: "string" },
    description: { type: "string" },
    price: priceRange,
    priceText: { type: "string", description: 'freeform display override, e.g. "Complimentary"' },
    badge: { type: "string", enum: ["UPGRADE", "ADD-ON", "INCLUDED", "OPTIONAL"] },
    note: { type: "string", description: 'starred note, e.g. "★ You will be charged $9,000"' },
  },
} as const;

const investmentOption = {
  type: "object",
  additionalProperties: false,
  required: ["name", "items"],
  properties: {
    name: { type: "string" },
    tagline: { type: "string" },
    total: priceRange,
    items: { type: "array", items: lineItem },
  },
} as const;

const sectionVariants = [
  {
    type: "object",
    additionalProperties: false,
    required: ["type", "facts"],
    properties: {
      type: { type: "string", const: "cover" },
      eyebrow: { type: "string" },
      facts: { type: "array", items: fact },
    },
  },
  {
    type: "object",
    additionalProperties: false,
    required: ["type", "title", "body"],
    properties: {
      type: { type: "string", const: "vision" },
      eyebrow: { type: "string" },
      title: { type: "string" },
      body: { type: "string" },
      facts: { type: "array", items: fact },
    },
  },
  {
    type: "object",
    additionalProperties: false,
    required: ["type", "options"],
    properties: {
      type: { type: "string", const: "palette" },
      eyebrow: { type: "string" },
      title: { type: "string" },
      intro: { type: "string" },
      options: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["name", "description", "colors"],
          properties: {
            name: { type: "string" },
            badge: { type: "string" },
            description: { type: "string" },
            colors: { type: "array", items: colorSwatch },
          },
        },
      },
    },
  },
  {
    type: "object",
    additionalProperties: false,
    required: ["type", "title", "items"],
    properties: {
      type: { type: "string", const: "venues" },
      eyebrow: { type: "string" },
      title: { type: "string" },
      intro: { type: "string" },
      items: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["name", "description"],
          properties: {
            name: { type: "string" },
            area: { type: "string" },
            description: { type: "string" },
            tags: { type: "array", items: { type: "string" } },
          },
        },
      },
    },
  },
  {
    type: "object",
    additionalProperties: false,
    required: ["type", "title", "items"],
    properties: {
      type: { type: "string", const: "moments" },
      eyebrow: { type: "string" },
      title: { type: "string" },
      intro: { type: "string" },
      items: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["title", "description"],
          properties: {
            title: { type: "string" },
            description: { type: "string" },
          },
        },
      },
    },
  },
  {
    type: "object",
    additionalProperties: false,
    required: ["type", "title", "items"],
    properties: {
      type: { type: "string", const: "runOfShow" },
      eyebrow: { type: "string" },
      title: { type: "string" },
      intro: { type: "string" },
      items: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["time", "title"],
          properties: {
            time: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
          },
        },
      },
    },
  },
  {
    type: "object",
    additionalProperties: false,
    required: ["type", "title", "options"],
    properties: {
      type: { type: "string", const: "investment" },
      eyebrow: { type: "string" },
      title: { type: "string" },
      intro: { type: "string" },
      disclaimer: { type: "string" },
      options: { type: "array", items: investmentOption },
      footnote: { type: "string" },
    },
  },
  {
    type: "object",
    additionalProperties: false,
    required: ["type", "title", "items"],
    properties: {
      type: { type: "string", const: "scope" },
      eyebrow: { type: "string" },
      title: { type: "string" },
      items: { type: "array", items: { type: "string" } },
    },
  },
  {
    type: "object",
    additionalProperties: false,
    required: ["type", "title", "tiers"],
    properties: {
      type: { type: "string", const: "services" },
      eyebrow: { type: "string" },
      title: { type: "string" },
      intro: { type: "string" },
      tiers: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["name", "description"],
          properties: {
            name: { type: "string" },
            nameAlt: { type: "string", description: "e.g. Chinese name of the tier" },
            description: { type: "string" },
            includes: { type: "array", items: { type: "string" } },
            price: { type: "string", description: 'freeform, e.g. "Begins at $800"' },
            badge: { type: "string" },
          },
        },
      },
    },
  },
  {
    type: "object",
    additionalProperties: false,
    required: ["type"],
    properties: {
      type: { type: "string", const: "custom" },
      eyebrow: { type: "string" },
      title: { type: "string" },
      body: { type: "string" },
      items: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: [],
          properties: {
            title: { type: "string" },
            description: { type: "string" },
          },
        },
      },
    },
  },
  {
    type: "object",
    additionalProperties: false,
    required: ["type"],
    properties: {
      type: { type: "string", const: "closing" },
      title: { type: "string" },
      body: { type: "string" },
      contactName: { type: "string" },
      contactEmail: { type: "string" },
      website: { type: "string" },
    },
  },
] as const;

export const proposalDraftJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["client", "event", "sections"],
  properties: {
    client: {
      type: "object",
      additionalProperties: false,
      required: ["name"],
      properties: {
        name: { type: "string" },
        email: { type: "string" },
      },
    },
    event: {
      type: "object",
      additionalProperties: false,
      required: ["title", "type"],
      properties: {
        title: { type: "string" },
        type: {
          type: "string",
          enum: [
            "wedding",
            "birthday",
            "graduation",
            "corporate",
            "private",
            "festival",
            "cultural",
            "other",
          ],
        },
        date: { type: "string", description: 'display string, e.g. "Saturday, May 16, 2026"' },
        time: { type: "string", description: 'display string, e.g. "7:30 PM — 12:00 AM"' },
        location: { type: "string" },
        guests: { type: "string", description: 'display string, e.g. "60–80 Guests"' },
      },
    },
    confidential: { type: "boolean" },
    sections: {
      type: "array",
      items: { anyOf: sectionVariants },
    },
  },
} as const;
