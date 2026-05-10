import { ProfilePhoto } from './ProfilePhoto'
import { useMemo, useState } from 'react'

type Project = {
  id: string
  title: string
  description: string
  badges: string[]
  stack: string[]
  imageSrc: string
  href: string
}

const projects: Project[] = [
  {
    id: '1',
    title: 'ScotiaSplit',
    description:
      'Bill splitting app pitched for Scotiabank internal infrastructure during S:HACKS hackathon.',
    badges: ['1st Place Winner @ S:HACKS25'],
    stack: [],
    imageSrc: '/scotiasplit.jpeg',
    href: '#',
  },
  {
    id: '2',
    title: 'Adaptive',
    description:
      'Autoclassification for codebases to provide ease into onboarding new developers.',
    badges: ['Finalist @ HackHarvard25'],
    stack: ['React', 'TypeScript', 'Node.js', 'Three.js'],
      imageSrc: '/adaptive.jpeg',
      href: 'https://github.com/ruyot/adaptive',
  },
  {
    id: '3',
    title: 'Building...',
    description:
      'Low latency arbitrage trading bot for cross-platform prediction markets',
    badges: [],
    stack: ['Go','Gorilla', 'Redis'],
    imageSrc: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    href: '#',
  },
  {
    id: '4',
    title: 'CVLens',
    description:
      'Extract structured data from uploaded resumes in PDF/DOCX formats, custom NLP model using spaCy with NER',
    badges: [],
    stack: ['Python', 'spaCy', 'FastAPI', 'Jupyter'],
    imageSrc: '/cvlens.jpeg',
    href: 'https://github.com/taseskics/cvlens',
  },
  {
    id: '5',
    title: 'Infinite Context',
    description: 'Context management system for handling documents, images, videos, proved to surpass a 1M+ token context window with parallel processing',
    badges: ['GenAIGenesis 2025 Hackathon'],
    stack: ['Next.js', 'Node.js', 'Firebase'],
    imageSrc: '/infinitecontext.jpeg',
    href: 'https://github.com/taseskics/infinite-context',
  },
  {
    id: '6',
    title: 'Emoz',
    description: 'AI-powered journal mobile app with speech-based emotion analysis and BERT based sentiment analysis',
    badges: [],
    stack: ['Flutter', 'Python','Django', 'MongoDB', 'BERT'],
    imageSrc: '/emoz.jpeg',
    href: 'https://github.com/taseskics/emoz',
  },
  
]

function cycle3(list: Project[], start: number) {
  const n = list.length
  if (n === 0) return [] as Project[]
  return [
    list[((start % n) + n) % n]!,
    list[(((start + 1) % n) + n) % n]!,
    list[(((start + 2) % n) + n) % n]!,
  ]
}

function ArrowIcon({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg
      className="block h-4 w-4"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {dir === 'left' ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg
      className="block h-3.5 w-3.5"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  )
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-50 transition-colors duration-200 hover:border-purple-500/50 dark:border-white/8 dark:bg-[#121214] dark:hover:border-purple-400/45">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <img
          src={p.imageSrc}
          alt=""
          className="h-full w-full scale-[1.2] object-cover  saturate-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-b from-white/55 via-white/88 to-white dark:from-[#121214]/40 dark:via-[#121214]/88 dark:to-[#121214]" />
      </div>
      <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-2 px-3.5 pb-3 pt-3.5">
        <a
          href={p.href}
          className="absolute right-3 top-3 z-20 text-zinc-400 transition-colors hover:text-purple-600 dark:text-zinc-500 dark:hover:text-purple-400"
          aria-label={`Open ${p.title} (external)`}
        >
          <ExternalIcon />
        </a>
        <h3 className="m-0 max-w-[calc(100%-2rem)] pr-7 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {p.title}
        </h3>
        {p.badges.length > 0 && (
          <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
            {p.badges.map((b) => (
              <li key={b}>
                <span className="inline-block rounded-md bg-purple-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  {b}
                </span>
              </li>
            ))}
          </ul>
        )}
        <p className="m-0 line-clamp-2 flex-1 text-xs leading-snug text-zinc-600 dark:text-zinc-400">
          {p.description}
        </p>
        <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
          {p.stack.map((t) => (
            <li key={t}>
              <span className="inline-block rounded-full border border-zinc-200/80 bg-white/70 px-2 py-0.5 text-[11px] font-medium text-zinc-600 backdrop-blur-sm dark:border-white/10 dark:bg-white/8 dark:text-zinc-300">
                {t}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export function ProjectSection() {
  const [start, setStart] = useState(0)
  const visible = useMemo(() => cycle3(projects, start), [start])
  const p1 = visible[0]!
  const p2 = visible[1]!
  const p3 = visible[2]!

  return (
    <section
      className="flex min-h-0 min-w-0 flex-col gap-3"
      aria-labelledby="proj-heading"
    >
      <div className="flex items-center gap-2">
        <h2
          id="proj-heading"
          className="m-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-500"
        >
          Projects
        </h2>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setStart((s) => s - 1)}
            className="inline-flex items-center justify-center rounded-lg border border-zinc-200/90 bg-white/60 p-1.5 text-zinc-600 transition-colors hover:border-purple-500/50 hover:text-purple-600 dark:border-white/8 dark:bg-white/5 dark:text-zinc-400 dark:hover:border-purple-400/45 dark:hover:text-purple-400"
            aria-label="Previous projects"
          >
            <ArrowIcon dir="left" />
          </button>
          <button
            type="button"
            onClick={() => setStart((s) => s + 1)}
            className="inline-flex items-center justify-center rounded-lg border border-zinc-200/90 bg-white/60 p-1.5 text-zinc-600 transition-colors hover:border-purple-500/50 hover:text-purple-600 dark:border-white/8 dark:bg-white/5 dark:text-zinc-400 dark:hover:border-purple-400/45 dark:hover:text-purple-400"
            aria-label="Next projects"
          >
            <ArrowIcon dir="right" />
          </button>
        </div>
      </div>
      <ul
        className="m-0 grid min-h-0 flex-1 list-none grid-cols-1 gap-3 overflow-y-auto p-0 sm:grid-cols-2 sm:grid-rows-2 sm:items-stretch max-md:overflow-visible md:overflow-y-auto"
        aria-label="Featured projects and profile"
      >
        {/* 2×2: (1) project, (2) photo, (3) project, (4) project */}
        <li className="order-1 flex min-h-0 min-w-0 sm:col-start-1 sm:row-start-1">
          <ProjectCard p={p1} />
        </li>
        <li className="order-2 hidden h-full min-h-0 w-full flex-col items-center justify-start pt-0.5 sm:col-start-2 sm:row-start-1 sm:flex">
          <ProfilePhoto />
        </li>
        <li className="order-3 flex min-h-0 min-w-0 sm:col-start-1 sm:row-start-2">
          <ProjectCard p={p2} />
        </li>
        <li className="order-4 flex min-h-0 min-w-0 sm:col-start-2 sm:row-start-2">
          <ProjectCard p={p3} />
        </li>
      </ul>
    </section>
  )
}
