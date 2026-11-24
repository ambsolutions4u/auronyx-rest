# Deploying Auronyx Rest (GitHub + Cloudflare Pages)

This guide takes you from the ZIP file on your Windows 10 PC to a live website at **https://rest.auronyx.pro**. It's free, and after setup, every change you push to GitHub goes live automatically.

**Time needed:** about 30–45 minutes the first time.

**You'll need:**
- Node.js and Git installed (see [README.md](./README.md), section 1)
- A free GitHub account — <https://github.com/signup>
- Your Cloudflare account where **auronyx.pro** is already managed

---

## Step 1 — Check that the site builds on your PC

Open **Command Prompt** and run:

```bat
cd C:\Sites\auronyx_rest
npm install
npm run build
```

You should see `Complete!` at the end. If so, you're ready.

## Step 2 — Confirm the domain in the config

Open `src/site.config.mjs` and check:

```js
url: 'https://rest.auronyx.pro',
parentCompanyUrl: '',   // optional: your AMB Solutions 4 U website, e.g. 'https://www.yourdomain.com'
```

If you decide to use a different address (see Step 8), change `url` to match **before** you go live — it's used for canonical links and the sitemap.

## Step 3 — Tell Git who you are (one time)

```bat
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

## Step 4 — Create an empty repository on GitHub

1. Sign in at <https://github.com>.
2. Click the **+** (top right) → **New repository**.
3. **Repository name:** `auronyx-rest` (any name works).
4. Choose **Private** or **Public** — both work with Cloudflare Pages.
5. **Do not** tick "Add a README", ".gitignore" or "license" (the project already has these).
6. Click **Create repository**. Keep the page open — it shows your repository URL, like `https://github.com/YOUR-USERNAME/auronyx-rest.git`.

## Step 5 — Push the project to GitHub

In Command Prompt, inside the project folder (replace `YOUR-USERNAME`):

```bat
cd C:\Sites\auronyx_rest
git init
git add .
git commit -m "Initial commit: Auronyx Rest"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/auronyx-rest.git
git push -u origin main
```

> If the folder already contains a `.git` folder (the ZIP may include one), `git init` is harmless — it just reuses it. If `git commit` says "nothing to commit", that's fine; continue with the next commands.

The first time you push, a GitHub sign-in window opens — sign in through your browser. Never paste passwords or tokens into project files.

Refresh the GitHub page: your files should now be there. The `.gitignore` file keeps `node_modules` and `dist` out of GitHub (Cloudflare builds those itself).

## Step 6 — Connect Cloudflare Pages to GitHub

1. Sign in at <https://dash.cloudflare.com>.
2. In the left menu go to **Workers & Pages** → **Create** (or **Create application**) → choose the **Pages** tab → **Connect to Git** / **Import an existing Git repository**.
   *(Cloudflare occasionally renames menu items; look for "Pages" and "Connect to Git".)*
3. Click **Connect GitHub**, authorize Cloudflare, and give it access to the `auronyx-rest` repository.
4. Select the repository and click **Begin setup**.
5. Fill in the build settings:

   | Setting | Value |
   |---|---|
   | Project name | `auronyx-rest` (this becomes `auronyx-rest.pages.dev`) |
   | Production branch | `main` |
   | Framework preset | **Astro** |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | *(leave blank)* |

6. *(Optional but recommended)* Under **Environment variables**, add `NODE_VERSION` = `22`. The project also includes a `.node-version` file that requests Node 22.
7. Click **Save and Deploy**. After a minute or two you'll get a link like `https://auronyx-rest.pages.dev` — open it to see your live site.

## Step 7 — Add your custom domain: rest.auronyx.pro

Because auronyx.pro's DNS is already on Cloudflare, this is quick:

1. In Cloudflare, open **Workers & Pages** → your **auronyx-rest** project → **Custom domains** tab.
2. Click **Set up a custom domain**.
3. Enter `rest.auronyx.pro` → **Continue**.
4. Cloudflare offers to create the DNS record for you (a `CNAME` from `rest` to `auronyx-rest.pages.dev`). Click **Activate domain**.
5. Wait a few minutes (occasionally longer) until the status shows **Active**. The SSL certificate (https) is set up automatically.
6. Visit **https://rest.auronyx.pro** 🎉

> **Tip:** Don't create the `rest` DNS record manually first — let the Pages "Custom domains" screen create it, otherwise the domain may not verify.

