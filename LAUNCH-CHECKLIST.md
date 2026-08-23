# $DMVCAT Website Launch Checklist

**Status:** Pre-Launch
**Target Launch:** TBD
**Last Updated:** 2026-08-22

---

## Pre-Launch Configuration

### Critical Updates (Must Complete Before Launch)

- [ ] **Update Contract Address**
  - File: [`index.html`](index.html:47) line 47
  - Replace: `TBD - Will be updated at launch`
  - With: Actual Solana contract address
  - ⚠️ Triple-check accuracy - typos = lost funds

- [ ] **Verify Social Links**
  - X/Twitter: [`index.html`](index.html:143) line 143
  - Telegram: [`index.html`](index.html:148) line 148
  - Confirm both links point to official accounts
  - Test links open correctly in new tabs

- [ ] **Pin Official CA Post**
  - Post contract address on X with pinned tweet
  - Pin contract address in Telegram
  - Cross-reference all three: website, X, Telegram

### Content Verification

- [ ] **Logo & Images**
  - Logo displays correctly ([`dmvcat-logo.svg`](dmvcat-logo.svg:1))
  - All meme gallery images load (3 total)
  - No broken images or 404 errors

- [ ] **Copy Review**
  - Hero tagline: "Sir, this is a DMV." ✓
  - Lore section under 100 words ✓
  - All FAQ answers present (8 questions)
  - No price predictions or "guarantees" in copy

- [ ] **Legal/Compliance**
  - Contract warning present and prominent ✓
  - FAQ "Is this financial advice?" = NO ✓
  - Footer risk disclosure visible and complete ✓
  - No language implying team promises or roadmap

---

## Technical Testing

### Functionality Tests

- [ ] **Copy Button**
  - Click "Copy" on contract address
  - Button shows "Copied!" feedback
  - Paste in text editor to verify clipboard works
  - Test on desktop and mobile

- [ ] **External Links**
  - All CTA buttons open correct URLs
  - Jupiter/Meteora links work
  - Wallet links (Phantom, Solflare) work
  - Social links (X, Telegram) work
  - All open in new tabs

- [ ] **Navigation**
  - Smooth scroll to sections works (if anchor links added)
  - All interactive elements have visible focus states
  - Tab navigation works through entire page

- [ ] **FAQ Accordion**
  - All 8 FAQ items expand/collapse
  - Keyboard (Enter/Space) opens items
  - No visual glitches on open/close

### Responsive Design Tests

- [ ] **Mobile (Portrait)**
  - iPhone SE (375px) - smallest target
  - Text readable without zoom
  - Buttons easy to tap (min 44px touch target)
  - No horizontal scroll
  - Images scale appropriately

- [ ] **Mobile (Landscape)**
  - Layout doesn't break
  - Hero section fits in viewport

- [ ] **Tablet**
  - iPad (768px)
  - Layout flows correctly
  - Images and buttons scale well

- [ ] **Desktop**
  - 1920px and wider
  - Content doesn't stretch too wide (max-width: 1200px)
  - Readable line lengths

### Performance Tests

- [ ] **Load Time**
  - First Contentful Paint < 1.5s on 4G
  - Test with throttled connection
  - All assets load without errors

- [ ] **Browser Compatibility**
  - Chrome (latest)
  - Firefox (latest)
  - Safari (iOS and macOS)
  - Edge (latest)
  - Check console for errors

### Accessibility Tests

- [ ] **Keyboard Navigation**
  - Tab through all interactive elements
  - Focus visible on all elements
  - No keyboard traps

- [ ] **Screen Reader**
  - Alt text on all images
  - ARIA labels on buttons
  - Semantic heading structure (h1 → h2)

- [ ] **Color Contrast**
  - Disclaimers readable (WCAG AA minimum)
  - CTA button text readable
  - Footer text sufficient contrast

---

## Deployment

### Hosting Setup

- [ ] **Choose Platform** (pick one)
  - [ ] Vercel (recommended)
  - [ ] Netlify
  - [ ] Cloudflare Pages
  - [ ] GitHub Pages
  - [ ] Other: _______________

