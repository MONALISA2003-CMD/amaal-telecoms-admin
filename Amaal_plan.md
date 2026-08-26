# Amaal Plan
## Master Engineering Plan for Business Admin and Public Website

**Platform:** Amaal Telecoms  
**Technical Console:** Existing Phase 4 application on Render  
**Business Admin:** New business application on Vercel  
**Public Website:** New customer application on Vercel  
**Business source of truth:** Existing Phase 4 engine and PostgreSQL  
**Executive authority:** CEO = Superadmin. There is no separate Executive role.

---

# 1. Purpose

This document is the master engineering and product plan for the next generation of Amaal Telecoms.

The existing Phase 4 application is not being replaced.

It becomes the **Technical Console and Super Engine**.

Two new experiences will be built around it:

1. **Business Admin** for the CEO and authorized staff.
2. **Public Website** for customers.

The three systems must behave as one connected platform while remaining separate experiences.

The central rule is:

> **The Technical Console is the super engine. Business Admin is the business control experience. Public Website is the customer experience.**

No new application may create a competing source of truth for products, stock, customers, orders, sales, finance or procurement.

---

# 2. Existing Phase 4 Is the Foundation

The current Phase 4 build already contains the core operational capabilities that the new experiences must depend on.

The audited Phase 4 package includes:

- Dashboard
- Global Search
- Catalog
- Inventory
- Stock Control
- Suppliers & Procurement
- Customers & CRM
- Sales & POS
- Orders & E-commerce
- Pricing & Promotions
- Delivery & Logistics
- Warranty & Repairs
- Returns & Refunds
- Credit & Installments
- Finance & Accounting
- Business Intelligence
- AI Business Intelligence
- AI Assistant
- Integration Hub
- Web & Hosting
- Media Management
- Document Management
- System Operations
- Monitoring & Observability
- Backup & Recovery
- Deployment Readiness
- Security, Roles, Permissions and Audit

The Phase 4 package is Node.js 20.x, Express 5, PostgreSQL and server-side JavaScript. The existing application remains authoritative.

The new layers must first inspect and reuse the existing routes, APIs, permissions, data models and workflows before adding anything.

---

# 3. Final Platform Architecture

```text
                         AMAAL TELECOMS
                              |
              +---------------+---------------+
              |                               |
              v                               v
       PUBLIC WEBSITE                    BUSINESS ADMIN
       Vercel / Next.js                  Vercel / Next.js
              |                               |
              |        Controlled API         |
              +---------------+---------------+
                              |
                              v
                 EXISTING AMAAL ENGINE
                      Render / Node.js
                              |
                 +------------+------------+
                 |                         |
                 v                         v
         TECHNICAL CONSOLE             PostgreSQL
         Existing Phase 4
```

The Technical Console remains the deepest authority.

Business Admin and Public Website do not bypass the engine to write directly to PostgreSQL.

---

# 4. Hosting Strategy

## 4.1 Render

Render continues to host the existing technical system:

- Node.js application
- Express API
- Existing authentication foundation
- Existing authorization
- Existing business logic
- Existing PostgreSQL connection
- Existing technical console
- Existing operational modules

The Render application remains available for technical administration and advanced operational control.

## 4.2 Vercel Business Admin

A dedicated Vercel project will host the Business Admin.

Recommended stack:

- TypeScript
- React
- Next.js App Router
- Tailwind CSS
- Accessible component primitives
- TanStack Query where client-side server-state caching is useful
- React Hook Form for complex forms
- Zod for shared runtime validation
- Recharts or an equivalent lightweight chart library
- Playwright for browser acceptance testing
- Vitest for unit/component-level logic where appropriate
- ESLint and TypeScript strict checking

### Why Next.js

Next.js is a natural fit for Vercel because Vercel provides first-class Next.js deployment support, and Next.js provides routing, server components, server-side data access, application rendering and production optimizations. Vercel documents zero-configuration deployment for Next.js and support for preview deployments and incremental regeneration. citeturn0search7

### Why TypeScript

Business Admin is a large, permission-sensitive application with many business records and API contracts.

TypeScript provides:

- typed API contracts
- safer data transformations
- safer forms
- fewer accidental field mismatches
- better refactoring
- better maintainability

Production builds should fail on TypeScript errors rather than ignoring them. Next.js documents that production builds fail when TypeScript errors are present unless this safety check is deliberately disabled. It will not be disabled for Amaal. citeturn0search14

### Why React

React is the UI foundation of Next.js and is suitable for:

- reusable business components
- complex forms
- dashboards
- tables
- filters
- modals
- responsive navigation
- interactive operational workflows

### Why Tailwind CSS

The Business Admin needs a consistent design system across many modules.

Tailwind will be used as the styling layer to provide:

- responsive layouts
- consistent spacing
- reusable visual patterns
- fast iteration
- mobile-first layouts

