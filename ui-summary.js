import { el, money } from './ui-dom.js';
import { monthlyTotal } from './domain-billing.js';
function card(label, value, suffix, detail, icon) {
  return el('article', { class: 'stat-card' }, el('span', { class: 'stat-icon', 'aria-hidden': 'true' }, icon),
    el('p', { class: 'stat-label' }, label), el('p', { class: 'stat-value' }, value, el('small', {}, suffix)),
    el('p', { class: 'stat-detail' }, detail));
}
export function summary(subscriptions) {
  const monthly = monthlyTotal(subscriptions);
  const active = subscriptions.filter(s => s.status === 'active').length;
  return [card('Monthly spending', money(monthly), '/ mo', 'Annual plans averaged into a monthly equivalent', '↗'),
    card('Annual projection', money(monthly * 12), '/ yr', 'Your monthly equivalent, projected over a year', '◷'),
    card('Active subscriptions', String(active).padStart(2, '0'), 'services', 'Everything in one place', '▤')];
}
