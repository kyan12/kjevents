/* Simulated op-stream test for lib/proposal/ops.ts — run with npx tsx */
import { applyOp, setIn, getIn, verifyInvestmentTotals, OpSchema, type TOp } from "../lib/proposal/ops";
import { marcusProposal } from "../lib/proposal/seed-marcus";

let doc = structuredClone(marcusProposal);
const results: string[] = [];
const ok = (name: string, cond: boolean, extra = "") =>
  results.push(`${cond ? "PASS" : "FAIL"} ${name}${extra ? " — " + extra : ""}`);

// 1. validation: malformed op rejected
ok("rejects unknown op", !OpSchema.safeParse({ op: "explode" }).success);
ok("accepts note", OpSchema.safeParse({ op: "note", text: "hi" }).success);

// 2. setMeta
let r = applyOp(doc, { op: "setMeta", patch: { event: { guests: "~150 Guests" } } } as TOp);
ok("setMeta", !r.error && r.doc.event.guests === "~150 Guests");
doc = r.doc;

// 3. add (no anchor → before closing)
r = applyOp(doc, {
  op: "add",
  section: { type: "custom", title: "Afterparty", items: [] },
} as TOp);
const added = r.doc.sections[r.doc.sections.length - 2];
ok("add before closing", !r.error && added.type === "custom" && r.doc.sections.at(-1)!.type === "closing");
const addedId = added.id;
doc = r.doc;

// 4. replace preserves id, flags touched
const vision = doc.sections.find((s) => s.type === "vision")!;
r = applyOp(doc, {
  op: "replace",
  id: vision.id,
  section: { ...vision, title: "The Supper Club, Louder" },
} as TOp);
ok(
  "replace",
  !r.error &&
    r.doc.sections.find((s) => s.id === vision.id)!.type === "vision" &&
    (r.doc.sections.find((s) => s.id === vision.id) as { title: string }).title === "The Supper Club, Louder" &&
    r.touched[0] === vision.id
);
doc = r.doc;

// 5. move
r = applyOp(doc, { op: "move", id: addedId, after: vision.id } as TOp);
const vIdx = r.doc.sections.findIndex((s) => s.id === vision.id);
ok("move after vision", !r.error && r.doc.sections[vIdx + 1]?.id === addedId);
doc = r.doc;

// 6. remove + dangling id tolerated
r = applyOp(doc, { op: "remove", id: addedId } as TOp);
ok("remove", !r.error && !r.doc.sections.some((s) => s.id === addedId));
doc = r.doc;
r = applyOp(doc, { op: "remove", id: "s_nope" } as TOp);
ok("dangling remove is soft error", r.error != null && r.doc === doc);

// 7. setTheme
r = applyOp(doc, { op: "setTheme", theme: { style: "editorial" } } as TOp);
ok("setTheme", !r.error && r.doc.theme?.style === "editorial");

// 8. setIn / getIn
const venues = doc.sections.find((s) => s.type === "venues")! as never as Record<string, unknown>;
const next = setIn(venues, "items.1.name", "The Django (Cellar)");
ok(
  "setIn immutably",
  getIn(next, "items.1.name") === "The Django (Cellar)" && getIn(venues, "items.1.name") === "The Django"
);

// 9. totals verification catches drift
const inv = structuredClone(doc.sections.find((s) => s.type === "investment")!) as {
  type: "investment";
  options: { name: string; total?: { min: number; max?: number } }[];
};
ok("totals ok as seeded", verifyInvestmentTotals(inv as never).length === 0);
inv.options[0].total = { min: 1, max: 2 };
ok("totals drift flagged", verifyInvestmentTotals(inv as never)[0] === inv.options[0].name);

console.log(results.join("\n"));
if (results.some((x) => x.startsWith("FAIL"))) process.exit(1);
