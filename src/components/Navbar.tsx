import { SignatureName } from './SignatureName'
import { ThemeToggle } from './ThemeToggle'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function FileDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3" />
    </svg>
  )
}

const links = [
  {
    label: 'GITHUB',
    href: 'https://github.com/taseskics',
    Icon: GithubIcon,
  },
  {
    label: 'LINKEDIN',
    href: 'https://linkedin.com/in/a-taseski',
    Icon: LinkedinIcon,
  },
  {
    label: 'EMAIL',
    href: 'mailto:antoniotaseski.bus@hotmail.com',
    Icon: MailIcon,
  },
  {
    label: 'resume',
    href: '/resume.pdf',
    Icon: FileDownIcon,
  },
] as const

export function Navbar() {
  return (
    <header
      className="flex shrink-0 flex-col gap-3 md:flex-row md:flex-nowrap md:items-center md:gap-4"
      aria-label="Profile and links"
    >
      <div className="flex w-fit max-w-full shrink-0 flex-col justify-center rounded-2xl px-3.5 py-3 sm:px-4 sm:py-3.5">
        <SignatureName className="mb-1.5" />
        <p className="m-0 flex flex-wrap items-center gap-x-1.5 text-[13px] font-medium text-zinc-500 dark:text-zinc-500">
          <span>Software Engineer</span>
          <span aria-hidden className="text-zinc-400 dark:text-zinc-500">
            ·
          </span>
          <span className="inline-flex items-center gap-2">
            CS @ Laurier
            <img
              src="/laurier.png"
              alt=""
              className="inline-flex h-5.5 w-5.5 rounded-md object-cover"
              title="Laurier"
            />
          </span>
        </p>
      </div>

      <div className="flex min-w-0 flex-1 flex-row flex-nowrap items-center justify-center gap-3 overflow-x-auto pb-0.5 sm:gap-4">
        <nav aria-label="Social links" className="flex shrink-0">
          <ul className="m-0 flex list-none flex-nowrap items-center justify-center gap-2 p-0">
            {links.map(({ label, href, Icon }) => (
              <li key={label} className="flex shrink-0">
                <a
                  href={href}
                  className="group inline-flex items-center justify-center gap-0 rounded-xl border border-zinc-200/90 bg-white/50 px-2 py-2 text-[13px] font-medium uppercase tracking-wide text-zinc-800 transition-colors duration-200 hover:text-purple-600 sm:gap-2 sm:px-3 dark:border-white/12 dark:bg-white/4 dark:text-zinc-100 dark:hover:text-purple-400"
                >
                  <Icon className="shrink-0 text-zinc-500 transition-colors group-hover:text-purple-600 dark:text-zinc-400 dark:group-hover:text-purple-400" />
                  <span className="sr-only sm:not-sr-only">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={`flex items-center justify-center `}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
