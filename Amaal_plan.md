# Amaal Plan

## Amaal Telecoms Business Experience & Public Platform Master Plan

**Status:** Planning baseline  
**Purpose:** Define the complete Business Admin and Public Website before implementation  
**Technical Console:** Existing Phase 4 system on Render  
**Business Admin:** New business-facing application, planned for Vercel  
**Public Website:** New customer-facing application, planned for Vercel  
**Source of truth:** Existing Amaal Telecoms business engine and PostgreSQL database

---

# 1. Core Architecture

Amaal Telecoms will operate as three connected experiences.

```text
                    AMAAL TELECOMS
                          |
             +------------+------------+
             |                         |
      PUBLIC WEBSITE              BUSINESS ADMIN
          Vercel                     Vercel
             |                         |
             +------------+------------+
                          |
                 Existing Business API
                          |
                    Render Engine
                          |
              Technical Developer Console
                          |
                     PostgreSQL
```

## 1.1 Technical Console

The existing Phase 4 application remains the technical and operational console.

It remains responsible for the existing:

- APIs
- database access
- authentication foundation
- permissions
- integrations
- system operations
- monitoring
- backup and recovery
- technical configuration
- advanced administration
- existing business modules and transactions

It is not redesigned into the CEO interface.

## 1.2 Business Admin

The Business Admin is a new experience built on top of the existing engine.

It must:

- use existing Phase 4 capabilities as its source of truth
- expose business concepts rather than technical concepts
- respect existing authentication and permissions
- provide role-specific experiences
- avoid developer terminology
- avoid exposing database, API, webhook, deployment or infrastructure controls
- work on phones, tablets and desktops
- connect to the same business data used by the technical console
- control approved public website content
- never create a second product, inventory, customer or finance database

## 1.3 Public Website

The Public Website is a separate customer-facing experience.

It must:

- use approved business data
- expose only public information
- never expose internal administration routes
- never expose technical APIs or internal IDs
- support search, browsing and product discovery
- eventually support enquiries, orders, payments and customer accounts
- reflect approved product and content changes from Business Admin
- return customer activity back into the business engine

---

# 2. Platform Principles

1. One business source of truth.
2. Existing Phase 4 engine remains authoritative.
3. Business Admin is a presentation and business workflow layer.
4. Public Website is a customer experience layer.
5. Technical Console remains a separate technical experience.
6. No technical modules in Business Admin.
7. No database reset.
8. No duplicate business databases.
9. No unnecessary replacement of existing APIs.
10. Every new screen must map to an existing engine capability or a clearly planned additive capability.
11. Public data must be explicitly approved before publication.
12. Financial, inventory and order information must remain authoritative from the existing engine.
13. Role permissions must be enforced by the backend, not only hidden in the frontend.
14. Every business action must remain auditable.
15. Mobile-first design is mandatory.

---

# 2.1 Business UI/UX Visual Direction

## Design objective

Amaal Telecoms Business Admin must feel like a real business-management system rather than a collection of decorative admin pages.

The product should communicate:

- operational control
- financial clarity
- trustworthy data
- fast decision making
- premium corporate quality
- consistency across every workspace

The visual direction is **premium business software with restrained glassmorphism**, not a futuristic/AI-heavy interface.

## Visual language

### Brand foundation

- Warm ivory / light stone application background.
- Deep charcoal primary typography.
- Champagne/gold as the Amaal brand accent.
- Soft white/translucent surfaces for selected glass panels.
- Subtle borders, blur and shadows.
- Generous whitespace and clear hierarchy.
- Rounded corners, but not excessive pill-shaped UI.

### Gold usage rule

Gold is a brand and importance signal, not a universal chart color.

Use gold primarily for:

- primary actions
- selected navigation
- important KPI emphasis
- revenue/profit highlights
- premium status indicators
- important approvals

Do not color every graph gold. Data visualizations must use a deliberate semantic palette so categories remain distinguishable and accessible.

### Glassmorphism rule

Glassmorphism should be strongest on:

- Login
- Setup
- Modal dialogs
- Command palette
- selected premium cards

The core business dashboard should remain mostly clean and readable. Charts, tables and dense operational data should sit on stable surfaces rather than highly transparent backgrounds.

## Dashboard philosophy

Every dashboard must follow this information hierarchy:

```text
KPI SUMMARY
    ↓
TREND / PERFORMANCE
    ↓
COMPOSITION / BREAKDOWN
    ↓
OPERATIONAL DETAIL
    ↓
ATTENTION / ACTIONS
```

A dashboard must answer both:

1. **What is happening?**
2. **What should I do next?**

Dashboards must not become collections of unrelated cards.

## Executive Overview

The Overview is the owner/CEO command center.

Recommended structure:

```text
Page Header
  ├─ Greeting / business context
  ├─ Global search
  ├─ Notifications
  └─ Date / period selector

KPI Row
  ├─ Revenue
  ├─ Gross Profit
  ├─ Sales / Orders
  └─ Cash / Receivables where permitted

Performance Row
  ├─ Revenue & Sales trend
  └─ Sales composition / category distribution

Management Row
  ├─ Profit vs Expenses
  └─ Attention Center

Operational Row
  └─ Recent sales / orders / activity
```

### Executive KPI cards

KPI cards should show:

- metric name
- current value
- comparison period
- percentage or directional change when available
- optional sparkline
- click-through destination

Example:

```text
Revenue
UGX 12.5M
↑ 14.2% vs previous period
```

Never invent a metric. If the authoritative engine does not expose it to the current role, display an em dash (`—`) or an explicit unavailable state rather than a fabricated zero.

## Attention Center

The Overview must include an operational Attention Center.

Examples:

- Low-stock products
- Out-of-stock products
- Overdue customer payments
- Orders awaiting fulfilment
- Purchase requests awaiting approval
- Delayed deliveries
- Failed/returned transactions where applicable

Each item should provide a direct action:

```text
8 products low in stock       View stock →
UGX 2.4M overdue payments     Review credit →
5 orders awaiting fulfilment  View orders →
```

This turns the dashboard from a reporting screen into a management tool.

## Chart selection rules

Do not use pie/donut charts simply because they look attractive. Select the chart according to the business question.

| Business question | Preferred visualization |
|---|---|
| Are sales growing? | Line / area chart |
| Which period performed best? | Bar chart |
| Revenue vs expenses? | Grouped/combined bars |
| What makes up sales? | Donut chart |
| Which products sell most? | Horizontal ranked bar |
| Where is stock concentrated? | Bar chart |
| Payment-method mix? | Donut chart |
| Are targets being reached? | Progress / bullet visualization |
| Branch comparison? | Bar chart |
| Customer growth? | Line chart |
| Outstanding credit? | Bar chart + KPI |
| Delivery status? | Donut/status breakdown |
| Stock movement? | Stacked bar / trend |
| Profit margin? | Line + KPI |
| Product performance? | Ranked table + sparkline |

### Visualization rules

- Use consistent scales.
- Label important values directly where practical.
- Keep legends close to the visualization.
- Avoid 3D charts.
- Avoid decorative gradients that imply false data magnitude.
- Use accessible contrast.
- Keep categorical colors stable across the application.
- Provide a data/table alternative for dense or mobile charts.
- Tooltips may expose exact values without overcrowding the chart.
- Time-series charts must clearly expose the selected period.

## Sales dashboard

Sales should answer:

> How much are we selling, what is driving sales, and where is performance changing?

Core visual blocks:

- Revenue
- Transactions
- Average sale
- Gross profit
- Sales performance trend
- Sales by category
- Payment methods
- Top products
- Sales history
- Quotes and approvals

## Products dashboard

Products should combine catalogue management with product intelligence.

Core visual blocks:

