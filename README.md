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
