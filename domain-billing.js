export function monthlyCost(subscription) {
  return subscription.status === 'active' ? subscription.amountCents : 0;
}
export function monthlyTotal(subscriptions) {
  return subscriptions.reduce((total, subscription) => total + monthlyCost(subscription), 0);
}
export function categoryTotals(subscriptions) {
  const totals = new Map();
  for (const subscription of subscriptions) {
    totals.set(subscription.category, (totals.get(subscription.category) || 0) + monthlyCost(subscription));
  }
  return [...totals.entries()].filter(([, cost]) => cost > 0).sort((a, b) => b[1] - a[1]);
}
