export type ExperienceItem = {
  id: string
  role: string
  summary: string
  range: string
  location: string
  companyLogo: string
  type: string
}

const experiences: ExperienceItem[] = [
  {
    id: '1',
    role: 'Trade Floor Full Stack Developer',
    summary: 'Global capital markets automation',
    range: 'MAY 2026 — AUG 2027',
    location: 'TORONTO, ON',
    companyLogo: '/scotiabank.webp',
    type: 'intern',
  },
  {
    id: '2',
    role: 'Software Engineer',
    summary: 'Created algorithmic job-matching platform for the employment team to manage onboarding for clients.',
    range: 'MAY 2025— AUG 2025',
    location: 'Toronto, ON',
    companyLogo: '/corbrook.jpeg',
    type:'intern'
  },
  {
    id: '3',
    role: 'Software Engineer',
    summary: 'Frontend development for the auth, transactions, and translation pipeline with i18n.',
    range: 'MAY 2024 — DEC 2024',
    location: 'Toronto, ON',
    companyLogo: '/serblink.jpeg',
    type:'intern'
  },
  {
    id: '4',
    role: 'Cfx.re Server Developer',
    summary: 'Built & scaled MRR-driven game-servers for clients handling 1K+ concurrent users',
    range: 'JAN 2021 — DEC 2023',
    location: 'REMOTE',
    companyLogo: '/cfxre.jpeg',
    type:'freelance'
  }
]

export function ExperienceSection() {
  return (
    <section
      className="flex min-h-0 min-w-0 shrink-0 flex-col gap-3 md:min-h-0 md:flex-1"
      aria-labelledby="exp-heading"
    >
      <h2
        id="exp-heading"
        className="m-0 shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-500"
      >
        Experience
      </h2>
      <ul className="m-0 flex max-h-full w-full list-none flex-col overflow-y-auto rounded-xl border border-zinc-200/90 p-0 dark:border-white/8 [&>li:last-child>article]:border-b-0">
        {experiences.map((job) => (
          <li key={job.id}>
            <article className="grid grid-cols-[40px_minmax(0,1fr)] items-center gap-x-3.5 gap-y-2 border-b border-zinc-200/90 bg-white px-4 py-3.5 transition-colors duration-200 hover:border-purple-500/50 sm:grid-cols-[44px_minmax(0,1fr)_auto] sm:gap-x-4 dark:border-white/8 dark:bg-[#080808] dark:hover:border-purple-400/45">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/90 bg-linear-to-br from-zinc-100 to-zinc-200 text-[15px] font-semibold text-zinc-800 sm:h-11 sm:w-11 dark:border-white/8 dark:from-zinc-800 dark:to-zinc-950 dark:text-zinc-100"
                aria-hidden
              >
                <img
                  src={job.companyLogo}
                  alt=""
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>
              <div className="min-w-0 sm:col-start-2">
                <h3 className="mb-1 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {job.role}{' '}
                 
                </h3>
                <p className="m-0 line-clamp-2 text-xs leading-snug text-zinc-500 dark:text-zinc-500">
                  {job.summary}
                </p>
              </div>
              <div className="col-span-2 flex flex-row items-center justify-between gap-3 sm:col-span-1 sm:col-start-3 sm:flex-col sm:items-end sm:justify-center sm:gap-1 sm:text-right">
                <p className="m-0 text-[10px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
                  {job.range}
                </p>
                <p className="m-0 text-[10px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
                  {job.location}
                </p>
                <p className=" text-zinc-500 dark:text-zinc-400 text-xs">
                {job.type==='freelance' ? 'Freelance' : job.type === 'intern' ? 'Internship' : 'Full-time'}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
