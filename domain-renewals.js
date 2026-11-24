function fromISO(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function toISO(date) {
  return date.toISOString().slice(0, 10);
}

// Keep the invoice's original day and clamp it for shorter months.
function occurrence(subscription, index) {
  const anchor = fromISO(subscription.nextBilling);
  const step = subscription.billingCycle === 'annual' ? 12 : 1;
  const first = new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth() + index * step, 1));
  const last = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0));
  first.setUTCDate(Math.min(anchor.getUTCDate(), last.getUTCDate()));
  return toISO(first);
}

export function paymentsBetween(subscriptions, startISO, endISO) {
  const payments = [];
  for (const subscription of subscriptions) {
    if (subscription.status !== 'active') continue;
    for (let index = 0; index < 1200; index += 1) {
      const date = occurrence(subscription, index);
      if (date > endISO) break;
      if (date >= startISO) payments.push({
        id: `${subscription.id}-${date}`, date,
        name: subscription.name, amountCents: subscription.amountCents,
        billingCycle: subscription.billingCycle || 'monthly'
      });
    }
  }
  return payments.sort((a, b) => a.date.localeCompare(b.date) || a.name.localeCompare(b.name));
}

export function upcomingRenewals(subscriptions, today, days = 30) {
  const end = fromISO(today);
  end.setUTCDate(end.getUTCDate() + days);
  return paymentsBetween(subscriptions, today, toISO(end));
}

export function cashForecast(subscriptions, today, months = 6) {
  const anchor = fromISO(today);
  return Array.from({ length: months }, (_, index) => {
    const first = new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth() + index, 1));
    const last = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0));
    const start = index === 0 ? today : toISO(first);
    const payments = paymentsBetween(subscriptions, start, toISO(last));
    return {
      month: new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' }).format(first),
      totalCents: payments.reduce((sum, payment) => sum + payment.amountCents, 0),
      payments
    };
  });
}
