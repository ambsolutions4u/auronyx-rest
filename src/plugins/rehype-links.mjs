/**
 * Rehype plugin used for all Markdown articles.
 *  - Turns placeholder links like (#AFFILIATE_LINK_XYZ) into affiliate buttons
 *    using src/data/affiliateLinks.mjs. Empty URLs render as "Link coming soon".
 *  - Adds target="_blank" + rel="noopener noreferrer" to other external links.
 */
import { AFFILIATE_LINKS } from '../data/affiliateLinks.mjs';
import { SITE } from '../site.config.mjs';

const PLACEHOLDER = /^#(AFFILIATE_LINK_[A-Z0-9_]+)$/;

function walk(node, fn) {
  if (node.type === 'element') fn(node);
  if (node.children) node.children.forEach((child) => walk(child, fn));
}

export function rehypeLinks() {
  return (tree, file) => {
    walk(tree, (node) => {
      if (node.tagName !== 'a') return;
      const href = String(node.properties?.href ?? '');
      const match = href.match(PLACEHOLDER);

      if (match) {
        const key = match[1];
        if (!(key in AFFILIATE_LINKS)) {
          console.warn(`[affiliate] Unknown key "${key}" in ${file?.path ?? 'markdown'} — add it to src/data/affiliateLinks.mjs`);
        }
        const url = (AFFILIATE_LINKS[key] || '').trim();
        if (url) {
          node.properties = {
            href: url,
            className: ['btn-affiliate'],
            rel: ['sponsored', 'nofollow', 'noopener'],
            target: '_blank',
            dataAffiliate: key,
          };
          node.children.push({ type: 'text', value: ' ↗' });
        } else {
          node.tagName = 'span';
          node.properties = {
            className: ['btn-affiliate', 'is-pending'],
            role: 'note',
            title: 'Affiliate link coming soon',
            dataAffiliate: key,
          };
          node.children = [{ type: 'text', value: 'Link coming soon' }];
        }
        return;
      }

      if (/^https?:\/\//i.test(href) && !href.startsWith(SITE.url)) {
        node.properties.target = '_blank';
        node.properties.rel = ['noopener', 'noreferrer'];
      }
    });
  };
}