Amaal should additionally maintain its own design tokens and components so the application does not become an unstructured collection of utility classes.

### Why TanStack Query

Where Business Admin screens need live API data on the client, TanStack Query can provide:

- caching
- refetching
- stale-state control
- mutation states
- optimistic UI where safe

It must not become a second business data store.

The Render engine remains authoritative.

### Why React Hook Form + Zod

Forms are central to sales, products, procurement, customers, finance and website management.

React Hook Form reduces unnecessary form rendering.

Zod provides runtime validation at the UI boundary.

Server-side validation in the Render engine remains mandatory. Client validation is convenience, not security.

### Why Playwright

Critical workflows must be tested in a real browser:

- Login
- CEO dashboard
- POS
- Product editing
- Stock receipt
- Purchase order
- Customer order
- Website publishing
- Public product browsing
- Customer checkout when introduced

### Why Vitest

Pure business formatting, mapping, validation and UI utility logic can be tested quickly without requiring the full browser.

---

# 5. Public Website Technology

The Public Website should use:

- TypeScript
- React
- Next.js App Router
- Tailwind CSS
- Next.js image optimization
- Server-side rendering where useful
- Incremental Static Regeneration where appropriate
- Zod for API response validation
- Playwright for end-to-end testing
- Vitest for unit-level logic

The public website should not connect directly to PostgreSQL.

It should consume approved public data through a controlled public API boundary.

## Why Next.js for the Public Website

The website needs:

- SEO
- fast product pages
- clean URLs
- responsive pages
- metadata
- search engine indexing
- optimized images
- product/category pages
- future commerce
- customer accounts
- server-side rendering

Next.js supports these application patterns and is directly supported by Vercel. Vercel also supports production, preview and development environments, allowing public-site changes to be reviewed before production. citeturn0search1turn0search7

---

# 6. No Direct Database Access From Vercel

This is a critical rule.

Business Admin:

```text
Next.js
   ↓
Controlled server-side API layer
   ↓
Render Business API
   ↓
PostgreSQL
```

Public Website:

```text
Next.js
   ↓
Controlled public API
   ↓
Render engine
   ↓
PostgreSQL
```

The Vercel applications must not contain:

- DATABASE_URL
- PostgreSQL credentials
- unrestricted SQL access
- administrative database credentials

The existing Render engine owns database access.

This protects the existing system and prevents three applications from independently modifying the same database.

---

# 7. API Boundary

The existing Phase 4 API must be audited before the new applications are implemented.

For each existing endpoint we classify it as:

### Internal Technical

Only Technical Console.

Examples:

- system diagnostics
- deployment/readiness controls
- backup/recovery controls
- monitoring
- raw integration configuration
- technical configuration

### Business Private

Business Admin only.

Examples:

- sales
- stock
- procurement
- finance
- customers
- staff
- internal reports

### Business + Public

Controlled data shared with the website.

Examples:

- published products
- published categories
- public promotions
- public business information
- approved website content

### Customer Private

Only the authenticated customer can access their own data.

Examples:

- their orders
- their addresses
- their payments
- their returns
- their warranty cases

---

# 8. API Gateway / BFF Strategy

The preferred Business Admin architecture is:

```text
Browser
   ↓
Next.js Server Layer
   ↓
Render API
```

The browser should not receive unnecessary internal API details.

For public pages:

```text
Browser/Search Engine
        ↓
Next.js
        ↓
Public Render API
```

Next.js Route Handlers or server-side data functions may be used as a Backend-for-Frontend boundary when that improves security and keeps internal API details private.

The BFF is not another source of truth.

It is an adapter.

---

# 9. Authentication

The existing Phase 4 authentication system must be audited before creating a second authentication system.

Preferred approach:

- preserve the existing identity source
- establish a secure session bridge for Business Admin
- use secure HttpOnly cookies where appropriate
- use HTTPS only in production
- never place long-lived secrets in localStorage
- enforce authorization server-side
- maintain session expiration and revocation
- preserve auditability

The exact implementation will be selected after the Phase 4 authentication route and token audit.

We do not invent a new identity model until the existing one has been mapped.

---

# 10. CEO and Superadmin

There is only one highest business role:

# CEO / Superadmin

They are the same role.

There is no separate Executive role.

The CEO can oversee:

- Sales
- POS
- Products
- Stock
- Procurement
- Customers
- Orders
- Finance
- Credit
- Delivery
- Service
- Website
- Reports
- Team
- Business settings

The CEO sees the entire business but still should not need technical controls in the Business Admin.

Technical controls remain in the Technical Console.

---

# 11. Business Admin Roles

## CEO / Superadmin

Complete business visibility and control.

## Manager

Operational management.

## Sales

Sales, POS, customers and order-related workflows.

## Inventory

