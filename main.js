import { loadSubscriptions, saveSubscriptions } from './store.js';
import { header } from './ui-header.js';
import { summary } from './ui-summary.js';
import { tableHeading, subscriptionTable } from './ui-table.js';
import { insights } from './ui-insights.js';
import { prepareForm, parseSubscription } from './ui-form.js';
import { mount } from './ui-dom.js';
import { DEMO_TODAY } from './data.js';
import { forecast } from './ui-forecast.js';
import { renewalCard } from './ui-renewals.js';
let subscriptions = loadSubscriptions();
let filter = 'All';
const dialog = document.getElementById('subscription-dialog');
const form = document.getElementById('subscription-form');
function render() {
  mount('page-header', header(() => dialog.showModal()));
  mount('summary', summary(subscriptions));
  mount('table-header', tableHeading(subscriptions, filter, value => { filter = value; render(); }));
  mount('subscription-list', subscriptionTable(subscriptions, filter, id => {
    subscriptions = subscriptions.map(s => s.id === id ? { ...s, status: 'cancelled' } : s);
    saveSubscriptions(subscriptions);
    render();
  }));
  mount('insights', [...insights(subscriptions), renewalCard(subscriptions, DEMO_TODAY)]);
  mount('cash-forecast', forecast(subscriptions, DEMO_TODAY));
}
document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
form.addEventListener('submit', event => {
  event.preventDefault();
  try {
    subscriptions = [...subscriptions, parseSubscription(form)];
    saveSubscriptions(subscriptions);
    form.reset();
    document.getElementById('form-error').textContent = '';
    dialog.close();
    render();
  } catch (error) { document.getElementById('form-error').textContent = error.message; }
});
prepareForm();
render();
