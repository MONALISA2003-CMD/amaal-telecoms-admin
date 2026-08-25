# CONTINUATION PROMPT — PHASE 24

Continue directly from the supplied Amaal Telecoms Admin Phase 23 ZIP.

## NON-NEGOTIABLE RULES

1. Do NOT rebuild the application.
2. Do NOT replace working modules with new implementations.
3. Inspect the existing code, PostgreSQL schema, routes, frontend views, permissions and integrations before modifying anything.
4. Preserve every working feature from Phases 1–23.
5. Do NOT reset, wipe or recreate PostgreSQL data.
6. Do NOT create Git branches.
7. Do NOT add YAML files or workflow files.
8. Do NOT commit secrets.
9. MFA is deferred to the final security phase and must remain untouched.
10. Every ZIP must contain the complete project.
11. Before delivery, audit both the previous phase and the current phase and fix discovered gaps before packaging.
12. Only send the ZIP after the entire phase and its closure audit are complete.

# PHASE 24 — CUSTOMERS & CRM DEEP BUILD

Deepen the EXISTING Customers & CRM module. Do not create a second CRM.

## Required lifecycle
Customer onboarding → Profile → Segmentation → Interactions → Tasks/Follow-ups → Sales → Orders → Credit → Warranty → Returns → Support → Privacy → Customer 360

## Required areas

### Customer master
- Individual, business and corporate customer records
- Duplicate detection
- Safe customer merge workflow
- Customer status lifecycle
- Contacts and addresses
- Customer documents
- Tax information
- Customer consent/privacy state

### Customer 360
- Purchase history
- Sales history
- Online orders
- Credit accounts and repayment history
- Warranty claims
- Returns/refunds
- Delivery history
- Support cases
- CRM interactions
- Tasks and follow-ups
- Documents
- Audit history
- Outstanding balance

### CRM operations
- Interaction logging
- Communication channels
- Notes
- Tasks
- Assignment
- Due dates
- Completion
- Follow-up reminders
- Escalation
- Customer segmentation
- Tags
- Customer groups

### Customer intelligence
- Lifetime value
- Purchase frequency
- Last purchase
- Average order value
- Outstanding balance
- Credit exposure
- Returns rate
- Warranty activity
- Customer profitability where finance data supports it

### Privacy
- Consent history
- Privacy preferences
- Data access visibility
- Sensitive customer information controls
- Audit trail

## Cross-module requirements
Preserve and deepen:
- Customers → Catalog
- Customers → Sales/POS
- Customers → Orders
- Customers → Credit
- Customers → Warranty
- Customers → Returns
- Customers → Delivery
- Customers → Documents
- Customers → Finance/BI
- Customers → Audit

## Acceptance requirements
- Audit Phase 23 before modifying it.
- Audit the completed Phase 24 work before packaging.
- Test all new routes statically and against PostgreSQL where available.
- Verify permissions on every new route.
- Verify audit entries for sensitive actions.
- Verify customer history uses real operational records only.
- Verify no customer merge can silently destroy financial, credit, order, warranty or return history.
- Run server syntax checks.
- Run frontend syntax checks.
- Run Render preflight.
- Confirm zero YAML files.
- Do not implement MFA.