Stock, stocktake, transfers, receiving and inventory workflows.

## Procurement

Suppliers, purchase requests, purchase orders and receiving.

## Finance

Finance, expenses, receivables, payables and financial reports.

## Customer Service

Customers, orders, returns, warranty, repairs and cases.

Permissions are inherited from the existing authorization engine wherever possible.

---

# 12. Business Admin Design System

The Business Admin should feel like:

> Amaal Telecoms Business

not:

> Amaal Telecoms Developer Console

## Visual principles

- premium
- clean
- professional
- bright
- readable
- mobile-first
- business-oriented
- minimal technical clutter

## Global shell

- business logo
- business name
- workspace/branch indicator
- global search
- notifications
- user menu
- responsive navigation
- breadcrumbs
- page title
- contextual actions

---

# 13. Business Admin Navigation

## CEO / Superadmin

```text
Overview
Sales
Products
Stock
Purchasing
Customers
Orders
Finance
Credit
Delivery
Service
Website
Reports
Team
Business Settings
```

## Manager

```text
Overview
Sales
Products
Stock
Purchasing
Customers
Orders
Delivery
Service
Team
Reports
```

## Sales

```text
Sales
Products
Customers
Orders
```

## Inventory

```text
Stock
Products
Purchasing
Suppliers
```

## Procurement

```text
Purchasing
Suppliers
Stock
```

## Finance

```text
Finance
Sales
Customers
Purchasing
Reports
```

## Customer Service

```text
Customers
Orders
Returns
Warranty
Repairs
```

---

# 14. Overview Experience

The CEO should answer four questions immediately:

### What happened?

- sales
- revenue
- profit
- customers
- orders

### Why?

- product performance
- branch performance
- staff performance
- category performance
- expense changes

### What needs attention?

- low stock
- overdue payments
- pending purchases
- delayed deliveries
- returns
- service cases
- website enquiries

### What should I do?

- approve
- review
- contact
- purchase
- publish
- investigate

---

# 15. Business Admin Module Map

## Sales

### POS

- product selection
- barcode/serial lookup
- cart
- customer
- discount
- payment
- receipt
- sale completion

### Sales History

- filters
- details
- receipt
- returns
- payment status

### Quotes

- create
- edit
- share
- convert to sale

### Sales Approvals

- discounts
- exceptional pricing
- approvals

---

# 16. Products

### Catalogue

- products
- brands
- categories
- specifications
- variants
- images
- status

### Pricing

- selling price
- approved cost visibility
- price history
- promotions
- discounts

### Website Publishing

- public title
- description
- images
- specifications
- public price
- availability
- featured status
- publish/unpublish

---

# 17. Stock

### Overview

- available
- reserved
- low stock
- out of stock
- damaged
- stock value

### Movements

- receiving
- transfers
- adjustments
- sales
- returns

### Stocktake

- create
- count
- review
- approve
- finalize

### Transfers

- request
- approve
- dispatch
- receive

### Stock Issues

- damaged
- lost
- missing
- discrepancy
- resolution

---

# 18. Purchasing

### Requests

- create
- approve
- reject

### Purchase Orders

- create
- approve
- send
- revise
- close

### Receiving

- expected deliveries
- receive
- partial receive
- serial capture
- discrepancy

### Supplier Invoices

- record
- match
- exception
- payment status

### Supplier Performance

- pricing
- delivery
- quality
- purchase history

---

# 19. Customers

### Directory

- search
- filters
- customer groups
- status

### Profile

- purchases
- orders
- payments
- balance
- returns
- warranty
- service
- interactions

### Customer Service

- enquiries
- cases
- follow-ups
- notes
- resolution

---

# 20. Orders

Orders are the central bridge between website and operations.

## Order lifecycle

```text
New
 ↓
Confirmed
 ↓
Stock Reserved
 ↓
Preparing
 ↓
Ready
 ↓
Dispatched
 ↓
Delivered
```

Alternative outcomes:

```text
Cancelled
Returned
Refunded
```

Each transition must be permission-controlled and audited.

---

# 21. Finance

### Overview

- revenue
- gross profit
- expenses
- cash
- receivables
- payables

### Money In

- sales payments
- customer payments
- other receipts

### Money Out

- expenses
- supplier payments
- refunds

### Receivables

- outstanding
- ageing
- due payments
- collections

### Payables

- supplier balances
- due invoices
- payments

### Reconciliation

- unmatched
- matched
- history

### Reports

- profit and loss
- balance sheet
- cash flow
- trial balance
- tax
- sales
- expenses
- receivables
- payables

The underlying accounting engine remains the Phase 4 source of truth.

---

# 22. Credit

If enabled by the business:

- applications
- approvals
- active accounts
- schedules
- payments
- overdue accounts
- collections

Sensitive actions require appropriate permissions.

---

