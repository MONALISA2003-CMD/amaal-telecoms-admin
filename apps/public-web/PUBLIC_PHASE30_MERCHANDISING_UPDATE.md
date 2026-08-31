# Public Website — Phase 30 Merchandising Update

## Scope
Public website only. The business/admin console and backend were intentionally left unchanged.

## Delivered
- Replaced homepage featured-product placeholders with the supplied Amaal product photography.
- Added supplied image galleries for the featured iPhone 16 Pro Max, Google Pixel 9, Galaxy A17, Galaxy A07, TCL V635 TV, Hisense 8kg washer and Samsung HW-B400F soundbar.
- Added compact product galleries to Featured at Amaal and New at Amaal cards.
- Added a full image gallery to curated product detail pages.
- Replaced CSS-only marquee behavior with one reusable interactive horizontal rail used by every homepage auto-motion section:
  - automatic motion starts by default;
  - pause/resume control;
  - left and right controls;
  - mouse/touch drag and swipe in both directions;
  - mouse-wheel horizontal scrolling;
  - interaction pauses automatic motion and resumes after a short idle period;
  - clicking/interacting with a product therefore stops the motion long enough to inspect it;
  - reduced-motion preference disables automatic motion.
- Added visual image counts and thumbnail selectors where multiple supplied images exist.

## Validation
- Verified all referenced supplied image assets exist in the public website bundle.
- TypeScript/TSX syntax transpilation validation passed for all Phase 30 changed TypeScript/TSX files.
- Full Next.js production build could not be executed in this environment because the project dependencies were not installed and `npm install` timed out twice; no dependency files or backend/admin code were changed to work around this.
