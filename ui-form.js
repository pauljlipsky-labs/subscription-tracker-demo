import { el, mount } from './ui-dom.js';

export function prepareForm() {
  mount('billing-fields', el('div', { class: 'inline-fields' },
    el('label', {}, 'Price per payment ($)', el('input', {
      name: 'amount', type: 'number', min: '0.01', max: '100000',
      step: '0.01', required: '', placeholder: '20.00'
    })),
    el('label', {}, 'Billing cycle', el('select', { name: 'billingCycle' },
      el('option', { value: 'monthly' }, 'Monthly'),
      el('option', { value: 'annual' }, 'Annually')))));
}

export function parseSubscription(form) {
  const fields = new FormData(form);
  const name = String(fields.get('name')).trim();
  const amountCents = Math.round(Number(fields.get('amount')) * 100);
  const billingCycle = String(fields.get('billingCycle'));
  if (!name || !Number.isSafeInteger(amountCents) || amountCents <= 0) {
    throw new Error('Enter a name and a valid positive price.');
  }
  if (!['monthly', 'annual'].includes(billingCycle)) {
    throw new Error('Choose monthly or annual billing.');
  }
  return {
    id: crypto.randomUUID(), name, category: fields.get('category'),
    amountCents, billingCycle, nextBilling: fields.get('nextBilling'),
    status: 'active', icon: name[0], color: '#e9eddf'
  };
}
