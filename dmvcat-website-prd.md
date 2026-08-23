# PRD: $DMVCAT Website

**Owner:** [don c]
**Status:** Draft for build
**Target:** Production-ready static site, launch-day live

---

## 1. Summary

A single-page website for $DMVCAT, a meme coin token launched on https://meteora.ag. The site's job is to convert visitors into buyers within seconds, give the community a home for shared assets (logo, memes, links), and carry the legal/risk disclosures needed to reduce the team's exposure. It is not a trading dashboard — live price and chart data come from an embedded DexScreener widget, not custom infrastructure.

## 2. Goals

- Get a new visitor from landing to "I understand what this is and where to buy" in under 10 seconds.
- Give existing holders a place to grab logo/meme assets and community links without asking in chat.
- Carry clear, persistent risk/legal disclaimers so the marketing tone (jokey, deadpan) doesn't read as a financial promise.
- Ship as a static site with no backend, so it's cheap to host, fast to load, and has no attack surface for exploits or data breaches.

## 3. Non-Goals

- No wallet-connect, no in-site swap widget, no custody of user funds. Buying happens on https://meteora.ag/ dex an aggregator via an outbound link.
- No user accounts, no email capture, no CRM.
- No custom price charts — embed DexScreener rather than build one.
- No token-gating or NFT integration in v1.

## 4. Target Users

| User | Need |
|---|---|
| First-time visitor from a shared link/tweet | Understand the joke, see the price is real, find the buy link fast |
| Existing holder | Grab meme templates, logo files, check the chart, find social links |
| Journalist/skeptic doing 10 seconds of due diligence | Find contract address, disclaimers, and confirm this isn't impersonating something else |

## 5. Information Architecture (single page, anchor-linked sections)

1. **Hero** — logo, name, ticker, tagline, primary CTA ("Buy on jupiter")
2. **Now Serving** — live ticket-counter motif; embedded DexScreener price/chart widget underneath
3. **Mascot / Lore** — the bit, in under 100 words
4. **Contract Address block** — copy-to-clipboard CA, chain, explicit "verify before you trust any other CA" warning
5. **How to Buy** — 3-step numbered guide (wallet → jupiter link → confirm)
6. **Meme Gallery** — grid of downloadable community assets
7. **FAQ** — from the launch pack, verbatim disclaimers included
8. **Footer** — social links (X, Telegram), risk disclosure, no-warranty statement

## 6. Functional Requirements

### 6.1 Hero
- Logo displayed at native resolution, no upscale blur.
- CTA button links directly to the pump.fun token page (opens new tab).
- CA is NOT only in the hero — must also appear in its own dedicated, copy-pasteable block (see 6.4) since hero text is the most likely thing to be screenshotted without the CA.

### 6.2 Now Serving / Price Section
- Embed DexScreener's official embed iframe for the token pair once liquidity exists .
- Fallback state (no pair yet): static "Now Serving A-047" ticket display (already designed), no live data claims.
- Do not build or fake a custom price chart. Only show real, sourced data or clearly-labeled placeholder/joke content — never a chart that looks real but isn't.

### 6.3 Mascot / Lore
- Static content block, no functional requirements beyond responsive text wrap.
- Copy must stay in "joke/character" register — no language implying price predictions, guarantees, or team promises (see Section 8).

### 6.4 Contract Address Block
- Large monospace CA display + one-click "Copy" button with a visible "Copied" confirmation state.
- Persistent warning text: *"Only trust the contract address shown here or in our pinned Telegram/X post. We do not DM first. Verify before every transaction."*
- This block should be one of the first things indexed/visible — scammers cloning meme sites with a swapped CA is the single most common attack vector; make it hard for a copy-site to look authoritative without also copying this warning.

### 6.5 How to Buy
- Numbered 3-step list, plain language, no jargon assumed (viewer may be new to crypto): get a Solana wallet → fund it → paste CA into jupiter or meteora.
- Link out to jupiter link, not an embedded swap.

### 6.6 Meme Gallery
- Static grid, images served from `/assets/memes/`, each with a direct-download link.
- No user upload functionality in v1 (avoids moderation/legal/storage complexity). New assets added by the team via a content update, not a CMS.

### 6.7 FAQ
- Reuse FAQ copy from the launch pack.
- The "not financial advice" and "no team promises" answers must NOT be editable/removable without sign-off — flag in code comments as legally load-bearing copy.

### 6.8 Footer / Legal
- Persistent, unmissable (not just a tiny gray line) disclaimer, minimum viable version:
  > $DMVCAT is a meme token with no intrinsic value or expectation of financial return. It is not an investment product, and nothing on this site is financial, legal, or tax advice. Cryptocurrency is highly volatile and you may lose your entire purchase. There is no formal team, roadmap, or utility beyond what's described here.
- Links: X/Twitter, Telegram. No email contact form (reduces phishing/impersonation surface).

## 7. Non-Functional Requirements

- **Performance:** static HTML/CSS/JS, no framework required; target <1.5s first contentful paint on 4G. Logo/meme images compressed and served at appropriate sizes (no 5MB PNGs).
- **Responsive:** mobile-first — most traffic will come from X/Telegram links opened on phones.
- **Accessibility:** visible focus states on all interactive elements (CTA, copy button, gallery links); sufficient color contrast on disclaimer text specifically, since regulators and skeptical users will look there first.
- **Security:** no wallet-connect, no custom RPC calls, no third-party scripts beyond the DexScreener embed and analytics (if used) — every added script is one more thing that can get compromised and drain a visitor's wallet via a fake "connect wallet" prompt. This is the highest-severity risk category for meme sites; treat any request to add a swap widget or wallet connector as needing explicit security review first.
- **Hosting:** static hosting (Vercel/Netlify/Cloudflare Pages/GitHub Pages all sufficient). No backend, no database, nothing to breach.

## 8. Content & Compliance Requirements

- All copy stays in joke/deadpan register — explicitly avoid: price predictions, "next 100x," "guaranteed," implied team/roadmap promises, or language a reasonable buyer could rely on as a representation of fact.
- CA-verification warning and the risk-disclosure footer are required on every version of the site — treat them as immutable without deliberate sign-off, not boilerplate to shrink later.
- If the team is anonymous, do not claim otherwise anywhere on the site (in FAQ or elsewhere).

## 9. Success Metrics

- % of jupiter link page visitors who arrive via the website's CTA link (site → buy conversion)
- Bounce rate on hero (proxy for "does the joke land in <10 seconds")
- Meme asset download count (proxy for organic community reuse/reach)

## 10. Build Plan / Phasing

**v1 (launch day):** Sections 6.1, 6.3, 6.4, 6.5, 6.7, 6.8 — hero, lore, CA block, how-to-buy, FAQ, footer. Price section shows the static fallback state.

**v1.1 (post-migration to Raydium, once a real trading pair exists):** Swap in the live DexScreener embed for the fallback state.

**v2 (optional, only if community grows):** Rotating meme-of-the-week, holder leaderboard sourced from public on-chain data (read-only, no wallet connect required).

## 11. Out of Scope / Explicitly Rejected

- In-site token swap / wallet connect (security surface not worth it for a v1 meme site)
- Staking, "utility," or yield mechanics of any kind
- Paid trending/volume-bot services — not a website concern, but noting it's out of scope for this team to build or endorse
