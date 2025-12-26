# Button — Accessibility Notes

Keyboard and focus
- Buttons are native `<button>` elements — they are keyboard-focusable by default.
- Visual focus uses `:focus-visible` to show a clear outline (uses `--color-accent`).

ARIA
- `aria-disabled` is set when `disabled` or `loading`.
- `aria-busy` is set during `loading` to notify assistive tech.

Screen reader guidance
- Use `loadingText` to provide brief context while operations run (e.g., "Saving...").
- For long-running tasks, consider adding `aria-live="polite"` on a surrounding status region so updates are announced.

Color & contrast
- The primary button uses `--color-accent` on a light text color — verify contrast ratios in `src/styles/variables.css`.
- If you change color variables, confirm WCAG AA contrast for text and focus outlines.

Reduced motion
- The component respects user motion preferences using `prefers-reduced-motion` rules in CSS (loader animation disabled).

Best practices
- Prefer native buttons for actions (navigation should still use links when appropriate).
- Do not remove visible focus outlines unless an accessible replacement is provided.