- [ ] **Deploy Website**
  - Push code to repository (if using Git)
  - Configure build settings (none required)
  - Deploy to production
  - Get live URL

- [ ] **Custom Domain** (optional)
  - Register domain (e.g., dmvcat.com)
  - Configure DNS settings
  - Add domain to hosting platform
  - Verify SSL certificate active

### Post-Deployment Verification

- [ ] **Live Site Check**
  - Visit live URL
  - All sections load correctly
  - No 404 errors
  - Images load from correct paths

- [ ] **SSL/HTTPS**
  - Site loads over HTTPS
  - No mixed content warnings
  - Certificate valid

- [ ] **Mobile Test**
  - Open live site on actual mobile device
  - Test all functionality
  - Share link via Telegram/X to verify

---

## Launch Day Tasks

### Announcement Prep

- [ ] **Screenshot Kit**
  - Hero section with logo
  - Contract address block (for easy sharing)
  - Lore section (for quote tweets)
  - Save as high-quality images

- [ ] **Launch Tweet Draft**
  - Announce website launch
  - Include live URL
  - Pin contract address
  - Tag relevant communities

- [ ] **Telegram Announcement**
  - Post website URL
  - Pin contract address message
  - Set up channel description with URL

### Monitoring

- [ ] **Set Up Analytics** (optional but recommended)
  - Add Google Analytics or Plausible
  - Track: page views, bounce rate, CTA clicks
  - Monitor conversion to Jupiter

- [ ] **Uptime Monitoring**
  - Set up UptimeRobot or Pingdom
  - Get alerts if site goes down
  - Check every 5 minutes

- [ ] **Error Monitoring**
  - Check browser console for errors
  - Monitor hosting platform logs
  - Fix any issues immediately

---

## Post-Launch (v1.1 - After Raydium Migration)

### DexScreener Integration

- [ ] **Get Trading Pair Address**
  - Liquidity migrated to Raydium
  - Pair listed on DexScreener
  - Copy pair address

- [ ] **Add Live Chart**
  - Option A: Call `loadDexScreenerWidget('PAIR_ADDRESS')` in [`script.js`](script.js:138)
  - Option B: Update [`index.html`](index.html:38) chart-container section
  - Test embed loads correctly
  - Verify chart displays real data

- [ ] **Remove Placeholder**
  - Delete "Chart will appear once trading pair is live" text
  - Confirm chart is visible and functional

---

## Emergency Procedures

### If CA Typo Discovered

1. **DO NOT PANIC** - Fix immediately
2. Update [`index.html`](index.html:47) with correct CA
3. Redeploy (takes 30-60 seconds on Vercel/Netlify)
4. Post correction on X and Telegram
5. Pin new CA announcement

### If Scam Clone Appears

1. Report to X/Telegram
2. Post warning with real CA
3. Include verification steps in warning
4. Consider adding banner to real site

### If Site Goes Down

1. Check hosting platform status
2. Check DNS settings
3. Redeploy if needed
4. Post status update on socials
5. Use backup hosting (keep code on GitHub)

---

## Success Metrics (Track Weekly)

- [ ] **Traffic**
  - Unique visitors
  - Page views
  - Bounce rate (target: <60%)

- [ ] **Engagement**
  - CTA click-through rate (website → Jupiter)
  - Meme download count
  - Average time on page (target: >30s)

- [ ] **Community**
  - Social shares
  - Inbound links
  - Community-created memes using gallery assets

---

## Notes Section

### Issues Found During Testing

```
Date: ___________
Issue: 
Fix: 
Status: 
```

### Important Dates

- Token Launch: ___________
- Website Launch: ___________
- Raydium Migration: ___________
- DexScreener Integration: ___________

---

## Sign-Off

**Pre-Launch Review Completed By:**
- [ ] Developer/Builder: _____________ Date: _____
- [ ] Content Reviewer: _____________ Date: _____
- [ ] Legal/Compliance Check: _______ Date: _____

**Launch Approved:** ☐ YES   ☐ NO

**Launch Date/Time:** ___________________

---

**Now serving A-047. Take a number. We'll launch when we launch.**
