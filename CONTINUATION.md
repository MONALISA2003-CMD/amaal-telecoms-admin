# Amaal Telecoms Admin — Production Continuation

Continue from the Phase 4 Final Production Readiness build.

## Locked rules

- Do not rebuild the application.
- Preserve the existing architecture, modules, routes, permissions, frontend and backend structure.
- Do not reset PostgreSQL.
- Do not modify or replace the database schema as part of routine debugging.
- Do not add YAML files.
- Do not activate or redesign MFA.
- Do not commit secrets.
- Do not claim live infrastructure validation unless it was actually performed.

## Current status

Staging validation is complete.

Phase 4 corrections include:

- Shared Global Apply Date Range flow.
- Finance synchronization concurrency protection and idempotency.
- Media Management initialization.
- Web & Hosting `formModal()` Promise misuse fix.
- Additional invalid `formModal().then(...)` usages removed from Media and Backup actions.
- Professional README and production deployment guidance.

## Next step

The next operational stage is controlled production deployment and smoke validation.

### Production gate

1. Configure production environment variables in the hosting provider.
2. Connect the application to the existing production PostgreSQL environment without resetting it.
3. Configure the production domain and HTTPS.
4. Configure verified email delivery.
5. Configure Gemini credentials server-side if AI is enabled for production.
6. Configure durable private backup storage and an isolated recovery target.
7. Deploy the release.
8. Run the production smoke test across authentication, permissions, date range, Sales, Inventory, Procurement, Finance, Media, Web & Hosting, AI, Integrations, recovery readiness and audit logging.
9. Record any confirmed production defects and make only targeted fixes.
10. Proceed to normal production use after the smoke-test gate passes.

## Validation discipline

For every future defect:

1. Identify the exact file and code path.
2. Confirm the root cause.
3. Fix the smallest necessary area.
4. Re-run syntax and preflight checks.
5. Re-run the affected regression checks.
6. Audit adjacent modules for the same defect pattern.
7. Package only after validation passes.
