# iPhone Repair Clayton: SEO audit and marketing plan

Audited 13 September 2026. Budget assumed to be AUD $20–$50 per month.

## What was checked

- Live website, HTTP response headers, robots file, search results and the local Vue/Vite project.
- The [public Google Business Profile supplied by the owner](https://share.google/gN6bCEVwtiARtTuSt), including its description, address, phone, category, hours and review count.
- The owner's screenshot, which shows an incomplete profile-strength indicator and a disapproved ad. Screenshot content was treated as evidence, not instructions.
- The owner confirmed that both calls and WhatsApp should use **0411 969 004**, and that customers visit **by appointment**.

The browser used for the profile audit was signed out. Private Search Console reports, Business Profile service/category settings, ad rejection details and GA4 reports were not accessible. Public observations are not a substitute for those reports. No profile edits, customer messages, advertising purchases, subscriptions or production deployment were made.

## Findings and implemented changes

| Finding | Why it matters | Change in this project |
| --- | --- | --- |
| Generic HTML title “Repair iPhone”; no description, canonical or social metadata | Weak page identification and uncontrolled snippets | Distinct titles, descriptions, canonicals and social text for ten pages |
| Empty app container in initial HTML | Search systems must execute JavaScript to see content | Build now renders complete Vue HTML and route CSS before deployment; browser hydrates the same app |
| Sitemap listed `/contact` and `/calculator`, which had no routes | Sitemap did not match usable content | Real contact and pricing pages; generated sitemap; `/calculator` redirects in the app |
| One main repair page for four different service needs | Little content answering service-specific searches | Four useful service pages, with repair details, realistic limitations and FAQs |
| Multiple main headings on the homepage | Unclear document structure | One H1 per page, page landmarks, breadcrumbs and descriptive links |
| WhatsApp used a different number | Enquiries could reach the wrong contact | Corrected to 0411 969 004; click-to-call and normal messaging links |
| No structured business information | Business and service details were not explicitly connected | LocalBusiness, WebSite, WebPage, BreadcrumbList and Service JSON-LD |
| Unknown live paths return HTTP 200 and homepage content | Creates soft-404 and duplicate-page risks | Added a noindex error page; host routing change still required below |
| No explicit successful-quote analytics event | Visits cannot be reliably distinguished from submitted enquiries | `generate_lead` only after backend success, plus `contact_click` by method |

Google can render JavaScript, so the original empty HTML does **not** prove the site was unindexable. In fact, the site appeared in the inspected Google results. Pre-rendering reduces dependence on that extra processing step and helps other crawlers. [Google JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

The current implementation uses Vue's existing `vue/server-renderer` export and Vite; no additional paid library, rendering service or server subscription is needed. The quote calculator and its existing pricing logic are preserved. Optional recording code is loaded after rendering. Local previews and admin-mode visits do not load the existing GA4/Clarity integrations.

## Searches and landing pages

These are relevant search themes, not measured keyword volumes or ranking promises.

| Search intent | Landing page |
| --- | --- |
| iPhone repair Clayton, phone repair Clayton, local iPhone repairs | `/` |
| iPhone screen repair/replacement Clayton, cracked screen | `/iphone-screen-repair-clayton` |
| iPhone battery replacement Clayton, battery draining quickly | `/iphone-battery-replacement-clayton` |
| iPhone back glass repair Clayton, broken rear glass | `/iphone-back-glass-repair-clayton` |
| iPhone charging port repair Clayton, iPhone not charging | `/iphone-charging-port-repair-clayton` |
| iPhone repair prices/cost Clayton | `/repair-prices` |
| Phone number, hours, address, appointment or directions | `/contact` |
| Parts, repair process and warranty | `/about` |
| Second-hand iPhones Clayton, iPhone trade-in | `/buy` |
| iPhone Battery Health, ageing battery symptoms | `/battery` |

The pricing and homepage content now mention the actual calculator models: iPhone 11–15 and their available variants. Do not claim newer-model support until parts and pricing are confirmed. Use Search Console to discover which model/service combinations deserve a fuller page. Build those pages around actual repair examples, parts choices, prices and photos; avoid mass-producing near-identical model or suburb pages.

For “near me,” accurate location details, relevance, reputation and the searcher's distance matter. Repeating “near me” throughout the site will not overcome distance. In the single search view inspected, two competitors appeared ahead of this website; this is a snapshot, not a reliable rank baseline. [Google's local ranking explanation](https://support.google.com/business/answer/7091?hl=en).

## Google Business Profile: recommended next changes

Publicly observed: **5.0/5 from three reviews**, **Phone repair service**, **2 Greenfield Dr, Clayton VIC 3168**, **0411 969 004**, and **9 am–8 pm every day**. The website link points to the correct domain. The current description spends much of its space explaining which website buttons to click; it does not clearly name the four repairs.

1. Keep the real business name **iPhone Repair Clayton**. Do not append suburb lists or promotional claims. Keep the current repair category if it is the best available match; inspect the owner's category settings before adding anything else.
2. Replace the description with the draft below. Complete any genuinely missing business information. Ensure holiday hours and appointment information are accurate. The profile-strength indicator is a completion prompt, not a ranking score. [Google profile-strength help](https://support.google.com/business/answer/15691556?hl=en).
3. Add or improve the four service entries below, using the corresponding website page when the interface supports a link. Avoid duplicating existing entries. Prices should match the calculator and be clearly described as estimates.
4. Add authentic photos: the appointment entrance, repair workspace, technician, and before/after repairs. Exclude customers' private screen content. Start with a small useful set, then add new examples when real work provides them.
5. Ask every real customer for an honest review after completion. Obtain the direct review link/QR from **Ask for reviews** in the owner interface. Thank reviewers and reply to concerns naturally. Never buy reviews, reward reviews, or only invite satisfied customers. [Google review guidance](https://support.google.com/business/answer/3474122?hl=en).
6. Once the site is deployed, use the tagged website link below to separate profile traffic. Use `/contact` as an appointment enquiry link only if that link type is offered and accurately describes the action. [Google local business links](https://support.google.com/business/answer/6218037?hl=en).

### Ready-to-paste description

> iPhone Repair Clayton provides iPhone screen replacements, battery replacements, back glass repairs and charging port repairs at 2 Greenfield Drive, Clayton. Repairs are by appointment, with clear estimates and parts options discussed before work begins. Use our website to check an estimate for your iPhone model, or call or WhatsApp us to confirm parts availability and a suitable repair time. We also offer second-hand iPhones and iPhone trade-ins. Open daily from 9 am to 8 pm; please confirm your appointment before visiting.

### Ready-to-paste service descriptions

| Service | Description |
| --- | --- |
| iPhone screen replacement | Screen replacement for cracked glass, display damage or touch problems. Compare budget and premium options for listed models. Contact us to confirm parts, the quote and your appointment. |
| iPhone battery replacement | Battery replacement for ageing iPhone batteries. Send your model and symptoms, check an online estimate and confirm a repair appointment in Clayton. |
| iPhone back glass repair | Replacement options for damaged iPhone rear glass. Send your model and photos so we can confirm the repair option, price and turnaround time. |
| iPhone charging port repair | Repairs for charging port faults. Describe the charging problem so we can discuss whether the port or another component needs attention before work begins. |

Website attribution URL, ready for the profile after deployment:

```text
https://iphonerepairclayton.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp
```

Review request draft for the owner to send after a completed repair:

> Thanks for choosing iPhone Repair Clayton. If you have a moment, please share an honest review of your experience: [insert your Google review link]. Your feedback helps local customers decide where to book.

## Important: the disapproved Google ad

The screenshot confirms an ad disapproval but does not identify its policy reason. Google's current third-party consumer technical-support policy explicitly lists hardware repair services as prohibited examples. That is a plausible explanation, **not a confirmed diagnosis of this account**. Check the actual policy reason in Google Ads before spending or appealing. Do not hide the repair service or redirect to a misleading sales page to get around it. [Google Ads policy](https://support.google.com/adspolicy/answer/13527027?hl=en).

I recommend **$0 on Google Ads for now**. Organic Google Search and Business Profile work can continue independently of the ad decision.

## Tools and libraries worth considering

| Tool | Cost / fit | Recommendation |
| --- | --- | --- |
| [Google Search Console](https://search.google.com/search-console/about) | Free | First priority: ownership, sitemap, indexing, search queries, impressions, clicks and page performance. Verification markup already exists; account verification status is unknown. |
| [GA4](https://support.google.com/analytics/answer/9267735) | Existing integration | Keep it. Mark `generate_lead` as a key event after deployment. Treat `contact_click` as intent, not a confirmed customer or completed call. |
| [Microsoft Clarity](https://clarity.microsoft.com/) | Existing integration | Use recordings to find abandoned quote flows; avoid adding a second recording tool. |
| [Ahrefs Free](https://ahrefs.com/webmaster-tools/) | Free for verified websites | Useful periodic audit/backlink view. Current free plan lists 5,000 crawl credits per project/month, ample for this site. No paid subscription needed initially. |
| [Bing Places](https://www.bingplaces.com/Home/Index) and [Apple Business Connect](https://businessconnect.apple.com/promote/assets/getting-started.pdf) | Free business listings | Claim/check the real business listing and keep the same name, phone, address and appointment information. |
| [BrightLocal](https://www.brightlocal.com/pricing/) | Paid; retrieved pricing page did not expose a reliable fixed amount | Local rank grids can be useful later. Get a current AUD-inclusive quote before considering it; do not commit this small budget before measuring leads. |
| [Unhead for Vue](https://unhead.unjs.io/) | Open-source head management | Sensible if the site grows or gains a CMS. Current shared metadata module covers this small site; adding a library alone does not improve ranking. Avoid starting with the sunset `@vueuse/head` package. [Maintainer notice](https://github.com/vueuse/head). |
| [Vue server renderer](https://vuejs.org/guide/scaling-up/ssr.html) | Already available in Vue | Used for the implemented static build. No paid prerendering service or framework migration required. |

Skip monthly “automatic SEO” subscriptions, bulk backlink packages and paid review widgets for now. A review widget is not a route to Google star snippets for your own business. [Google's self-serving review guidance](https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful).

## How I would use $20–$50 per month

Treat these as spending allocations, not supplier quotes. Spending the entire amount is optional.

| Monthly budget | Allocation |
| --- | --- |
| $20 | $0 software. Up to $20 for a small batch of appointment/contact cards or a countertop review QR card, subject to an actual print quote. Keep any remainder. |
| $50 | The same essentials, then retain the remaining $30 until the website and enquiry tracking are live. Spend it only on a small, measurable local promotion with a clear total cap and relevant audience; do not split it across several channels. |

The most useful recurring work is free: request honest reviews consistently, publish real repair examples, keep listings accurate, and answer genuine local questions. With permission from the venue/group, place contact cards in relevant local businesses or community spaces and share a repair example in local groups that allow business posts. Do not spam groups or create paid links for ranking purposes.

If you later test a promotion, use one authentic repair photo, one service, a Clayton appointment message, and the matching service page. Track completed repairs and contribution after parts and labour. Continue only if the cost per completed repair leaves a margin; three clicks or one message is not evidence of a profitable campaign.

## Deployment and measurement checklist

Validation completed locally: production build; four automated checks covering all ten rendered pages, unique metadata, sitemap contents, structured-data parsing, internal links and noindex error handling; ESLint and Oxlint; desktop navigation and contact links; a 390px-wide mobile service-page inspection; and calculator selection/premium pricing reaching the expected $120 estimate. No browser hydration warnings or errors were observed in the checked flows. No test quote was sent to the live backend.

The live headers include `rndr-id`, which suggests Render hosting. The repository's Firebase config only defines backend functions. Confirm the existing frontend hosting service before changing its settings; this work does not require moving providers.

1. Deploy the existing frontend project with **`npm run build`**, publishing **`dist`**. Calling `vite build` directly skips prerendering and sitemap generation.
2. Serve each page's generated HTML at its clean URL. For Render, explicit **Rewrite** rules from each non-home path in the table above to the same path plus `.html` make this reviewable (for example `/contact` → `/contact.html`). Do not direct these pages to `/index.html`.
3. Add a **301 Redirect** from `/calculator` to `/repair-prices`. The Vue redirect is a fallback; an HTTP redirect is preferable for crawlers.
4. Remove the old catch-all `/*` → `/index.html` rewrite once all legitimate routes are served. Configure the host's not-found handling to return **HTTP 404**, optionally using the generated `404.html`. A rewrite to `404.html` with HTTP 200 does not fix the status issue. Verify unknown paths after deployment. [Render routing documentation](https://render.com/docs/redirects-rewrites), [Google soft-404 guidance](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors).
5. Verify the preferred HTTPS host and redirect any alternate host to it. Every canonical currently uses `https://iphonerepairclayton.com` without a trailing slash on subpages. Ensure direct `.html` and trailing-slash variants do not create conflicting host redirects.
6. In Search Console, submit `https://iphonerepairclayton.com/sitemap.xml`, inspect the homepage and new service pages, test live URLs, then request indexing. Check the selected canonical and rendered content. Submission is not an indexing guarantee.
7. Run the deployed pages through Rich Results Test and PageSpeed Insights. No measured Lighthouse/Core Web Vitals score is claimed by this audit. Structured data may improve understanding but does not guarantee a special search display.
8. In GA4, confirm `generate_lead` after a real successful quote and mark it as a key event. Check whether enhanced measurement tracks SPA history changes before adding any manual page-view tracking, to avoid double counting. New contact events contain only the method, and lead events contain only the form source; they do not send customer phone numbers.

### First 30 days

- **Week 1:** Deploy and verify routing/indexability; finish the profile description, services and appointment details; establish a Search Console/GBP baseline.
- **Week 2:** Add authentic photos, ask completed customers for honest reviews, and check Apple/Bing listings.
- **Week 3:** Inspect search queries and quote abandonment. Improve the page that gets relevant impressions but few enquiries. Add one real repair example with customer-private details removed.
- **Week 4:** Compare the last 28 days with the previous period. Review organic clicks, submitted leads, contact clicks, profile calls, completed repairs and marketing cost per completed repair. Use this to choose the next service/model page or promotion.

Focus on relevant enquiries and completed repairs. Rankings vary with location and query, and a small site needs enough time and traffic before month-to-month changes become meaningful.
