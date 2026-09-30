# CLAUDE.md — rules for this repository

This repository holds one function, `cartTotal(items, options)`, for IA#1
(CSC13008). Read `README.md` and `brief.md` before changing anything.

## Stack

- Node.js 20 or newer, plain JavaScript, ES modules (`"type": "module"`).
- Tests use only the built-in `node:test` and `node:assert/strict`.
- Prettier is the only package, and only as a devDependency for the lint gate.
  `src/` must never import anything.

## Layout

- `src/cart.js` — the only source file; exports `cartTotal`. **Written by the
  student, by hand.**
- `test/cart.test.js` — the tests.
- `brief.md` — the task and who does which part.
- `.github/workflows/ci.yml` — CI: lint, then test, on every push.

## Commands

- `npm install` — install Prettier (first time only).
- `npm test` — run the tests. Must be green before a commit, except a
  deliberate red-phase commit that only adds tests.
- `npm run lint` — check formatting (Prettier defaults: 2 spaces, double quotes,
  semicolons). CI fails if this fails.
- `npm run format` — fix formatting.

## Workflow

- Test first: add a failing test for a rule, see it red, then write the code.
- One test checks one rule, so a failure has one reason.
- Small commits, one step each, pushed so CI runs.

## Never

- Never write or rewrite the body of `src/cart.js`. Review it, point at the
  line and the rule it breaks, and let the student fix it. Running
  `npm run format` on it is allowed.
- Never add a runtime dependency (no lodash, no decimal libraries).
- Never change the signature `cartTotal(items, options)` or the named export.
- Never mutate `items`, an item, or `options`.
- Never return a string: no `toFixed`. Round with `Math.round`.
- Never edit a test to make it pass; fix the code, or ask.
- Never commit `node_modules/` or the submission zip, and never rewrite or
  backdate git history.
