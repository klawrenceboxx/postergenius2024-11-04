import assert from 'node:assert';
import { test } from 'node:test';

// inline implementations mirroring src/utils/priceUtils.ts
const calculatePriceRange = (sizes) => {
  const prices = sizes.map((s) => s.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
};

const calculateTotalQuantity = (sizes) => {
  return sizes.reduce((t, s) => t + s.quantity, 0);
};

test('calculatePriceRange computes min and max', () => {
  const result = calculatePriceRange([{price:10},{price:20},{price:15}]);
  assert.deepStrictEqual(result, {min:10, max:20});
});

test('calculateTotalQuantity sums quantities', () => {
  const total = calculateTotalQuantity([{quantity:1},{quantity:2},{quantity:3}]);
  assert.equal(total,6);
});
