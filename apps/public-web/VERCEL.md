# Amaal Public Website — Vercel Deployment

## Required repository structure

This app lives at:

`src/livefix/apps/public-web`

when the Git repository root is the extracted project root.

If the Git repository was created with `src/livefix` as its repository root instead, the Vercel Root Directory becomes:

`apps/public-web`

### Recommended setup

Create a separate Vercel project named `amaal-public-web` for this customer-facing website. Keep the existing Business Admin Console in its existing Vercel project.

### Do not connect the browser directly to PostgreSQL

The public website must use the existing public-safe backend API. Set the public API base URL through an environment variable such as:

`NEXT_PUBLIC_API_BASE_URL=https://api.<amaal-domain>`

Do not put database credentials, JWT signing secrets, payment secrets, webhook secrets, supplier/cost data or internal admin credentials in the public web project.

### Recommended Vercel settings

- Framework Preset: Next.js
- Node.js: 24.x
- Root Directory: `src/livefix/apps/public-web` when repository root is the extracted project root
- Build Command: `npm run build`
- Install Command: `npm install`
- Output Directory: default
- Include files outside the root directory: enabled when workspace/shared dependencies require it

### Critical GitHub note

Vercel can only select a Root Directory that exists inside the Git repository it is importing. The ZIP itself is not the repository. Extract the ZIP and push its contents to GitHub so that the selected path is visible in the repository tree.

No database reset, recreation, destructive migration or admin-console replacement is part of this deployment.
