# AMAAL --- MASTER IMPROVEMENT BP

**Document status:** New master product, UX, commerce and engineering
improvement blueprint\
**Product:** Amaal Uganda\
**Purpose:** Evolve Amaal from a strong catalogue into a complete,
premium, trustworthy Ugandan electronics and home-appliance commerce
platform that can compete with the experience quality of major
international retailers while remaining practical for Uganda.

------------------------------------------------------------------------

## 0. Executive decision

This document supersedes the previous storefront-only planning direction
as the **Master Improvement BP**. It keeps the principles of the
existing Amaal Commerce Master Blueprint, but expands them from
catalogue presentation into the full customer journey: discovery,
evaluation, wishlist, cart, checkout, payment, order confirmation,
delivery, tracking, account, support, returns, warranty, reviews,
merchandising, analytics and operational trust.

The previous blueprint correctly established that Amaal should be a
premium, category-driven commerce platform rather than a phone website,
and that the reusable catalogue engine must provide search, filters,
sorting, pagination/loading, product cards, URL state, empty states and
result counts. It also established category-aware filtering, structured
taxonomy, variants, comparison, product decision support, a light
premium visual language, modular-monolith architecture and a strict rule
against inventing product information. Those principles remain
foundational.

Amaal must now move from:

**Discover → Catalogue → Product**

to:

**Discover → Find → Compare → Understand → Save → Buy → Pay → Receive →
Track → Support → Return/Repair → Buy again**

The goal is not to copy Jumia, Amazon, Apple, Samsung or Best Buy. The
goal is to learn from what those businesses do well, remove what feels
crowded or generic, and build an Amaal experience designed specifically
for Ugandan shoppers.

------------------------------------------------------------------------

# 1. Competitive benchmark and strategic position

The research benchmark should be treated as a combination of four
reference models:

-   **Jumia Uganda:** breadth, local shopping habits, mobile-first
    commerce, strong category filtering, ratings, warranty messaging,
    discounts, add-to-cart, delivery and local payment expectations.
-   **Apple:** visual restraint, product storytelling, clear product
    families, comparison, configuration selection and highly focused
    purchase journeys.
-   **Samsung:** family-based navigation, rich product education, model
    support, warranty, registration, service tracking and buying
    guidance.
-   **Best Buy:** deep electronics taxonomy, category-specific decision
    support, comparison, services and practical product discovery.

Current Jumia Uganda demonstrates the local competitive floor: very
large catalogues, brand and price filtering, ratings, discounts, visible
warranty terms, add-to-cart and local delivery/payment language. Its
phone catalogue also exposes practical attribute-led discovery such as
storage/RAM and price, while its appliance catalogue separates major and
small appliances. Amaal should match the useful commerce mechanics
without inheriting marketplace clutter.

Samsung's current Africa experience is a useful reference for the
post-purchase layer: model lookup, manuals, warranty information,
product registration, repair tracking, service centres, chat and
support. This is important because a serious electronics retailer cannot
stop at payment.

Baymard's 2026 electronics/office UX benchmark reports recurring
problems across electronics sites: promotional noise, fragmented
taxonomies, weak comparison, inconsistent attributes, insufficient
imagery and unclear delivery/total-cost communication. These are exactly
the areas where Amaal can differentiate through disciplined execution.

Shopify's 2026 ecommerce UX guidance also reinforces the importance of
transparent delivery costs, short checkout, guest checkout, clear
availability and variant selection. Amaal should apply these principles
to the Ugandan context rather than copying foreign checkout flows
blindly.

------------------------------------------------------------------------

# 2. Amaal product promise

The customer should feel:

> **I found the right product, I understand exactly what I am getting, I
> know what it will cost me, I know when it should arrive, and I know
> who will help me if something goes wrong.**

Amaal should feel:

-   premium
-   warm
-   modern
-   human
-   technically competent
-   trustworthy
-   Ugandan
-   easy to shop from a normal Android phone

It should not feel:

-   like a database
-   like a generic WooCommerce template
-   like a crowded marketplace
-   like an AI-generated landing page
-   like a dark gaming website
-   like a sales poster collection
-   like an admin dashboard exposed to customers

------------------------------------------------------------------------

# 3. Visual system: premium light, not dark

## 3.1 Core direction

The previous blueprint's light premium direction is retained and
strengthened.

### Base palette

-   Warm ivory background
-   Soft white product surfaces
-   Deep charcoal text
-   Warm neutral grey
-   Restrained Amaal gold as an accent

Gold should be used for selected states, premium emphasis, subtle
highlights and important actions. It must not become the colour of every
button, border or card.

## 3.2 Layout

Use generous whitespace, clean grids and strong typography rather than
visual effects.

Avoid:

-   neon gradients
-   purple AI gradients
-   excessive glassmorphism
-   giant shadows
-   excessive pill-shaped controls
-   black backgrounds everywhere
-   oversized rounded cards
-   animation for its own sake

## 3.3 Photography

The official Amaal hero assets already establish the desired showroom
character. Product photography should eventually be uploaded through the
Business Console and delivered through proper media storage/CDN
infrastructure.

The public store must never show internal wording such as "asset to be
supplied", "photo to be supplied" or "logo asset". If a product has no
approved image, use a polished neutral product-media treatment, not
developer language.

## 3.4 Typography

Use a refined sans-serif for UI/body content and a restrained editorial
face for major display moments. Typography, spacing and hierarchy should
do most of the visual work.

------------------------------------------------------------------------

# 4. Global information architecture

Target navigation:

``` text
HOME
SHOP
CATEGORIES
BRANDS
COLLECTIONS
DEALS
SERVICES
SEARCH
WISHLIST
ACCOUNT
CART
```

Support should be visible without competing with shopping:

``` text
Help
├── Delivery
├── Payments
├── Track an order
├── Returns
├── Warranty
├── Repairs
├── FAQs
└── Contact
```

The main catalogue should include:

``` text
Phones
Tablets
Computers & Laptops
TV & Home Entertainment
Audio
Home Appliances
Kitchen Appliances
Accessories
```

The existing rule remains: **Audio stays inside Entertainment → Audio**,
not as an unrelated top-level management domain.

Business laptops remain removed from the public catalogue where they
were intentionally removed.

------------------------------------------------------------------------

# 5. Header and navigation

## Desktop

The header should become a real shopping navigation system.

``` text
AMAAL | Shop | Categories | Brands | Collections | Deals | Services

[ Search products, brands or categories ]

♡ Wishlist    Account    🛒 Cart
```

Keep it compact and sticky.

## Mega menu

Desktop "Shop" or "Categories" should open a structured mega menu.

Example:

``` text
PHONES              COMPUTERS             HOME & KITCHEN
iPhone              Laptops                Refrigerators
Samsung             Gaming                 Washing Machines
TECNO               Monitors               Cookers & Hobs
Infinix             Accessories            Microwaves
Google Pixel                               Air Fryers

AUDIO               TV & ENTERTAINMENT     ACCESSORIES
Earbuds             TVs                    Chargers
Headphones          Streaming              Cables
Speakers            Home Audio             Power Banks
Sound Towers                               Storage

                 VIEW ALL PRODUCTS →
```

Do not dump hundreds of links into the menu.

## Mobile

Mobile navigation must become an accordion rather than a flat list.

``` text
☰   AMAAL                    🛒

[ Search products, brands & categories ]

Shop
  Phones
  Tablets
  Computers
  TV & Home
  Audio
  Home Appliances
  Kitchen Appliances
  Accessories

Brands
Collections
Deals
Services
Wishlist
Account
```

The menu must preserve state, have accessible focus handling and close
cleanly.

------------------------------------------------------------------------

# 6. Homepage: rebuild the experience, not just the hero