# 23. Delivery

- delivery dashboard
- ready orders
- assigned deliveries
- in transit
- delivered
- failed
- delayed
- delivery zones
- fees
- delivery partners

---

# 24. Service

### Returns

- request
- review
- approval
- receipt
- refund

### Warranty

- claim
- eligibility
- service history
- resolution

### Repairs

- case
- repair status
- parts
- cost
- completion

### Customer Cases

- enquiry
- follow-up
- resolution
- history

---

# 25. Website Management

The Website module is the business bridge to the Public Website.

## Website dashboard

Show:

- website status
- published products
- published categories
- promotions
- enquiries
- orders
- content awaiting publication

## Homepage

- hero
- banners
- featured products
- featured categories
- promotions
- content sections

## Products

- public visibility
- public price
- public description
- images
- specifications
- availability
- featured status

## Categories

- visibility
- ordering
- description
- image

## Promotions

- campaigns
- offers
- featured products
- validity
- publishing

## Pages

- About
- Contact
- FAQs
- Delivery
- Returns
- Warranty
- Terms
- Privacy

## Media

- product images
- banners
- page media
- documents

## Publishing

```text
Draft
 ↓
Review
 ↓
Approve
 ↓
Publish
```

Only published content reaches the public site.

---

# 26. Public Website Information Architecture

Recommended public structure:

```text
/
 /shop
 /shop/phones
 /shop/accessories
 /shop/electronics
 /categories/[slug]
 /products/[slug]
 /deals
 /about
 /contact
 /faq
 /delivery
 /returns
 /warranty
 /account
 /account/orders
 /account/orders/[id]
 /account/profile
```

The exact URL structure must be finalized during implementation after the public API and SEO audit.

---

# 27. Public Homepage Behaviour

The homepage should be dynamic from approved business content.

Sections:

1. Hero
2. Featured categories
3. Featured products
4. Deals
5. New arrivals
6. Trust/service information
7. About
8. Contact

Business Admin controls what is published.

---

# 28. Public Product Behaviour

Each product page should contain:

- image gallery
- name
- price
- availability
- description
- specifications
- variants
- warranty information
- delivery information
- related products
- enquiry action
- order/cart action when commerce is enabled

Never expose:

- supplier cost
- internal margin
- exact internal stock counts
- staff information
- internal IDs
- internal audit information

---

# 29. Public Search

Search should support:

- product name
- brand
- category
- specifications
- public tags

Results:

- product image
- product name
- price
- availability
- quick view
- product page

Search should never query internal unrestricted data.

---

# 30. Public Customer Account

Eventually:

- register
- login
- profile
- addresses
- orders
- payments
- tracking
- returns
- warranty
- enquiries

Customers can only access their own records.

---

# 31. Public Commerce Journey

The future commerce flow:

```text
Discover
 ↓
Browse
 ↓
Product
 ↓
Add to Cart / Enquire
 ↓
Customer Details
 ↓
Delivery
 ↓
Payment
 ↓
Order Confirmation
 ↓
Stock Reservation
 ↓
Fulfilment
 ↓
Delivery
 ↓
Tracking
 ↓
After-Sales
```

The exact payment provider and payment flow will be selected later.

---

# 32. Public Website Behaviour During Phase 1

Before online checkout is activated, the site can support:

- product discovery
- enquiries
- contact
- product requests
- availability requests

The website must be designed so commerce can be activated later without rebuilding the catalogue.

---

# 33. Public Website SEO

Every public product/category/page must support:

- title
- description
- canonical URL
- Open Graph metadata
- structured data where appropriate
- sitemap
- robots controls
- clean URLs
- indexability control
- image metadata

Products that are unpublished must not be indexed.

---

# 34. Website Performance

Use Next.js rendering strategically.

## Static/ISR suitable content

- About
- FAQ
- policies
- category landing pages
- product pages where appropriate

## Dynamic data

- availability
- customer account
- orders
- payment status
- personalized information

Do not cache private customer information publicly.

Vercel documents ISR as a way to update content without rebuilding the entire site, which is useful for product/category content that changes through Business Admin. citeturn0search7

---

# 35. Website Image Strategy

Product and marketing images should:

- use optimized formats
- use responsive sizes
- include alt text
- avoid unnecessarily huge downloads
- use the Next.js image system where appropriate

The source of approved media remains the Amaal business/media system.

---

# 36. Notifications

Business notifications:

- new sale
- new order
- low stock
- overdue payment
- purchase approval
- delayed delivery
- return
- warranty
- website enquiry
- content awaiting publication

Customer notifications:

- order confirmation
- payment confirmation
- order ready
- dispatch
- delivery
- return update
- warranty update

The notification system should eventually be driven by business events from the engine rather than separate duplicate business logic.

---

# 37. Global Search

Business Admin search:

