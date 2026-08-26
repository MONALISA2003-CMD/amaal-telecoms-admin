# Amaal Plan Update Notes — Sales Increment

Updated for the next Phase 5 build.

## Plan/continuity changes

- Recorded the premium real-business dashboard direction as an implementation requirement.
- Recorded the Sales workspace as the current completed increment.
- Added Sales dashboard requirements for KPI cards, trend charts, payment mix, product ranking, cashier performance and actionable history.
- Added Sales detail requirements for lines, payments, approvals and status history.
- Added POS requirements using existing engine contracts only.
- Added a strict full-regression-audit requirement for every future increment.
- Added a mandatory continuity-document requirement for every future ZIP.
- Added an explicit next module: Products.
- Reinforced the no-database-reset, no-database-touch and no-backend-modification boundaries.

## Source-of-truth rule

The existing Render business engine and PostgreSQL database remain authoritative. This increment adds Business Admin UI/workflow surfaces only and does not introduce a new database or modify the backend engine.
