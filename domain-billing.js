export function monthlyCost(subscription) {
  if (subscription.status !== 'active') return 0;
  return subscription.billingCycle === 'annual'
    ? subscription.amountCents / 12
    : subscription.amountCents;
}

export function monthlyTotal(subscriptions) {
  return subscriptions
    .filter(subscription => subscription.status === 'active')
    .reduce((total, subscription) => total + monthlyCost(subscription), 0);
}

export function categoryTotals(subscriptions) {
  const totals = new Map();
  for (const subscription of subscriptions) {
    const cost = monthlyCost(subscription);
    totals.set(subscription.category, (totals.get(subscription.category) || 0) + cost);
  }
  return [...totals.entries()]
    .filter(([, cost]) => cost > 0)
    .sort((a, b) => b[1] - a[1]);
}