The current official hero image is a strong foundation. The homepage now
needs better merchandising discipline.

## Recommended order

1.  Header
2.  Compact hero + search
3.  Trust strip
4.  Shop by category
5.  New arrivals
6.  Featured collection
7.  Popular phones/electronics
8.  Shop by brand
9.  Deals
10. Services and confidence
11. Buying guides
12. Assistance
13. Newsletter/updates
14. Footer

Do not make every section huge.

## Hero

Use the official Amaal showroom image with strong left-side text and
readable contrast.

Suggested customer-facing language:

**Technology, selected better.**

*Phones, computers, appliances and everyday electronics from brands
worth knowing.*

Search should sit inside or immediately below the hero.

Primary actions:

-   Shop phones
-   Explore appliances
-   View all products

No robotic phrases such as "unlock your digital journey" or
"revolutionize your lifestyle".

## Category cards

Replace empty/placeholder category visuals with approved category
photography or elegant product compositions.

Primary cards should be limited to the categories shoppers actually
understand.

Each card should answer:

-   What can I buy?
-   Why would I enter?

Example:

**Phones**\
Samsung, iPhone, TECNO, Infinix and more.

**Home Appliances**\
Refrigerators, washing machines, air conditioners and more.

## New arrivals

Real product data only. If price is not public, say **Price coming
soon**. Do not put invented numbers in the data simply to make the page
look finished.

## Featured collections

Collections should solve shopping missions:

-   Best phones for everyday use
-   Work from home
-   Student essentials
-   Gaming setup
-   Home upgrades
-   Kitchen essentials
-   Audio for everyday listening
-   Premium technology
-   Gifts
-   Under a defined UGX price point

Collections should be reusable across categories.

## Brand rail

Brand logos should be clean, consistent and approved. Clicking a brand
should open a real brand catalogue rather than a static information
page.

## Trust section

Do not use unverifiable claims. Only display operational promises Amaal
can actually fulfil, such as:

-   genuine products, if operationally guaranteed
-   delivery coverage, only where true
-   payment methods actually supported
-   warranty terms tied to specific products
-   real customer support channels

------------------------------------------------------------------------

# 7. Shop: the universal storefront

The `/shop` page must become the true front door to the catalogue.

It must not show only database products while category pages show
curated static products. There should be one public catalogue resolver
capable of combining all published catalogue sources into one consistent
customer experience.

Required:

-   all published products
-   category hierarchy
-   brand
-   product type
-   availability
-   price state
-   variants
-   collections
-   search
-   filters
-   sorting
-   pagination or progressive loading
-   URL state
-   empty states

The customer should never care whether a product originated from one
internal data source or another.

------------------------------------------------------------------------

# 8. Category directory

The Categories page should be a visual shopping directory, not a
technical tree dump.

Structure:

``` text
Phones
  iPhone
  Samsung Galaxy
  TECNO
  Infinix
  Google Pixel

Computers
  Laptops
  Gaming laptops
  MacBook
  Monitors
  Accessories

TV & Home Entertainment
  TVs
  Home audio
  Streaming

Audio
  Woofers
  Sound Towers
  Party Speakers
  Portable Speakers

Home Appliances
  Refrigerators & Freezers
  Washing Machines
  Air Conditioners
  Fans & Air Care
  Vacuum Cleaners
  Irons & Garment Care
  Water Dispensers
  Air Purifiers
  Dishwashers

Kitchen Appliances
  Microwaves
  Ovens & Cooking
  Cookers & Hobs
  Air Fryers
  Pressure Cookers & Multicookers
  Blenders & Food Preparation
  Juicers
  Mixers
  Coffee & Beverage
  Grills & Breakfast
  Fryers
  Specialty
  Dishwashers

Accessories
  Chargers
  Cables
  Power Banks
  Storage
  Computer accessories
```

Each child should have a real destination and appropriate filter state.

------------------------------------------------------------------------

# 9. Desktop sidebar: mandatory improvement

The current top-only filtering is not enough for a serious electronics
catalogue.

Desktop catalogue layout:

``` text
┌──────────────────────────────────────────────────────────┐
│ Breadcrumb                                               │
│ Category title + description                             │
│                                                          │
│ ┌──────────────┐ ┌────────────────────────────────────┐ │
│ │ FILTERS      │ │ Search / sort / result count       │ │
│ │              │ │                                    │ │
│ │ Brand        │ │ Product grid                       │ │
│ │ Price        │ │                                    │ │
│ │ Storage      │ │                                    │ │
│ │ RAM          │ │                                    │ │
│ │ Network      │ │                                    │ │
│ │ ...          │ │                                    │ │
│ └──────────────┘ └────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

Sidebar requirements:

-   collapsible filter groups
-   counts where useful
-   clear-all
-   selected filter chips
-   sticky behavior where appropriate
-   keyboard accessibility
-   no filter overload

------------------------------------------------------------------------

# 10. Mobile filter sheet

Mobile should use a bottom or side filter sheet:

``` text
FILTER

Brand
Samsung  ○
Apple    ○
TECNO    ○

Storage
64GB     □
128GB    □
256GB    □
512GB    □

[ Clear ]              [ Apply ]
```

Do not apply filters unexpectedly while a user is selecting multiple
options. Provide clear Apply and Clear behavior.

------------------------------------------------------------------------

# 11. Category-aware filtering

The master blueprint's rule remains mandatory: no giant universal filter
list.

## Phones

-   Brand
-   Series
-   Price range
-   Storage
-   RAM
-   Network: 3G/4G/5G
-   SIM configuration
-   Screen size range
-   Battery capacity range
-   Camera capability where verified
-   Operating system where useful
-   Availability
-   Warranty
-   Condition: new/refurbished only if Amaal actually sells both

## Computers

-   Brand
-   Product family
-   Processor family
-   Processor generation where verified
-   RAM
-   Storage
-   SSD/HDD
-   GPU
-   Screen size
-   Resolution
-   Operating system
-   Gaming/non-gaming
-   Availability

## TVs

-   Brand
-   Screen size
-   Resolution
-   Panel technology
-   Smart TV
-   Refresh rate where verified
-   HDR where verified
-   Operating platform
-   Price

## Audio

-   Brand
-   Product type
-   Portable
-   Wireless
-   Bluetooth
-   ANC where relevant
-   Battery life where verified
-   Speaker power only where reliably sourced
-   Waterproof rating where verified
-   Price

## Refrigerators/freezers

-   Brand
-   Type
-   Capacity
-   Door configuration
-   Defrost/no-frost where verified
-   Water dispenser
-   Inverter where verified
-   Price

## Washing machines

-   Brand
-   Load capacity
-   Front/top load
-   Twin tub/automatic
-   Washer-dryer
-   Spin speed where verified
-   Price

## Kitchen appliances

Filters should match the category: capacity, power, bowl size, basket
size, number of burners, fuel type, functions, etc., only where
verified.

------------------------------------------------------------------------

# 12. URL state

Every meaningful filter state must be shareable.

Example:

`/phones?brand=samsung&storage=256gb&network=5g`

Also support:

-   price range
-   sort
-   category
-   series
-   selected attributes

Benefits:

-   browser back/forward
-   bookmarks
-   shared links
-   SEO landing states where appropriate
-   reliable refresh behavior

The URL should be the source of truth for catalogue filters, not hidden
client state.

------------------------------------------------------------------------

# 13. Search: make it a serious shopping tool

Search should become one of Amaal's strongest features.

Input:

**Search products, brands or categories**

Autocomplete should group results:

``` text
BRANDS
Samsung

CATEGORIES
Samsung phones

SERIES
Galaxy A
Galaxy S

