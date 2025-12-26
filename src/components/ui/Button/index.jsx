import React from 'react';
import './Button.css';

/**
 * Button
 * Named and default export for compatibility.
 * Variants: primary | secondary | outline | ghost
 * Sizes: sm | md | lg
 */
export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  loadingText = 'Loading...',
  onClick,
  children,
  className = '',
  type = 'button',
  fullWidth = false,
  icon: Icon,
  ...props
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? 'btn--full-width' : '',
    disabled || loading ? 'btn--disabled' : '',
    loading ? 'btn--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="btn__loader" aria-hidden="true" />
          <span className="btn__loading-text">{loadingText}</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="btn__icon" />}
          <span>{children}</span>
        </>
      )}
    </button>
  );
}

export default Button;
