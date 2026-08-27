
## Vercel TypeScript Fix — 2026-08-27

Resolved the two production TypeScript failures reported by Vercel:
- Credit action modal now guards nullable application/account records before using their IDs.
- Finance workspace now imports the Recharts `BarChart` component used by its charts.

These changes are frontend-only. No database, schema, migration, seed, or backend files were modified.