PRODUCTS
Galaxy A17
Galaxy A26
Galaxy S24 Ultra
```

Search must understand practical queries:

-   Samsung
-   Samsung A17
-   iPhone 15
-   256GB
-   8GB RAM
-   55 inch TV
-   6kg washing machine
-   air fryer
-   Pixel

It should normalize spelling and common user variations without
inventing matches.

Later, when catalogue size warrants it, move to a search index such as
Meilisearch/OpenSearch/Algolia/Elasticsearch. Until then, structured
PostgreSQL queries or optimized local data are sufficient.

------------------------------------------------------------------------

# 14. Electronics-specific product discovery

This is one of the most important improvements.

Electronics buyers need help deciding, not merely a grid of names.

Add:

-   comparison
-   key-spec summaries
-   configuration selectors
-   "good for" tags only when editorially justified
-   compatibility information
-   included items
-   warranty
-   delivery estimate
-   availability
-   related accessories
-   related products
-   alternatives
-   recently viewed

Do not manufacture scores such as "9.8/10" without a real methodology.

------------------------------------------------------------------------

# 15. Phone catalogue: make it exceptional

Phones are the flagship electronics experience.

## Phone landing page

``` text
Phones

[ Search phones, brands or models ]

Popular brands
Samsung | Apple | TECNO | Infinix | Google Pixel

Shop by need
Everyday | Camera | Gaming | Battery | Premium

All phones

[ Filters ] [ Sort ]

Product grid
```

## Phone product card

Show only useful information:

-   image
-   brand
-   model
-   key configuration
-   price or Price coming soon
-   rating when real reviews exist
-   availability
-   wishlist icon
-   compare checkbox/icon where supported

Do not overload the card with every specification.

------------------------------------------------------------------------

# 16. Phone product page

The phone page should become a decision workspace.

Top area:

``` text
Breadcrumb

[ Gallery ]              Samsung
                         Galaxy A17
                         ★ rating / review count

                         From UGX ...
                         or Price coming soon

                         Colour
                         [Black] [Blue] ...

                         Storage
                         [128GB] [256GB]

                         Network
                         [4G] [5G]

                         Availability
                         In stock / unavailable / enquire

                         [ Add to cart ]
                         [ Buy now ]
                         [ ♡ Save ]
```

Then:

-   delivery estimate
-   payment methods
-   warranty
-   quick facts
-   overview
-   specifications
-   what's in the box
-   compatibility
-   reviews
-   questions
-   related products
-   compatible accessories
-   alternatives

### Phone-specific sections

Use verified attributes such as:

-   display
-   chipset
-   RAM
-   storage
-   cameras
-   battery
-   charging
-   connectivity
-   SIM/eSIM where verified
-   operating system
-   dimensions/weight
-   colours
-   warranty

Do not display an empty technical table merely to make the page look
complete.

------------------------------------------------------------------------

# 17. Product media system

Three levels:

1.  Verified product photography
2.  Approved catalogue artwork
3.  Elegant neutral fallback

The fallback must never expose internal language.

When live commerce begins, the Business Console should be able to
manage:

-   primary image
-   gallery images
-   thumbnails
-   product videos where useful
-   variant-specific media
-   image ordering
-   alt text

Images should be optimized and delivered through object storage/CDN, not
bundled into the application.

------------------------------------------------------------------------

# 18. Product page architecture for every category

Every product page should share a common shell:

``` text
Breadcrumb
Gallery
Product identity
Price
Availability
Variants
Primary purchase action
Wishlist
Delivery
Payment
Warranty
Quick facts
Description
Specifications
What's included
Reviews
Questions
Related products
Compatible accessories
Recently viewed
```

Category-specific sections then plug into the shell.

------------------------------------------------------------------------

# 19. Product comparison

Comparison should be generalized beyond phones, but remain
category-specific.

Do not compare unrelated products.

Phone comparison:

-   display
-   chipset
-   RAM
-   storage
-   cameras
-   battery
-   charging
-   network
-   dimensions
-   weight

Laptop comparison:

-   processor
-   RAM
-   storage
-   GPU
-   screen
-   resolution
-   operating system
-   ports
-   weight

TV comparison:

-   size
-   resolution
-   panel
-   refresh rate
-   smart platform
-   HDR
-   connectivity

Appliance comparison:

-   capacity
-   dimensions
-   type
-   power
-   key functions
-   warranty

Comparison must only show verified data.

Add a lightweight comparison tray:

``` text
2 products selected
[ Compare ]
```

------------------------------------------------------------------------

# 20. Wishlist / saved products

Wishlist is required.

Features:

-   save from card
-   save from product page
-   remove
-   view all saved products
-   move to cart
-   price-change notification later
-   back-in-stock notification later
-   account sync when logged in
-   guest local wishlist before login

Empty state should be human:

**Keep the products you are still considering.**

Not:

**No wishlist records found in database.**

------------------------------------------------------------------------

# 21. Recently viewed

Add a lightweight recently viewed system.

Rules:

-   last 8--12 products
-   local storage for guests
-   account sync later
-   do not slow page rendering
-   easy remove/clear

Use it on product pages and optionally the homepage.

------------------------------------------------------------------------

# 22. Cart: real commerce, not a prototype

The current localStorage cart is only a prototype and must eventually
become a proper commerce cart.

Cart must contain:

-   product
-   exact variant
-   quantity
-   unit price
-   line total
-   availability
-   warranty information where relevant
-   delivery estimate
-   remove
-   save for later
-   quantity control

Example:

``` text
YOUR CART

Samsung Galaxy A17
128GB · Black
Qty 1
UGX X,XXX,XXX

[−] 1 [+]    Remove    Save for later

Subtotal          UGX ...
Delivery          UGX ...
Total             UGX ...

[ Continue shopping ]
[ Checkout ]
```

Important: the server must calculate authoritative price, stock,
discounts, delivery and totals. Never trust client-submitted totals.

------------------------------------------------------------------------

# 23. Cart drawer

Add a quick cart drawer from the header.

It should show:

-   item count
-   product thumbnails
-   item names
-   quantity
-   subtotal
-   checkout button
-   view cart

Do not make it a giant modal.

------------------------------------------------------------------------

# 24. Checkout

Checkout should be deliberately short.

Preferred flow:

``` text
1. Contact
2. Delivery
3. Payment
4. Review
5. Confirmation
```

Guest checkout should be supported.

Do not force account creation before purchase.

Collect only what is required.

### Contact

-   full name
-   phone
-   email where available

### Delivery

-   region/district
-   city/town
-   area
-   address/landmark
-   delivery notes

For Uganda, address collection must accommodate customers who use
landmarks rather than formal street addresses.

### Delivery method

Examples:

-   Kampala/metro delivery
-   upcountry delivery
-   pickup, if Amaal offers it

Only show options actually operationally supported.

### Order review

Show:

-   products
-   variants
-   quantities
-   subtotal
-   delivery fee
-   discount
-   total
-   payment method
-   delivery destination
-   estimated delivery window

No surprise charges at the final step.

------------------------------------------------------------------------

# 25. Uganda payment strategy

Payment must be designed around real Ugandan behaviour.

The primary payment choices should include, subject to final
provider/account setup:

-   MTN Mobile Money
-   Airtel Money
-   Visa/Mastercard
-   bank transfer where operationally useful
-   other gateway-supported methods

MTN Uganda currently documents merchant payments and an Open API with
RequestToPay, Transfer, Balance, transaction-status and
account-validation capabilities. MTN also documents a Virtual Card by
MoMo for online transactions.

Pesapal currently advertises Uganda ecommerce support for cards and
mobile payments, with UGX and USD settlement options, API/plugins,
payment pages and consolidated payment notifications. It also documents
support for Visa, Mastercard, American Express, MTN Mobile Money and
Airtel Money.

The implementation should choose one primary gateway and integrate
additional direct rails only where there is a clear business reason. Do
not build payment processing from scratch.

------------------------------------------------------------------------

# 26. Payment UX

Payment screen should clearly display:

``` text
PAYMENT