- Total products
- Active products
- Published products
- Low-stock products
- Out-of-stock products
- Product/category distribution
- Top-selling products
- Pricing information
- Website publishing status

## Stock dashboard

Stock should feel like a warehouse control center.

Core visual blocks:

- Total stock value
- Units in stock
- Low stock
- Out of stock
- Reserved stock
- Stock by category/branch
- Fast-moving products
- Slow-moving products
- Stock movement trend
- Products requiring reorder/action

## Finance dashboard

Finance must feel conservative, clear and trustworthy.

Core visual blocks:

- Cash position
- Revenue
- Expenses
- Gross profit
- Net profit
- Accounts receivable
- Accounts payable
- Credit exposure
- Revenue vs expenses
- Cash flow
- Receivables/payables aging
- Transactions

## Customers dashboard

Customers should answer:

> Who buys from Amaal, how often, and how valuable are they?

Core visual blocks:

- New customers
- Returning customers
- Customer growth
- Revenue by customer group
- Top customers
- Credit exposure
- Customer location where authoritative data exists

## Purchasing dashboard

Purchasing should answer:

> What should we buy, from whom, and how much are we spending?

Core visual blocks:

- Purchase spend
- Pending purchase orders
- Supplier balances
- Supplier performance
- Delivery/receiving performance
- Purchase trend
- Spend by category

## Orders and Delivery

Orders should expose the operational pipeline:

```text
Received → Confirmed → Processing → Ready → Delivered
```

Delivery should expose:

- today's deliveries
- pending deliveries
- in transit
- delivered
- delayed
- failed

Future map/location functionality must only use authoritative location data from the existing engine.

## Reports vs Dashboards

The dashboard answers:

> **What is happening?**

Reports answer:

> **Let me investigate.**

Reports therefore need richer filters and drill-down:

- date range
- branch
- staff
- product
- customer
- supplier
- payment method
- category
- export
- drill-down

## Mobile UX

Mobile is a first-class experience, not a shrunken desktop layout.

On small screens:

- KPI cards stack or become horizontally scrollable.
- Charts simplify and remain readable.
- Dense tables become cards or controlled horizontal scrolling.
- Chart legends may collapse into an accessible data view.
- Attention items remain immediately actionable.
- Primary actions remain reachable without excessive scrolling.
- Filters should use compact mobile controls.

## Reusable Business UI component system

Before expanding individual workspaces, establish reusable components:

### Navigation

- Sidebar
- Mobile navigation
- Breadcrumbs
- Page header

### Data visualization

- KPI card
- Comparison KPI
- Sparkline
- Chart card
- Donut card
- Ranking card
- Data table
- Status badge
- Activity timeline

### Operations

- Attention card
- Approval card
- Quick action
- Empty state
- Loading state
- Error state
- Confirmation dialog
- Filter bar
- Date-range selector

### Global interaction

- Global search
- Command palette
- Notifications
- User menu

All workspaces should reuse these components so Sales, Stock, Finance, Customers and the other modules feel like one coherent product.

## Data integrity and visualization contract

The existing Render business engine and PostgreSQL database remain the authoritative source of truth.

Business Admin must:

1. Read from existing engine contracts.
2. Never create a second business database.
3. Never copy authoritative business tables into Vercel.
4. Never expose PostgreSQL credentials to browser code.
5. Never fabricate dashboard values.
6. Respect backend permissions.
7. Display unavailable data honestly.
8. Make every KPI/chart traceable to an existing business data source.
9. Keep finance, inventory, order and operational history authoritative in the existing engine.
10. Avoid destructive database changes during UI/dashboard work.

## Dashboard acceptance criteria

A workspace is not considered complete merely because it renders.

It must satisfy:

- Real data source identified for every metric.
- Permission behaviour verified.
- Loading state implemented.
- Empty state implemented.
- Error state implemented.
- Mobile layout verified.
- Chart labels and units verified.
- Period/filter behaviour verified.
- Click-through actions verified.
- No hard-coded business figures.
- No duplicate data store.
- No database reset or destructive migration.

## Visual reference assets

The project already contains visual references that should inform the design system, including:

- `Golden Glass Amaal Telecoms Login.png` — premium gold/glass login direction.
- `Vantage HRM People Management Dashboard.png` — dashboard composition and KPI/chart hierarchy reference.
- `Vantage HRM Payroll Confidence Dashboard.png` — KPI, trend and operational widget reference.
- `Monalisa Tech Solutions Poster(1).png` — existing premium navy/gold brand language reference.

These are references, not templates to copy literally. Amaal's final UI must retain its own business identity and use the existing engine's real data.

## Build sequence for the business experience

After the design system is locked:

1. Overview / Executive Dashboard
2. Sales workspace
3. Products workspace
4. Stock workspace
5. Purchasing workspace
6. Customers workspace
7. Orders and Delivery
8. Finance and Credit
9. Service
10. Website management
11. Reports / Business Intelligence
12. Team and role-specific experiences

Each stage must be validated against the existing engine before moving to the next stage.

# 3. Business Admin Information Architecture

The main Business Admin navigation should be intentionally short and understandable.

## Primary navigation

1. Overview
2. Sales
3. Products
4. Stock
5. Purchasing
6. Customers
7. Orders
8. Finance
9. Delivery
10. Service
11. Website
12. Reports
13. Team
14. Business Settings

The exact navigation displayed depends on the user's role.

---

# 4. Overview

The Overview is the executive starting point.

## 4.1 Executive Summary

Show:

- Today's sales
- Today's revenue
- Gross profit
- Sales count
- Average sale value
- Outstanding customer payments
- Amount owed to suppliers
- Current stock value
- Low-stock products
- Pending orders
- Pending deliveries
- Returns requiring attention
- Warranty cases requiring attention
- Website enquiries
- Website orders

## 4.2 Performance

- Sales trend
- Revenue trend
- Profit trend
- Product performance
- Category performance
- Branch performance
- Staff performance
- Payment method performance
- Customer growth

## 4.3 Attention Center

Business language only:

- Low stock
- Payment overdue
- Purchase awaiting approval
- Order awaiting fulfilment
- Delivery delayed
- Return awaiting review
- Warranty case awaiting action
- Website content awaiting publication
- Supplier issue
- Till difference

## 4.4 Quick Actions

- New Sale
- Add Product
- Receive Stock
- Create Purchase Request
- View Orders
- Add Customer
- Record Expense
- Manage Website
- View Reports

---

# 5. Sales

Sales is the main revenue workspace.

## 5.1 Sales Dashboard

- Today's sales
- Revenue
- Profit
- Number of transactions
- Average transaction
- Cash sales
- Credit sales
- Sales by branch
- Sales by staff
- Sales by product
- Sales trend

## 5.2 Point of Sale

- Product search
- Barcode/serial search
- Cart
- Customer selection
- Discounts
- Promotions
- Taxes
- Payment
- Split payment
- Credit/installment option
- Receipt
- Sale completion
- Suspended sale
- Sale history

## 5.3 Sales History

- Search
- Filter
- Date
- Branch
- Staff
- Customer
- Payment method
- Status
- Sale details
- Receipt
- Reprint
- Return/refund actions according to permission

## 5.4 Quotes

- Create quote
- Edit quote
- Send/share quote
- Convert quote to sale
- Quote history
- Quote status

## 5.5 Sales Approvals

- Discount approvals
- Price approvals
- Exceptional sales approvals
- Pending approvals
- Approval history

---

# 6. Products

Products becomes the business-friendly version of the Phase 4 Catalog.

## 6.1 Product Catalogue

- Product list
- Product details
- Product images
- Product description
- Brand
- Category
- Specifications
- Variants
- Serialisation
- Tags
- Status

