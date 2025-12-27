# Modal Component

Accessible modal component used across the site for dialogs, forms, and media.

Props
- `isOpen` (boolean) — controls visibility of the modal.
- `onClose` (function) — called when the modal requests to close (overlay click, Escape key, or close button).
- `title` (string) — accessible label for the dialog.
- `children` (node) — modal content.

Accessibility
- Focus is moved into the modal when opened and restored to the previously focused element when closed.
- Focus is trapped inside the modal using keyboard handling (Tab / Shift+Tab).
- Pressing `Escape` closes the modal.
- Clicking the backdrop closes the modal.
- The dialog uses `role="dialog"` and `aria-modal="true"`.

Usage
```
import React, { useState } from 'react'
import { Modal } from '../components/ui/Modal'

function Example() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Subscribe">
        <p>Modal content goes here.</p>
      </Modal>
    </>
  )
}
```

Notes
- This component focuses on accessibility and minimal styling that matches the project's variables in `src/styles/variables.css`.
- For more advanced use (animations, nested dialogs), wrap this component with higher-order utilities.
