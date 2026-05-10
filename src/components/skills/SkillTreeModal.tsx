import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from '../../theme/useTheme'
import { SkillTreeCanvas } from './SkillTreeCanvas'

type SkillTreeModalProps = {
  open: boolean
  onClose: () => void
}

export function SkillTreeModal({ open, onClose }: SkillTreeModalProps) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-zinc-950/70  dark:bg-black/75"
        aria-label="Close skill tree"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[90dvh] w-full max-w-4xl flex-col gap-3 rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-2xl dark:border-white/[0.08] dark:bg-[#121214] sm:p-5"
      >
        <div className="flex shrink-0 items-start justify-between gap-3">
          <div>
            <h2
              id={titleId}
              className="m-0 font-serif text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-xl"
            >
              Skill tree
            </h2>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
              Languages and tools — drag the canvas, scroll to zoom.
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-xl border border-zinc-200/90 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition-colors hover:border-purple-400/50 hover:text-purple-700 dark:border-white/[0.1] dark:text-zinc-300 dark:hover:border-purple-400/40 dark:hover:text-purple-300"
          >
            Close
          </button>
        </div>
        <div className="min-h-0 flex-1">
          <SkillTreeCanvas isDark={isDark} />
        </div>
      </div>
    </div>,
    document.body,
  )
}