## 6.2 Product Pricing

- Selling price
- Cost price where authorized
- Branch pricing
- Customer pricing
- Price lists
- Price history
- Promotions
- Discount rules
- Approval workflow

## 6.3 Product Publishing

- Publish to website
- Hide from website
- Featured product
- Website description
- Website images
- Website specifications
- Public availability
- Public price
- Publication status

## 6.4 Categories and Brands

- Categories
- Subcategories
- Brands
- Category ordering
- Website visibility
- Featured categories

## 6.5 Product Import and Export

Business-facing bulk tools:

- Import products
- Export catalogue
- Bulk status update
- Bulk pricing update
- Bulk website visibility

---

# 7. Stock

Stock is the business version of Phase 4 Inventory and Stock Control.

## 7.1 Stock Overview

- Total stock units
- Stock value
- Available stock
- Reserved stock
- Low stock
- Out-of-stock
- Damaged stock
- Stock by branch
- Stock by category

## 7.2 Stock Movements

- Receipts
- Transfers
- Adjustments
- Reservations
- Releases
- Sales movements
- Return movements

## 7.3 Stocktake

- Create stocktake
- Assign counters
- Count stock
- Scan serialized items
- Review differences
- Approve adjustments
- Finalize stocktake

## 7.4 Transfers

- Request transfer
- Approve transfer
- Ship transfer
- Receive transfer
- Transfer history

## 7.5 Stock Issues

- Damaged stock
- Lost stock
- Missing stock
- Stock discrepancy
- Investigation
- Resolution

## 7.6 Reordering

- Reorder suggestions
- Minimum stock levels
- Reorder rules
- Products needing purchase
- Supplier recommendations

---

# 8. Purchasing

Business-facing version of Procurement.

## 8.1 Purchasing Dashboard

- Open purchase requests
- Pending approvals
- Open purchase orders
- Goods awaiting receipt
- Supplier invoices
- Supplier payments
- Outstanding supplier balances

## 8.2 Purchase Requests

- New request
- Request details
- Approval
- Rejection
- Request history

## 8.3 Purchase Orders

- Create order
- Submit order
- Approve order
- Revise order
- Cancel order
- Close order
- Attach documents
- Track outstanding items

## 8.4 Receiving

- Expected deliveries
- Receive goods
- Partial receiving
- Serial capture
- Quantity verification
- Damaged goods
- Receipt history

## 8.5 Supplier Invoices

- Invoice list
- Invoice details
- Match invoice to purchase
- Exceptions
- Disputes
- Payment status

## 8.6 Supplier Payments

- Payment records
- Allocation
- Outstanding balances
- Payment history

## 8.7 Supplier Performance

- Purchase history
- Delivery performance
- Pricing history
- Quality issues
- Supplier rating
- Supplier documents

---

# 9. Customers

Business version of CRM.

## 9.1 Customer Directory

- Search
- Customer profile
- Contact information
- Addresses
- Customer status
- Customer group
- Tags

## 9.2 Customer Profile

- Customer overview
- Purchase history
- Orders
- Payments
- Outstanding balance
- Credit information
- Returns
- Warranty cases
- Service cases
- Interactions
- Notes

## 9.3 Customer Groups

- Create groups
- Assign customers
- Group pricing
- Promotions
- Customer segmentation

## 9.4 Customer Service

- Customer enquiries
- Follow-up tasks
- Cases
- Interactions
- Notes
- Resolution history

## 9.5 Customer Privacy

Business-friendly controls:

- Consent
- Contact preferences
- Privacy requests
- Data correction
- Authorized data actions

---

# 10. Orders

Orders connect the Public Website to the Business Admin.

## 10.1 Order Dashboard

- New orders
- Pending orders
- Confirmed orders
- Preparing
- Ready for delivery
- Delivered
- Cancelled
- Returned

## 10.2 Order Management

- Order details
- Customer
- Products
- Pricing
- Discounts
- Payment
- Fulfilment
- Delivery
- Status history

## 10.3 Fulfilment

- Confirm stock
- Reserve stock
- Prepare order
- Assign branch
- Pack order
- Mark ready
- Hand over to delivery

## 10.4 Payments

- Payment status
- Payment history
- Outstanding balance
- Refund status

## 10.5 Customer Communication

Business-facing actions:

- Order confirmation
- Payment confirmation
- Ready notification
- Delivery update
- Cancellation message

---

# 11. Finance

Finance remains powered by the existing Phase 4 Finance engine.

## 11.1 Finance Overview

- Revenue
- Gross profit
- Expenses
- Net result
- Cash position
- Receivables
- Payables
- Bank balances
- Tax position

## 11.2 Money In

- Sales payments
- Customer payments
- Other receipts
- Payment methods
- Cash collections

## 11.3 Money Out

- Expenses
- Supplier payments
- Refunds
- Other business payments

## 11.4 Expenses

- Record expense
- Expense categories
- Attach receipt
- Approval
- Expense history

## 11.5 Receivables

- Outstanding customers
- Ageing
- Due payments
- Collection actions
- Payment history

## 11.6 Payables

- Supplier balances
- Due invoices
- Payment schedule
- Payment history

## 11.7 Accounts

- Business accounts
- Cash accounts
- Bank transactions
- Balances

## 11.8 Reconciliation

- Reconciliation workspace
- Unmatched transactions
- Matched transactions
- Reconciliation history

## 11.9 Financial Reports

- Profit and loss
- Balance sheet
- Trial balance
- Cash flow
- Tax reports
- Sales reports
- Expense reports
- Receivables
- Payables

Technical journal controls remain in the Technical Console where appropriate.

---

# 12. Credit and Installments

Where the business model uses customer credit.

## 12.1 Credit Overview

- Active credit accounts
- Outstanding credit
- Overdue credit
- Collection workload

## 12.2 Applications

- Applications
- Customer eligibility
- Review
- Decision
- Approval history

## 12.3 Accounts

- Credit balance
- Installments
- Payment schedule
- Payment history
- Restructuring where authorized

## 12.4 Collections

- Collection tasks
- Overdue accounts
- Follow-ups
- Collection history

Sensitive financial controls remain permission-protected.

---

# 13. Delivery

Business-facing version of Delivery & Logistics.

## 13.1 Delivery Dashboard

- Orders ready
- In transit
- Delivered
- Failed deliveries
- Delayed deliveries

## 13.2 Deliveries

- Delivery list
- Delivery details
- Customer
- Address
- Driver/partner
- Status
- Attempts
- Proof/status information

## 13.3 Delivery Areas

- Zones
- Delivery fees
- Coverage
- Availability

## 13.4 Delivery Partners

- Partner list
- Performance
- Activity
- Assigned deliveries

---

# 14. Service

A unified customer after-sales workspace.

## 14.1 Returns

- Return requests
- Review
- Approval
- Received returns
- Refunds
- Return history

## 14.2 Warranty

- Warranty claims
- Product
- Customer
- Warranty status
- Service history
- Parts used
- Resolution

## 14.3 Repairs

- Repair cases
- Repair partners
- Status
- Parts
- Cost
- Customer communication
- Completion

## 14.4 Customer Cases

- Service cases
- Enquiries
- Follow-ups
- Resolution
- History

---

# 15. Website

This is the bridge between Business Admin and the Public Website.

## 15.1 Website Overview

Show:

- Website status
- Products published
- Categories published
- Featured products
- Active promotions
- Pending content
- Website enquiries
- Website orders
- Recent activity

## 15.2 Homepage

- Hero section
- Featured products
- Featured categories
- Promotions
- Promotional banners
- Content blocks
- Calls to action

## 15.3 Products

- Website visibility
- Product information
- Images
- Public price
- Availability
- Featured status
- Ordering availability

