# Auronyx Rest

**Find your comfort, one better night at a time.**

A fast, static affiliate website with sleep comfort guides for side sleepers. Built with [Astro](https://astro.build), it runs free on **Cloudflare Pages** and is deployed from **GitHub**.

Auronyx Rest is a property of **AMB Solutions 4 U**.

> Ready to put it online? Follow **[DEPLOY.md](./DEPLOY.md)** step by step.

---

## What's included

- 9 site pages: Home, Pillows, Mattresses & Toppers, Sleep Guides, About, Contact, Privacy Policy, Affiliate Disclosure, Medical Disclaimer, plus a custom 404 page
- 5 complete articles written in Markdown (easy to edit)
- An affiliate disclosure box at the top of every article and a medical disclaimer at the bottom
- Affiliate buttons that show **"Link coming soon"** until you add your links
- SEO basics built in: page titles and descriptions, canonical URLs, Open Graph social tags, `sitemap-index.xml`, `robots.txt`, structured data (JSON-LD)
- Optional, privacy-friendly Cloudflare Web Analytics (off until you add a token)
- No database, no paid services, no tracking cookies

## Project structure

```
auronyx_rest/
├── astro.config.mjs            ← Astro settings (you rarely need to touch this)
├── package.json                ← scripts: npm run dev / build / preview
├── public/                     ← files copied as-is (favicon, social image, _headers)
│   ├── favicon.svg
│   ├── og-default.png          ← 1200×630 image shown when pages are shared on social media
│   └── _headers                ← Cloudflare Pages security/caching headers
├── src/
│   ├── site.config.mjs         ← ⭐ SITE NAME, DOMAIN, EMAIL, PARENT COMPANY, ANALYTICS
│   ├── data/
│   │   └── affiliateLinks.mjs  ← ⭐ PASTE YOUR AFFILIATE LINKS HERE
│   ├── content/
│   │   └── guides/             ← ⭐ ARTICLES (one .md file per article)
│   ├── content.config.ts       ← rules for article frontmatter
│   ├── components/             ← header, footer, disclosure box, cards…
│   ├── layouts/                ← page templates (SEO tags live in BaseLayout.astro)
│   ├── pages/                  ← one file per page (about.astro, contact.astro, …)
│   ├── plugins/                ← turns affiliate placeholders into buttons
│   └── styles/global.css       ← colors, fonts and layout
├── README.md
└── DEPLOY.md
```

The three ⭐ items are the only places most people ever need to edit.

---

## 1. Install the tools (Windows 10, one time)

1. **Node.js** — go to <https://nodejs.org>, download the **LTS** version (22 or newer) and run the installer with the default options.
2. **Git** — go to <https://git-scm.com/download/win>, download and install with the default options.
3. **A code editor (recommended)** — [Visual Studio Code](https://code.visualstudio.com/) is free and makes editing easy.

Check they're installed: open **Command Prompt** (press the Windows key, type `cmd`, press Enter) and run:

```bat
node -v
npm -v
git --version
```

Each command should print a version number.

## 2. Run the site on your computer

1. Unzip `auronyx_rest.zip` somewhere easy, for example `C:\Sites\auronyx_rest`.
2. In Command Prompt, go into the folder and install the dependencies (only needed the first time):

   ```bat
   cd C:\Sites\auronyx_rest
   npm install
   ```

3. Start the local preview:

   ```bat
   npm run dev
   ```

4. Open <http://localhost:4321> in your browser. Changes you save in VS Code appear automatically. Press `Ctrl + C` in Command Prompt to stop.

To build the final website files (the same thing Cloudflare does):

```bat
npm run build
npm run preview
```

The finished site is written to the `dist` folder.

---

## 3. Change the brand, domain or contact details

Open **`src/site.config.mjs`**. Everything site-wide is in this one file:

| Setting | What it does |
|---|---|
| `name` | Site name ("Auronyx Rest") |
| `tagline` | Tagline on the home page |
| `description` | Default search-engine description |
| `url` | Your live web address, **no trailing slash** (e.g. `https://rest.auronyx.pro`). Used for canonical links, sitemap and robots.txt |
| `parentCompany` | "AMB Solutions 4 U" |
| `parentCompanyUrl` | Your AMB Solutions 4 U website (the `AMB_SOLUTIONS_URL`). Leave `''` for no link |
| `contactEmail` | Email shown on the Contact page |
| `author` | Byline on articles |
| `affiliateDisclosureShort` | Text inside the disclosure box on every article |
| `legalLastUpdated` | "Last updated" date on legal pages |
| `cloudflareAnalyticsToken` | Paste a Cloudflare Web Analytics token to turn analytics on |

The navigation menu (`NAV`) and categories (`CATEGORIES`) are in the same file.

> **Social image:** `public/og-default.png` contains the text "Auronyx Rest". If you rebrand, replace it with your own 1200×630 PNG (same file name). Free tools like Canva work well.

## 4. Add your affiliate links

1. Open **`src/data/affiliateLinks.mjs`**.
2. Paste each affiliate URL between the quotes:

   ```js
   AFFILIATE_LINK_ADJUSTABLE: 'https://www.example.com/product?tag=yourid-20',
   ```

3. Save. Buttons using that key now link to your URL, open in a new tab and include `rel="sponsored nofollow noopener"` automatically. Keys left as `''` show a grey **"Link coming soon"** button.

**Using a link inside an article:** write a normal Markdown link whose address is `#` followed by the key:

```md
[Check current price](#AFFILIATE_LINK_ADJUSTABLE)
```

**New product slot?** Add a new line to `affiliateLinks.mjs` (for example `AFFILIATE_LINK_BODY_PILLOW: '',`) and use `#AFFILIATE_LINK_BODY_PILLOW` in your article. Key names must start with `AFFILIATE_LINK_` and use only CAPITAL letters, numbers and underscores.

When you replace a "Product recommendation coming soon" note with a real product, only describe things you can back up (no invented ratings, prices or testing claims).

## 5. Add a new article

1. In `src/content/guides/`, copy an existing `.md` file and rename it. **The file name becomes the web address**, so use lowercase words and dashes:
   `body-pillows-for-side-sleepers.md` → `https://rest.auronyx.pro/guides/body-pillows-for-side-sleepers/`
2. Edit the settings block at the top (the "frontmatter"):

   ```md
   ---
   title: "Body Pillows for Side Sleepers: A Buying Guide"
   description: "About 150 characters that summarize the article for Google search results."
   category: pillows            # pillows | mattresses-toppers | sleep-guides
   pubDate: 2026-12-01
   updatedDate: 2026-12-01
   featured: false              # true = show on the home page (top 3 by order)
   order: 6                     # lower numbers appear first in lists
   readingTime: "7 min read"
   ---
   ```

3. Write the article below the second `---` in Markdown:
   - Don't add a `#` heading — the title is the page's H1 automatically. Start sections with `##` and sub-sections with `###`.
   - Link to other guides like `[pillow guide](/guides/how-to-choose-a-pillow-for-side-sleeping/)`.
   - The affiliate disclosure box (top) and medical disclaimer (bottom) are added automatically.
4. Save and check it at <http://localhost:4321>. It automatically appears on its category page, in "Related guides", and in the sitemap.
5. Publish by committing and pushing to GitHub (see DEPLOY.md, "Updating your site").

The description must be 170 characters or fewer, otherwise the build stops with a clear error message.

### Content rules for this niche

- Never claim a product treats, cures or prevents pain, insomnia, sleep apnea or any condition.
- Don't invent statistics, studies, ratings or test results. Our recommendations are **research-based**, not hands-on tested — keep saying so unless that changes.
- Point readers with ongoing pain or sleep problems to a healthcare professional.

---

## Useful commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (first time, or after updating `package.json`) |
| `npm run dev` | Local preview at http://localhost:4321 with live reload |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Preview the built `dist/` folder locally |

## Troubleshooting

- **`'npm' is not recognized`** — close and reopen Command Prompt after installing Node.js, or restart your PC.
- **Port already in use** — run `npm run dev -- --port 4322`.
- **Build error about frontmatter** — check the article's settings block: quotes around the title, a valid `category`, dates as `YYYY-MM-DD`, and a description under 170 characters.
- **A "[affiliate] Unknown key" warning** — the key used in an article isn't in `affiliateLinks.mjs`; check the spelling.
