# Kaadi Financial Website Demo

Client/demo site for Kaadi Financial Professional Corporation, managed by pHouse Productions.

## URLs

- Client-facing demo: `https://kaadi-financial.demo.phouseweb.ca`
- Cloudflare Pages fallback: `https://kaadi-financial-demo.pages.dev`
- Current public site: `https://www.kaadifinancial.ca`

## Linear

- Parent issue: PHO-182

## Notes

- Build should use real Kaadi public branding/assets.
- Demo must be noindex until Mike/client approval.
- Contact form should follow pHouse per-site Pages Worker pattern:
  - server-side validation
  - honeypot
  - Turnstile support/production requirement
  - Resend notification
- No production DNS/site changes without explicit approval.

## Deployment

- Cloudflare Pages project: `kaadi-financial-demo`
- Custom demo domain status: active
- Demo robots: `noindex,nofollow`
- Form QA: POST to `/api/contact` returned `{ "ok": true }` on custom demo domain
- Notification recipient for demo QA: `mike@phouseproductions.com`

## V2 rebuild

- V2 commit: `5d3df20`
- Rebuilt around original Kaadi copy instead of generic AI copy.
- Removed aggregate review/rating display; retained conservative public review excerpts.
- Lucide-style inline SVG icons used for service cards and theme toggle.
- QA artifacts saved in `user/drive/kaadi-financial/` as `v2-*`.

## Odyssey rebuild

- Selected HTMLRev template/reference: Odyssey
- Source repo: https://github.com/treefarmstudio/odyssey-theme
- License: MIT
- Commit: `82b0c69`
- Used as structural/quality reference, customized with Kaadi copy/assets and pHouse demo rules.