○ MTN Mobile Money
○ Airtel Money
○ Card
○ Bank transfer

[ Continue to secure payment ]
```

For mobile money:

-   show the phone number being charged
-   show amount
-   initiate provider request
-   show waiting state
-   allow retry
-   verify payment server-side
-   never mark paid based only on browser redirect

Payment states:

``` text
Pending
Processing
Successful
Failed
Cancelled
Expired
Needs verification
```

Every payment attempt needs an auditable reference.

Webhooks must be verified and idempotent.

------------------------------------------------------------------------

# 27. Order confirmation

After successful order:

``` text
ORDER CONFIRMED

Thank you, [Name].

Order #AMAAL-XXXXXX

Payment: Confirmed
Delivery: Kampala
Expected: [date/window]

[ Track order ]
[ View order ]
[ Continue shopping ]
```

Send confirmation through:

-   email where available
-   SMS
-   WhatsApp where operationally appropriate

Do not send duplicate notifications for the same event.

------------------------------------------------------------------------

# 28. Delivery and logistics

Delivery is one of the biggest areas where Amaal can become genuinely
local and useful.

Create a proper delivery engine conceptually supporting:

``` text
Order
 ↓
Fulfilment
 ↓
Packed
 ↓
Dispatched
 ↓
Out for delivery
 ↓
Delivered
```

Additional states:

-   delivery delayed
-   customer unavailable
-   address issue
-   rescheduled
-   returned to Amaal
-   cancelled

Delivery fee should be calculated transparently.

Large appliances may need different delivery rules from
phones/accessories.

The system should eventually support category-based delivery
constraints, dimensions/weight and service zones.

------------------------------------------------------------------------

# 29. Track delivery

The existing static tracking page should become an actual order tracking
experience.

Guest tracking:

``` text
Order number
Phone number
[ Track ]
```

Logged-in tracking:

``` text
My Orders

#AMAAL-12345
Delivered

Timeline
✓ Order placed
✓ Payment confirmed
✓ Packed
✓ Dispatched
✓ Out for delivery
✓ Delivered
```

Where possible show:

-   courier/driver status
-   delivery window
-   support contact
-   delivery notes
-   proof of delivery

Do not expose sensitive internal logistics information.

------------------------------------------------------------------------

# 30. Customer account

The current static account page should eventually become a real customer
centre.

``` text
MY AMAAL

Overview
Orders
Wishlist
Saved addresses
Payment preferences
Returns
Warranty
Repairs
Profile
Notifications
Security
```

Order history should support:

-   order details
-   invoice/receipt
-   tracking
-   reorder
-   return request
-   warranty request
-   support

Do not force customers to register before purchase.

------------------------------------------------------------------------

# 31. Authentication

When implemented:

-   phone/email login
-   OTP or secure password flow
-   secure session cookies
-   device/session management
-   account recovery
-   rate limiting
-   suspicious login protection

Do not expose authentication internals in customer UI.

------------------------------------------------------------------------

# 32. Addresses

Customers should be able to save multiple addresses:

-   Home
-   Work
-   Other

Uganda-specific address fields should allow:

-   district
-   city/town
-   area
-   landmark
-   directions
-   phone contact

The UI should not assume every customer has a conventional street
address.

------------------------------------------------------------------------

# 33. Reviews and ratings

Reviews are critical for electronics, but only after a real review
system exists.

Product cards may show:

`4.6 ★ · 128 reviews`

only when those numbers are real.

Review features:

-   verified purchase marker
-   star rating
-   title
-   written review
-   optional photo/video later
-   helpful vote
-   report abuse
-   seller/Amaal response where appropriate

Review moderation is required.

Do not import random web ratings and present them as Amaal customer
reviews.

------------------------------------------------------------------------

# 34. Questions and answers

Electronics buyers frequently have practical questions.

Add product Q&A:

**Questions about this product**

-   Does it support 5G?
-   Does it include a charger?
-   Is the TV wall-mount compatible?
-   What is the fridge capacity?

Answers must come from verified product information or an authorized
Amaal response.

------------------------------------------------------------------------

# 35. Related products and cross-selling

Every product page should have relevant recommendations.

For a phone:

-   cases
-   screen protectors
-   chargers
-   power banks
-   earbuds

For a laptop:

-   mouse
-   keyboard
-   laptop bag
-   USB hub
-   webcam

For a refrigerator:

-   installation/service where offered
-   relevant accessories only

Do not recommend random products merely to fill space.

------------------------------------------------------------------------

# 36. Buy together / bundles

Introduce bundles only when commercially real.

Examples:

**Phone essentials** Phone + case + screen protector + charger

**Work setup** Laptop + mouse + bag + USB hub

**Home entertainment** TV + sound system + mounting/service where
offered

The bundle should show a clear total and any genuine saving.

------------------------------------------------------------------------

# 37. Deals and merchandising

The current static Deals page should become a real collection surface.

Deal types:

-   weekly deals
-   limited-time deals
-   new arrivals
-   price drops
-   bundle offers
-   seasonal campaigns
-   clearance
-   under UGX X

Only use countdown timers when the deal actually has a server-side
expiry.

No fake urgency.

No fake "was price" values.

------------------------------------------------------------------------

# 38. Collections

Collections should be first-class public pages.

Examples:

-   New at Amaal
-   Best Sellers
-   Premium Tech
-   Student Essentials
-   Work From Home
-   Gaming
-   Smart Home
-   Kitchen Essentials
-   Audio Essentials
-   Travel Tech
-   Gifts
-   Under UGX 300,000
-   Under UGX 500,000
-   Under UGX 1,000,000

Price collections must use real current prices.

------------------------------------------------------------------------

# 39. Buying guides

Amaal should eventually compete through decision support, not only
catalogue size.

Examples:

**Which phone should I buy?**

Compare by:

-   budget
-   camera
-   battery
-   gaming
-   storage
-   size

**Which TV size is right for my room?**

**How much fridge capacity do I need?**

**Front-load vs top-load washing machines**

**Laptop buying guide for students**

**Laptop buying guide for business/work**

Guides must be useful, concise and based on accurate product data.

------------------------------------------------------------------------

# 40. Electronics taxonomy: deeper structure

The catalogue should understand the difference between category, family,
series, model and variant.

``` text
Category
 ↓
Subcategory
 ↓
Brand
 ↓
Family / Series
 ↓
Product model
 ↓
Variant
 ↓
Attributes
```

Example:

``` text
Phones
 → Smartphones
 → Samsung
 → Galaxy A
 → Galaxy A17
 → 128GB / Black
```

Do not create separate products for every colour/storage combination
when they are variants of one model.

------------------------------------------------------------------------

# 41. Product data quality

The catalogue must have a data quality policy.

Every product should have:

-   canonical name
-   brand
-   category
-   family/type
-   verified specifications
-   media state
-   price state
-   availability state
-   warranty state
-   variant data
-   SEO metadata

Do not invent missing values.

If a specification is unknown, either omit it or clearly state that the
information is unavailable.

This rule applies especially to:

-   camera megapixels
-   processor names
-   RAM
-   battery
-   speaker power
-   TV refresh rates
-   appliance capacity
-   warranty duration
-   dimensions

------------------------------------------------------------------------

# 42. Brand experience

The Brands page should become a real discovery system.

Show:

-   brand logo
-   short brand description where approved
-   product count
-   category presence
-   featured products
-   brand collections

Brand pages should aggregate all relevant products, not only products
currently present in one database query.

For electronics, brand pages should support:

``` text
Samsung

Phones | Tablets | TVs | Audio | Refrigerators | Laundry

Featured Samsung products

