# Amaal all-assets reconciliation — 2026-09-04

This build preserves the existing Amaal project and reconciles the supplied Product one and Product 2 image archives against the existing public catalogues.

## Rules applied
- Existing project was used as the base. No rebuild or database reset.
- The explicit phone deletion list remains deleted; unrelated Infinix models remain.
- itel remains removed as a brand and product family.
- TECNO Camon Slim is represented as Spark Slim.
- Every supplied phone image that safely maps to a current phone model is attached to that model.
- Multiple supplied images for one model are retained as gallery images.
- Supplied audio and computer images are stored in their own catalogue asset directories and are wired into their catalogue/detail views.
- Product images are not JPEG-reencoded or resized in this reconciliation. Source image bytes are retained.
- Products with an image but without markdown product details are kept with a clearly marked details-coming-soon state; no price or specification is invented.

## Asset counts
- Product 1 source images: 61 JPG files
- Product 2 source images: 74 JPG files
- Unique source image basenames: 134
- Explicitly removed source model images: 2 (Galaxy S25 and Galaxy S25 FE)
- Phone image files retained: 104
- Audio image files retained: 16
- Computer image files retained: 8
- Phone catalogue entries with supplied imagery: 100
- Phone catalogue entries without supplied imagery: 11
- Image-only audio products added: 12
- Image-only computer products added: 5

## Quality protection
All copied supplied JPG files are byte-for-byte copies of the supplied archive entries. No lossy image recompression was performed.

The final project ZIP uses maximum ZIP/DEFLATE compression for source packaging. JPEG visual quality is not changed by ZIP compression.
