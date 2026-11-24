import { el } from './ui-dom.js';
export function header(onAdd) {
  return el('div', { class: 'page-heading' },
    el('div', {}, el('p', { class: 'eyebrow' }, 'LESS GUESSWORK. MORE CLARITY.'),
      el('h1', {}, 'Your subscriptions, in focus.'),
      el('p', { class: 'subtitle' }, 'A little visibility into everything you pay for.')),
    el('button', { class: 'primary', onClick: onAdd }, '+ Add subscription'));
}
