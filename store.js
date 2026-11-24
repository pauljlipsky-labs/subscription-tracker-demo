import { seedSubscriptions } from './data.js';
const KEY = 'subtrack-annual-demo-v1';
export function loadSubscriptions() {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY));
    if (Array.isArray(stored) && stored.every(s => s.id && Number.isInteger(s.amountCents))) return stored.map(s => ({ ...s, billingCycle: s.billingCycle || 'monthly' }));
  } catch { /* A clean seed also works when browser storage is unavailable. */ }
  return structuredClone(seedSubscriptions);
}
export function saveSubscriptions(subscriptions) {
  try { localStorage.setItem(KEY, JSON.stringify(subscriptions)); }
  catch { /* Keep the current in-memory session usable. */ }
}
