/**
 * ============================================================
 *  SITE SETTINGS — edit this ONE file to rebrand or re-domain.
 * ============================================================
 * After changing values here, run `npm run build` (or just push
 * to GitHub and Cloudflare Pages will rebuild automatically).
 */
export const SITE = {
  /** Brand name shown in the header, titles, footer and schema. */
  name: 'Auronyx Rest',

  /** Short tagline used on the home page and in meta descriptions. */
  tagline: 'Find your comfort, one better night at a time.',

  /** Default meta description (used when a page doesn't set its own). */
  description:
    'Auronyx Rest helps side sleepers choose more comfortable pillows, mattress toppers and bedroom setups with clear, research-based buying guides.',

  /**
   * Full public URL of the site — NO trailing slash.
   * Used for canonical URLs, the sitemap, robots.txt and Open Graph tags.
   * Examples: 'https://rest.auronyx.pro' or 'https://sleep.ambsolutions4u.com'
   */
  url: 'https://rest.auronyx.pro',

  /** Language / locale. */
  lang: 'en',
  locale: 'en_US',

  /** Parent / umbrella company. */
  parentCompany: 'AMB Solutions 4 U',

  /**
   * AMB_SOLUTIONS_URL — your main company website.
   * Leave as an empty string '' to show the company name WITHOUT a link.
   * Example: 'https://www.ambsolutions4u.com'
   */
  parentCompanyUrl: '',

  /** Public contact email (used on the Contact page and footer). */
  contactEmail: 'ambsolutions4u@gmail.com',

  /** Author name displayed on every article. */
  author: 'Auronyx Rest Editorial Team',

  /** Default social sharing image (in /public). 1200x630 PNG recommended. */
  ogImage: '/og-default.png',

  /**
   * Short disclosure shown in a box near the top of every article.
   * Keep it clear and conspicuous (FTC guidance).
   */
  affiliateDisclosureShort:
    'This page contains affiliate links. I may earn a commission if you purchase through them, at no extra cost to you.',

  /** Text used in the site footer. */
  footerDisclosure:
    'As an affiliate, we may earn a commission from qualifying purchases made through links on this site, at no extra cost to you.',

  /** Date shown on the Privacy Policy / legal pages. */
  legalLastUpdated: 'November 24, 2026',

  /**
   * Cloudflare Web Analytics token (optional, privacy-friendly).
   * Cloudflare dashboard → Analytics & Logs → Web Analytics → Add a site → copy the token.
   * Leave as '' to turn analytics OFF (no tracking script is loaded).
   */
  cloudflareAnalyticsToken: '',
};

/** Main navigation (label + path). */
export const NAV = [
  { label: 'Pillows', href: '/pillows/' },
  { label: 'Mattresses & Toppers', href: '/mattresses-toppers/' },
  { label: 'Sleep Guides', href: '/sleep-guides/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

/** Article categories. The key is used in each article's frontmatter (`category:`). */
export const CATEGORIES = {
  pillows: {
    label: 'Pillows',
    href: '/pillows/',
    description:
      'Loft, firmness and materials explained — how to find a pillow that keeps a side sleeper comfortable.',
  },
  'mattresses-toppers': {
    label: 'Mattresses & Toppers',
    href: '/mattresses-toppers/',
    description:
      'How mattress feel and toppers affect shoulder and hip comfort when you sleep on your side.',
  },
  'sleep-guides': {
    label: 'Sleep Guides',
    href: '/sleep-guides/',
    description:
      'Practical, non-medical tips for a calmer, more comfortable bedroom and bedtime routine.',
  },
};
