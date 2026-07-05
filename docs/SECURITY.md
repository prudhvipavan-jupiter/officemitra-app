# OfficeMitra Security Notes

Last reviewed: July 2026

## Authentication

- Admin uses a single shared password stored in `ADMIN_PASSWORD` (Vercel env).
- Session is an httpOnly cookie (`om_admin`) matching `ADMIN_SESSION_TOKEN`.
- **Middleware** blocks all `/admin/*` routes except `/admin/login` without a valid cookie.
- Change default `changeme` / `dev-session-token` in production.

## API protection

| Route | Public | Rate limit |
|-------|--------|------------|
| `POST /api/contact` | Yes | 5 / 15 min per IP |
| `POST /api/community` | Yes | 5 / 15 min per IP |
| `POST /api/analytics/view` | Yes | 120 / min per IP |
| `GET /api/search` | Yes | 60 / min per IP |
| `/api/admin/*` | Admin only | — |

## Headers

- `Strict-Transport-Security`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`
- `Referrer-Policy`, `Permissions-Policy` via `next.config.ts` and middleware
- `X-Powered-By` disabled

## Input handling

- Contact and community text fields sanitized and length-capped.
- File uploads (CMS, logo): MIME whitelist + size limits (logo 2 MB, CMS 10 MB).
- SQL via parameterized Neon queries (no string concatenation).

## Email

- Optional Resend integration via `RESEND_API_KEY` and `RESEND_FROM_EMAIL`.
- Notifications can be disabled in Admin → Settings.

## Recommendations

1. Set strong `ADMIN_PASSWORD` and `ADMIN_SESSION_TOKEN` in Vercel.
2. Add `RESEND_API_KEY` for contact notifications.
3. Fix `www` DNS to point to Vercel (avoid split-domain phishing surface).
4. Rotate admin password periodically.
5. Do not commit `.env.local` or production secrets.

## Out of scope (V1)

- Multi-admin accounts / RBAC
- CAPTCHA on public forms
- WAF / DDoS beyond Vercel defaults