All Samsung products
[filters]
```

------------------------------------------------------------------------

# 43. Search result architecture

Search results should include:

``` text
Search results for “Samsung”

Brands
Samsung

Categories
Samsung Phones
Samsung TVs

Products
...
```

Also show:

-   result count
-   filters
-   sort
-   suggested related query when appropriate
-   empty state
-   spelling correction

Empty state example:

**We couldn't find that yet.**

Try a model name, brand or category.

Then show useful alternatives.

------------------------------------------------------------------------

# 44. Footer

Footer should become a useful information map.

``` text
SHOP
Phones
Computers
TV & Home
Audio
Home Appliances
Kitchen Appliances
Accessories
Deals

HELP
Delivery
Payments
Track order
Returns
Warranty
Repairs
FAQs
Contact

AMAAL
About
Services
Brands
Careers, if applicable
Privacy
Terms
```

No unnecessary links.

------------------------------------------------------------------------

# 45. Services layer

The existing Services/Repairs routes should become operationally useful.

Possible service areas:

-   device setup
-   software support
-   repairs
-   installation
-   appliance delivery/installation where available
-   business technology support

Each service page should answer:

-   What is the service?
-   Who is it for?
-   What does it include?
-   How do I request it?
-   What does it cost, if public?
-   How do I track the request?

------------------------------------------------------------------------

# 46. Warranty centre

Warranty should become a proper post-purchase feature.

Product page:

**Warranty**

Show the actual applicable warranty.

Account:

**My warranties**

Customer can see:

-   product
-   purchase date
-   warranty period
-   expiry
-   coverage summary
-   request support

A later serial/IMEI registration feature can support electronics and
appliances where appropriate. Samsung's current Africa support
experience demonstrates the value of model lookup, serial/IMEI
registration, warranty checking and service tracking.

------------------------------------------------------------------------

# 47. Returns

The Returns page should become a process, not an information poster.

Customer journey:

``` text
Order
 ↓
Select item
 ↓
Reason
 ↓
Upload evidence if required
 ↓
Review
 ↓
Submit
 ↓
Return status
```

Statuses:

-   requested
-   approved
-   pickup arranged
-   received
-   inspecting
-   approved for refund/replacement
-   completed
-   rejected with explanation

Rules must reflect Amaal's actual policy.

------------------------------------------------------------------------

# 48. Refunds

Support multiple refund outcomes where business policy allows:

-   original payment method
-   mobile money
-   bank transfer
-   store credit

Refund state should be independently tracked from return state.

``` text
Return approved
 ↓
Refund initiated
 ↓
Refund processing
 ↓
Refund completed
```

Never claim "instant refund" unless the payment provider and Amaal
process can actually do it.

------------------------------------------------------------------------

# 49. Notifications

Create a notification architecture for:

-   order confirmation
-   payment confirmation
-   payment failure
-   order packed
-   dispatch
-   out for delivery
-   delivered
-   return status
-   refund status
-   warranty status
-   repair status
-   account security

Channels:

-   SMS
-   email
-   WhatsApp where operationally justified
-   in-account notifications

Customers should control marketing notification preferences.

Transactional notifications should remain distinct from promotional
messages.

------------------------------------------------------------------------

# 50. Customer support

Support should be available from the product, cart, checkout and account
surfaces.

Primary options:

-   WhatsApp
-   phone
-   email
-   contact form
-   FAQ/help centre

A product page should include:

**Need help choosing?**

Ask about this product.

This should open a clean contact flow containing the product reference
automatically.

------------------------------------------------------------------------

# 51. WhatsApp integration

For Uganda, WhatsApp is a high-value support and sales channel.

Use it for:

-   product questions
-   order support
-   payment assistance
-   delivery support
-   service requests

Do not turn every page into a floating WhatsApp obstruction. Use
contextual placement and a restrained floating entry point where
appropriate.

------------------------------------------------------------------------

# 52. Accessibility

Target WCAG AA principles.

Required:

-   keyboard navigation
-   visible focus
-   semantic controls
-   sufficient contrast
-   meaningful alt text
-   accessible dialogs/drawers
-   accessible filter sheets
-   labels for all forms
-   minimum touch target sizes
-   reduced motion support
-   screen-reader-friendly status messages

The light theme must still have strong text contrast.

------------------------------------------------------------------------

# 53. Performance

Performance is part of the brand.

Targets:

-   fast first content
-   optimized images
-   responsive images
-   minimal JavaScript
-   server rendering by default
-   lazy loading below the fold
-   no huge video background by default
-   cached public catalogue pages
-   lightweight mobile navigation

Product images must use CDN/object storage when live.

Do not bundle hundreds of high-resolution product images inside the
repository.

------------------------------------------------------------------------

# 54. SEO

Every indexable category/product/brand/collection page should have:

-   unique title
-   meta description
-   canonical URL
-   Open Graph metadata
-   product structured data where appropriate
-   breadcrumb structured data
-   clean URL
-   indexable useful text
-   optimized images
-   sitemap
-   robots rules

Examples:

`/phones/samsung-galaxy-a17`

`/home-appliances/refrigerators-freezers`

`/brands/samsung`

`/collections/new-arrivals`

Do not generate thousands of thin SEO pages just because filter
combinations exist.

------------------------------------------------------------------------

# 55. Analytics and conversion measurement

Measure the customer journey without making the site heavy.

Events:

-   search
-   search result click
-   category view
-   brand view
-   product view
-   filter use
-   compare
-   wishlist add/remove
-   add to cart
-   cart view
-   checkout start
-   address completed
-   payment started
-   payment success/failure
-   order completed
-   delivery tracking view
-   return request
-   warranty request
-   support contact

Business metrics:

-   conversion rate
-   add-to-cart rate
-   checkout completion
-   payment success rate
-   abandoned carts
-   failed searches
-   top products
-   top brands
-   top categories
-   repeat purchase rate
-   average order value
-   delivery success rate
-   return rate

------------------------------------------------------------------------

# 56. Personalization without creepiness

Useful personalization:

-   recently viewed
-   saved products
-   recommended accessories
-   continue shopping
-   relevant collections

Avoid:

-   intrusive popups
-   fake personalization
-   excessive notifications
-   tracking behaviour that is not necessary

------------------------------------------------------------------------

# 57. Security

Commerce introduces a higher security requirement.

Required:

-   HTTPS
-   secure cookies
-   authentication hardening
-   authorization
-   input validation
-   rate limiting
-   server-side price validation
-   server-side stock validation
-   secure secrets
-   audit logs
-   payment-provider isolation
-   verified webhooks
-   idempotent payment/order handling
-   dependency updates

Never trust client-provided:

-   price
-   stock
-   discount
-   order total
-   payment success
-   permissions

------------------------------------------------------------------------

# 58. Commerce domain architecture

The future model should be:

``` text
Customer
 ↓
Cart
 ↓
Cart Item
 ↓
Variant
 ↓
Product

Checkout
 ↓
Order
 ↓
Order Items
 ↓
Payment
 ↓
Fulfilment
 ↓
Shipment
 ↓
Delivery
```

Support domains:

``` text
Order
 ├── Return
 ├── Refund
 ├── Warranty claim
 └── Repair request
