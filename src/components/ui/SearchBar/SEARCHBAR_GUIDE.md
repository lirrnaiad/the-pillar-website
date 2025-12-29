# SearchBar Component Structure & Visual Guide

## Component Hierarchy

```
<form class="search-bar search-bar--{variant}">
  ├── .search-bar__container
  │   ├── .search-bar__icon--search (SVG - always visible)
  │   ├── input.search-bar__input (main search input)
  │   ├── button.search-bar__clear-btn (visible when input has text)
  │   └── button.search-bar__submit-btn (always visible)
```

## Visual Variants

### 1. Default Variant
```
┌─────────────────────────────────────┐
│ 🔍 Search articles...         ✕ 🔍 │
└─────────────────────────────────────┘
Full width with normal padding
Font size: 1rem (16px)
```

### 2. Compact Variant
```
┌──────────────────────────────┐
│ 🔍 Search...         ✕ 🔍    │
└──────────────────────────────┘
Reduced width with smaller padding
Font size: 0.875rem (14px)
Used in headers or inline
```

### 3. Modal Variant (Current Implementation)
```
┌──────────────────────────────────────────────────┐
│                                                  │
│   🔍 Search articles...                    ✕ 🔍 │
│                                                  │
└──────────────────────────────────────────────────┘
Large padding with prominent styling
Font size: 1.125rem (18px)
Used in full-screen search modals
```

## Icon Indicators

| Icon | Element | Behavior |
|------|---------|----------|
| 🔍 | Search Icon (Left) | Always visible, changes color on focus |
| ✕ | Clear Button (Right of input) | Only appears when input has text |
| 🔍 | Submit Button (Right) | Always visible, triggers form submission |

## State Variations

### Default State
- Border: Light gray (`--color-border`)
- Icon color: Gray (`--color-gray-500`)
- Placeholder: Muted text (`--color-text-muted`)

### Focused State
- Border: Accent color (`--color-accent` - Gold)
- Icon color: Accent color
- Box shadow: Subtle accent shadow
- Class applied: `.search-bar--focused`

### With Input State
- Clear button visible (✕)
- Input text shows normally
- Cursor in input field

## CSS Class Structure

```css
/* Main container */
.search-bar
.search-bar--{variant}  /* variant: default, compact, modal */
.search-bar--focused    /* added when input is focused */

/* Internal elements */
.search-bar__container       /* flex container */
.search-bar__icon--search    /* leading search icon */
.search-bar__input           /* main input field */
.search-bar__clear-btn       /* clear/reset button */
.search-bar__submit-btn      /* search submit button */
```

## Responsive Breakpoints

### Mobile (< 640px)
- Font size increased to 16px (prevents iOS zoom)
- Padding adjusted for touch targets
- Icons sized appropriately for fingers

### Tablet (640px - 1024px)
- Standard sizing maintained
- Good spacing for touch interaction
- Clear visual feedback

### Desktop (≥ 1024px)
- Larger padding and icon sizes
- Enhanced visual prominence
- Smooth hover animations

## Color Mapping

| Element | Color Variable | Usage |
|---------|---|---|
| Input Border (Normal) | `--color-border` | Gray (#e0e0e0) |
| Input Border (Focus) | `--color-accent` | Gold (#dfd0b8) |
| Icon (Normal) | `--color-gray-500` | Gray (#9e9e9e) |
| Icon (Focused) | `--color-accent` | Gold (#dfd0b8) |
| Button (Hover) | `--color-accent` | Gold (#dfd0b8) |
| Input Text | `--color-text-primary` | Black (#000000) |
| Placeholder | `--color-text-muted` | Gray (#999999) |
| Background | `--color-white` | White (#ffffff) |

## Animation & Transitions

All transitions use `--transition-fast: 150ms ease`

### Animated Properties:
- Border color (on focus)
- Icon color (on focus)
- Box shadow (on focus)
- Button color (on hover)

## Accessibility Features

### Keyboard Navigation
- **Tab** → Enter/Exit input field
- **Enter** → Submit search form
- **Shift+Tab** → Move to previous element
- Clear button is tab-accessible when visible

### Screen Reader
- Form: `role="search"` announces search region
- Input: `aria-label` describes field purpose
- Buttons: Descriptive `aria-label` for actions
- SVG icons: `aria-hidden="true"` to prevent redundant announcements

### Visual Indicators
- Focus state clearly visible (accent border + shadow)
- Clear button only appears when logical
- Touch targets minimum 32px (44px recommended)

## Example Implementation Flow

```jsx
// User interacts with search icon in header
User clicks search icon
↓
toggleSearch() sets isSearchOpen = true
↓
Search modal renders with SearchBar component
↓
SearchBar with variant="modal" and autoFocus={true} is rendered
↓
Input automatically receives focus
↓
User types search query
↓
Clear button appears as user types
↓
User presses Enter or clicks search button
↓
onSearch callback triggered with query
↓
handleSearch() called in Header
↓
navigate(`/search?q=${query}`) routes to search results
↓
Modal closes automatically
```

## Performance Considerations

- ✅ No external dependencies
- ✅ Minimal re-renders (controlled component)
- ✅ CSS uses native browser features (no animations on transform)
- ✅ SVG icons are inline (no extra HTTP requests)
- ✅ Event handlers debounced naturally by React

## Future Enhancement Mockups

### With Autocomplete
```
┌─────────────────────────────────────┐
│ 🔍 Search articles...         ✕ 🔍 │
├─────────────────────────────────────┤
│ • Balik Kampus 2025                 │
│ • Latest Campus News                │
│ • Foundation Day Coverage           │
└─────────────────────────────────────┘
```

### With Recent Searches
```
┌─────────────────────────────────────┐
│ 🔍 Search articles...         ✕ 🔍 │
├─────────────────────────────────────┤
│ Recent:                             │
│ • Opinion: Campus Digitalization    │
│ • News: Balik Kampus 2025          │
│ • Photos: Foundation Day           │
└─────────────────────────────────────┘
```

---

**Component Status**: ✅ Production Ready

The SearchBar component is fully functional, documented, and integrated with The Pillar's design system.