## 15.4 Categories

- Category visibility
- Ordering
- Category images
- Category descriptions

## 15.5 Promotions

- Campaigns
- Promotional banners
- Discount campaigns
- Featured products
- Start/end dates
- Publishing status

## 15.6 Pages

- About
- Contact
- FAQs
- Delivery information
- Returns
- Warranty
- Terms
- Privacy

## 15.7 Navigation

- Main navigation
- Footer navigation
- Links
- Menu ordering

## 15.8 Media

Business-facing media management:

- Product images
- Website banners
- Page images
- Logo
- Documents
- Search
- Organize
- Select media for content

Technical storage controls remain in the Technical Console.

## 15.9 Publishing

- Draft
- Review
- Approve
- Publish
- Unpublish
- Publication history

The public website must never expose unpublished content.

---

# 16. Reports

Reports should answer business questions.

## 16.1 Sales Reports

- Sales by day
- Sales by branch
- Sales by staff
- Sales by product
- Sales by category
- Sales by customer
- Payment method

## 16.2 Inventory Reports

- Stock valuation
- Stock movement
- Stock ageing
- Stock turnover
- Low stock
- Dead stock
- Stock discrepancies

## 16.3 Procurement Reports

- Purchase spend
- Supplier performance
- Purchase trends
- Open purchase orders

## 16.4 Finance Reports

- Profit and loss
- Cash position
- Expenses
- Receivables
- Payables
- Tax

## 16.5 Customer Reports

- Customer growth
- Customer value
- Repeat purchases
- Customer groups

## 16.6 Delivery Reports

- Delivery performance
- Failed deliveries
- Partner performance

## 16.7 Website Reports

- Product views
- Enquiries
- Orders
- Popular categories
- Featured product performance

## 16.8 Business Intelligence

Existing BI capabilities should be translated into:

- What happened?
- Why did it happen?
- What needs attention?
- Where is the opportunity?
- What should management review?

---

# 17. Team

Business-facing staff management.

## 17.1 Team Directory

- Staff list
- Branch
- Department
- Role
- Status

## 17.2 Staff Performance

- Sales
- Revenue
- Transactions
- Targets
- Attendance data where supported
- Performance trends

## 17.3 Branches

- Branch list
- Branch performance
- Stock
- Sales
- Staff
- Expenses

## 17.4 Departments

- Departments
- Managers
- Staff
- Department performance

## 17.5 Roles

Business role assignment only.

Examples:

- CEO
- Superadmin
- Manager
- Sales
- Inventory
- Finance
- Procurement
- Customer Service

The underlying permission engine remains in the technical layer.

---

# 18. Business Settings

This must remain business-focused.

## 18.1 Business Profile

- Business name
- Trading name
- Contact information
- Address
- Currency
- Business information

## 18.2 Branches

- Branch details
- Contact details
- Status

## 18.3 Sales Settings

- Receipt preferences
- Tax presentation
- Discount rules
- Payment methods

## 18.4 Customer Settings

- Customer groups
- Customer communication preferences
- Service policies

## 18.5 Stock Settings

- Stock thresholds
- Reorder preferences
- Transfer rules

## 18.6 Website Settings

- Website identity
- Contact details
- Social links
- Public business information

## 18.7 Connected Business Services

Only business-facing status and controls.

Examples:

- Payment service status
- Email service status
- Communication service status

Technical credentials, webhooks and infrastructure configuration remain in the Technical Console.

---

# 19. Notifications

Business notifications only.

Examples:

- New order
- Low stock
- Payment received
- Payment overdue
- Purchase approval
- Delivery delayed
- Return received
- Warranty claim
- Website enquiry
- Website content awaiting approval

Users can:

- View
- Mark read
- Filter
- Open related business record

---

# 20. Global Search

Search should feel like a business assistant.

Search:

- Products
- Customers
- Orders
- Sales
- Suppliers
- Purchase orders
- Stock
- Staff
- Reports
- Website content

Results should be grouped by business category.

Never expose raw database identifiers or technical records.

---

# 21. Role Experiences

## CEO

Primary experience:

- Overview
- Sales
- Finance
- Stock
- Customers
- Orders
- Reports
- Website

Focus:

- Business health
- Revenue
- Profit
- Cash
- Growth
- Risks
- Opportunities

## Superadmin

Primary experience:

- Overview
- All business modules
- Team
- Branches
- Business Settings
- Website
- Reports

Can manage the complete business experience while technical administration remains separate.

## Manager

Primary experience:

- Overview
- Sales
- Stock
- Purchasing
- Customers
- Orders
- Delivery
- Service
- Team
- Reports

## Sales Staff

Primary experience:

- Sales
- POS
- Customers
- Orders
- Products
- Sales history

## Inventory Staff

Primary experience:

- Stock
- Stocktake
- Transfers
- Receiving
- Purchasing
- Suppliers

## Finance Staff

Primary experience:

- Finance
- Sales
- Receivables
- Payables
- Expenses
- Reports

## Procurement Staff

Primary experience:

- Purchasing
- Suppliers
- Receiving
- Purchase orders
- Procurement reports

## Customer Service Staff

Primary experience:

- Customers
- Orders
- Returns
- Warranty
- Repairs
- Customer cases

---

# 22. Public Website Information Architecture

## Public navigation

1. Home
2. Shop
3. Phones
4. Accessories
5. Electronics
6. Deals
7. About
8. Contact

Customer account features appear after sign-in.

---

# 23. Public Homepage

## Hero

- Main business message
- Shop action
- Contact action
- Promotional campaign

## Featured Products

- Selected products
- Price
- Availability
- Product details

## Categories

- Phones
- Accessories
- Electronics
- Other approved categories

## Promotions

- Current offers
- Featured campaigns

## Trust Section

- Business information
- Customer service
- Warranty information
- Delivery information

## Latest Products

- New products
- Recently published products

## Contact

- Phone
- WhatsApp
- Email
- Location
- Social channels

---

# 24. Public Shop

## Product discovery

- Search
- Categories
- Brands
- Price range
- Availability
- Featured
- New arrivals

## Product cards

- Image
- Name
- Price
- Availability
- Short description
- Action

---

# 25. Public Product Page

- Product name
- Images
- Price
- Availability
- Description
- Specifications
- Variants
- Warranty information
- Delivery information
- Related products
- Enquiry
- Add to order/cart when commerce is enabled

Internal stock quantities must never be exposed unless intentionally configured as public availability.

---

# 26. Public Categories

Each category receives:

- Name
- Description
- Image
- Products
- Filters
- Sorting

---

# 27. Public Deals

- Promotions
- Discounts
- Featured products
- Campaigns
- Validity
- Terms where applicable

Only active approved promotions appear publicly.

---

# 28. Public Customer Account

Eventually:

- Register
- Sign in
- Profile
- Addresses
- Orders
- Payments
- Delivery status
- Returns
- Warranty
- Enquiries
- Saved products

Authentication must remain separate from staff administration.

---

# 29. Public Order Journey

The long-term customer journey is:

```text
Discover
   ↓
Browse
   ↓
Product
   ↓
Enquire / Add to Order
   ↓
Customer Details
   ↓
Delivery
   ↓
Payment
   ↓
Order Confirmation
   ↓
Fulfilment
   ↓
Delivery
   ↓
Tracking
   ↓
After-Sales Service
```

---

# 30. Public Website Content

Business Admin controls:

- Homepage
- About
- Contact
- FAQs
- Delivery
- Returns
- Warranty
- Policies
- Promotions
- Banners
- Product content
- Category content
- Navigation

The public website never directly becomes the source of truth for internal business data.

---

# 31. Website to Business Flow

## Product

