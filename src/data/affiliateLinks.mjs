/**
 * ============================================================
 *  AFFILIATE LINKS — fill these in ONE place.
 * ============================================================
 * In articles, product buttons are written as Markdown links whose
 * URL is a placeholder key, for example:
 *
 *     [Check current price](#AFFILIATE_LINK_ADJUSTABLE)
 *
 * At build time the key is looked up here:
 *   • If a URL is set  → the button links to it with
 *                        rel="sponsored nofollow noopener" target="_blank".
 *   • If it is ''      → a clearly marked, non-clickable "Link coming soon" button is shown.
 *
 * Paste your full affiliate URL between the quotes (from Amazon Associates,
 * a brand's own affiliate program, ShareASale, Impact, CJ, etc.).
 * To add a new slot, add a new key here and use #YOUR_KEY in an article.
 */
export const AFFILIATE_LINKS = {
  // Best Pillows for Side Sleepers
  AFFILIATE_LINK_ADJUSTABLE: '',
  AFFILIATE_LINK_MEMORY_FOAM: '',
  AFFILIATE_LINK_LATEX: '',
  AFFILIATE_LINK_DOWN: '',
  AFFILIATE_LINK_CONTOURED: '',

  // Mattress Toppers for Side Sleepers
  AFFILIATE_LINK_TOPPER_MEMORY_FOAM: '',
  AFFILIATE_LINK_TOPPER_LATEX: '',
  AFFILIATE_LINK_TOPPER_FIBER: '',
};
