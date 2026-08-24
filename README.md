# Amaal Telecoms Administration Platform

A mobile-friendly administration platform for **Amaal Telecoms, Uganda**, designed to manage phones, TVs, appliances, electronics, accessories, commerce, inventory, service and the public websites from one controlled console.

## Current business modules

Core Administration & Security · Catalog · Inventory · Suppliers & Procurement · Customers & CRM · Sales & POS · Orders & E-commerce · Web & Hosting · Pricing & Promotions · Delivery & Logistics · Warranty & Repairs · Returns & Refunds · Document Management.

## Important operating rules

- Source filenames use **business module names**, never numbered phases.
- No mock/demo business records are created by the application.
- Admin mutations are permission-controlled and audited.
- Public website data must be explicitly published through the website publication workflow.
- Documents are stored in PostgreSQL `bytea`, not on the ephemeral Render filesystem.
- Document upload is limited to 15 MB and supports PDF, JPG, PNG, WEBP, TXT, CSV, DOCX and XLSX.
- Browser sessions use Secure, HttpOnly cookies and CSRF protection.
- Session inactivity defaults to 10 minutes.
- Trusted-device binding protects authenticated sessions from being replayed from a different device context.
- MFA is available per account and can be enforced by the security policy; unfamiliar devices require MFA for MFA-enabled accounts.

## Deployment

- Node.js 20.x
- Express 5
- PostgreSQL / Neon-compatible `DATABASE_URL`
- `JWT_SECRET` required
- `npm start`

### Render

Render is the recommended environment for this combined Express + PostgreSQL administration service while it is being tested. Keep the admin backend here until the API and public-site integration are stable.

### Vercel

Vercel is better introduced later for a separate public web frontend or a deliberately adapted serverless API. Do not move the current Express/PostgreSQL admin service to Vercel merely to obtain a nicer test URL; that would add a deployment architecture change before the business system is fully accepted.

## Mobile testing

The dashboard is designed as the client-facing test surface. From the dashboard, open every business module, create real test records, update them, download documents and confirm audit/security events. No developer console or implementation instructions are presented as part of the normal client UI.
