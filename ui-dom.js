export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key.startsWith('on')) node.addEventListener(key.slice(2).toLowerCase(), value);
    else if (value !== undefined && value !== null) node.setAttribute(key, value);
  }
  node.append(...children.flat().filter(v => v !== null && v !== undefined));
  return node;
}
export function mount(id, content) {
  document.getElementById(id).replaceChildren(...[content].flat());
}
export function money(cents) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}
export function displayDate(iso) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(`${iso}T12:00:00`));
}
