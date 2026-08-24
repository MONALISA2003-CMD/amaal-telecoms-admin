# Amaal Telecoms Module Map

This is the canonical naming system for the project. Do not name future source files `phase1`, `phase2`, etc.

| Module | Primary source | Main purpose |
|---|---|---|
| Core Administration & Security | `server.js` + `schema.sql` | Identity, RBAC, organization, departments, sessions, MFA, security, audit and system governance |
| Catalog | `server.js` + `schema.sql` | Products, variants, categories, category icons, brands, logos, product images, descriptions and catalog publishing controls |
| Inventory | `server.js` + `schema.sql` | Stock, receipts, adjustments, transfers, reservations, serial/IMEI tracking, stocktakes and incidents |
| Suppliers & Procurement | `suppliers-procurement.js` | Suppliers, requisitions, purchase orders, receiving, invoices and supplier payments |
| Customers & CRM | `customers-crm.js` | Customers, addresses, interactions, support, privacy and CRM tasks |
| Sales & POS | `sales-pos.js` | POS, payments, receipts, serialized sales, voids and sales reporting |
| Orders & E-commerce | `orders-ecommerce.js` | Orders, order lifecycle, fulfillment, reservations, payments and serial assignment |
| Web & Hosting | `web-and-hosting.js` | Websites, pages, navigation, media, domains, settings and controlled publication |
| Pricing & Promotions | `pricing-and-promotions.js` | Price lists, promotions, coupons and centralized effective-price rules |

## Public website safety boundary
Public endpoints must expose only published, public-facing data. Internal costs, supplier data, staff, permissions, audit/security records and customer-private information must never be exposed through public website routes.

## Publication rule
Public content follows `Draft -> Request -> Approve -> Execute`. Editing an admin record must not directly make private content public.

## Future modules
Use business names for new files, for example `delivery-logistics.js`, `warranty-repairs.js`, `returns-refunds.js`, `credit-installments.js`, `finance-accounting.js`, and `business-intelligence.js`.
