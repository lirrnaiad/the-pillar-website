# Button — Usage Guide

Quick examples and recommended usage patterns for The Pillar site.

Import
```
// Named import (preferred)
import { Button } from 'src/components/ui';

// Default import (backwards-compatible)
import Button from 'src/components/ui/Button';
```

Basic usage
```
<Button variant="primary" size="md">Read More</Button>
```

Variants
- `primary` — main CTA (accent color)
- `secondary` — darker secondary action
- `outline` — bordered, secondary emphasis
- `ghost` — minimal, low emphasis

Sizes
- `sm` — small (compact actions)
- `md` — default
- `lg` — large CTAs

States
- `disabled` — pass the `disabled` prop
- `loading` — pass the `loading` prop and optional `loadingText`

Examples
```
<Button variant="primary" onClick={save}>Save</Button>

<Button variant="outline" size="sm" disabled>Discard</Button>

<Button variant="primary" loading loadingText="Saving...">Save</Button>

<Button variant="primary" fullWidth>Subscribe</Button>
```

Styling notes
- Component uses CSS variables from `src/styles/variables.css` for colors, spacing, and typography.
- Importing the component automatically loads its styles; avoid overriding core styles globally.

When to use
- Use `primary` for primary site CTAs (subscribe, save, publish).
- Use `secondary` or `outline` for destructive or less-important actions.