- products
- customers
- orders
- sales
- suppliers
- purchase orders
- stock
- staff
- reports
- website content

Public search:

- products
- brands
- categories

Never expose technical records through either search.

---

# 38. Business Event Model

The engine should remain the event authority.

Examples:

```text
SALE_COMPLETED
STOCK_RECEIVED
STOCK_ADJUSTED
PURCHASE_APPROVED
ORDER_CREATED
ORDER_CONFIRMED
ORDER_DISPATCHED
ORDER_DELIVERED
PAYMENT_RECEIVED
RETURN_CREATED
WARRANTY_CREATED
PRODUCT_PUBLISHED
PRODUCT_UNPUBLISHED
WEBSITE_CONTENT_PUBLISHED
```

Business Admin consumes these events as appropriate.

Public Website consumes only public-safe effects.

Technical Console retains full technical visibility.

---

# 39. Website Publishing Model

A product should not automatically become public simply because it exists internally.

Recommended lifecycle:

```text
Internal Product
      ↓
Business Content Prepared
      ↓
Review
      ↓
Approve
      ↓
Publish
      ↓
Public Website
```

Unpublish:

```text
Public
 ↓
Unpublish
 ↓
No longer publicly discoverable
```

The underlying product record remains intact.

---

# 40. Data Ownership

## Product

Technical engine owns the master record.

Business Admin controls approved business/public presentation.

Public Website reads approved public fields.

## Stock

Technical engine owns stock truth.

Business Admin reads operational stock.

Public Website receives only public availability.

## Finance

Technical engine owns financial truth.

Business Admin provides authorized business workflows and reporting.

Public Website only receives customer-relevant payment/order information.

## Customer

Technical engine owns customer records.

Customer Website account exposes only the authenticated customer's own data.

## Website Content

Business Admin controls publication.

Public Website consumes published content.

---

# 41. Caching and Freshness

Caching must be deliberate.

## Public cacheable

- published products
- categories
- public pages
- promotions

## Short freshness

- product availability
- pricing where frequently changed

## Never public-cache

- customer account
- orders
- payment details
- private enquiries
- staff data
- finance

A product price change must have a defined propagation policy so customers do not see stale pricing beyond an acceptable business threshold.

---

# 42. Error Behaviour

Business Admin errors must use business language.

Bad:

> API 500: database query failed.

Better:

> We couldn't load today's sales. Please try again.

Technical details remain available in the Technical Console/logs.

Public Website errors should be even simpler:

> We couldn't load these products right now. Please try again.

No stack traces.

No SQL errors.

No internal IDs.

---

# 43. Loading Behaviour

Every important screen needs:

- skeleton/loading state
- empty state
- error state
- retry
- success confirmation

Example:

No products:

> No products have been added yet.

Not:

> SELECT returned 0 rows.

---

# 44. Security Model

## Technical Console

Full technical authority according to existing permissions.

## Business Admin

Business permissions.

## Public Website

Public data only.

## Customer Account

Own customer data only.

Server-side authorization is mandatory.

Frontend route hiding is not security.

---

# 45. CORS and Origin Policy

The Render engine must explicitly allow the production Business Admin and Public Website origins.

Example conceptual origins:

```text
https://business.amaaltelecoms.com
https://amaaltelecoms.com
```

Preview environments must be handled intentionally and must not accidentally gain production-level access.

CORS must never be changed to unrestricted `*` for authenticated business APIs.

---

# 46. Environment Management

Vercel provides separate Development, Preview and Production environments, with environment-specific variables. This should be used for Amaal's development lifecycle. citeturn0search1turn0search2

## Business Admin

Development:
- local Render development API

Preview:
- controlled staging/preview API

Production:
- production Render API

## Public Website

Development:
- development API/data

Preview:
- safe preview data or controlled staging API

Production:
- production public API

Sensitive environment variables must remain server-side and should be stored in Vercel's environment-variable system rather than source control. Vercel supports separate environment scopes and sensitive values. citeturn0search2turn0search5

---

# 47. Domains

Recommended final architecture:

```text
amaaltelecoms.com
Public Website

business.amaaltelecoms.com
Business Admin

console.amaaltelecoms.com
Technical Console
Render
```

The exact domain names can be changed later.

Vercel supports custom domains and DNS configuration for projects. citeturn0search0

---

# 48. Repository Structure

Recommended separation:

```text
amaal-platform/
  business-admin/
  public-website/
  technical-console/
  docs/
```

The Technical Console remains the existing Phase 4 codebase.

Business Admin and Public Website should be independently deployable Vercel applications.

A future monorepo may share safe packages:

```text
packages/
  ui/
  types/
  validation/
  config/
```

But shared packages must never contain secrets or direct database access.

---

# 49. Shared Types

Where useful, TypeScript types may be generated or manually maintained from the API contract.

