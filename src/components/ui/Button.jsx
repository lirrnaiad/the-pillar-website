import React from 'react';
import './Button.css';

/**
 * Button Component
 * A flexible, accessible button with multiple variants, sizes, and states
 * 
 * @component
 * @example
 * // Primary button
 * <Button variant="primary" size="md">Click Me</Button>
 * 
 * // Loading state
 * <Button variant="primary" loading={isLoading}>Submit</Button>
 * 
 * // Outline variant
 * <Button variant="outline" size="lg">Learn More</Button>
 */
const Button = ({
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
}) => {
  const buttonClasses = `
    btn
    btn--${variant}
    btn--${size}
    ${fullWidth ? 'btn--full-width' : ''}
    ${disabled || loading ? 'btn--disabled' : ''}
    ${loading ? 'btn--loading' : ''}
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="btn__loader" aria-hidden="true"></span>
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
};

export default Button;
