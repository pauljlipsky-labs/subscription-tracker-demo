import { el, money } from './ui-dom.js';
import { categoryTotals, monthlyTotal } from './domain-billing.js';
export function insights(subscriptions) {
  const total = monthlyTotal(subscriptions);
  return [el('section', { class: 'insight-card' }, el('span', { class: 'insight-symbol' }, '✦'),
    el('h3', {}, 'Small subscriptions add up.'), el('p', {}, 'An annual plan can look small per month, but the whole payment lands at once. Check your upcoming cash payments below.')),
    el('section', { class: 'mini-card' }, el('h3', {}, 'Where it goes'),
      categoryTotals(subscriptions).map(([category, cents]) => el('div', {},
        el('div', { class: 'category-row' }, el('span', {}, category), el('span', {}, money(cents))),
        el('div', { class: 'bar' }, el('span', { style: `width:${total ? cents / total * 100 : 0}%` })))) )];
}
