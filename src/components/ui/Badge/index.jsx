import React from 'react'
import './Badge.css'

const CATEGORY_VARIANTS = [
  'news',
  'feature',
  'opinion',
  'scitech',
  'editorial',
  'sports',
  'photos',
  'cartoons',
  'videos',
]

export function Badge({ category = 'news', children, className = '' }) {
  const isValidCategory = CATEGORY_VARIANTS.includes(category)
  const variant = isValidCategory ? category : 'news'

  const badgeClass = [
    'badge',
    `badge--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <span className={badgeClass}>{children}</span>
}

export default Badge
