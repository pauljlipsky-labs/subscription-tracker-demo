import { el, money, displayDate } from './ui-dom.js';
import { monthlyCost } from './domain-billing.js';
export function tableHeading(subscriptions, filter, onFilter) {
  return [el('div', { class: 'panel-heading' }, el('h2', {}, 'Your subscriptions', el('span', { class: 'count-badge' }, String(subscriptions.length)))),
    el('div', { class: 'filters' }, ['All', 'AI tools', 'Entertainment', 'Productivity', 'Storage'].map(category =>
      el('button', { class: `filter ${filter === category ? 'active' : ''}`, onClick: () => onFilter(category) }, category)))];
}
export function subscriptionTable(subscriptions, filter, onCancel) {
  const visible = subscriptions.filter(s => filter === 'All' || s.category === filter);
  if (!visible.length) return el('p', { class: 'empty' }, 'No subscriptions in this category yet.');
  return el('table', {},
    el('thead', {}, el('tr', {}, ['SERVICE', 'CATEGORY', 'PRICE', 'NEXT PAYMENT', ''].map(text => el('th', { scope: 'col' }, text)))),
    el('tbody', {}, visible.map(s => el('tr', { class: s.status === 'cancelled' ? 'cancelled' : '' },
      el('td', {}, el('div', { class: 'service' }, el('span', { class: 'service-icon', style: `background:${s.color || '#e9eddf'}` }, s.icon || s.name[0]),
        el('div', {}, s.name, el('small', {}, s.status === 'active' ? (s.billingCycle === 'annual' ? `${money(monthlyCost(s))} / mo equivalent` : 'Monthly subscription') : 'Cancelled')))),
      el('td', {}, el('span', { class: 'category-tag' }, s.category)),
      el('td', { class: 'price' }, money(s.amountCents), el('small', {}, s.billingCycle === 'annual' ? '/ yr' : '/ mo')),
      el('td', {}, s.status === 'active' ? displayDate(s.nextBilling) : '—'),
      el('td', {}, s.status === 'active' ? el('button', { class: 'row-action', 'aria-label': `Cancel ${s.name}`, onClick: () => onCancel(s.id) }, 'Cancel') : el('span', { class: 'quiet-label' }, 'INACTIVE'))))));
}
