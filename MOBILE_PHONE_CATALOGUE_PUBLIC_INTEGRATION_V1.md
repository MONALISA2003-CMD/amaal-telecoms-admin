# Amaal Public Website — Mobile Phone Catalogue Integration V1

## Purpose

The public website is a **product catalogue for phones**, not an inventory screen.

The master phone catalogue supplied by Amaal is the source used to create the public model catalogue. It covers Apple iPhone, Samsung Galaxy phones, Google Pixel, TECNO, Infinix and itel. Samsung Galaxy tablets are intentionally excluded from the phone collection.

## Model and variant architecture

The public website represents:

`Brand → Family → Series → Model → Variant`

A model has one public product page. Storage, RAM and network configurations are selectable variants where the master catalogue lists them.

For iPhone models, storage variants such as **iPhone 11 64GB** and **iPhone 11 128GB** remain variants of the same iPhone 11 model. The model page does not duplicate the same description for every storage capacity.

Where RAM/network changes between configurations, the variant selector shows that difference explicitly.

## What the public catalogue does not contain

The phone catalogue does not expose or imitate:

- stock quantity
- reserved quantity
- supplier
- purchase cost
- margin
- warehouse/store location
- IMEI
- internal SKU
- employee data
- internal availability controls

Those belong to the business/inventory side. The public website is for customer product discovery.

## Photography

Every phone model currently has a dedicated photo placeholder. No phone photo is reused across models. Amaal can supply model-specific images later without changing the catalogue structure.

## Descriptions and accuracy

Descriptions are deliberately catalogue-safe. The implementation uses model identity and verified variant information from the supplied master catalogue. It does not invent hardware specifications that the master marks as pending official verification.

The master catalogue explicitly requires official model name, storage, RAM, network, regional SKU, Uganda commercial availability and warranty verification before a product is presented as available in Uganda.

## Public UX

The phone collection provides:

- search by model/brand/series
- brand filters
- family filters
- model cards
- dedicated model pages
- variant selection
- model-level description
- model information table
- photo placeholder
- enquiry CTA

## Current generated baseline

- 156 phone models
- 351 catalogue variants
- 6 brands
- unique public slug for every model

Source file: `MOBILE_PHONE_CATALOGUE_MASTER_2026.md`

## Future enrichment

When official technical verification is completed, individual model records can be enriched with:

- display
- processor
- cameras
- battery
- charging
- connectivity
- SIM/eSIM
- dimensions/weight
- protection
- colours
- official regional model/SKU
- official manufacturer source

These should be added at model level, while variant-specific differences remain in the variant record.