```text
Technical Engine
      ↓
Business Admin
      ↓
Approve / Publish
      ↓
Public Website
```

## Customer enquiry

```text
Public Website
      ↓
Business Platform
      ↓
Customer
      ↓
Sales / Customer Service
```

## Order

```text
Public Website
      ↓
Order
      ↓
Business Admin
      ↓
Stock Reservation
      ↓
Payment
      ↓
Fulfilment
      ↓
Delivery
      ↓
Finance
```

## Return

```text
Customer
      ↓
Public Website
      ↓
Return Request
      ↓
Business Admin
      ↓
Service / Inventory / Finance
```

---

# 32. Security Architecture

## Public

May access:

- Published products
- Published categories
- Published pages
- Public promotions
- Public business information

May not access:

- Internal stock quantities
- Internal costs
- Employee data
- Finance
- Supplier information
- Internal customer data
- Technical APIs
- Technical Console

## Business Admin

Access controlled by role and backend permissions.

## Technical Console

Maintains advanced technical controls.

---

# 33. Domain Architecture

Recommended final structure:

```text
amaaltelecoms.com
        Public Website

business.amaaltelecoms.com
        Business Admin

console.amaaltelecoms.com
        Technical Console
        Render
```

The exact domain naming can be changed later without changing the architecture.

---

# 34. Deployment Architecture

## Render

Keep:

- Existing Phase 4 Node.js application
- Existing API
- Existing authentication foundation
- Existing PostgreSQL connection
- Existing technical console

## Vercel Business Admin

Recommended technology:

- Next.js
- React
- TypeScript
- CSS/Tailwind or an equivalent controlled styling system
- Secure server-side API communication with the Render engine

Next.js is a strong fit for this because it supports application routing, protected dashboard experiences, server-side data access, forms, authentication patterns and deployment on Vercel. Official Next.js documentation also demonstrates dashboard applications with authentication, PostgreSQL data access, search, mutations and protected routes. citeturn0search0turn0search2turn0search3

## Vercel Public Website

Recommended technology:

- Next.js
- React
- TypeScript
- Responsive design
- SEO-ready page architecture
- Image optimization
- Public data fetching from the existing business engine

Next.js has first-class Vercel deployment support, including custom domains, environment variables, CDN delivery and server-side functions. citeturn0search4turn0search6

---

# 35. API Strategy

The Business Admin and Public Website should consume the existing Render engine through controlled business APIs.

Do not expose the entire technical API surface to the public website.

Create an explicit public/business data boundary.

## Business API areas

- Dashboard
- Sales
- Products
- Stock
- Customers
- Orders
- Purchasing
- Finance
- Delivery
- Service
- Website
- Reports
- Team

## Public API areas

- Public business profile
- Published products
- Published categories
- Published promotions
- Published pages
- Public enquiries
- Customer authentication
- Customer orders
- Customer tracking

Technical endpoints remain private.

---

# 36. Data Ownership

## Products

Technical engine owns the master record.

Business Admin manages business presentation and approved publishing.

Public Website reads approved public fields.

## Inventory

Technical engine owns stock truth.

Business Admin displays operational stock.

Public Website receives only approved availability.

## Finance

Technical engine remains authoritative.

Business Admin displays and manages permitted business workflows.

Public Website receives only payment/order information relevant to customers.

## Customers

Business platform uses the existing CRM/customer data.

Public customers only see their own account information.

## Website

Business Admin controls publication.

Public Website consumes published content.

---

# 37. Audit and Traceability

Important business actions must remain auditable.

Examples:

- Product created
- Product price changed
- Product published
- Product unpublished
- Stock adjusted
- Purchase approved
- Sale completed
- Refund approved
- Expense recorded
- Customer information changed
- Order status changed
- Website content published

Audit records remain backed by the existing technical engine.

---

# 38. Business Admin UX Rules

Every screen should answer:

1. What is happening?
2. What needs attention?
3. What can I do?
4. What happened previously?

Avoid:

- API
- endpoint
- database
- webhook
- payload
- server
- deployment
- infrastructure
- UUID
- JSON
- technical IDs

unless the user is inside the separate Technical Console.

---

# 39. Public Website UX Rules

The website should be:

- Premium
- Fast
- Mobile-first
- Simple
- Trustworthy
- Searchable
- SEO-ready
- Accessible
- Commerce-ready
- Connected to real business data

Customers should never know or care that the business engine is hosted on Render.

---

# 40. Development Order

## Stage A — Technical Console Audit

Before building further:

- Audit Phase 4 routes
- Audit Phase 4 permissions
- Audit API contracts
- Audit business modules
- Audit schema
- Identify reusable endpoints
- Identify missing business-facing endpoints
- Identify public-safe data
- Identify data that must remain private

## Stage B — Business Admin Foundation

Build:

- Next.js application
- Authentication
- Business layout
- Role-aware navigation
- Responsive navigation
- Business routing
- API client
- Error handling
- Loading states
- Notifications
- Search
- Business design system

## Stage C — Executive Experience

Build:

- CEO dashboard
- Business overview
- Performance
- Attention center
- Quick actions

## Stage D — Core Operations

Build:

- Sales
- Products
- Stock
- Purchasing
- Customers
- Orders

## Stage E — Money and Service

Build:

- Finance
- Credit
- Delivery
- Returns
- Warranty
- Repairs

## Stage F — Website Management

Build:

- Website dashboard
- Products
- Categories
- Homepage
- Promotions
- Pages
- Media
- Publishing

## Stage G — Public Website

Build:

- Homepage
- Shop
- Categories
- Product pages
- Deals
- About
- Contact
- Customer account

## Stage H — Commerce

Build:

- Cart/order journey
- Checkout
- Payments
- Order confirmation
- Tracking
- Customer notifications

## Stage I — Unified Platform

Connect:

```text
Customer
   ↓
Website
   ↓
Order
   ↓
Sales
   ↓
Inventory
   ↓
Procurement
   ↓
Finance
   ↓
Delivery
   ↓
Customer Service
   ↓
Reports
```

---

# 41. What Must NOT Be Built Into Business Admin

The following stay outside the normal Business Experience:

- Database management
- SQL tools
- API management
- Webhook management
- Deployment controls
- Infrastructure monitoring
- Server controls
- Backup execution
- Recovery execution
- Raw integration configuration
- Technical event replay
- Technical feature flags
- Developer diagnostics
- Internal system jobs
- Raw audit/event debugging
- Internal IDs as user-facing concepts

These remain part of the Technical Console.

Business Admin may show a simple business status when necessary, such as:

> Payments connected

rather than:

> Payment API endpoint / webhook / secret / connection ID

---

# 42. Final Architecture

Amaal Telecoms should ultimately feel like one platform to the business while remaining three separate experiences technically.

```text
                         CUSTOMER
                            |
                            v
                 +---------------------+
                 |   PUBLIC WEBSITE    |
                 | amaaltelecoms.com   |
                 +----------+----------+
                            |
                            v
                 +---------------------+
                 |   BUSINESS ADMIN    |
                 | business.amaal...   |
                 +----------+----------+
                            |
                     Controlled API
                            |
                            v
                 +---------------------+
                 | EXISTING PHASE 4    |
                 | BUSINESS ENGINE      |
                 |       Render         |
                 +----------+----------+
                            |
             +--------------+--------------+
             |                             |
             v                             v
      Technical Console              PostgreSQL
      Developer/Admin
```

The Business Admin and Public Website are therefore **new experiences, not new sources of truth**.

---

# 43. Implementation Rule

Before each development phase:

1. Inspect the current technical console.
2. Identify the existing module and APIs.
3. Reuse existing functionality where possible.
4. Add only the missing API/data boundary required.
5. Build the business experience around the existing capability.
6. Test against the existing engine.
7. Test permissions.
8. Test mobile behaviour.
9. Test public/private data separation.
10. Test website synchronization.
11. Only package after validation.

**The technical console is the foundation. The Business Admin is the business experience. The Public Website is the customer experience.**

They must evolve together without becoming three separate systems.

---

# 44. Phase 5 Implementation Status — Sales Increment

**Latest implemented module:** Sales

The Business Admin Sales workspace now includes:

- Executive sales KPI summary using existing engine data.
- 30-day sales trend visualization.
- Payment-method composition visualization.
- Top-product sales ranking.
- Cashier performance comparison.
- Searchable and status-filtered sales history.
- Sale detail view with line items, payments, approvals and status history.
- Permission-aware quote visibility and quote approval/cancellation actions through existing engine routes.
- A Business Admin POS surface using the existing `/api/sales`, `/api/sales/products` and inventory-location contracts.
- Mobile-responsive layouts for the Sales workspace and POS.

### Non-negotiable implementation boundary

This increment does **not** introduce or modify a database, schema, migration, seed, reset, backup, recovery routine, or backend route. Business Admin only consumes the already-existing Phase 4/Render engine contracts.

All sale creation, stock validation, accounting posting, approval enforcement and audit logging remain inside the existing engine.

### Validation rule

The Sales module is considered complete only when:

1. Existing engine contracts remain unchanged.
2. Every displayed KPI/chart is derived from authoritative engine responses.
3. Permission-restricted data remains unavailable rather than fabricated.
4. POS submission uses the existing sales transaction endpoint only.
5. No local or Vercel database is introduced.
6. Build/type/lint checks pass in an environment with dependencies installed.
7. Mobile and desktop layouts are reviewed.
8. The entire Business Admin is regression-audited before packaging.

# 45. ERP UI/UX v2 — Executive Experience Refinement

The Business Admin is now treated as a **modern operational ERP**, not a collection of pages.

## 45.1 Master dashboard hierarchy

Every major management screen follows this information order:

```text
BUSINESS CONTEXT
      ↓
KPI / PERFORMANCE SUMMARY
      ↓
TREND / PERFORMANCE GRAPH
      ↓
COMPOSITION / BREAKDOWN
      ↓
OPERATIONAL DETAIL
      ↓
ATTENTION / EXCEPTIONS
      ↓
DIRECT ACTIONS
```

The Executive Overview is the visual master template for the rest of Business Admin.

## 45.2 Executive Overview v2

The dashboard now prioritizes:

- executive context and current period;
- revenue;
- gross profit / margin when exposed by the authoritative engine;
- open orders;
- stock pressure;
- revenue trend;
- payment composition;
- product contribution;
- operational Attention Centre;
- direct links into Sales, Stock, Customers and Orders.

Metrics must remain permission-aware and engine-backed.

Unavailable metrics remain `—` or an explicit unavailable state. The UI must never manufacture zeros.

## 45.3 ERP navigation model

The Business Admin navigation is grouped into:

- Command — Overview, Reports;
- Commerce — Sales, Products, Orders, Customers;
- Operations — Stock, Purchasing, Delivery, Service;
- Money — Finance, Credit;
- Business — Website, Team, Business Settings.

The grouping is visual only. Existing backend permissions remain authoritative.

## 45.4 Visual system

The platform uses a restrained premium business palette:

- deep navy for navigation and high-confidence actions;
- champagne/gold for brand emphasis and important actions;
- stable white surfaces for dense business information;
- muted slate text for supporting information;
- semantic status colours only where they communicate state.

Glassmorphism is reserved primarily for authentication, setup, modal and premium surfaces. Dense ERP tables and charts remain on stable readable surfaces.

## 45.5 Dashboard chart rules

Charts must answer a business question.

- Area/line charts: trends over time.
- Bar charts: ranking/comparison.
- Donut charts: composition where the number of categories remains small.
- Tables: investigation and exact operational detail.
- Attention rows: exceptions requiring action.

Gold is not used indiscriminately across data visualizations.

## 45.6 Mobile ERP experience

Mobile layouts must preserve the information hierarchy rather than simply shrinking desktop pages.

Priority on mobile:

1. context;
2. critical KPIs;
3. exceptions;
4. primary chart;
5. operational tables/workflows;
6. direct actions.

## 45.7 Current implementation status

Completed in this increment:

- Executive Overview visual redesign;
- ERP-style grouped navigation;
- improved topbar/search affordance;
- operational Attention Centre;
- executive trend chart;
- payment composition chart;
- product contribution chart;
- action strip for common workflows;
- responsive mobile dashboard hierarchy;
- visual consistency between the foundation and Sales module.

No backend or database changes are permitted for these UX improvements.

## 45.8 Next implementation

The next functional module remains **Products**.

Products must inherit the Executive Overview design language while becoming a real catalogue workspace with search, filters, product detail, variants, pricing visibility and publication controls using only existing authoritative engine contracts.

## 46. Products — Catalogue-First Workspace

Products is now the next completed functional increment and intentionally starts as a **catalogue-first workspace**, not a product-creation wizard.

### 46.1 Catalogue experience

The Products workspace is designed around fast discovery and commercial understanding:

- catalogue headline metrics;
- product search across name, slug, brand and category;
- brand, category, lifecycle-status and website-visibility filters;
- grid/list view toggle;
- product image/identity cards;
- SKU/variant count and price visibility;
- featured-product indication;
- publication/status badges;
- direct product-record navigation;
- honest empty states;
- responsive mobile catalogue behaviour.

### 46.2 Product record

The product detail surface provides:

- primary product visual;
- commercial identity;
- brand/category/type;
- website visibility;
- variant count;
- SKU and variant table;
- selling/wholesale price visibility;
- inventory-tracking state;
- catalogue metadata;
- tags;
- SEO metadata when available.

### 46.3 Data boundary

Products uses only existing authoritative engine contracts:

- `/api/catalog/summary`
- `/api/catalog/products`
- `/api/catalog/products/:id`
- `/api/catalog/brands`
- `/api/catalog/categories`

No new backend route, schema, migration, seed, table or database connection was introduced.

### 46.4 Deliberate scope

This increment does not attempt to redesign the entire catalogue-management backend. Product creation, editing, variant editing, image management, publishing, revisions, tags and bulk operations remain governed by the existing engine and will be expanded only in later catalogue-management increments.

The next major functional module remains **Stock** after the catalogue-first Products workspace is fully regression-tested.

## 46.5 Products — Business Admin Management Completeness

Before moving to Stock, the Products workspace must be treated as a complete business catalogue management surface, not read-only catalogue browsing.

The Business Admin must expose every product-management capability already provided by the authoritative technical/Phase 4 engine, while keeping technical administration itself separate.

### Product creation

Admin users with `catalog.manage` must be able to create a product with the existing engine fields:

- name and slug;
- brand and category;
- product type;
- short and full description;
- specifications JSON;
- lifecycle status;
- website visibility;
- featured flag;
- SEO title and description;
- promotion type/label/start/end;
- initial SKU/variant;
- barcode;
- variant name;
- colour, storage and size;
- cost, selling, compare-at and wholesale prices;
- tax rate;
- inventory tracking;
- serialized/IMEI mode;
- weight and dimensions.

### Product enrichment

Admin users must be able to continue enriching an existing product through the existing engine:

- edit commercial identity;
- add variants;
- add product images;
- set primary image;
- assign variant-specific images;
- assign and manage product tags;
- create brands;
- edit brands;
- create categories;
- edit categories;
- create tags;
- manage related/cross-sell/upsell relationships;
- control website publication;
- inspect revision history;
- restore a previous product revision;
- perform controlled bulk import;
- perform controlled bulk status updates;
- export catalogue data where the user has `catalog.export`.

