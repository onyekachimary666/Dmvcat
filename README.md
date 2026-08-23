# $DMVCAT Website

Production-ready static website for $DMVCAT meme token on Solana.

## Overview

A single-page website designed to convert visitors into buyers within seconds, provide community resources, and carry necessary legal/risk disclosures. Built as a static site with no backend for security, performance, and low hosting costs.

## Features

- **Hero Section** - Logo, tagline, and prominent "Buy on Jupiter" CTA
- **Live Price Display** - Ready for DexScreener embed once trading pair exists
- **Mascot & Lore** - The DMV Cat story in under 100 words
- **Contract Address Block** - Copy-to-clipboard CA with prominent scam warnings
- **How to Buy Guide** - 3-step plain-language instructions
- **Meme Gallery** - Downloadable community assets
- **FAQ** - Common questions with legally-required disclaimers
- **Footer** - Social links and comprehensive risk disclosure

## Project Structure

```
dvmcat/
├── index.html          # Main HTML file (all sections)
├── styles.css          # Responsive CSS (mobile-first)
├── script.js           # Interactive features
├── dmvcat-logo.svg     # Primary logo
├── assets/
│   └── memes/          # Downloadable meme assets
│       ├── dmv-cat-says-no.svg
│       ├── now-serving.svg
│       ├── sir-this-is-a-dmv.svg
│       └── README.txt
├── vercel.json         # Vercel deployment config
├── netlify.toml        # Netlify deployment config
└── README.md           # This file
```

## Tech Stack

- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Mobile-first responsive design, no framework dependencies
- **Vanilla JavaScript** - No external dependencies, modern ES6+
- **Static hosting** - Deploy to Vercel, Netlify, Cloudflare Pages, or GitHub Pages

## Performance

- Target: <1.5s first contentful paint on 4G
- No external dependencies beyond DexScreener embed
- Optimized images (all SVG assets are small)
- Minimal JavaScript for interactivity

## Key Security Features

- No wallet connect (no custody of user funds)
- No backend or database (no attack surface)
- Explicit CA verification warnings (anti-scam)
- External links use `rel="noopener noreferrer"`
- No third-party scripts except DexScreener embed

## Deployment

### Quick Deploy Options

#### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts to deploy

Or use Vercel dashboard:
1. Push code to GitHub
2. Import repository at https://vercel.com/new
3. Deploy automatically

#### Netlify
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy`
3. For production: `netlify deploy --prod`

Or use Netlify dashboard:
1. Drag and drop project folder at https://app.netlify.com/drop
2. Done!

#### Cloudflare Pages
1. Go to https://pages.cloudflare.com
2. Connect your GitHub repository
3. Build settings:
   - Build command: (leave empty)
   - Build output directory: `/`
4. Deploy

#### GitHub Pages
1. Push code to GitHub repository
2. Go to Settings → Pages
3. Source: Deploy from branch `main`, folder `/ (root)`
4. Save and wait for deployment

### Manual Deployment

Any static hosting provider works:
1. Upload all files to your hosting provider
2. Ensure [`index.html`](index.html:1) is set as the default document
3. No build step required

## Configuration

### Update Contract Address (Launch Day)

1. Open [`index.html`](index.html:1)
2. Find line 47: `<code id="contract-address">`
3. Replace `TBD - Will be updated at launch` with actual Solana CA
4. Save and redeploy

### Add DexScreener Chart (Post-Raydium Migration)

1. Open [`script.js`](script.js:1)
2. Find the `loadDexScreenerWidget()` function (line 138)
3. Call it with your pair address:
   ```javascript
   // Add this at the end of the DOMContentLoaded handler
   loadDexScreenerWidget('YOUR_PAIR_ADDRESS_HERE');
   ```
4. Or update [`index.html`](index.html:38) chart-container section directly

### Add New Memes

1. Add image file to [`assets/memes/`](assets/memes/)
2. Compress image (target < 300 KB)
3. Open [`index.html`](index.html:90)
4. Find the Meme Gallery section (around line 90)
5. Duplicate a `<figure class="meme-card">` block
6. Update `src`, `download`, `alt`, and caption
7. Redeploy

Example:
```html
<figure class="meme-card">
    <a href="assets/memes/your-meme.svg" download="your-meme.svg">
        <img src="assets/memes/your-meme.svg" alt="Description">
    </a>
    <figcaption>Your Meme Title</figcaption>
</figure>
```

### Update Social Links

Edit [`index.html`](index.html:142) footer section (around line 142):
- X/Twitter: Update href in first social link
- Telegram: Update href in second social link

## Testing

### Local Testing
1. Open [`index.html`](index.html:1) directly in browser, or
2. Use Python: `python -m http.server 8000`
3. Use Node: `npx serve`
4. Open http://localhost:8000

### Checklist Before Launch
- [ ] Contract address updated in HTML
- [ ] Social links (X, Telegram) point to correct accounts
- [ ] All meme images load correctly
- [ ] Copy button works on contract address
- [ ] All external links open in new tabs
- [ ] Mobile responsive (test on actual phone)
- [ ] FAQ disclaimers are present and unmodified
- [ ] Footer risk disclosure is visible

## Accessibility

- Semantic HTML5 elements throughout
- ARIA labels on interactive elements
- Keyboard navigation support (Tab, Enter, Space)
- Focus states visible on all interactive elements
- Color contrast meets WCAG AA standards on disclaimers
- Alt text on all images

## Legal & Compliance Notes

⚠️ **IMPORTANT**: The following content is legally load-bearing and must NOT be removed or minimized without legal sign-off:

1. Contract address verification warning (Section 6.4 of PRD)
2. FAQ "Is this financial advice?" answer
3. Footer risk disclosure

These sections protect the team from liability. Treat them as immutable.

## Maintenance

### No CMS
This site has no content management system by design. Updates require:
1. Edit HTML/CSS/JS files directly
2. Commit changes to repository
3. Redeploy (automatic with Vercel/Netlify GitHub integration)

### Monitoring
Consider adding:
- Google Analytics or Plausible for traffic
- DexScreener API for real-time price (v2 feature)
- Uptime monitoring (UptimeRobot, Pingdom)

## Support & Community

- **X/Twitter**: https://x.com/dmvcatsolana
- **Telegram**: https://t.me/dmvcatsolana
- **DexScreener**: (link will be added once pair is live)

## Version History

- **v1.0** (Current) - Launch day version with static fallback chart
- **v1.1** (Planned) - Live DexScreener embed after Raydium migration
- **v2.0** (Future) - Optional features: meme-of-the-week, holder leaderboard

## License

This is a meme. Do whatever you want with it. Just don't impersonate the official account or scam people.

## Disclaimer

$DMVCAT is a meme token with no intrinsic value or expectation of financial return. This website and all its contents are provided as-is, with no warranty. Cryptocurrency is highly volatile and you may lose your entire purchase. Nothing on this site constitutes financial, legal, or tax advice. There is no formal team, roadmap, or utility beyond what's explicitly described. By using this website or purchasing $DMVCAT, you acknowledge these risks and accept full responsibility for any losses.

---

**Now serving A-047. Take a number. Wait your turn.**
