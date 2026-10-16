import { NavLink } from 'react-router-dom'

const links = [
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/articles', label: 'Articles' },
  { to: '/play', label: 'Play' },
] as const

export function SiteNav(): React.JSX.Element {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <NavLink
          to="/"
          aria-label="Home"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-ink transition-colors hover:border-lime/50 hover:text-lime"
        >
          <HomeIcon />
        </NavLink>

        <nav
          aria-label="Primary"
          className="flex flex-1 items-center justify-center gap-1 overflow-x-auto md:gap-2"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors md:px-4 ${
                  isActive ? 'bg-surface-raised text-lime' : 'text-muted hover:text-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <NavLink
            to="/contact"
            className="hidden rounded-full border border-lime px-4 py-2 text-sm font-medium text-lime transition-colors hover:bg-lime/10 sm:inline-flex"
          >
            Discuss
          </NavLink>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-muted transition-colors hover:text-lime"
          >
            <CodeIcon />
          </a>
        </div>
      </div>
    </header>
  )
}

function HomeIcon(): React.JSX.Element {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CodeIcon(): React.JSX.Element {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 8L4 12l4 4M16 8l4 4-4 4M14 5l-4 14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
