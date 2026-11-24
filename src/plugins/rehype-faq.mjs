/**
 * Rehype plugin: turns the "Frequently asked questions" section of an article
 * into accessible <details> accordions. Each `### Question` and the content that
 * follows it (until the next ### or ##) becomes one collapsible item.
 * The Markdown files themselves are unchanged.
 */
const textOf = (node) =>
  node.type === 'text' ? node.value : (node.children || []).map(textOf).join('');

const isHeading = (node, level) => node.type === 'element' && node.tagName === `h${level}`;

export function rehypeFaq() {
  return (tree) => {
    const kids = tree.children;
    const start = kids.findIndex((n) => isHeading(n, 2) && /frequently asked questions/i.test(textOf(n)));
    if (start === -1) return;

    let end = kids.findIndex((n, i) => i > start && isHeading(n, 2));
    if (end === -1) end = kids.length;

    const section = kids.slice(start + 1, end);
    const items = [];
    let current = null;
    for (const node of section) {
      if (isHeading(node, 3)) {
        current = {
          type: 'element',
          tagName: 'details',
          properties: { className: ['faq-item'] },
          children: [
            { type: 'element', tagName: 'summary', properties: {}, children: [node] },
            { type: 'element', tagName: 'div', properties: { className: ['faq-body'] }, children: [] },
          ],
        };
        items.push(current);
      } else if (current) {
        current.children[1].children.push(node);
      } else {
        items.push(node);
      }
    }

    const wrapper = { type: 'element', tagName: 'div', properties: { className: ['faq-list'] }, children: items };
    kids.splice(start + 1, end - start - 1, wrapper);
  };
}
