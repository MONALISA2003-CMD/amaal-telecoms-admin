
## Final fixes in this package
- Added the newly supplied TECNO CAMON 50 product photo as `public/assets/amaal/homepage/tecno-camon-50-pro.webp` and assigned it to the existing verified `tecno-camon-50-pro-5g-4g` homepage catalogue entry. No duplicate product was created.
- Added the newly supplied lifestyle image as `public/assets/amaal/homepage/footer-lifestyle.webp` and applied it as a restrained image-backed footer background with a readability overlay.
- On small screens, the existing hero source image is now rendered as a complete 16:9 media panel below the hero copy. This avoids the previous portrait-background crop while preserving the same hero asset and message.
- AutoRails now pause while a user is interacting with them: pointer hover, pointer click/tap, drag, or keyboard focus. They resume automatically when the user leaves the rail or focus moves away. No pause/play or direction buttons were added.
- Homepage product cards can use the existing Add-to-Cart system when the live public catalogue exposes an exact, in-stock variant whose existing selling price matches the requested homepage price. The implementation never guesses a variant. If no unambiguous live variant is available, the safe `Order Now` path remains.
- `AddToBag` now supports an optional button label so the homepage can say **Add to cart** without changing the default wording elsewhere.