Examples:

- Product
- Category
- Customer
- Order
- Sale
- StockItem
- Supplier
- PurchaseOrder
- Payment
- WebsiteContent

The type layer must reflect the API contract.

It does not replace server validation.

---

# 50. API Contract Governance

Before implementing each Business Admin module:

1. Find the Phase 4 capability.
2. Find its current API route.
3. Identify request shape.
4. Identify response shape.
5. Identify permission.
6. Identify database source.
7. Identify audit behaviour.
8. Identify whether the endpoint is safe for Business Admin.
9. Identify whether a business adapter is needed.
10. Identify whether public data is required.

Only then build the UI.

---

# 51. Business Admin Development Phases

## BA-01 — Technical API Audit

Inventory:

- routes
- authentication
- permissions
- modules
- request/response shapes
- errors
- audit
- public-safe data

Deliverable:

`AMAAL_API_MAP.md`

## BA-02 — Business Admin Foundation

Build:

- Next.js
- TypeScript
- design system
- authentication bridge
- route protection
- navigation
- API client
- error handling
- notifications
- search foundation

## BA-03 — CEO / Superadmin

Build:

- Overview
- business health
- sales
- finance
- stock
- attention center
- quick actions

## BA-04 — Sales and Customers

Build:

- POS
- sales
- customers
- orders

## BA-05 — Products and Stock

Build:

- catalogue
- pricing
- stock
- stocktake
- transfers

## BA-06 — Purchasing

Build:

- suppliers
- requests
- purchase orders
- receiving
- supplier performance

## BA-07 — Finance and Credit

Build:

- finance
- expenses
- receivables
- payables
- reconciliation
- credit

## BA-08 — Delivery and Service

Build:

- delivery
- returns
- warranty
- repairs
- cases

## BA-09 — Website Management

Build:

- homepage
- products
- categories
- promotions
- pages
- media
- publishing

## BA-10 — Reports and Team

Build:

- reports
- business intelligence presentation
- staff
- branches
- performance

---

# 52. Public Website Development Phases

## PW-01 — Public API Audit

Identify:

- public-safe fields
- public endpoints
- product publication state
- category publication
- promotions
- content
- enquiry flow

## PW-02 — Website Foundation

Build:

- Next.js
- TypeScript
- design system
- SEO foundation
- public routing
- API layer
- error handling
- analytics architecture

## PW-03 — Discovery

Build:

- homepage
- shop
- categories
- search
- filters

## PW-04 — Product Experience

Build:

- product pages
- variants
- availability
- related products
- enquiry

## PW-05 — Content

Build:

- about
- contact
- FAQ
- delivery
- returns
- warranty
- policies

## PW-06 — Customer Accounts

Build:

- registration
- login
- profile
- addresses
- orders

## PW-07 — Commerce

Build:

- cart
- checkout
- payment
- order confirmation
- tracking

## PW-08 — After-Sales

Build:

- returns
- warranty
- service requests
- customer communication

---

# 53. Testing Strategy

## Technical Console regression

Every Business Admin change that depends on an existing Phase 4 endpoint must include a regression check against the Technical Console/API.

## Business Admin

Test:

- role access
- navigation
- data loading
- forms
- validation
- permissions
- state changes
- error handling
- mobile
- desktop

## Public Website

Test:

- SEO
- product browsing
- search
- mobile
- desktop
- public/private boundaries
- content publishing
- customer accounts
- checkout when enabled

## Integration

Test:

```text
Technical Console
       ↕
Business Admin
       ↕
Public Website
```

No duplicate source of truth is permitted.

---

# 54. Critical End-to-End Tests

## Product publication

```text
Technical Console
   ↓
Product exists
   ↓
Business Admin
   ↓
Prepare public content
   ↓
Approve
   ↓
Publish
   ↓
Public Website
   ↓
Product visible
```

## Price change

```text
Business Admin
   ↓
Approved price change
   ↓
Render engine
   ↓
Public product
   ↓
Updated public price
```

## Order

```text
Customer
   ↓
Public Website
   ↓
Order
   ↓
Render engine
   ↓
Business Admin
   ↓
Stock
   ↓
Finance
   ↓
Delivery
```

## Return

```text
Customer
   ↓
Public Website
   ↓
Return request
   ↓
Business Admin
   ↓
Service
   ↓
Inventory
   ↓
Finance
```

---

# 55. Observability

The Technical Console remains the technical observability authority.

Business Admin receives business-friendly health indicators only where useful:

- Payments connected
- Website connected
- Messaging connected
- Data synchronized

It must not expose:

- raw logs
- stack traces
- database health internals
- API diagnostics
- server configuration

---

# 56. AI

Existing Phase 4 AI capabilities remain in the Technical Console/engine.

Business Admin may present AI-generated business insights through a controlled business interface.

