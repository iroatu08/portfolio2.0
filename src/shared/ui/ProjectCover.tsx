type ProjectCoverProps = {
  title: string
  coverImageUrl: string
  coverGradient: string
  aspectClassName?: string
}

/**
 * Screenshot-only media frame for project cards. Keep titles out of the image.
 */
export function ProjectCover({
  title,
  coverImageUrl,
  coverGradient,
  aspectClassName = 'aspect-[16/10]',
}: ProjectCoverProps): React.JSX.Element {
  return (
    <div
      className={`relative overflow-hidden bg-surface-raised ${aspectClassName}`}
      style={{ background: coverGradient }}
    >
      <img
        src={coverImageUrl}
        alt={`${title} screenshot`}
        className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        loading="lazy"
      />
      <div
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5"
        aria-hidden="true"
      />
    </div>
  )
}
