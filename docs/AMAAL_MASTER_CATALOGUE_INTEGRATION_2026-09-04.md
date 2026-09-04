# Amaal Master Catalogue Integration Report — 2026-09-04

Source files used:
- `AMAAL_COMPLETE_PROJECT_COMMERCE_FINAL_2026-09-04.zip`
- `Product one.zip`
- `amaal_phones_and_speakers_master_catalogue.md`

The markdown catalogue is treated as authoritative for supplied phone/audio prices and product copy. The project catalogue is preserved and enriched; no existing product rows are deleted. Supplied images are copied into `apps/public-web/public/products/amaal-master/`. Unmatched images remain bundled but are not assigned to another product.

Source entries: 103
Phone model pages: 36
Audio product pages: 35
Existing project catalogue models enriched: 38
Genuinely new model entries in the existing static catalogue: 33
Supplied images mapped: 49
Photo placeholders: 22

| Product | Type | Status | Slug | Variants | Price | Image | Page |
|---|---|---|---|---:|---|---|---|
| Galaxy A07 | Phone model | Existing model enriched | `samsung-galaxy-a07` | 2 | 64GB · 4GB RAM = UGX 470,000; 128GB · 4GB RAM = UGX 530,000 | Galaxy A07 .jpg | `/phones/samsung-galaxy-a07` |
| Galaxy A17 | Phone model | Existing model enriched | `samsung-galaxy-a17` | 1 | 128GB · 4GB RAM = UGX 650,000 | Galaxy A17 .jpg | `/phones/samsung-galaxy-a17` |
| Galaxy S25 5G | Phone model | Existing model enriched | `samsung-galaxy-s25` | 2 | 128GB · 8GB RAM = UGX 2,500,000; 256GB · 12GB RAM = UGX 2,650,000 | Galaxy S25 .jpg | `/phones/samsung-galaxy-s25` |
| Galaxy S25+ | Phone model | Existing model enriched | `samsung-galaxy-s25-plus` | 1 | 256GB · 12GB RAM = UGX 2,850,000 | Galaxy S25 plus.jpg | `/phones/samsung-galaxy-s25-plus` |
| Galaxy S25 FE | Phone model | New model | `samsung-galaxy-s25-fe` | 1 | 256GB · 8GB RAM = UGX 2,200,000 | Galaxy S25 FE.jpg | `/phones/samsung-galaxy-s25-fe` |
| Galaxy S25 Ultra | Phone model | Existing model enriched | `samsung-galaxy-s25-ultra` | 2 | 256GB · 12GB RAM = UGX 3,450,000; 512GB · 12GB RAM = UGX 3,900,000 | Galaxy s25 ultra .jpg | `/phones/samsung-galaxy-s25-ultra` |
| Galaxy S25 Edge | Phone model | Existing model enriched | `samsung-galaxy-s25-edge` | 1 | 512GB · 12GB RAM = UGX 3,650,000 | Galaxy S25 edge .jpg | `/phones/samsung-galaxy-s25-edge` |
| Galaxy S26 | Phone model | Existing model enriched | `samsung-galaxy-s26` | 1 | 256GB · 12GB RAM = UGX 2,700,000 | Galaxy S26 .jpg | `/phones/samsung-galaxy-s26` |
| Galaxy S26 Ultra | Phone model | Existing model enriched | `samsung-galaxy-s26-ultra` | 3 | 256GB · 12GB RAM = UGX 3,700,000; 512GB · 12GB RAM = UGX 4,200,000; 1TB · 16GB RAM = UGX 5,500,000 | Galaxy S26 ultra.jpg | `/phones/samsung-galaxy-s26-ultra` |
| Galaxy Z Flip6 | Phone model | Existing model enriched | `samsung-galaxy-z-flip6` | 2 | 256GB · 12GB RAM = UGX 2,750,000; 512GB · 12GB RAM = UGX 2,950,000 | Photo coming soon | `/phones/samsung-galaxy-z-flip6` |
| Galaxy Z Fold6 | Phone model | Existing model enriched | `samsung-galaxy-z-fold6` | 2 | 256GB · 12GB RAM = UGX 3,650,000; 512GB · 12GB RAM = UGX 3,850,000 | Galaxy Z fold 6 .jpg | `/phones/samsung-galaxy-z-fold6` |
| Galaxy Z Flip7 | Phone model | Existing model enriched | `samsung-galaxy-z-flip7` | 2 | 256GB · 12GB RAM = UGX 3,150,000; 512GB · 12GB RAM = UGX 3,300,000 | Galaxy Z flip 7.jpg | `/phones/samsung-galaxy-z-flip7` |
| Galaxy Z Fold7 | Phone model | Existing model enriched | `samsung-galaxy-z-fold7` | 3 | 256GB · 12GB RAM = UGX 5,250,000; 512GB · 12GB RAM = UGX 5,750,000; 1TB · 16GB RAM = UGX 6,950,000 | Galaxy fold 7.jpg | `/phones/samsung-galaxy-z-fold7` |
| Galaxy Z Flip8 | Phone model | Existing model enriched | `samsung-galaxy-z-flip8` | 2 | 256GB · 12GB RAM = UGX 5,200,000; 512GB · 12GB RAM = UGX 6,000,000 | Photo coming soon | `/phones/samsung-galaxy-z-flip8` |
| Galaxy Z Fold8 | Phone model | Existing model enriched | `samsung-galaxy-z-fold8` | 3 | 256GB · 12GB RAM = UGX 6,100,000; 512GB · 12GB RAM = UGX 7,700,000; 1TB · 16GB RAM = UGX 9,200,000 | Galaxy fold 8 standard passport.jpg | `/phones/samsung-galaxy-z-fold8` |
| Galaxy Z Fold8 Ultra | Phone model | Existing model enriched | `samsung-galaxy-z-fold8-ultra` | 3 | 256GB · 12GB RAM = UGX 7,650,000; 512GB · 12GB RAM = UGX 8,300,000; 1TB · 16GB RAM = UGX 10,000,090 | Galaxy fold 8 ultra .jpg | `/phones/samsung-galaxy-z-fold8-ultra` |
| iPhone 15 | Phone model | Existing model enriched | `apple-iphone-15` | 2 | 128GB = UGX 2,250,000; 256GB = UGX 2,450,000 | Iphone 15.jpg | `/phones/apple-iphone-15` |
| iPhone 15 Plus | Phone model | Existing model enriched | `apple-iphone-15-plus` | 2 | 128GB = UGX 2,400,000; 256GB = UGX 2,600,000 | Iphone 15 plus.jpg | `/phones/apple-iphone-15-plus` |
| iPhone 15 Pro | Phone model | Existing model enriched | `apple-iphone-15-pro` | 2 | 128GB = UGX 2,750,000; 256GB = UGX 2,950,000 | IPhone  15 pro.jpg | `/phones/apple-iphone-15-pro` |
| iPhone 15 Pro Max | Phone model | Existing model enriched | `apple-iphone-15-pro-max` | 3 | 256GB = UGX 3,250,000; 512GB = UGX 3,450,000; 1TB = UGX 3,650,000 | Iphone 15 pro max.jpg | `/phones/apple-iphone-15-pro-max` |
| iPhone 16 | Phone model | Existing model enriched | `apple-iphone-16` | 2 | 128GB = UGX 2,750,000; 256GB = UGX 3,000,000 | Iphone 16 .jpg | `/phones/apple-iphone-16` |
| iPhone 16 Plus | Phone model | Existing model enriched | `apple-iphone-16-plus` | 2 | 128GB = UGX 3,250,000; 256GB = UGX 3,550,000 | Iphone 16 plus.jpg | `/phones/apple-iphone-16-plus` |
| iPhone 16 Pro | Phone model | Existing model enriched | `apple-iphone-16-pro` | 2 | 128GB = UGX 3,600,000; 256GB = UGX 3,950,000 | Iphone 16 pro .jpg | `/phones/apple-iphone-16-pro` |
| iPhone 16 Pro Max | Phone model | Existing model enriched | `apple-iphone-16-pro-max` | 3 | 256GB = UGX 4,100,000; 512GB = UGX 4,500,000; 1TB = UGX 4,850,000 | Iphone 16 pro max .jpg | `/phones/apple-iphone-16-pro-max` |
| iPhone 17 | Phone model | Existing model enriched | `apple-iphone-17` | 1 | 256GB = UGX 3,580,000 | Iphone 17 .jpg | `/phones/apple-iphone-17` |
| iPhone Air | Phone model | Existing model enriched | `apple-iphone-air` | 2 | 256GB = UGX 3,700,000; 512GB = UGX 3,850,000 | Iphone 17 air .jpg | `/phones/apple-iphone-air` |
| iPhone 17 Pro | Phone model | Existing model enriched | `apple-iphone-17-pro` | 1 | 256GB = UGX 5,100,000 | Iphone 17 pro.jpg | `/phones/apple-iphone-17-pro` |
| iPhone 17 Pro Max | Phone model | Existing model enriched | `apple-iphone-17-pro-max` | 3 | 256GB = UGX 5,650,000; 512GB = UGX 6,200,000; 1TB = UGX 6,400,000 | Iphone 17 pro max.jpg | `/phones/apple-iphone-17-pro-max` |
| Pixel 8a | Phone model | Existing model enriched | `google-pixel-pixel-8a` | 1 | 128GB · 8GB RAM = UGX 1,400,000 | Photo coming soon | `/phones/google-pixel-pixel-8a` |
| Pixel 9a | Phone model | Existing model enriched | `google-pixel-pixel-9a` | 2 | 128GB · 8GB RAM = UGX 1,650,000; 256GB · 8GB RAM = UGX 1,850,000 | Pixel 9a.jpg | `/phones/google-pixel-pixel-9a` |
| Pixel 10a | Phone model | Existing model enriched | `google-pixel-pixel-10a` | 1 | 128GB · 8GB RAM = UGX 1,950,000 | Pixel 10a .jpg | `/phones/google-pixel-pixel-10a` |
| Pixel 10 | Phone model | Existing model enriched | `google-pixel-pixel-10` | 2 | 128GB · 12GB RAM = UGX 2,650,000; 256GB · 12GB RAM = UGX 2,850,000 | Pixel 10 .jpg | `/phones/google-pixel-pixel-10` |
| Pixel 10 Pro | Phone model | Existing model enriched | `google-pixel-pixel-10-pro` | 1 | 256GB · 16GB RAM = UGX 3,550,000 | Pixel 10 pro .jpg | `/phones/google-pixel-pixel-10-pro` |
| Pixel 10 Pro XL | Phone model | Existing model enriched | `google-pixel-pixel-10-pro-xl` | 2 | 256GB · 16GB RAM = UGX 3,650,000; 512GB · 16GB RAM = UGX 4,350,000 | Google pixel 10 pro Xl .jpg | `/phones/google-pixel-pixel-10-pro-xl` |
| Pixel 10 Pro Fold | Phone model | Existing model enriched | `google-pixel-pixel-10-pro-fold` | 2 | 256GB · 16GB RAM = UGX 4,850,000; 512GB · 16GB RAM = UGX 5,750,000 | Pixel 10 pro fold .jpg | `/phones/google-pixel-pixel-10-pro-fold` |
| Pixel 11 Pro XL | Phone model | Existing model enriched | `google-pixel-pixel-11-pro-xl` | 1 | 256GB · 16GB RAM = UGX 5,250,000 | Pixel 11 pro xl .jpg | `/phones/google-pixel-pixel-11-pro-xl` |
| JBL Go 5 | Audio | New product | `jbl-go-5` | DB dependent | UGX 220,000 | Photo coming soon | `/categories/entertainment/audio/jbl-go-5` |
| JBL Clip 5 | Audio | Existing product enriched | `jbl-clip-5` | DB dependent | UGX 230,000 | JBL CLIP 5.jpg | `/categories/entertainment/audio/jbl-clip-5` |
| JBL Grip | Audio | New product | `jbl-grip` | DB dependent | UGX 320,000 | JBL GRIP .jpg | `/categories/entertainment/audio/jbl-grip` |
| JBL Flip 7 | Audio | New product | `jbl-flip-7` | DB dependent | UGX 400,000 | JBL flip 7.jpg | `/categories/entertainment/audio/jbl-flip-7` |
| JBL Charge 6 | Audio | New product | `jbl-charge-6` | DB dependent | UGX 550,000 | JBLcharge 6.jpg | `/categories/entertainment/audio/jbl-charge-6` |
| JBL Horizon 3 | Audio | New product | `jbl-horizon-3` | DB dependent | UGX 550,000 | JBL HORIZON 3.jpg | `/categories/entertainment/audio/jbl-horizon-3` |
| JBL Xtreme 4 | Audio | New product | `jbl-xtreme-4` | DB dependent | UGX 990,000 | JBL EXTREME 4 .jpg | `/categories/entertainment/audio/jbl-xtreme-4` |
| JBL Xtreme 5 | Audio | New product | `jbl-xtreme-5` | DB dependent | UGX 1,250,000 | Photo coming soon | `/categories/entertainment/audio/jbl-xtreme-5` |
| JBL Authentics 300 | Audio | New product | `jbl-authentics-300` | DB dependent | UGX 1,250,000 | JBL AUNTHETIC 300 .jpg | `/categories/entertainment/audio/jbl-authentics-300` |
| JBL PartyBox Encore 2 with Mic | Audio | New product | `jbl-partybox-encore-2-with-mic` | DB dependent | UGX 1,500,000 | JBL PARTYBOX ENCORE 2 WITH MIC .jpg | `/categories/entertainment/audio/jbl-partybox-encore-2-with-mic` |
| JBL Boombox 4 | Audio | New product | `jbl-boombox-4` | DB dependent | UGX 1,800,000 | JBL boombox 4 .jpg | `/categories/entertainment/audio/jbl-boombox-4` |
| JBL PartyBox Stage 320 | Audio | Existing product enriched | `jbl-partybox-stage-320` | DB dependent | UGX 2,350,000 | JBL PARTYBOX STAGE 320 .jpg | `/categories/entertainment/audio/jbl-partybox-stage-320` |
| JBL PartyBox Ultimate | Audio | Existing product enriched | `jbl-partybox-ultimate` | DB dependent | UGX 4,650,000 | JBl partybox ultimate.jpg | `/categories/entertainment/audio/jbl-partybox-ultimate` |
| JBL Tune 310 USB-C | Audio | New product | `jbl-tune-310-usb-c` | DB dependent | UGX 70,000 | Photo coming soon | `/categories/entertainment/audio/jbl-tune-310-usb-c` |
| JBL Tune 305C USB-C | Audio | New product | `jbl-tune-305c-usb-c` | DB dependent | UGX 70,000 | Photo coming soon | `/categories/entertainment/audio/jbl-tune-305c-usb-c` |
| JBL Endurance Run 2 Wireless | Audio | New product | `jbl-endurance-run-2-wireless` | DB dependent | UGX 165,000 | Photo coming soon | `/categories/entertainment/audio/jbl-endurance-run-2-wireless` |
| JBL Tune 530BT | Audio | New product | `jbl-tune-530bt` | DB dependent | UGX 190,000 | Photo coming soon | `/categories/entertainment/audio/jbl-tune-530bt` |
| JBL Tune 730BT | Audio | New product | `jbl-tune-730bt` | DB dependent | UGX 230,000 | Photo coming soon | `/categories/entertainment/audio/jbl-tune-730bt` |
| JBL Tune 770NC | Audio | New product | `jbl-tune-770nc` | DB dependent | UGX 300,000 | Photo coming soon | `/categories/entertainment/audio/jbl-tune-770nc` |
| JBL Tune Buds 2 | Audio | New product | `jbl-tune-buds-2` | DB dependent | UGX 320,000 | Photo coming soon | `/categories/entertainment/audio/jbl-tune-buds-2` |
| JBL Tune Beam 2 | Audio | New product | `jbl-tune-beam-2` | DB dependent | UGX 350,000 | Photo coming soon | `/categories/entertainment/audio/jbl-tune-beam-2` |
| JBL Soundgear Frames | Audio | New product | `jbl-soundgear-frames` | DB dependent | UGX 400,000 | Photo coming soon | `/categories/entertainment/audio/jbl-soundgear-frames` |
| JBL Live Flex 3 | Audio | New product | `jbl-live-flex-3` | DB dependent | UGX 600,000 | Photo coming soon | `/categories/entertainment/audio/jbl-live-flex-3` |
| JBL Live Beam 3 | Audio | New product | `jbl-live-beam-3` | DB dependent | UGX 600,000 | Photo coming soon | `/categories/entertainment/audio/jbl-live-beam-3` |
| JBL Tour Pro 3 | Audio | New product | `jbl-tour-pro-3` | DB dependent | UGX 750,000 | Photo coming soon | `/categories/entertainment/audio/jbl-tour-pro-3` |
| JBL Tour One M3 | Audio | New product | `jbl-tour-one-m3` | DB dependent | UGX 1,080,000 | Photo coming soon | `/categories/entertainment/audio/jbl-tour-one-m3` |
| JBL Tour One M3 Smart Tx | Audio | New product | `jbl-tour-one-m3-smart-tx` | DB dependent | UGX 1,200,000 | Photo coming soon | `/categories/entertainment/audio/jbl-tour-one-m3-smart-tx` |
| JBL PartyLight Stick | Audio | New product | `jbl-partylight-stick` | DB dependent | UGX 300,000 | JBL PARTY LIGHT STICK .jpg | `/categories/entertainment/audio/jbl-partylight-stick` |
| JBL PartyLight Beam | Audio | New product | `jbl-partylight-beam` | DB dependent | UGX 440,000 | Photo coming soon | `/categories/entertainment/audio/jbl-partylight-beam` |
| JBL Wireless Microphone Set | Audio | New product | `jbl-wireless-microphone-set` | DB dependent | UGX 400,000 | Photo coming soon | `/categories/entertainment/audio/jbl-wireless-microphone-set` |
| JBL PartyBox Wireless Mic Set | Audio | New product | `jbl-partybox-wireless-mic-set` | DB dependent | UGX 440,000 | Photo coming soon | `/categories/entertainment/audio/jbl-partybox-wireless-mic-set` |
| Harman Kardon Luna | Audio | New product | `harman-kardon-luna` | DB dependent | UGX 470,000 | Harman Kardon luna .jpg | `/categories/entertainment/audio/harman-kardon-luna` |
| Harman Kardon Onyx Studio 9 | Audio | New product | `harman-kardon-onyx-studio-9` | DB dependent | UGX 800,000 | Harman KardonStudio 9.jpg | `/categories/entertainment/audio/harman-kardon-onyx-studio-9` |
| Harman Kardon Citation 200 | Audio | New product | `harman-kardon-citation-200` | DB dependent | UGX 1,100,000 | HarmanKardon citation.jpg | `/categories/entertainment/audio/harman-kardon-citation-200` |
| Harman Kardon Go + Play 3 | Audio | New product | `harman-kardon-go-play-3` | DB dependent | UGX 1,150,000 | Harman Kardon Go+ play3 .jpg | `/categories/entertainment/audio/harman-kardon-go-play-3` |

