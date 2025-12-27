import React, { useEffect, useRef } from 'react'
import './Modal.css'

export function Modal({ isOpen, onClose, title, children }) {
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    // Save previously focused element to restore focus on close
    previouslyFocused.current = document.activeElement

    // Prevent background scroll
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Focus the modal content
    const focusable = getFocusableElements(contentRef.current)
    ;(focusable[0] || contentRef.current).focus()

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'Tab') {
        handleTabKey(e, contentRef.current)
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = originalOverflow
      // restore focus
      if (previouslyFocused.current && previouslyFocused.current.focus) {
        previouslyFocused.current.focus()
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  function onOverlayClick(e) {
    if (e.target === overlayRef.current) onClose()
  }

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onMouseDown={onOverlayClick}
      aria-hidden={isOpen ? 'false' : 'true'}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Dialog'}
        ref={contentRef}
        tabIndex={-1}
      >
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button
            className="modal__close"
            aria-label="Close dialog"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  )
}

// Helpers
function getFocusableElements(container) {
  if (!container) return []
  const selectors = [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable]'
  ]
  return Array.from(container.querySelectorAll(selectors.join(','))).filter(
    el => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement
  )
}

function handleTabKey(e, container) {
  const focusable = getFocusableElements(container)
  if (focusable.length === 0) {
    e.preventDefault()
    return
  }
  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (e.shiftKey) {
    if (document.activeElement === first || document.activeElement === container) {
      last.focus()
      e.preventDefault()
    }
  } else {
    if (document.activeElement === last) {
      first.focus()
      e.preventDefault()
    }
  }
}

export default Modal
