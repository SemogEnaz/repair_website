# Repair website release checklist

## Publish the changes

Commit and push the reviewed changes to the branch connected to the existing Render static site.
Keep the current prices: back glass is $100 in both quality settings, battery is $80 Budget / $100 Premium.
The older pricing tests have been updated to match the latest committed pricing rather than changing the prices.

In Render, confirm:

| Setting | Value |
| --- | --- |
| Build command | `npm ci && npm run build` |
| Publish directory | `dist` |

The build generates a complete route table at `dist/render-routing.md` (and JSON at `dist/render-routes.json`).
Apply the listed rules in **Redirects/Rewrites**, above the existing `/* → /index.html` fallback.
Each clean page URL must serve its own `/page/index.html` file; it must not return the homepage first.
These files describe settings for the existing service. They do not create a new Render service or automatically change Dashboard settings.

After deployment, run `npm run verify:site`. It checks page HTML, canonical URLs, titles,
trailing-slash routes, sitemap and robots.txt without executing JavaScript.

Render reference: https://render.com/docs/redirects-rewrites

## Deploy the enquiry function

From the project root, deploy only the updated repair-request function:

```sh
firebase deploy --only functions:sendRepairRequest
```

The frontend now sends `isPremium`; the function must also be deployed for that quality choice
to appear in Telegram. Requests from an older frontend remain accepted and show quality as
“Not specified — confirm with customer” instead of guessing Budget.

Confirm that the frontend's existing `VITE_API_URL` still points to the repair-request function.
Keep the existing backend environment configuration; no new environment variables are needed.

After both releases, submit one real test enquiry using your own number. Confirm that:

- Telegram shows the chosen iPhone, services, Budget/Premium quality and correct estimate.
- The button shows “Sending…” during the request and the page confirms receipt afterwards.
- The WhatsApp alternative contains the same model, services, quality and estimate.

## Supply verified trust material

- Current Google star rating and review count, with the date checked.
- Two or three genuine reviews you want displayed, with their source links and public reviewer names.
- A real photo of you or the repair workspace that you are comfortable publishing.
- The exact battery-health and diagnostic features supported by your Premium batteries for each model.

The homepage already has an early Google reviews link and the 12-month repair warranty.
No rating, testimonial, photograph or extra diagnostics guarantee has been invented.
