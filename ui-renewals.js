import { el, money, displayDate } from './ui-dom.js';
import { upcomingRenewals } from './domain-renewals.js';

export function renewalCard(subscriptions, today) {
  const upcoming = upcomingRenewals(subscriptions, today);
  return el('section', { class: 'mini-card renewal-card' },
    el('h3', {}, 'Coming up next'),
    el('p', {}, 'Actual payments over the next 30 days.'),
    upcoming.length ? upcoming.slice(0, 5).map(payment =>
      el('div', { class: 'renewal-row' },
        el('div', {}, payment.name,
          el('small', {}, displayDate(payment.date)),
          payment.billingCycle === 'annual'
            ? el('span', { class: 'renewal-badge' }, 'ANNUAL RENEWAL')
            : null),
        el('span', { class: 'renewal-amount' }, money(payment.amountCents))))
      : el('p', {}, 'No payments due in the next 30 days.'));
}