### Want the site on the main domain instead?

To use `auronyx.pro` itself (or `www.auronyx.pro`), add that name in the same **Custom domains** screen, then change `url` in `src/site.config.mjs` to match and push the change.

## Step 8 — Alternative: use your AMB Solutions 4 U domain

You can host this niche site under your company domain instead of auronyx.pro.

**Option A — Subdomain (recommended, simplest).** For example `sleep.yourcompanydomain.com`:

1. Make sure your company domain's DNS is managed in Cloudflare (if not: in Cloudflare click **Add a domain**, follow the steps, then change the nameservers at your domain registrar to the two Cloudflare nameservers shown).
2. In the Pages project → **Custom domains** → add `sleep.yourcompanydomain.com`.
3. In `src/site.config.mjs` set `url: 'https://sleep.yourcompanydomain.com'`, then commit and push.

**Option B — A path like `yourcompanydomain.com/sleep/`.** This is more advanced: Astro needs `base: '/sleep'` in `astro.config.mjs`, every internal link must include the base path, and your main website must route `/sleep/*` to this Pages project (for example with a Cloudflare Worker). Unless you specifically need this, use a subdomain — it's simpler and works great for SEO.

You can use both: keep `rest.auronyx.pro` as the main address and point additional domains to it with Cloudflare **Redirect Rules**. Just make sure `url` in the config matches your *main* address.

## Step 9 — (Optional) Turn on Cloudflare Web Analytics

1. Cloudflare dashboard → **Analytics & Logs** → **Web Analytics** → **Add a site**.
2. Enter `rest.auronyx.pro`. Cloudflare shows a snippet containing a **token**.
3. Copy just the token value into `src/site.config.mjs`:

   ```js
   cloudflareAnalyticsToken: 'paste-your-token-here',
   ```

4. Commit and push. Analytics are privacy-friendly and don't use cookies. (For Pages sites, Cloudflare may also offer a one-click "Enable" option under the project's **Metrics** tab — use either method, not both.)

---

## Updating your site (every time)

After editing articles, links or settings:

```bat
cd C:\Sites\auronyx_rest
npm run build
git add .
git commit -m "Describe what you changed"
git push
```

Cloudflare rebuilds and publishes automatically in a minute or two. Watch progress under **Workers & Pages → auronyx-rest → Deployments**. If a build fails, open it to see the log — the error usually names the file and line.

---

## Launch checklist

**Before launch**
- [ ] `url` in `src/site.config.mjs` matches your live domain
- [ ] `parentCompanyUrl` set to your AMB Solutions 4 U website (or left blank)
- [ ] Contact email correct
- [ ] Read the Privacy Policy, Affiliate Disclosure and Medical Disclaimer pages and adjust to your situation
- [ ] Replace `public/og-default.png` if you rebrand

**Affiliate programs**
- [ ] Apply to affiliate programs that fit the niche — for example Amazon Associates, brand programs from pillow/mattress/topper companies, and networks such as Impact, ShareASale/Awin or CJ. Many programs want to see a live site with real content first, which you'll have.
- [ ] Read each program's rules (some require exact disclosure wording or forbid showing prices)
- [ ] Paste approved links into `src/data/affiliateLinks.mjs`
- [ ] If you join Amazon Associates, keep the Amazon sentence on the Affiliate Disclosure page

**Disclosures**
- [ ] Disclosure box visible near the top of every article (automatic)
- [ ] Footer disclosure and Affiliate Disclosure page live (automatic)
- [ ] Only describe products truthfully — no invented testing, ratings or medical claims

**Search engines**
- [ ] Go to <https://search.google.com/search-console>, add a **Domain** property for `auronyx.pro` (verify with a DNS TXT record — Cloudflare can add it automatically) or a **URL-prefix** property for `https://rest.auronyx.pro/`
- [ ] In **Sitemaps**, submit: `https://rest.auronyx.pro/sitemap-index.xml`
- [ ] Optional: do the same in Bing Webmaster Tools (<https://www.bing.com/webmasters>) — it can import from Google Search Console
- [ ] Use **URL Inspection → Request indexing** for your home page and the five guides

**After launch**
- [ ] Check https://rest.auronyx.pro/robots.txt and /sitemap-index.xml load
- [ ] Test pages on your phone
- [ ] Share a guide link on social media to check the preview image
- [ ] Add new articles regularly and update existing ones (change `updatedDate`)
