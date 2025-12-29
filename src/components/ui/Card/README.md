# Card Component

This folder contains the `Card` UI component used across The Pillar site.

Usage:

```jsx
import { Card } from 'src/components/ui/Card';

<Card
  image="/src/assets/images/hero.jpg"
  title="Headline"
  excerpt="Short summary of the article"
  category="News"
  date="September 22, 2025"
  author="Staff Writer"
  link="#"
 />
```

Props:
- `image` (string): image src URL
- `imageAlt` (string): alt text for accessibility
- `title` (string): headline text
- `excerpt` (string): short summary
- `category` (string): small label shown over the media
- `date` (string): display date
- `author` (string): author name
- `link` (string): optional href; if present card uses an anchor wrapper

Exports:
- `export const Card` — named export (preferred)
- `export default Card` — default export for backwards compatibility

Notes:
- Component is mobile-first. Use the `card--small` and `card--large` modifiers for list thumbnails and featured cards respectively.
- Styles live in `styles.css` and rely on global CSS variables found in `src/styles/variables.css`.
