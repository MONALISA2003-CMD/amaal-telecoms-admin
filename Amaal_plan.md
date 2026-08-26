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