```

This remains a modular monolith initially.

Do not create microservices merely because the platform is growing.

------------------------------------------------------------------------

# 59. Inventory and availability

Public product state should distinguish:

-   In stock
-   Low stock
-   Out of stock
-   Pre-order, if supported
-   Coming soon
-   Enquire

Inventory should never be inferred from frontend arrays.

For variants, availability must be variant-specific.

Example:

``` text
Galaxy A17
128GB Black — In stock
128GB Blue — Out of stock
256GB Black — In stock
```

------------------------------------------------------------------------

# 60. Pricing

Pricing must have one authoritative source.

Public states:

-   actual price
-   sale price + genuine previous price
-   Price coming soon
-   Enquire for price

Do not use placeholder numerical prices.

The current public policy of showing **Price coming soon** where live
pricing is not available should remain until actual pricing is
connected.

When pricing becomes live, cart and checkout must use
server-authoritative values.

------------------------------------------------------------------------

# 61. Promotions engine

Future promotions should support:

-   fixed discount
-   percentage discount
-   product-level promotion
-   category promotion
-   collection promotion
-   bundle discount
-   minimum order value
-   coupon code
-   first-order promotion if actually offered

All promotion calculations must happen server-side.

------------------------------------------------------------------------

# 62. Gift cards and store credit

Future optional commerce layer:

-   gift cards
-   store credit
-   refund-to-credit

Do not build until there is a real business case.

------------------------------------------------------------------------

# 63. Abandoned cart recovery

Later:

-   identify abandoned carts with consent and appropriate privacy
    handling
-   reminder email/SMS/WhatsApp where permitted
-   saved cart
-   resume checkout

Do not spam.

------------------------------------------------------------------------

# 64. Guest commerce continuity

A customer should be able to:

``` text
Browse as guest
 ↓
Wishlist locally
 ↓
Add to cart
 ↓
Checkout as guest
 ↓
Receive order reference
 ↓
Track with order + phone
 ↓
Create account later and claim history where supported
```

This is especially important for reducing checkout friction.

------------------------------------------------------------------------

# 65. Business Console boundary

The Business Console remains the **single product-management surface**.

Public website must not duplicate product CRUD.

Business Console should eventually manage:

-   products
-   variants
-   images
-   categories
-   brands
-   prices
-   stock
-   availability
-   warranty
-   collections
-   promotions
-   orders
-   fulfilment
-   customers
-   returns
-   refunds
-   repairs
-   support tickets

The public website consumes published data.

No customer-facing product-management UI should be invented.

------------------------------------------------------------------------

# 66. Media management

Business Console media flow:

``` text
Admin uploads image
 ↓
Validation
 ↓
Optimization
 ↓
Object storage
 ↓
CDN
 ↓
Public product page
```

Image variants:

-   original
-   large
-   medium
-   thumbnail
-   mobile/optimized variants as useful

Store media metadata rather than bundling media into application code.

------------------------------------------------------------------------

# 67. Order operations

Business Console should eventually expose an order workspace:

``` text
New
Paid
Processing
Packed
Dispatched
Out for delivery
Delivered
Cancelled
Returned
Refunded
```

Staff should be able to see:

-   customer
-   order items
-   payment state
-   delivery details
-   fulfilment state
-   notes
-   support history

Every operational action should be auditable.

------------------------------------------------------------------------

# 68. Delivery operations

Operational console should support:

-   delivery zones
-   delivery charges
-   dispatch assignment
-   driver/courier reference
-   delivery status
-   failed delivery reason
-   proof of delivery
-   rescheduling

Large appliances should be able to use different fulfilment rules from
small electronics.

------------------------------------------------------------------------

# 69. Support ticketing

Customer support should eventually become structured rather than a
collection of WhatsApp messages.

Ticket types:

-   order
-   payment
-   delivery
-   return
-   refund
-   warranty
-   repair
-   product question

Statuses:

-   open
-   assigned
-   waiting for customer
-   in progress
-   resolved
-   closed

Customers see simple language; staff see operational detail.

------------------------------------------------------------------------

# 70. Repair centre

For electronics, repair is a major trust feature.

Customer:

``` text
Request repair
 ↓
Describe problem
 ↓
Product/order
 ↓
Upload evidence
 ↓
Submit
 ↓
Track repair
```

Internal states:

-   received
-   diagnosis
-   estimate
-   awaiting approval
-   repair in progress
-   quality check
-   ready
-   returned

------------------------------------------------------------------------

# 71. Product registration

Future feature for eligible electronics:

-   IMEI/serial number
-   product model
-   purchase/order
-   warranty status

Use only where operationally and legally appropriate.

------------------------------------------------------------------------

# 72. Uganda localization

Amaal should be unmistakably usable in Uganda.

Default:

-   UGX
-   Uganda delivery terminology
-   Ugandan phone formats
-   districts/regions
-   local landmarks
-   MTN/Airtel payment choices where supported
-   local support channels

The design should not feel like a foreign template with "Uganda" pasted
onto it.

------------------------------------------------------------------------

# 73. Electronics breadth strategy

Do not chase catalogue size blindly.

Prioritize depth in categories that have strong shopping intent:

### Phones

Samsung, Apple, TECNO, Infinix, Google Pixel and other verified brands
actually carried by Amaal.

### Tablets

Apple iPad, Samsung Galaxy Tab and other verified models.

### Computers

Laptops, gaming laptops, MacBook, monitors and accessories.

### TV

TCL, Samsung, LG, Hisense, Skyworth and other verified brands.

### Audio

JBL, LG, Samsung and other verified brands, while retaining the correct
Amaal hierarchy under Entertainment → Audio.

### Home appliances

Hisense, ADH, Roch, Saachi, Hoffmans, RAF, Pixel, Geepas, Midea and
other verified brands as the assortment evolves.

### Kitchen appliances

Prioritize useful, affordable Ugandan demand categories before obscure
long-tail products.

The research of current Uganda listings shows strong local demand
signals around affordable refrigerators, freezers, washing machines,
cookers, microwaves, air fryers, blenders, kettles, irons and small
kitchen appliances. Jumia Uganda currently displays examples from Pixel,
Hisense, Roch, ADH, SPJ, Hoffmans and others, demonstrating the
importance of both premium and affordable price bands.

------------------------------------------------------------------------

# 74. Electronics filters should reflect how Ugandans shop

Do not assume a customer thinks in technical taxonomy first.

Support both:

**Technical path**

`Samsung → Galaxy A → 256GB → 5G`

and:

**Need path**

`Phone → under UGX X → good battery → 5G`

Similarly:

`TV → 55 inch → smart → under UGX X`

`Washing machine → 8kg → automatic`

`Fridge → double door → 200–300L`

The UI should make technical filters available without forcing every
shopper to understand them.

------------------------------------------------------------------------

# 75. Product recommendation logic

Recommendations should be explainable.

Examples:

**Similar products** Same category + comparable attributes.

**You may also need** Compatibility or accessories.

**More from Samsung** Same brand.

**People also considered** Only once reliable behavioural data exists.

Do not claim "customers also bought" before Amaal has real purchase
data.

------------------------------------------------------------------------

# 76. Homepage personalization later

Once enough traffic exists:

-   continue shopping
-   recently viewed
-   recommended for you
-   price drops on saved items
-   relevant deals

Do not make the homepage dependent on personalization. First-time
visitors must see a complete useful store.

------------------------------------------------------------------------

# 77. Content language rules

Amaal copy must sound written by a human retailer.

Prefer:

-   "Find the right phone."
-   "Compare the models."
-   "Need help choosing?"
-   "See what is included."
-   "Check delivery to your area."
-   "Save for later."
-   "Your order is on the way."

Avoid:

-   "Unlock a world of possibilities."
-   "Transform your digital lifestyle."
-   "Experience innovation like never before."
-   "Revolutionize your journey."
-   "AI-powered shopping experience."

Amaal should sound confident, not generated.

------------------------------------------------------------------------

# 78. Error and empty states

Every major flow needs human error handling.

Examples:

**Search:** "We couldn't find that yet."

**Cart:** "Your cart is empty. Let's find something useful."

**Wishlist:** "Keep the products you are still considering."

**Payment failed:** "Your payment did not go through. Your order has not
been charged."

**Delivery lookup:** "We couldn't find that order. Check the order
number and phone number."

**Out of stock:** "This option is currently unavailable."

Avoid technical error codes in customer-facing messages.

------------------------------------------------------------------------

# 79. Loading states

Use skeletons only where they improve perceived speed.

Catalogue: - product skeletons - filter skeleton where necessary

Product: - gallery skeleton - title/spec skeleton

Checkout: - button progress state - payment waiting state

Never make the entire screen pulse unnecessarily.

------------------------------------------------------------------------

# 80. Offline and weak-network resilience

Uganda's mobile environment makes this important.

Design for:

-   slow 3G/4G
-   intermittent connectivity
-   image loading failures
-   payment redirects
-   accidental refresh

Persist safe local state such as:

-   guest cart
-   wishlist
-   recently viewed

But never use local storage as the authoritative commerce database.

------------------------------------------------------------------------

# 81. Observability

Production should eventually have:

-   error tracking
-   performance monitoring
-   request logs
-   uptime monitoring
-   deployment monitoring
-   payment monitoring
-   order event monitoring
-   database metrics

Potential stack:

-   Sentry
-   Vercel Observability
-   OpenTelemetry
-   structured logs

Use only what is justified.

------------------------------------------------------------------------

# 82. Testing strategy

## Unit

Test:

-   search normalization
-   filtering
-   sorting
-   URL state
-   variant selection
-   cart calculations
-   discount calculations
-   delivery calculation
-   payment state transitions

## Component

Test:

-   header
-   mega menu
-   mobile accordion
-   product card
-   wishlist button
-   filter sidebar
-   filter sheet
-   compare tray
-   product gallery
-   variant selector
-   cart drawer
-   checkout forms

## End-to-end

Critical journey:

``` text
Homepage
 ↓
