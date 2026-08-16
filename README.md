# $DMVCAT Production Static Site

A production-ready static implementation of the supplied DMV Cat website PRD.

## Stack

- Semantic HTML
- CSS
- Vanilla JavaScript
- No backend
- No wallet connection
- No database
- Optional DexScreener iframe only

## Before launch

Edit `config.js` and fill **all** required launch values:

1. `token.contractAddress`
2. `links.pumpFun`
3. `links.x`
4. `links.telegram`

Only set `trading.dexScreenerEnabled = true` after a real trading pair exists, then provide the exact official DexScreener embed URL.

Do not invent or paste contract addresses from screenshots, DMs, replies or unofficial mirrors.

## Run locally

Any static server works. For example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy

Upload the folder to Vercel, Netlify, Cloudflare Pages or GitHub Pages as a static site. No environment variables or database are required.

## Content note

The supplied PRD says the FAQ should reuse launch-pack copy verbatim, but the launch pack itself was not supplied. The implementation therefore uses only FAQ content supported by the PRD and explicitly avoids fabricating missing launch-pack wording.

## Security checklist

- No wallet-connect
- No in-site swap
- No private keys
- No custom RPC
- No user accounts
- No user uploads
- No fake chart data
- External links use `noopener noreferrer`
- Legal/risk copy is present in the footer and FAQ
