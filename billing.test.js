import test from 'node:test';
import assert from 'node:assert/strict';
import { monthlyTotal, categoryTotals } from './domain-billing.js';
test('monthly spending excludes cancelled subscriptions', () => {
  assert.equal(monthlyTotal([{ category: 'AI tools', amountCents: 2000, status: 'active' }, { category: 'AI tools', amountCents: 1500, status: 'cancelled' }]), 2000);
});
test('category totals reconcile with monthly spending', () => {
  const rows = [{ category: 'AI tools', amountCents: 2000, status: 'active' }, { category: 'Storage', amountCents: 300, status: 'active' }];
  assert.equal(categoryTotals(rows).reduce((sum, [, value]) => sum + value, 0), monthlyTotal(rows));
});
