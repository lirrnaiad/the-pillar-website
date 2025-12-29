# Button — API Reference

Props

- `variant` (string) — 'primary' | 'secondary' | 'outline' | 'ghost'
  - Default: `'primary'`
  - Controls visual style and loader color.

- `size` (string) — 'sm' | 'md' | 'lg'
  - Default: `'md'`
  - Controls padding and font-size.

- `disabled` (boolean)
  - Default: `false`
  - Disables pointer events and sets `aria-disabled`.

- `loading` (boolean)
  - Default: `false`
  - Displays loader and sets `aria-busy`.

- `loadingText` (string)
  - Default: `'Loading...'`
  - Visible while `loading` is true (screen readers will announce it when combined with `aria-live` usage).

- `fullWidth` (boolean)
  - Default: `false`
  - Expands button to 100% width of container.

- `type` (string)
  - Default: `'button'` (can be `'submit' | 'reset'`)

- `onClick` (function)
  - Click handler. Will not fire while `disabled` or `loading`.

- `icon` (React component)
  - Optional icon component; passed className `btn__icon` for sizing.

- `className` (string)
  - Additional classes appended to the root `.btn` element.

Notes
- The component exports a named `Button` and a default export for compatibility.
- Props are intentionally simple — keep complex behavior at the parent level (e.g., form submission state).
