export function cartTotal(items, options) {
  if (items.length === 0) {
    return 0;
  }

  const { vatRate, freeShipFrom, shipFee } = options;

  const netTotal = items.reduce((accumulator, { price, qty }) => {
    if (!Number.isFinite(price) || price < 0) {
      throw new RangeError("price must be a non-negative number (price >= 0)");
    }
    if (!Number.isInteger(qty) || qty <= 0) {
      throw new RangeError("quantity (qty) must be a positive integer");
    }
    return accumulator + price * qty;
  }, 0);

  const computedVat = netTotal * vatRate;
  const appliedShipping = netTotal >= freeShipFrom ? 0 : shipFee;

  return Math.round(netTotal + computedVat + appliedShipping);
}