Examples:

- sales summary
- unusual sales movement
- stock attention
- purchasing suggestions
- management summary

AI must never become the source of truth.

AI recommendations should be clearly distinguishable from confirmed business records.

---

# 57. Analytics

Public analytics and business analytics must be separated.

## Public

- page views
- product views
- search activity
- enquiries
- conversion
- checkout behaviour

## Business

- sales
- revenue
- profit
- inventory
- customers
- procurement
- finance

Business metrics remain derived from the authoritative engine.

---

# 58. Performance Budgets

Public Website:

- prioritize fast first load
- minimize JavaScript sent to visitors
- optimize images
- cache public content
- avoid unnecessary client rendering

Business Admin:

- fast dashboard
- paginated large tables
- server-side filtering for large datasets
- lazy-load heavy reports
- avoid loading every module on startup

---

# 59. Accessibility

Both applications must target strong accessibility:

- keyboard navigation
- semantic HTML
- visible focus
- readable contrast
- form labels
- meaningful error messages
- accessible dialogs
- responsive text
- screen-reader-friendly controls

---

# 60. Mobile Strategy

Business Admin must work on:

- smartphones
- tablets
- laptops
- desktop

POS should be optimized for touch.

Public Website must be mobile-first because customers may primarily access it from phones.

---

# 61. Business Language Rules

Never expose:

- API endpoint
- payload
- database
- SQL
- webhook
- server
- deployment
- infrastructure
- UUID
- JSON
- token
- internal ID

Use:

- Business Connection
- Website
- Product
- Customer
- Order
- Payment
- Stock
- Team
- Report
- Business Setting

Technical terminology remains available only inside the Technical Console.

---

# 62. What the CEO Should Experience

When the CEO opens Business Admin:

```text
Amaal Telecoms

Good morning.

Business Overview

Revenue        UGX ...
Gross Profit   UGX ...
Sales          ...
Stock Value    UGX ...
Receivables    UGX ...

Needs Attention

3 low-stock products
2 overdue payments
1 purchase awaiting approval
4 website enquiries

Performance

Sales
Revenue
Profit
Branches
Products

Quick Actions

New Sale
Add Product
Receive Stock
View Orders
Manage Website
Reports
```

The CEO should not need to understand the underlying technology.

---

# 63. What the Customer Should Experience

When a customer opens the Public Website:

```text
Amaal Telecoms

Home
Shop
Phones
Accessories
Electronics
Deals
About
Contact

Search products...

Featured Products

Popular Categories

Latest Deals

Need help?
Contact Amaal Telecoms
```

The customer should never see the technical console or business admin.

---

# 64. What the Technical Administrator Experiences

The existing Phase 4 Technical Console remains the place for:

- technical diagnostics
- integrations
- infrastructure-facing controls
- system operations
- monitoring
- backup/recovery
- advanced permissions
- technical audit
- developer troubleshooting

This is deliberately separate from Business Admin.

---

# 65. Deployment Model

Vercel supports Local, Preview and Production environments, which should be used for both new applications. citeturn0search1

Recommended:

```text
LOCAL
  ↓
PREVIEW
  ↓
BUSINESS QA
  ↓
PRODUCTION
```

For the public website:

```text
LOCAL
  ↓
PREVIEW
  ↓
CONTENT QA
  ↓
PRODUCTION
```

Every production deployment must be traceable to a tested preview.

Vercel supports preview deployments for changes and production deployment promotion, which fits this workflow. citeturn0search1turn0search3

---

# 66. Environment Secrets

Never commit:

- Render API secrets
- authentication secrets
- database credentials
- payment secrets
- email secrets
- AI keys

Vercel environment variables are environment-scoped and can hold sensitive values outside source code. citeturn0search2turn0search5

The public website must only receive variables intentionally marked public.

---

# 67. Production Domain Strategy

Final target:

```text
https://amaaltelecoms.com
        ↓
Public Website

https://business.amaaltelecoms.com
        ↓
Business Admin

https://console.amaaltelecoms.com
        ↓
Technical Console
```

The customer should only ever need to know the public domain.

Business users use the Business domain.

Technical users use the Technical Console.

---

# 68. Migration and Compatibility Rule

There is no migration of the Phase 4 application to Vercel.

There is no replacement of Render.

There is no PostgreSQL migration as part of this architecture.

There is no duplicate business database.

The new applications are consumers of the existing engine.

If an existing Phase 4 API is insufficient, add the smallest controlled API capability required in the Render engine.

---

# 69. Engineering Rule for Every New Feature

Before writing code:

```text
1. Identify Phase 4 module
2. Identify existing data
3. Identify existing API
4. Identify existing permission
5. Identify existing audit
6. Identify business requirement
7. Identify public requirement
8. Define API contract
9. Build Business Admin
10. Build Public Website behaviour if needed
11. Test against Render
12. Test permissions
13. Test mobile
14. Test public/private boundaries
15. Test end-to-end
```

