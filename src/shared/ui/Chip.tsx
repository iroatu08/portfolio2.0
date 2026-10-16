type ChipProps = {
  label: string
  className?: string
}

export function Chip({ label, className = '' }: ChipProps): React.JSX.Element {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-border bg-surface-raised px-3 py-1.5 text-xs font-medium text-muted ${className}`}
    >
      {label}
    </span>
  )
}
