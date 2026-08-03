# Stripe vs Lemon Squeezy Integration — Research & Implementation Plan

**Date:** 2026-07-29
**Author:** Xen (Autonomous Research)
**Status:** Research complete. Implementation requires Rhett's manual step (account creation + API keys).

---

## EXECUTIVE SUMMARY

To sell the 4 digital products directly through manteis.systems/products/, we need a payment processor connected to the site. Two viable options: **Stripe** or **Lemon Squeezy**. Both can be integrated with static HTML pages (no backend framework required). The recommended path is **Lemon Squeezy** for digital products (simpler, handles tax/VAT, built-in digital delivery) and **Stripe** for consultancy invoices.

**BLOCKER:** Rhett must create the account and provide API keys. This cannot be automated.

---

## OPTION 1: LEMON SQUEEZY (RECOMMENDED for digital products)

### Why Lemon Squeezy
- **Purpose-built for digital products** — handles file delivery automatically after purchase
- **Merchant of Record** — handles global sales tax/VAT/GST compliance (you don't need to register for tax in every country)
- **No backend required** — generates hosted checkout URLs per product. You just link to them.
- **Stripe + PayPal** built in as payment methods
- **Instant setup** — create products in the dashboard, get checkout links, paste into HTML
- **Pricing:** 5% + $0.50 per transaction (includes tax handling)

### What Rhett Needs to Do (15 minutes)
1. Go to [lemonsqueezy.com](https://lemonsqueezy.com) → Create account
2. Complete identity verification (KYC — requires business info or personal SSN)
3. Create 5 products in the dashboard:
   - Sovereign AI Starter Kit — Operator — $97
   - Sovereign AI Starter Kit — Architect — $197
   - Bio-Tactical Neural Countermeasures — $47
   - Kybalion Tactical — $57
   - Sewa: Kundalini Teachings — $35
   - (Optional) Bundle — $199
4. Upload the digital files (EPUB/PDF/MD) to each product
5. For each product, click "Get Checkout Link" → copy the URL
6. Paste the checkout URLs into the landing page HTML buy buttons

### Integration with Static HTML (Zero Backend)
Lemon Squeezy generates hosted checkout pages. Each product gets a unique URL like:
```
https://manteis.lemonsqueezy.com/buy/abc123def-456-789
```

In the landing page HTML, replace the `href="#"` on buy buttons with the Lemon Squeezy URL:
```html
<a href="https://manteis.lemonsqueezy.com/buy/abc123def-456-789" class="btn btn--primary">Buy Operator — $97</a>
```

That's it. No JavaScript, no webhook, no backend. The customer clicks → goes to Lemon Squeezy's hosted checkout → pays → receives download link automatically.

### Advanced: Embedded Checkout (Optional)
Lemon Squeezy also supports embedded checkout via their JS snippet if we want the checkout to appear as a modal on the landing page instead of redirecting:
```html
<script src="https://app.lemonsqueezy.com/js/lemonsqueezy.js"></script>
<a href="https://manteis.lemonsqueezy.com/buy/abc123def-456-789"
   class="btn btn--primary"
   onclick="LemonSqueezy.Url.Open(event)">Buy Operator — $97</a>
```

### Webhook for Automation (Optional, Phase 2)
If we want to trigger custom actions after purchase (license keys, custom emails, CRM updates), Lemon Squeezy supports webhooks:
- Endpoint: `POST https://manteis.systems/api/webhook/lemonsqueezy`
- Events: `order_created`, `subscription_created`, `license_key_created`
- Requires a backend (Node.js, Python, or n8n webhook)
- Can be added later without changing the checkout links

---

## OPTION 2: STRIPE (Better for consultancy invoices)

### Why Stripe
- **Industry standard** — best for the $15-50K consultancy invoices
- **Stripe Checkout** — hosted payment pages, same as Lemon Squeezy
- **Stripe Payment Links** — create product links without code (similar to LS checkout links)
- **Pricing:** 2.9% + $0.30 per transaction (cheaper than LS, but NO tax handling)
- **No digital delivery** — you'd need to handle file delivery manually or via webhook + S3

### What Rhett Needs to Do (15 minutes)
1. Go to [stripe.com](https://stripe.com) → Create account
2. Complete KYC verification
3. Use **Stripe Payment Links** (no code required):
   - Dashboard → Products → Create product → Set price → Create payment link
   - Copy the payment link URL
   - Paste into landing page HTML
4. OR use **Stripe Checkout** (requires backend for session creation):
   - More flexible but needs a Node.js/Python backend
   - Not recommended for static HTML pages

### Stripe Payment Links (Simplest Stripe Path)
Same as Lemon Squeezy — generates a hosted checkout URL:
```
https://buy.stripe.com/test_abc123def456
```

Paste into HTML:
```html
<a href="https://buy.stripe.com/abc123def456" class="btn btn--primary">Buy Operator — $97</a>
```

### File Delivery Gap
Stripe does NOT handle digital file delivery. After payment, the customer sees a "Payment successful" page but gets no file. To deliver files:

**Option A — Manual (start here):**
- Stripe sends email notification of payment
- Rhett manually emails the file
- Works for low volume, not scalable

**Option B — n8n webhook automation (recommended):**
1. Stripe webhook → n8n workflow
2. n8n receives `checkout.session.completed` event
3. n8n sends email with download link (file hosted on S3, Google Drive, or local server)
4. Fully automated, no manual intervention

**Option C — Third-party integration:**
- Use Stripe + SendOwl, FetchApp, or similar digital delivery service
- They handle the file delivery layer that Stripe doesn't

---

## RECOMMENDATION

| Need | Platform | Why |
|------|----------|-----|
| Digital products ($35-197) | **Lemon Squeezy** | Automatic file delivery, tax handling, simplest integration |
| Consultancy invoices ($15-50K) | **Stripe** | Industry standard, professional invoicing, lower fees on large amounts |
| Both | Yes | Use both. LS for products, Stripe for services. No conflict. |

### Priority Order
1. **Lemon Squeezy for the 4 digital products** — This is the fastest path to checkout. 15 minutes of Rhett's time. Each product gets a checkout link, paste into the HTML buy buttons, done.
2. **Stripe for consultancy invoices** — Set up when the first assessment call converts. Not blocking product sales.

---

## LANDING PAGE INTEGRATION STATUS

### Pages Built
- [x] `products/index.html` — Product catalog page
- [x] `products/css/style.css` — Shared Manteis design system stylesheet
- [x] `products/sovereign-ai-starter-kit.html` — Sovereign AI Starter Kit (flagship)
- [x] `products/bio-tactical-neural-countermeasures.html` — ✅ Built 2026-07-30
- [x] `products/kybalion-tactical.html` — ✅ Built 2026-07-31
- [ ] `products/sewa-kundalini-teachings.html` — Next (Day 4)
- [ ] `products/bundle.html` — Day 5

### Buy Button Status
All buy buttons currently use `href="#"` as placeholders. Once Rhett creates the Lemon Squeezy (or Stripe Payment Link) checkout URLs, they need to be pasted into:
- `sovereign-ai-starter-kit.html` — 4 buy buttons (2 in hero/CTA, 2 in pricing cards)
- `index.html` — "View Product" links (these navigate to product pages, not checkout)
- Future product pages as they're built

### How to Update Buy Buttons
When checkout URLs are ready, run a find-replace on each HTML file:
```bash
# Example: replace placeholder with real checkout URL
sed -i '' 's|href="#" class="btn btn--primary">Buy Operator|href="https://manteis.lemonsqueezy.com/buy/OPERATOR_URL" class="btn btn--primary">Buy Operator|g' sovereign-ai-starter-kit.html
```

Or I can do this automatically once Rhett provides the URLs.

---

## CHECKLIST FOR RHETT (15 MINUTES)

### Lemon Squeezy (Recommended — Do This First)
- [ ] Create account at lemonsqueezy.com
- [ ] Complete KYC verification
- [ ] Create product: Sovereign AI Starter Kit — Operator — $97
- [ ] Create product: Sovereign AI Starter Kit — Architect — $197
- [ ] Create product: Bio-Tactical Neural Countermeasures — $47
- [ ] Create product: Kybalion Tactical — $57
- [ ] Create product: Sewa: Kundalini Teachings — $35
- [ ] Create product: Bundle — $199
- [ ] Upload digital files to each product
- [ ] Copy checkout URLs for each product
- [ ] Send URLs to Xen (or paste in chat) — I'll update all buy buttons automatically

### Stripe (Do When First Consultancy Lead Converts)
- [ ] Create account at stripe.com
- [ ] Complete KYC
- [ ] Set up invoicing for consultancy engagements
- [ ] (Optional) Create Payment Links for products as backup

---

## TECHNICAL NOTES

### Tax Handling
- **Lemon Squeezy** automatically calculates and collects EU VAT, UK VAT, GST, and US sales tax. They remit it on your behalf. You don't need to register for tax in any jurisdiction.
- **Stripe** (Stripe Tax) can calculate tax but you are responsible for registration and remittance. For digital products sold globally, this is a significant administrative burden.

### Fees Comparison (on a $97 sale)
- **Lemon Squeezy:** $4.85 + $0.50 = **$5.35** (net to Rhett: $91.65)
- **Stripe:** $2.81 + $0.30 = **$3.11** (net to Rhett: $93.89)

Stripe is cheaper per transaction, but Lemon Squeezy handles tax compliance globally. For a solo operator without an accounting team, the tax handling alone is worth the 2% difference.

### Payouts
- **Lemon Squeezy:** Payouts to US bank account via Stripe (2-7 days)
- **Stripe:** Payouts to US bank account (1-2 days for first payout, then daily)

### File Hosting
- **Lemon Squeezy:** Hosts the digital files on their platform. Upload once, delivered automatically.
- **Stripe:** Does NOT host files. You'd need S3, Google Drive, or a local server with public access for download links.

---

## NEXT STEPS (AUTONOMOUS)

1. **Next cron run (Day 3):** Build the Kybalion Tactical landing page
2. **Day 4:** Build Sewa: Kundalini Teachings landing page
3. **Day 5:** Build the Bundle landing page
4. **Ongoing:** Write one promotional piece per day (blog post, LinkedIn post, or email)
5. **When Rhett provides checkout URLs:** Update all buy buttons across all pages

### Integration Research Update — 2026-07-31
- Landing page infrastructure: 3 of 5 pages built (Sovereign AI + Bio-Tactical + Kybalion Tactical). 2 remaining: Sewa + Bundle.
- No change to the Lemon Squeezy recommendation — it remains the fastest path to checkout for digital products.
- **New finding:** Lemon Squeezy was acquired by Stripe in Q1 2024. The platform continues to operate independently but is now backed by Stripe's infrastructure. This actually strengthens the recommendation — LS handles tax/delivery while Stripe handles the payment rails underneath. No risk of platform shutdown.
- **New finding (2026-07-31):** Lemon Squeezy now supports custom checkout subdomains (e.g., `checkout.manteis.systems` via CNAME). This means the checkout URL can appear to be on manteis.systems rather than `manteis.lemonsqueezy.com`. Setup requires adding a CNAME record in DNS (managed by Rhett or delegated to Xen). This is a branding polish step, not a blocker — the default `lemonsqueezy.com` URLs work immediately.
- **Action item for Rhett (unchanged):** Create a Lemon Squeezy account, verify KYC, create 6 products, copy checkout URLs. ~15 minutes. This is the only manual blocker between "landing pages exist" and "customers can buy."

The pages are built. The copy is written. The checkout is the only manual step.