Search/category
 ↓
Filter
 ↓
Product
 ↓
Select variant
 ↓
Wishlist or compare
 ↓
Add to cart
 ↓
Cart
 ↓
Checkout
 ↓
Payment
 ↓
Confirmation
 ↓
Track order
```

Also test:

-   payment failure
-   duplicate webhook
-   out-of-stock during checkout
-   expired promotion
-   invalid address
-   failed delivery
-   return request

------------------------------------------------------------------------

# 83. Technical architecture

Retain the existing Next.js/React/TypeScript foundation.

Recommended structure:

``` text
apps/public-web/
├── app/
│   ├── page.tsx
│   ├── shop/
│   ├── categories/
│   ├── brands/
│   ├── collections/
│   ├── search/
│   ├── product/
│   ├── cart/
│   ├── checkout/
│   ├── account/
│   ├── wishlist/
│   ├── orders/
│   ├── tracking/
│   ├── returns/
│   ├── warranty/
│   ├── repairs/
│   └── help/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── navigation/
│   ├── catalogue/
│   ├── commerce/
│   ├── product/
│   ├── checkout/
│   └── account/
│
└── lib/
    ├── catalogue/
    ├── search/
    ├── products/
    ├── commerce/
    ├── payments/
    ├── delivery/
    └── utils/
```

Do not blindly reorganize unrelated backend/admin directories.

------------------------------------------------------------------------

# 84. Shared component architecture

### UI

-   Button
-   Input
-   Select
-   Checkbox
-   Radio
-   Dialog
-   Drawer
-   Badge
-   Toast
-   Skeleton
-   EmptyState
-   Breadcrumbs

### Navigation

-   SiteHeader
-   MegaMenu
-   MobileNavigation
-   SearchOverlay
-   Breadcrumbs

### Catalogue

-   Catalogue
-   CatalogueToolbar
-   CatalogueSidebar
-   CatalogueFilterSheet
-   CatalogueSort
-   ProductGrid
-   ProductCard
-   CompareTray
-   EmptyState

### Commerce

-   Price
-   Availability
-   VariantSelector
-   WishlistButton
-   AddToCartButton
-   CartDrawer
-   CartLine
-   RelatedProducts
-   RecentlyViewed

### Product

-   ProductGallery
-   ProductSummary
-   ProductQuickFacts
-   ProductSpecs
-   ProductReviews
-   ProductQuestions
-   ProductWarranty
-   ProductDelivery
-   ProductAccessories
-   ProductCompare

### Checkout

-   ContactStep
-   DeliveryStep
-   PaymentStep
-   ReviewStep
-   OrderConfirmation

------------------------------------------------------------------------

# 85. State management

Follow the original blueprint.

Use:

-   URL state for filters
-   React state for local interaction
-   server state for catalogue/orders
-   lightweight persistent client state for guest cart/wishlist/compare
    where necessary

Zustand is acceptable for focused persistent client state, but do not
turn the whole application into one global state machine.

------------------------------------------------------------------------

# 86. Backend architecture when commerce is activated

Use a modular monolith first.

Modules:

``` text
Catalog
Product
Category
Brand
Collection
Search
Customer
Wishlist
Cart
Checkout
Order
Payment
Fulfilment
Delivery
Review
Return
Refund
Warranty
Repair
Notification
Support
Promotion
```

Primary database: PostgreSQL.

Cache: Redis where useful.

Object storage: S3-compatible storage, Vercel Blob, Cloudflare R2 or
equivalent.

Search: PostgreSQL initially; dedicated search index later if needed.

Queue/background jobs: BullMQ/Redis or managed queue when operationally
justified.

Do not introduce microservices prematurely.

------------------------------------------------------------------------

# 87. Payment architecture

Never let payment logic live only in the browser.

``` text
Checkout
 ↓
Create payment intent/order attempt
 ↓
Gateway
 ↓
Customer payment
 ↓
Provider callback/webhook
 ↓
Verify signature/reference
 ↓
Idempotent payment update
 ↓
Order confirmation
 ↓