### Technical Console parity rule

Before implementing a Products capability, compare the Business Admin against the corresponding authoritative Phase 4/technical-console API contract.

The current audit identified the following existing product-management contracts:

- `/api/catalog/products`
- `/api/catalog/products/:id`
- `/api/catalog/products/:id/variants`
- `/api/catalog/variants/:id`
- `/api/catalog/products/:id/images`
- `/api/catalog/images/:id`
- `/api/catalog/products/:id/publish`
- `/api/catalog/products/:id/tags`
- `/api/catalog/products/:id/relationships`
- `/api/catalog/products/:id/revisions`
- `/api/catalog/products/:id/revisions/:revisionId`
- `/api/catalog/products/:id/revisions/:revisionId/restore`
- `/api/catalog/products/bulk-status`
- `/api/catalog/import`
- `/api/catalog/export`
- `/api/catalog/brands`
- `/api/catalog/categories`
- `/api/catalog/tags`

The Business Admin may consume these existing contracts through its secure same-origin proxy, but must not duplicate their business logic or connect directly to PostgreSQL.

### Product-management UX

The catalogue remains catalogue-first. Management actions should appear progressively:

1. discover product;
2. open product record;
3. edit identity;
4. enrich variants/media/tags;
5. merchandise relationships;
6. review publication readiness;
7. publish or keep hidden;
8. inspect history when required.

Bulk import must require validation before committing a batch. The UI must explain that the authoritative engine performs the final validation and database write.

### Product-management acceptance criteria

A user with the appropriate permissions must be able to add a complete product without opening the technical console for normal business catalogue work.

The Business Admin must not expose technical infrastructure controls, raw SQL, database administration, secrets, or internal operational configuration.

---

# Purchasing Module Build Record — 2026-08-27

## Status
Business Admin Purchasing workspace added on top of the existing procurement and supplier capabilities.

## Technical Console comparison completed
The existing supplier/procurement capability was inspected before implementation. The Business Admin now provides a business-facing workspace for:

- Purchasing overview and attention centre
- Purchase requests
- Purchase order management
- Goods receiving visibility
- Supplier invoices
- Supplier payments
- Supplier directory
- Supplier creation
- Product selection for purchasing
- Department and priority selection for requests
- Supplier purchasing activity
- Partial receiving visibility
- Invoice exceptions/readiness visibility
- Mobile-friendly purchasing navigation

The underlying procurement capabilities remain with the existing business system.

## Business language rule
Visible Business Admin purchasing copy must use ordinary business language. Do not expose developer terminology or implementation details to business users.

Examples:
- SKU → Product code
- Engine → Business records/system
- Database → Business records/system
- JSON → Details / information

## Source-of-truth protection
No database reset, schema change, migration, seed, destructive operation or new business data store was introduced during this module.

## Next module
Customers.

Before Customers:
1. Inspect the Technical Console customer/CRM capability.
2. Compare all existing customer functions with Business Admin requirements.
3. Build the complete business-facing customer workspace.
4. Audit Sales, Products and Stock together with Purchasing.
5. Debug all affected areas.
6. Update all continuity documents.
7. Verify the ZIP before packaging.

# 17. Overview, Staff Lifecycle and Starter Catalogue Hardening — 2026-08-27

## Executive Overview refinement

The Executive Overview now reads the dedicated business intelligence views for:
- revenue movement;
- payment mix;
- top-selling products.

This prevents the dashboard from treating a valid empty business period as a broken report. When there are no completed sales, the interface now uses calm business empty states such as **No sales recorded yet**, **No payments recorded yet**, and **No product sales yet**.

## Staff lifecycle

The Business Admin team experience now separates:
- Active staff — only currently active accounts;
- Deleted Staff — accounts permanently deactivated by the existing staff-deletion process.

The existing backend deletion process already preserves historical business references by anonymising the identity and suspending authentication. The Business Admin now reflects that lifecycle immediately instead of allowing deleted identities to remain in the active staff list.

No new database table, migration or data reset was introduced.

## Starter catalogue blueprint

A preview-only catalogue blueprint has been added for development and UI testing. It does **not** write to the live database and deliberately contains **zero stock**.

Top-level categories:
- Phones
- Tablets
- Entertainment

Phone structure:
- iPhones: iPhone 11 through iPhone 17, with Pro and Pro Max variants in the requested range.
- Samsung Galaxy S: S20 through S26, including base, + and Ultra models.
- Samsung Galaxy Foldable: Fold and Flip 4 through 8.
- Samsung Galaxy A: A57, A56, A36, A37, A26, A27, A16, A17, A07 and A06.

Entertainment:
- TV
- Speakers

TV brands:
- TCL
- Hisense
- Samsung
- LG Global Star
- SPJ
- Chiq
- Smart Plus

TV sizes in the preview:
- 32 inch
- 43 inch
- 50 inch
- 55 inch
- 65 inch
- 75 inch

The preview is clearly labelled as planning/test data so it cannot be mistaken for live stock or live product records.

## 47. Customers — Business Relationship Workspace

Customers is now the next functional Business Admin module. It is designed as a real ERP customer workspace rather than a simple contact list.

### 47.1 Technical Console parity

The Business Admin customer workspace was compared against the existing customer/CRM capability in the Phase 4 engine. The existing authoritative capabilities include customer creation and editing, Customer 360, addresses, contacts, interactions, support cases, privacy and consent, customer notes, follow-up tasks, customer groups, tags, duplicate review, export and safe customer merging. Customer 360 also connects sales, orders, credit, warranty, returns, deliveries and documents.

The Business Admin now consumes those existing capabilities through the same authenticated business records rather than creating a second customer system.

### 47.2 Business experience

The Customers workspace includes:
- customer directory and search;
- customer type and status filters;
- active customer and balance KPIs;
- customer profile and relationship view;
- sales, orders, credit, deliveries and service connections;
- customer value and purchase activity;
- customer follow-ups and notes;
- service cases;
- customer groups;
- privacy and consent controls;
- customer export where permitted;
- responsive mobile layout;
- permission-aware actions.

Business-facing copy uses ordinary business language and avoids developer terminology.

### 47.3 Product catalogue expansion

The starter catalogue is now represented as additive PostgreSQL seed data as explicitly requested for this increment. The seed is idempotent and never clears or replaces existing records.

Seeded catalogue structure includes:
- Phones;
- Tablets;
- Entertainment;
- Accessories;
- Computers;
- Networking;
- Wearables;
- Power & Smart Home;
- Gaming;
- Cameras & Security;
- Audio.

The requested phone families and TV starter range are included. Product prices begin at zero and no inventory balances, receipts or stock movements are created.

### 47.4 Database safety

This increment may add only missing starter catalogue records. It does not reset, truncate, drop, recreate or overwrite existing business records. Existing PostgreSQL data remains authoritative. The starter seed uses conflict-safe inserts only.

# 48. Orders & Fulfilment — 2026-08-27

## Objective
Turn the Orders area into a real commerce operations workspace connected to the existing Sales, Products, Stock, Customers, Delivery and Finance capabilities.

## Completed
- Dedicated Orders command centre.
- Order pipeline and operational KPIs.
- Order value trend and payment mix charts.
- Top ordered products.
- Searchable order book and payment/fulfilment queues.
- Order creation using existing product pricing and availability rules.
- Order detail and journey tracking.
- Payment recording.
- Order lifecycle progression.
- Cancellation.
- Fulfilment creation.
- Refund handoff.
- Conversion of fully paid orders into the existing Sales workflow.
- Mobile-responsive business experience.

