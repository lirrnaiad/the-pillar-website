# Card Variants and Layout Guidance

This document describes recommended variants and where to use them in The Pillar landing page layout.

Variants:

- `card--small`
  - Use for category lists and thumbnails in multi-column sections.
  - Reduces media height to 110px.

- `card--large`
  - Use for featured stories and hero-adjacent content.
  - Increases media height to 340px for visual prominence.

Layout recommendations:
- Featured News (2x2 grid): Use one `card--large` for the primary story and `card`/`card--small` for supporting items.
- Spotlight / News Feature: Use a plain `card` but stretch the container horizontally; images should be letterbox-cropped.
- Three-column category lists: use `card--small` for compactness; include a small square thumbnail (110px by 110px visually).

Accessibility:
- Ensure `imageAlt` is provided for all images.
- When `link` is used, the anchor receives `aria-label` with the `title`.