## Commerce safety
- Online Add to Cart is shown only when the existing public catalogue resolves the exact supplied variant price and reports `inStock === true`.
- Products without a verified inventory-backed variant use an enquiry/availability CTA instead of fabricated stock.
- No SKU is generated for the supplied catalogue entries.
- The database migration updates existing products/variants where they already exist and creates missing product records as `Active/Hidden` with no fabricated variants. Real SKUs and inventory can be added later through the existing Admin Console.

## Build verification limitation
The environment did not have the project's npm dependencies installed. A dependency installation attempt timed out. Static TypeScript checking was run with the globally available compiler; the resulting errors are dominated by missing `next`, `react`, `lucide-react`, and Node type packages. The modified source files were also inspected for syntax errors and corrected before packaging.

## Homepage price alignment
The homepage phone offers were aligned to the supplied master catalogue wherever the markdown contains the model/variant: Galaxy A07 64GB, Galaxy A17 128GB, iPhone 16 Pro Max 256GB, Pixel 11 Pro XL 256GB, Galaxy Z Fold8 configurations, Galaxy Z Fold8 Ultra configurations, and TECNO CAMON 50 Pro 5G/4G. Google Pixel 9 remains at the separately supplied approved homepage offer of UGX 1,800,000 because that model is not present in the supplied markdown source.