---

# 70. Definition of Done

A Business Admin feature is not complete until:

- it uses the existing engine correctly
- it respects permissions
- it has business terminology
- it works on mobile
- it handles loading
- it handles errors
- it handles empty states
- it is audited
- it has appropriate tests
- it does not duplicate business data

A Public Website feature is not complete until:

- it uses approved public data
- it does not expose private data
- it works on mobile
- it is SEO-ready where applicable
- it has loading/error states
- it has appropriate tests
- it connects correctly to Business Admin/engine

---

# 71. Final Product Vision

Amaal Telecoms should eventually operate as:

```text
                         CUSTOMER
                            |
                            v
                 +----------------------+
                 |   AMAAL PUBLIC WEB   |
                 |      VERCEL          |
                 +----------+-----------+
                            |
                            v
                 +----------------------+
                 |   BUSINESS ADMIN     |
                 |      VERCEL          |
                 | CEO / STAFF          |
                 +----------+-----------+
                            |
                       CONTROLLED API
                            |
                            v
                 +----------------------+
                 | AMAAL SUPER ENGINE   |
                 |       RENDER         |
                 | Existing Phase 4     |
                 +----------+-----------+
                            |
             +--------------+--------------+
             |                             |
             v                             v
      TECHNICAL CONSOLE              POSTGRESQL
```

The customer sees the brand.

The CEO sees the business.

Staff see their work.

Technical administrators see the engine.

All four perspectives operate on the same underlying business truth.

---

# 72. Immediate Next Step

Do not continue adding random Business Admin features.

The next engineering action is:

## Phase 5A — Technical Console/API Discovery

Use the actual Phase 4 ZIP to produce:

- complete route inventory
- module inventory
- permission matrix
- API inventory
- data ownership map
- public-safe data map
- Business Admin API requirements
- Public Website API requirements
- authentication/session map
- integration dependency map
- database dependency map
- exact gaps between Phase 4 and the new experiences

Only after this audit should the Business Admin Next.js application be built.

This guarantees that the new applications are genuinely built **from the Technical Console**, not alongside it.

---

# 73. Non-Negotiable Architecture

> **Render remains the super engine.**

> **Phase 4 remains the technical foundation.**

> **Business Admin does not replace Phase 4.**

> **Public Website does not replace Business Admin.**

> **Business Admin does not contain technical modules.**

> **CEO and Superadmin are the same highest business role.**

> **PostgreSQL remains one source of truth.**

> **Vercel hosts the new customer and business experiences.**

> **Render hosts the existing engine and Technical Console.**

> **Every new feature must first be mapped to the existing engine.**

> **No duplicate business truth.**

> **No direct Vercel-to-PostgreSQL administration.**

> **No production feature ZIP is considered complete until the integration has been validated.**

---

# 74. Technology Summary

| Layer | Technology | Purpose |
|---|---|---|
| Technical Console | Node.js 20 | Existing runtime |
| Technical Console | Express 5 | Existing API/server |
| Technical Console | JavaScript | Existing application |
| Technical Database | PostgreSQL | Existing source of truth |
| Business Admin | TypeScript | Type safety |
| Business Admin | React | UI |
| Business Admin | Next.js App Router | Application framework |
| Business Admin | Tailwind CSS | Responsive design system |
| Business Admin | TanStack Query | Client server-state management |
| Business Admin | React Hook Form | Complex forms |
| Business Admin | Zod | Runtime validation |
| Business Admin | Recharts/equivalent | Business charts |
| Business Admin | Playwright | End-to-end tests |
| Business Admin | Vitest | Unit/component tests |
| Business Hosting | Vercel | Deployment |
| Public Website | TypeScript | Type safety |
| Public Website | React | UI |
| Public Website | Next.js App Router | SEO/performance/routing |
| Public Website | Tailwind CSS | Responsive design |
| Public Website | Zod | API validation |
| Public Website | Playwright | E2E testing |
| Public Website | Vitest | Unit testing |
| Public Hosting | Vercel | Deployment/CDN/platform |
| API | Existing Render API | Business engine connection |
| Authentication | Existing Phase 4 identity foundation | Preserve existing authority |
| Data | Existing PostgreSQL | Single source of truth |
| Secrets | Render/Vercel environment variables | Secure configuration |
| CI/CD | Git + Vercel previews + production deployments | Controlled delivery |

---

# 75. Final Rule

**The new code should be smarter about the existing system, not independent of it.**

Every screen, route, form, report, website feature and customer workflow must answer:

> **Which Phase 4 capability powers this?**

If there is no answer, we stop and design the engine/API contract before building the UI.

That is how Amaal becomes one platform instead of three disconnected applications.
