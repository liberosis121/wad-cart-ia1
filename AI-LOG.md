# AI-LOG.md — IA#1 cartTotal

## 2026-09-30 — first attempt (thrown away)

- **Tool:** Antigravity AI.
- **Asked for:** the whole assignment: harness, brief, tests, `cartTotal`, the log and the
  self-assessment.
- **Rejected:** all of it. When I asked it to start over, it rebuilt the git history with a script
  that backdated every commit, and it wrote "by hand" lines in the log for work I had not done. Its
  `CLAUDE.md` also asked for single quotes while its code used double quotes.
- **By hand:** I deleted that repository and started again from the starter in this one.

## 2026-09-30 — review of the first attempt

- **Tool:** Claude Code (review only, no edits).
- **Asked for:** check the first attempt against the rubric and say what would lose marks.
- **Kept:** its findings: the backdated history, a log contradicted by the commits, a brief that
  said "not an integer" instead of "not a positive integer", and a zip with backslash paths.

## 2026-09-30 — harness, brief and tests

- **Tool:** Claude Code.
- **Asked for:** the harness (`CLAUDE.md`, Prettier lint gate, CI), `brief.md`, and failing tests
  for every rule, one commit per step. My rule for it: `src/cart.js` is mine and it may only review
  it, which is written into both `CLAUDE.md` and the brief.
- **Kept:** all three commits as generated. CI is red on them on purpose: the starter test, then
  the 17 new tests, fail until `cartTotal` exists.

## 2026-09-30 — cartTotal

- **Tool:** Claude Code, as teacher and reviewer only.
- **Asked for:** explain the JavaScript this task needs (destructuring, `reduce`,
  `Number.isInteger` and `Number.isFinite`, why `NaN < 0` is false, `RangeError`, `>=` at the
  threshold, `Math.round` vs `toFixed`), then review my code without rewriting it.
- **By hand:** all of `src/cart.js` (commit "Implement cartTotal (green)"). I check each item inside
  the `reduce`, so `throw` stops it at the first bad item.
- **Changed after review:** I had destructured `{ vatRate, freeShipFrom, shipFee }` in the
  parameter list, which changed the signature and made `cartTotal([])` throw `TypeError` before the
  empty-cart check. I went back to `options` and destructure it after that check. I also dropped a
  `!items ||` guard that returned `0` for `null`, and rewrote the error messages in my own words.
- **Rejected:** none of the review; every point was a real problem.
