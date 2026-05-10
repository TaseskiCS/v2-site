import { useState } from 'react'
import { SkillTreeModal } from './skills/SkillTreeModal'

export function SkillsSection() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <section
        className="flex shrink-0 flex-col gap-3"
        aria-labelledby="skills-heading"
      >
        <h2
          id="skills-heading"
          className="m-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-500"
        >
          Skills
        </h2>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative flex min-h-24 w-full cursor-pointer items-end justify-between gap-3 overflow-hidden rounded-xl border border-zinc-200/90 bg-white px-4 py-3.5 text-left transition-colors duration-200 hover:border-purple-500/50 sm:min-h-28 dark:border-white/8 dark:bg-[#121214] dark:hover:border-purple-400/45"
        >
          <img
            src="/skill-tree-preview.png"
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-top opacity-100 blur-[1px]"
            loading="lazy"
            decoding="async"
          />
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-white/20 dark:bg-black/20"
            aria-hidden
          />

          <span className="relative z-10 text-sm font-semibold tracking-tight text-zinc-100">
            View skill tree
          </span>
          <span
            className="relative z-10 shrink-0 text-purple-600 transition-transform duration-200 group-hover:scale-110 group-active:scale-95 dark:text-purple-400"
            aria-hidden
          >
            <svg
              className="block h-5 w-5"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22v-4" />
              <path d="M10 18h4" />
              <path d="M8 14 16 14 12 18z" />
              <path d="M9 10 15 10 12 14z" />
              <path d="M10 6 14 6 12 9z" />
            </svg>
          </span>
        </button>
      </section>
      <SkillTreeModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
