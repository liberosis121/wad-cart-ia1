# Brief — cartTotal (IA#1)

This is the brief I gave the assistant (Claude Code). The contract below is
complete on its own: anyone implementing it should get the same function.

## Who does what

- **Assistant:** the harness, this brief, the tests in `test/cart.test.js`,
  and a review of my code. Before I code, explain the JavaScript this task
  needs and how to think about it, without writing `cartTotal` for me.
- **Me:** `src/cart.js`, by hand. The assistant reviews it, points at the line
  and the rule it breaks, and I make the fix.

## Files the assistant may touch

- `test/cart.test.js` — add tests.
- `src/cart.js` — read and review only; never write its body.

Do not touch anything else: not `package.json`, not the CI workflow, not
`CLAUDE.md`, not `README.md`.

## Contract

```js
export function cartTotal(items, options) // => number
```

- `items`: an array of `{ name: string, price: number, qty: number }`.
- `options`: `{ vatRate: number, freeShipFrom: number, shipFee: number }`,
  e.g. `vatRate: 0.08` means 8%.
- Keep the signature and the named export exactly as they are.

Steps:

1. `subtotal` = sum of `price * qty` over all items.
2. `vat` = `subtotal * vatRate`.
3. `shipping` = `0` if `subtotal >= freeShipFrom` (the threshold itself ships
   free), otherwise `shipFee`. Compare the subtotal, before VAT.
4. Return `Math.round(subtotal + vat + shipping)` — one rounding, at the end, to
   the whole đồng. The result is a **number**, never a string (no `toFixed`).

Worked example — must return `467400`:

```js
cartTotal(
  [
    { name: "Áo thun", price: 180000, qty: 2 },
    { name: "Sổ tay", price: 45000, qty: 1 },
  ],
  { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 },
); // 405000 + 32400 + 30000 = 467400
```

## Edge cases and errors

- Empty cart (`[]`) returns `0`: no VAT and no shipping fee.
- `price` below `0`, or not a finite number (`NaN`, `Infinity`, a string),
  throws `RangeError`. A price of `0` is allowed.
- `qty` that is not a positive integer throws `RangeError`: `1.5`, `0`, `-1`
  and `"2"` all throw.
- A bad item anywhere in the cart throws, not only the first one.

## Constraints

- Plain JavaScript, **no dependencies**: nothing imported in `src/cart.js`,
  tests use only `node:test` and `node:assert/strict`.
- Do not mutate `items`, any item, or `options`.
- One test per rule, named after the rule, so a failing test has one reason.
- `npm test` and `npm run lint` must both pass at the end.
