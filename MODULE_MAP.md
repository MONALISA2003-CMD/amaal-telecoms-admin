# Amaal Telecoms Module Map

This project deliberately uses business/module names instead of phase-number filenames.

1. Core Administration & Security — identity, roles, sessions, MFA, trusted devices, governance and audit.
2. Catalog — products, categories, brands, variants, media, tags, pricing and website visibility.
3. Inventory — locations, receiving, adjustments, transfers, reservations, serialised units, stocktakes, damage/loss.
4. Suppliers & Procurement — suppliers, requisitions, purchase orders, receipts, invoices and supplier payments.
5. Customers & CRM — customers, cases, CRM tasks, privacy and customer tags.
6. Sales & POS — retail sales, payments, serial/IMEI allocation and sales audit history.
7. Orders & E-commerce — online orders, payments, fulfillment and delivery handoff.
8. Web & Hosting — sites, domains, staging, publication workflow, media and redirects.
9. Pricing & Promotions — pricing rules, flash sales, promotions and effective-price control.
10. Delivery & Logistics — delivery partners, shipments, dispatch tracking, attempts, locations, units and delivery cost.
11. Warranty & Repairs — warranty policies/claims, repair tickets, repair partners, locations, expected returns, costs and progress.
12. Returns & Refunds — return requests, inspections, disposition, refunds and inventory effects.
13. Document Management — upload, metadata, entity attachment, visibility and durable database-backed download.
14. Credit & Installments — credit profiles, applications, approvals, accounts, installments, payments, collections and restructuring.
15. Finance & Accounting — chart of accounts, journals, cash/bank accounts, taxes, periods and operational synchronization.
16. Reporting & Business Intelligence — executive KPIs, date-range trends, product/customer/category/procurement/delivery/warranty/returns/credit/finance analysis, saved snapshots and CSV exports.

## Cross-module principle
Operational records remain the source of truth. Reporting reads those records; it does not manufacture mock data. Finance can synchronize eligible operational transactions into double-entry journals. BI can then read both operational and posted finance data for management reporting.
