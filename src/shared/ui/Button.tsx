import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type SharedProps = {
  children: ReactNode
  variant?: 'primary' | 'outline' | 'ghost'
  className?: string
}

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: undefined
  }

type ButtonAsLink = SharedProps & {
  to: string
  href?: undefined
}

type ButtonAsAnchor = SharedProps & {
  href: string
  to?: undefined
  target?: string
  rel?: string
}

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor

const variantClasses: Record<NonNullable<SharedProps['variant']>, string> = {
  primary:
    'bg-lime text-canvas hover:bg-lime-dim border border-transparent',
  outline:
    'bg-transparent text-ink border border-lime hover:bg-lime/10',
  ghost: 'bg-transparent text-muted border border-transparent hover:text-ink hover:bg-surface-hover',
}

export function Button(props: ButtonProps): React.JSX.Element {
  const { children, variant = 'outline', className = '' } = props
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime ${variantClasses[variant]} ${className}`

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    )
  }

  if ('href' in props && props.href) {
    return (
      <a href={props.href} className={classes} target={props.target} rel={props.rel}>
        {children}
      </a>
    )
  }

  const { type = 'button', ...rest } = props as ButtonAsButton
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}
