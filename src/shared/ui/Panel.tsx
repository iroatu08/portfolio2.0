import type { HTMLAttributes, ReactNode } from 'react'

type PanelProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  className?: string
}

export function Panel({ children, className = '', ...rest }: PanelProps): React.JSX.Element {
  return (
    <div className={`panel ${className}`} {...rest}>
      {children}
    </div>
  )
}
