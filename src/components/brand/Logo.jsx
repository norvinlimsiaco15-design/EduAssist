import React from 'react'
import { Link } from 'react-router-dom'

const SRC = {
  horizontal: '/logo/eduassist-horizontal.png',
  stacked: '/logo/eduassist-stacked.png',
}

export default function Logo({
  variant = 'horizontal',
  to = '/',
  className = '',
  imgClassName = 'h-10 w-auto',
  link = true,
}) {
  const img = (
    <img
      src={SRC[variant]}
      alt="EDUASSIST — Consultancy Management and Cost System"
      className={imgClassName}
    />
  )

  if (!link) {
    return <span className={className}>{img}</span>
  }

  return (
    <Link to={to} aria-label="EDUASSIST home" className={`inline-flex items-center ${className}`}>
      {img}
    </Link>
  )
}
