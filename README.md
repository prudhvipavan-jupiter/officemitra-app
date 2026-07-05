# OfficeMitra (Fresh)

**English-only** greenfield build. No code imported from V2 or earlier versions.

## Features

- Knowledge Hub, Documents (PDF upload), Updates, FAQ
- Staff Community (moderated)
- 6 office tools, official portal links
- Admin CMS + community queue
- Expert assistance (contact page)

## Setup

```bash
npm install
cp .env.example .env.local
# Set POSTGRES_URL and ADMIN_PASSWORD
npm run dev
```

Admin: http://localhost:3000/admin/login

See [docs/SCOPE.md](docs/SCOPE.md).
