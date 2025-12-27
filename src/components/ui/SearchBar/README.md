# SearchBar Component

A versatile, accessible search input component designed for The Pillar website. Features include real-time input handling, clear button functionality, and multiple visual variants to fit different contexts.

## Features

- **Interactive Input** - Real-time search query capture with visual feedback
- **Clear Button** - Quickly clear the search input
- **Submit Handling** - Form submission for search queries
- **Multiple Variants** - Default, compact, and modal variants for different layouts
- **Accessible** - ARIA labels, semantic HTML, and keyboard-friendly
- **Responsive** - Mobile-first design with adaptive styling
- **Focus Management** - Auto-focus support and focus state styling

## Usage

### Basic Usage

```jsx
import { SearchBar } from '../path/to/SearchBar';

function MyComponent() {
  const handleSearch = (query) => {
    console.log('Search:', query);
    // Perform search operation
  };

  return (
    <SearchBar 
      onSearch={handleSearch}
      placeholder="Search articles..."
    />
  );
}
```

### With Modal (Auto-focus)

```jsx
{isSearchOpen && (
  <SearchBar 
    onSearch={handleSearch}
    variant="modal"
    autoFocus={true}
  />
)}
```

### Compact Variant (Inline in Header)

```jsx
<SearchBar 
  onSearch={handleSearch}
  variant="compact"
  placeholder="Search..."
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSearch` | function | undefined | Callback function when form is submitted with a non-empty query |
| `placeholder` | string | `'Search articles...'` | Placeholder text shown in the input field |
| `variant` | string | `'default'` | Visual variant: `'default'`, `'compact'`, or `'modal'` |
| `autoFocus` | boolean | `false` | Whether the input should automatically focus on mount |

## Variants

### Default
Used in standard search contexts with normal padding and sizing.

```jsx
<SearchBar variant="default" />
```

### Compact
Optimized for inline use in headers or tight spaces with reduced padding and smaller font size.

```jsx
<SearchBar variant="compact" />
```

### Modal
Full-width variant for search modals with larger padding and prominent styling.

```jsx
<SearchBar variant="modal" autoFocus={true} />
```

## Styling

The component uses CSS custom properties from `src/styles/variables.css` for consistency:

- **Colors**: `--color-accent`, `--color-border`, `--color-text-*`, `--color-white`
- **Spacing**: All spacing uses CSS variables (`--spacing-*`)
- **Typography**: Uses body font family and base font size
- **Transitions**: Smooth transitions for focus and hover states

### Customizing Colors

To customize the search bar colors, override CSS variables:

```css
.search-bar {
  --color-accent: #your-color;
  --color-border: #your-color;
}
```

## Interactive Features

### Clear Button
- Appears when input has text
- Clears input and refocuses field
- Accessible with aria-label

### Submit Button
- Always visible with search icon
- Triggers form submission
- Changes color on hover

### Focus States
- Input border changes to accent color
- Box shadow provides visual feedback
- Icon color changes on focus

## Keyboard Interactions

- **Tab** - Navigate to/from the search bar
- **Enter** - Submit the search form
- **Escape** - Clear the input (when focused on clear button)

## Examples

### In Header

```jsx
import { SearchBar } from '../../ui/SearchBar';

function Header() {
  const handleSearch = (query) => {
    // Navigate to search results
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <header>
      <SearchBar 
        variant="compact"
        onSearch={handleSearch}
        placeholder="Search articles..."
      />
    </header>
  );
}
```

### In Search Modal

```jsx
{isSearchOpen && (
  <div className="search-modal">
    <SearchBar 
      variant="modal"
      autoFocus={true}
      onSearch={handleSearch}
    />
  </div>
)}
```

## Accessibility

The component includes:
- Semantic `<form>` with `role="search"`
- ARIA labels on buttons and inputs
- Proper input type (`search` instead of `text`)
- Focus management and visible focus states
- Keyboard-navigable
- Readable placeholder text

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- **Header** - Uses SearchBar in compact variant
- **Search Modal** - Uses SearchBar in modal variant

## Future Enhancements

Possible improvements for future versions:
- Debounced real-time search suggestions
- Search history/recent searches
- Category filters
- Voice search input
- Analytics tracking for search queries
