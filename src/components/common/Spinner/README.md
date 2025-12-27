# Spinner Component

This small, reusable `Spinner` component shows a creative loading indicator used across the site. It uses The Pillar logo in the center for brand consistency.

Usage

- Import from the common barrel: `import { Spinner } from 'src/components/common';`
- Props:
  - `size` (string): CSS size for the spinner (default: `56px`).
  - `message` (string): Optional loading message shown under the spinner.
  - `className` (string): Additional class names.

Example

```jsx
<Spinner size="72px" message="Loading articles..." />
```

Design notes

- Mobile-first CSS; uses `--spinner-size` to scale.
- Two rotating rings and a glowing core with The Pillar logo at the center for a branded loading state.

Accessibility

- The logo image includes an `alt` attribute. The wrapper uses `role="status"` and `aria-live="polite"` so screen readers announce loading changes.
