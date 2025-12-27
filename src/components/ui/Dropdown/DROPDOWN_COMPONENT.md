# Dropdown Component Documentation

## Overview
The `Dropdown` component is a reusable, accessible select/dropdown menu used for category filtering and other selection needs across The Pillar website. It provides a clean, keyboard-accessible interface with smooth interactions.

## Location
- **Component Path**: `src/components/ui/Dropdown/`
  - `index.jsx` - Component logic
  - `Dropdown.css` - Component styles

## Usage

### Basic Import
```jsx
import { Dropdown } from './components/ui/Dropdown';
```

### Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `options` | Array<{value: string, label: string}> | Yes | - | Array of selectable options with value and label |
| `value` | string | Yes | - | Current selected value |
| `onChange` | Function | Yes | - | Callback function triggered when selection changes: `(value) => void` |
| `placeholder` | string | No | `'Select...'` | Text shown when no option is selected |
| `label` | string | No | - | Optional label displayed above the dropdown |

### Example Usage

#### Category Filter on Home Page
```jsx
import { useState } from 'react';
import { Dropdown } from './components/ui/Dropdown';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'news', label: 'News' },
    { value: 'opinion', label: 'Opinion' },
    { value: 'feature', label: 'Feature' },
    { value: 'scitech', label: 'Science & Tech' },
    { value: 'editorial', label: 'Editorial' },
    { value: 'photos', label: 'Photos' },
    { value: 'videos', label: 'Videos' },
    { value: 'cartoons', label: 'Cartoons' },
  ];

  return (
    <section className="home__section">
      <div className="container">
        <h2 className="home__section-label">BROWSE BY CATEGORY</h2>
        
        <Dropdown
          options={categoryOptions}
          value={selectedCategory}
          onChange={(value) => {
            setSelectedCategory(value);
            // Handle category filter logic here
          }}
          label="Category"
          placeholder="All Categories"
        />

        {/* Display filtered articles based on selectedCategory */}
      </div>
    </section>
  );
}
```

## Features

- **Accessibility**: Fully accessible with ARIA attributes (role, aria-expanded, aria-haspopup)
- **Keyboard Support**: Can be navigated with keyboard (Enter, Space to open/close)
- **Click-Outside Detection**: Dropdown closes when clicking outside the component
- **Mobile Responsive**: Optimized for mobile screens with adjusted padding and sizes
- **Design System Integration**: Uses CSS custom properties from `src/styles/variables.css`
- **Visual Feedback**: Hover and active states with smooth transitions
- **Active Indicator**: Shows checkmark (✓) for selected option

## Design Specifications

### Colors (from CSS Variables)
- **Primary Colors**: Uses `--color-primary` (#082640) for borders and active states
- **Text**: `--color-text-primary` (#000000) for default text
- **Borders**: `--color-border` for default state
- **Backgrounds**: `--color-white` for menu, `--color-gray-100` for hover states

### Typography
- **Font Family**: `--font-family-body` (Roboto, Segoe UI)
- **Sizes**: `--font-size-base` (16px) for trigger, `--font-size-sm` (14px) for label
- **Weights**: Medium (500) for text, Semibold (600) for active/labels

### Spacing
- Padding: `--spacing-md` (16px) and `--spacing-lg` (24px)
- Border Radius: `--radius-md` (8px)

### States
| State | Background | Border | Icon Rotation |
|-------|-----------|--------|---------------|
| Default | white | light-gray | 0deg |
| Hover | light-gray | primary | 0deg |
| Open | white | primary | 180deg |
| Active (Selected) | primary-light | primary | - |

## Styling Customization

The component uses BEM naming convention for CSS classes:
- `.dropdown` - Root container
- `.dropdown__trigger` - Main button
- `.dropdown__menu` - Dropdown menu container
- `.dropdown__option` - Individual menu item
- `.dropdown__option--active` - Active/selected state modifier

You can override styles by targeting these classes or modifying the CSS custom properties in `src/styles/variables.css`.

## Accessibility Features

- **ARIA Attributes**: 
  - `role="listbox"` on menu
  - `role="option"` on menu items
  - `aria-expanded` on trigger
  - `aria-haspopup="listbox"` on trigger
  - `aria-selected` on menu items

- **Keyboard Navigation**:
  - Click/Enter to open dropdown
  - Click option or press Enter to select
  - Click outside or Escape to close

## Mobile Optimization

The component is mobile-first and includes media queries for devices ≤ 768px:
- Reduced padding on smaller screens
- Smaller font sizes for mobile readability
- Limited menu height (250px max) to prevent excessive scrolling

## Performance Considerations

- Uses `useRef` to manage focus and click-outside detection
- `useEffect` cleanup properly removes event listeners
- Smooth CSS transitions for visual feedback (0.15s - 0.2s)

## Related Components

- `Header` - Navigation component
- `Modal` - Alternative for more complex selections
- Category-specific page components that can filter using this dropdown

## Changelog

### Version 1.0.0
- Initial component creation
- Full accessibility support
- Mobile responsive design
- CSS custom properties integration