Notification
```

The order should only become paid after server-side verification.

------------------------------------------------------------------------

# 88. Order architecture

Order creation must snapshot the commercial truth at purchase time:

-   product name
-   SKU/variant
-   price
-   quantity
-   discount
-   tax if applicable
-   delivery fee
-   total
-   delivery address
-   payment reference

Later catalogue changes must not rewrite historical orders.

------------------------------------------------------------------------

# 89. Inventory architecture

Inventory changes must be transactional.

Prevent:

-   overselling
-   double reservation
-   stale stock
-   checkout races

Use database transactions/locking or an equivalent robust strategy.

------------------------------------------------------------------------

# 90. Tax and legal readiness

Before production checkout, confirm Uganda-specific requirements with
qualified legal/accounting guidance.

The platform should be capable of representing:

-   taxes where applicable
-   invoices/receipts
-   customer data/privacy consent
-   terms
-   return policy
-   warranty terms
-   payment records

Do not hard-code tax assumptions without verified business/legal
requirements.

------------------------------------------------------------------------

# 91. Privacy

Customer data should be minimized.

Protect:

-   names
-   phone numbers
-   emails
-   addresses
-   order history
-   payment references
-   support conversations

Never store card numbers or sensitive payment credentials unless the
chosen compliant provider explicitly requires it and the architecture is
designed for that responsibility. Prefer hosted/tokenized payment flows.

------------------------------------------------------------------------

# 92. Fraud and abuse controls

Eventually support:

-   rate limiting
-   payment risk checks
-   repeated failed-payment detection
-   coupon abuse prevention
-   suspicious account behaviour
-   return abuse monitoring
-   admin audit logs

Do not make legitimate customers fight a complicated anti-fraud system.

------------------------------------------------------------------------

# 93. International-quality benchmark without losing local identity

Amaal should combine:

### Apple

Visual discipline + focused product presentation.

### Samsung

Product education + support + registration + repair tracking.

### Best Buy

Category depth + comparison + services + practical discovery.

### Jumia Uganda

Local assortment + Uganda payments + delivery expectations +
affordability.

### Amaal

Premium light identity + human copy + trusted curation + Uganda-first
execution.

The objective is:

**International-quality commerce mechanics with a distinctly Ugandan
customer experience.**

------------------------------------------------------------------------

# 94. Current-state gaps that must be closed

Based on the existing Amaal implementation audit, the major gaps are:

1.  Desktop sidebar filters.
2.  Mobile nested category accordion.
3.  Proper mega menu.
4.  Universal `/shop` catalogue aggregation.
5.  Category-aware advanced filters.
6.  URL-persistent filters.
7.  Richer search results and autocomplete.
8.  Real brand catalogue aggregation.
9.  Real collections.
10. Real Deals catalogue.
11. Wishlist.
12. Recently viewed.
13. General comparison architecture.
14. Richer product pages.
15. Related products/accessories.
16. Real cart instead of prototype-only behaviour.
17. Checkout.
18. Payment integration.
19. Order system.
20. Delivery calculation.
21. Delivery tracking.
22. Customer account.
23. Order history.
24. Returns workflow.
25. Refund workflow.
26. Warranty centre.
27. Repair tracking.
28. Reviews.
29. Product Q&A.
30. Notifications.
31. Better support centre.
32. Real merchandising.
33. Product media pipeline.
34. Operational analytics.
35. Production observability.
36. Comprehensive automated testing.
37. Removal of all internal placeholder wording from public UI.
38. Removal/neutralization of hardcoded non-authoritative prices.

------------------------------------------------------------------------

# 95. Implementation phases

## Phase A --- Storefront foundation

Build first:

-   design tokens
-   header
-   mega menu
-   mobile accordion
-   universal catalogue resolver
-   desktop sidebar
-   mobile filter sheet
-   URL state
-   improved product cards
-   unified search
-   category directory
-   shop page

## Phase B --- Discovery and decision support

-   brand pages
-   collections
-   deals
-   wishlist
-   recently viewed
-   compare
-   related products
-   richer product pages
-   buying guides
-   category-specific filters

## Phase C --- Commerce

-   real cart
-   cart drawer
-   checkout
-   guest checkout
-   account
-   addresses
-   order creation
-   payment gateway
-   payment verification
-   confirmation

## Phase D --- Fulfilment

-   delivery rules
-   delivery zones
-   order operations
-   shipment states
-   tracking
-   customer notifications

## Phase E --- After-sales

-   returns
-   refunds
-   warranty
-   repairs
-   support tickets
-   product registration where appropriate

## Phase F --- Trust and growth

-   reviews
-   Q&A
-   bundles
-   buying guides
-   personalization
-   abandoned-cart recovery
-   analytics dashboards
-   recommendation improvements

## Phase G --- Scale

-   caching
-   Redis where justified
-   search index
-   background jobs
-   CDN optimization
-   observability
-   performance budgets

------------------------------------------------------------------------

# 96. P0 / P1 / P2 priority matrix

## P0 --- must fix before calling Amaal a mature storefront

-   Universal shop catalogue
-   Mega menu
-   Mobile navigation
-   Desktop filters
-   Mobile filter sheet
-   URL filter state
-   Search improvements
-   Product page improvements
-   Wishlist
-   Cart architecture
-   Placeholder-text cleanup
-   Price-source cleanup

## P1 --- commerce readiness

-   Checkout
-   Payments
-   Orders
-   Delivery
-   Tracking
-   Account
-   Notifications
-   Returns
-   Warranty

## P2 --- competitive differentiation

-   Reviews
-   Q&A
-   Buying guides
-   Bundles
-   Recommendation engine
-   Price-drop alerts
-   Back-in-stock alerts
-   Loyalty/store credit
-   Personalized collections

------------------------------------------------------------------------

# 97. Definition of "done" for the storefront

Amaal should not be considered finished because every route returns 200
or because hundreds of products exist.

The storefront is ready when a normal customer can:

``` text
Land on Amaal
 ↓
Understand what Amaal sells
 ↓
Search or browse
 ↓
Filter intelligently
 ↓
Compare products
 ↓
Open a detailed product page
 ↓
Understand price, availability, delivery and warranty
 ↓
Save a product
 ↓
Add a variant to cart
 ↓
Checkout without unnecessary friction
 ↓
Pay with a method available in Uganda
 ↓
Receive confirmation
 ↓
Track the order
 ↓
Get support
 ↓
Return/repair/warranty the product if needed
```

That is the standard.

------------------------------------------------------------------------

# 98. Final product philosophy

Amaal does not need to beat international retailers by having the
biggest catalogue.

It should beat ordinary local stores by being:

-   easier to understand
-   easier to compare
-   easier to trust
-   easier to buy from
-   easier to track
-   easier to get help from

The customer should never have to wonder:

**"What exactly am I buying?"**

**"How much will I actually pay?"**

**"Will it reach me?"**

**"What happens if there is a problem?"**

Amaal should answer all four before and after the purchase.

------------------------------------------------------------------------

# 99. Non-negotiable engineering rules

1.  Preserve the existing architecture; do not rebuild from scratch.
2.  Business Console remains the single product-management surface.
3.  No duplicate public CRUD.
4.  No destructive database reset.
5.  Database changes must be additive/idempotent when they become
    necessary.
6.  Do not invent specifications.
7.  Do not invent prices.
8.  Do not invent availability.
9.  Do not invent warranties.
10. Do not invent reviews.
11. Do not expose manufacturer website links on the public website.
12. Keep Audio under Entertainment → Audio.
13. Keep business laptops removed from the public storefront as
    previously decided.
14. Do not bundle huge product-image libraries in the repository.
15. Product media should eventually come from the Business Console/media
    pipeline.
16. Prefer reusable catalogue architecture over category-specific
    duplication.
17. Prefer a modular monolith over premature microservices.
18. Server is authoritative for money, inventory, orders and payments.
19. Mobile experience is not a secondary version of desktop.
20. Customer-facing copy must be human, concise and specific.
21. No internal developer terminology in production UI.
22. No fake urgency, fake ratings or fake savings.
23. Do not add animations merely because the page looks empty.
24. Keep the visual system light, premium and restrained.
25. Audit every implementation before creating a release archive.

------------------------------------------------------------------------

# 100. Master success statement

The finished Amaal platform should feel like a premium Ugandan
electronics showroom that happens to live on the web.

A customer should be able to enter with a need, not a technical
vocabulary, and leave with confidence.

**Find it. Understand it. Save it. Buy it. Track it. Get help.**

That is the Amaal commerce experience this blueprint defines.

------------------------------------------------------------------------

## Research references used for this blueprint

-   Jumia Uganda --- Electronics & Appliances and Mobile Phones
    shopping/category experiences.
-   Samsung Africa --- product navigation, support, warranty,
    registration and service tracking.
-   Baymard Institute --- 2026 Electronics & Office UX Benchmark.
-   Shopify --- 2026 ecommerce UX guidance covering navigation, product
    pages, checkout, mobile and performance.
-   MTN Uganda --- MoMoPay, merchant services, Virtual Card by MoMo and
    Open API documentation.
-   Pesapal Uganda --- ecommerce payment gateway, card/mobile-money
    support and payment API documentation.

## Relationship to the original Amaal Commerce Master Blueprint

This document preserves the original blueprint's strongest architectural
decisions: premium light visual direction, category-driven commerce,
universal catalogue architecture, category-aware filters, URL state,
structured product taxonomy, variants, comparison, modular monolith,
PostgreSQL, CDN/object storage, security, SEO, accessibility, analytics,
testing and the instruction not to rebuild the project unnecessarily.

The original blueprint explicitly defines the objective as moving from a
product catalogue to a commerce platform. **Master Improvement BP** is
the next-level specification for completing that journey across the
entire customer lifecycle.
