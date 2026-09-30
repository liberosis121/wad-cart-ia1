import { test } from "node:test";
import assert from "node:assert/strict";
import { cartTotal } from "../src/cart.js";

const OPTIONS = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 };
// vatRate 0 isolates the shipping rule from VAT.
const NO_VAT = { vatRate: 0, freeShipFrom: 500000, shipFee: 30000 };

const item = (price, qty) => ({ name: "Hàng", price, qty });

// The worked example from the slides and the README.
test("the example from the slides returns 467400", () => {
  const items = [
    { name: "Áo thun", price: 180000, qty: 2 },
    { name: "Sổ tay", price: 45000, qty: 1 },
  ];
  assert.equal(cartTotal(items, OPTIONS), 467400);
});

test("the result is a number, not a string", () => {
  assert.equal(typeof cartTotal([item(45000, 1)], OPTIONS), "number");
});

test("the total is rounded to the whole đồng", () => {
  // 10001 + 8% VAT 800.08 + shipping 30000 = 40801.08
  assert.equal(cartTotal([item(10001, 1)], OPTIONS), 40801);
});

// Shipping.
test("shipping is charged below the free-shipping threshold", () => {
  assert.equal(cartTotal([item(499999, 1)], NO_VAT), 529999);
});

test("shipping is free at exactly the threshold", () => {
  assert.equal(cartTotal([item(500000, 1)], NO_VAT), 500000);
});

test("shipping is free above the threshold", () => {
  assert.equal(cartTotal([item(250000, 3)], NO_VAT), 750000);
});

test("the threshold is compared with the subtotal before VAT", () => {
  // subtotal 480000 is below 500000 even though 480000 + VAT is not.
  assert.equal(cartTotal([item(480000, 1)], OPTIONS), 548400);
});

// Empty cart.
test("an empty cart returns 0, with no VAT and no shipping", () => {
  assert.equal(cartTotal([], OPTIONS), 0);
});

// Price validation.
test("a negative price throws RangeError", () => {
  assert.throws(() => cartTotal([item(-1, 1)], OPTIONS), RangeError);
});

test("a price that is not a number throws RangeError", () => {
  assert.throws(() => cartTotal([item(Number.NaN, 1)], OPTIONS), RangeError);
});

test("a price of 0 is allowed", () => {
  assert.equal(cartTotal([item(0, 1)], OPTIONS), 30000);
});

// Quantity validation.
test("a fractional qty throws RangeError", () => {
  assert.throws(() => cartTotal([item(20000, 1.5)], OPTIONS), RangeError);
});

test("a qty of 0 throws RangeError", () => {
  assert.throws(() => cartTotal([item(20000, 0)], OPTIONS), RangeError);
});

test("a negative qty throws RangeError", () => {
  assert.throws(() => cartTotal([item(20000, -2)], OPTIONS), RangeError);
});

test("a qty given as a string throws RangeError", () => {
  assert.throws(() => cartTotal([item(20000, "2")], OPTIONS), RangeError);
});

test("an invalid item after a valid one still throws RangeError", () => {
  const items = [item(20000, 1), item(-5, 1)];
  assert.throws(() => cartTotal(items, OPTIONS), RangeError);
});

// Inputs.
test("the inputs are not mutated", () => {
  const items = [item(180000, 2), item(45000, 1)];
  const options = { ...OPTIONS };
  const before = structuredClone({ items, options });
  cartTotal(items, options);
  assert.deepEqual({ items, options }, before);
});
