import { el, money } from './ui-dom.js';
import { cashForecast } from './domain-renewals.js';

export function forecast(subscriptions, today) {
  const months = cashForecast(subscriptions, today);
  const largest = Math.max(...months.map(month => month.totalCents), 1);
  return [
    el('div', { class: 'forecast-heading' },
      el('div', {}, el('h2', {}, 'A clearer view of what’s coming.'),
        el('p', {}, 'Your next six months of actual subscription payments.')),
      el('span', {}, 'CASH FORECAST')),
    el('div', { class: 'forecast-bars' }, months.map(month =>
      el('div', { class: 'forecast-month' },
        el('div', { class: 'forecast-value' }, money(month.totalCents)),
        el('div', { class: 'forecast-bar', style: `height:${Math.max(month.totalCents / largest * 65, 5)}px`,
          role: 'img', 'aria-label': `${month.month}: ${money(month.totalCents)}` }),
        el('div', { class: 'forecast-month-label' }, month.month.toUpperCase()))))
  ];
}
