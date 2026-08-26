# Amaal Telecoms Admin — Next Continuation

Continue from this corrected cumulative build.

## Rules
- Do not rebuild the application.
- Preserve the existing architecture, routes, permissions, frontend, backend and PostgreSQL schema.
- Do not reset PostgreSQL.
- Do not add YAML files.
- Do not implement MFA.
- Do not claim live database, deployment, Gemini, email, backup or restore validation unless it is actually performed.

## Before the next phase
1. Inspect the entire cumulative codebase.
2. Re-run JavaScript syntax checks and `node render-preflight.js`.
3. Re-audit route registration, permissions, CSRF and database dependencies.
4. Regression-test Global Apply Date Range, Finance Sync and Media Management before adding new functionality.
5. Preserve the current idempotent finance source mapping and Media permission model.
6. Check the current PostgreSQL schema before changing any query or table dependency.
7. Package only after all confirmed defects are fixed and validated.