## Source-of-truth rule
Orders continue to use the existing business engine and PostgreSQL records. Business Admin does not create a second order store or bypass existing business rules.

## Next module
**Finance & Credit**. First compare the Business Admin requirements against the existing Finance/Accounting technical capability, then build Finance as the money-control centre and connect Credit to customers and orders. Preserve the existing source-of-truth and no-reset rules.

# 2026-08-27 — Finance & Credit Business Increment

## Completed in this increment

Finance and Credit were added to the business-facing workspace using the existing Phase 4 contracts as the authority.

### Finance
- Finance command centre with revenue, expenses, net result, cash/bank position, customer balances and supplier balances.
- Income-versus-expense visual comparison.
- Largest expense areas visual comparison.
- Asset, liability and equity snapshot.
- Customer receivables and supplier payables views.
- Cash and bank account view.
- Financial entries, expenses, bank activity, taxes and accounting periods.
- Trial balance and profit-and-loss views.
- Finance refresh action that uses the existing controlled synchronization capability.
- Reconciliation entry point.
- Permission-aware actions for finance management, entries, synchronization and period closing.

### Credit & instalments
- Credit command centre.
- Active credit profile and exposure summary.
- Credit application queue and review flow.
- Customer credit limit management.
- Open credit account view.
- Repayment attention and overdue visibility.
- Payment recording.
- Collection follow-up creation.
- Authorized payment-plan restructuring.
- Customer, order and sales relationships remain tied to the existing credit engine.

### Experience quality
- Finance and Credit use the restrained premium business visual direction with meaningful charts and operational tables.
- The existing Business Admin authentication/setup/password-reset surfaces retain the premium restrained champagne/gold glassmorphism already established.
- Visible business-facing wording was reviewed again to remove developer terminology from the newly built areas and selected existing catalogue/customer surfaces.

## Protection
- No PostgreSQL reset, truncate, drop, recreate, migration or direct test-data manipulation was performed in this increment.
- No existing backend source module was modified.
- Finance and Credit write actions continue through existing business capabilities.

## Next build sequence
The next core business module is **Delivery & Logistics**, followed by Service, Website Management, Reports/Business Intelligence, Team/role-specific experiences, Public Website, Commerce and final cross-platform regression.

# 44. Permission model hardening — 2026-08-27

Business Admin permissions follow a real ERP-style role model:

- Administrator: full business-operational access across the business modules and actions already supported by the existing engine.
- Super Admin: unrestricted administrative authority across all supported actions, with an explicit safety rule that destructive actions must preserve historical business records where those records are legally/operationally required.
- Managers and specialist staff: access remains limited to the permissions assigned to their role.
- Permission checks are enforced on the business service, not only by hiding buttons in the browser.
- Super Admin is treated as an explicit top-level authority so newly added supported permissions do not accidentally lock the Super Admin out.

For ERP safety, “delete” does not automatically mean physically erasing a business record. Financial entries, completed sales, deliveries, orders, stock movements and audit history should use the appropriate business action such as cancel, void, archive, deactivate or reverse. This preserves traceability while still giving Super Admin complete control over the lifecycle.

This follows established ERP authorization practice: permissions are role-based, action-specific, auditable and may be further restricted by the business object or organizational scope. citeturn0search0turn0search1turn0search10

# 45. Business Admin technical-language boundary — 2026-08-27

The Business Admin navigation must not expose technical operations that belong to the Technical Console. Technical screens such as infrastructure/operations monitoring, backup and recovery execution, connection/webhook management, feature controls and similar developer controls remain outside the normal business workspace.

Business users should see ordinary language such as:

- Business profile
- Staff
- Products
- Stock
- Purchasing
- Customers
- Sales
- Orders
- Delivery
- Finance
- Reports
- Website content
- Security

They should not be presented with developer terminology or raw technical identifiers.

# 46. Delivery & Logistics design direction

Delivery is a complete operational workspace, not a status list. It must answer:

1. What is waiting to leave?
2. What is currently moving?
3. What is late?
4. What has been delivered or failed?
5. Who is responsible for each delivery?
6. What does delivery cost?
7. Which customers, orders and stock movements are affected?

The workspace therefore uses:

- Delivery command centre KPIs.
- Delayed-delivery attention.
- Delivery zones and fees.
- Delivery partner management and performance.
- Shipment creation and editing where the existing engine permits it.
- Delivery journey/status history.
- Attempts, proof and failure notes.
- Connections to Orders, Customers, Stock and Finance through the existing engine.
- Mobile-first tables and actionable detail screens.

The Technical Console remains the foundation and Business Admin remains the business experience over the same authoritative engine and records. fileciteturn21file0L118-L173

# 47. Service workspace — 2026-08-27

The Business Admin Service workspace is now the single operational view for customer returns, warranty cases and repair work while continuing to use the existing business engine and records.

## Service coverage
- Returns command centre with return volume, refund attention and status journey.
- Return creation from an existing order or completed sale.
- Return line selection, quantities, condition and disposition.
- Return status progression through the existing safe lifecycle.
- Refund recording through the existing refund capability.
- Warranty case creation linked to customer, order/sale, product and warranty policy.
- Warranty coverage review and case status progression.
- Repair work creation from an approved warranty case.
- Repair assignment to an internal technician or approved repair partner.
- Repair status, diagnosis, work completed, labour/partner cost and expected return tracking.
- Repair-part consumption through the existing stock-control capability.
- Completed repair collection and customer resolution through the existing warranty lifecycle.
- Warranty policy creation.
- Repair partner creation and business performance visibility.
- Service history remains tied to customer, order, sale, product and stock relationships already held by the engine.

## UX
- Service is presented as an operational control centre rather than a technical support screen.
- Attention areas, clear tabs, searchable records, detail views and action forms are used throughout.
- Business-facing wording avoids developer terminology.
- Existing premium restrained champagne/gold Business Admin direction is preserved.
- Empty states are honest and do not invent service activity.

## Protection
- Existing Render business engine remains authoritative.
- PostgreSQL remains the source of truth.
- No schema, migration, reset, truncate, drop, recreate, reseed or direct data manipulation was performed by the Service build.
- Existing backend modules `returns-refunds.js` and `warranty-repairs.js` were inspected but not modified.

## Next build sequence
Next core workspace: **Website Management**, followed by Reports/Business Intelligence and final cross-module regression/hardening.

## Website Management implementation — 2026-08-27

Website Management is now implemented as a connected Business Admin workspace using the existing website engine. Coverage includes site management, public pages, menus, banners, reusable content, media, publishing requests/releases, domains, redirects, website settings and storefront catalogue visibility. Hosting-provider execution remains outside Business Admin. The public storefront reads published website content and the existing authoritative catalogue.

# 48. Team & Organisation hardening — 2026-08-27

The Team workspace is strengthened as the business people-management centre. It now connects active/deleted staff, roles, staff profiles and departments through the existing engine. Admin actions remain permission-aware; Super Admin retains highest supported authority. Department deletion uses the existing archive behaviour and refuses to remove a department that still has assigned people. No database structure or data was changed by this build.

## Catalogue Control Centre — long-term structure
- Products, Categories, Brands, Collections and Archived records are managed as separate catalogue concerns.
- Categories support parent/child hierarchy, public visibility, featured placement, images, banners, icons and website page information.
- Brands are independent of categories and can be featured, hidden, edited, archived or safely deleted when unused.
- Products remain the central commercial record and can carry variants, prices, media, relationships, tags, publishing state and revision history.
- Collections group products for public merchandising without changing their underlying category or brand.
- Archive is preferred when a record has business history; permanent deletion is protected and limited.
- Public website catalogue content should come from approved business records rather than duplicated hard-coded lists.
- Starter catalogue data remains additive and stock-free.
