import React, { useRef, useState } from 'react'
import './Input.css'

export function Input({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  required = false,
  rows = 4,
  className = '',
  ...rest
}) {
  const _idRef = useRef(id || name || `input-${Math.random().toString(36).slice(2, 9)}`)
  const inputId = _idRef.current
  const [isFocused, setIsFocused] = useState(false)

  const rootClass = [
    'input',
    error ? 'input--error' : '',
    isFocused ? 'input--focus' : '',
    disabled ? 'input--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const commonProps = {
    id: inputId,
    name,
    value,
    onChange,
    placeholder,
    disabled,
    required,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${inputId}-error` : undefined,
    className: 'input__control',
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    ...rest,
  }

  return (
    <div className={rootClass}>
      {label && (
        <label className="input__label" htmlFor={inputId}>
          {label}
          {required && <span className="input__required"> *</span>}
        </label>
      )}

      {type === 'textarea' ? (
        <textarea rows={rows} {...commonProps} />
      ) : (
        <input type={type} {...commonProps} />
      )}

      {error && (
        <div id={`${inputId}-error`} className="input__error" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}

export default Input
