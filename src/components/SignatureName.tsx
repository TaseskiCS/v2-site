import { useEffect, useId, useState } from 'react'
import Vara from 'vara/src/vara.min.js'
import satisfyFontUrl from 'vara/fonts/Satisfy/SatisfySL.json?url'

const FULL_NAME = 'Antonio Taseski'

type SignatureNameProps = {
  className?: string
}

function usePrefersReducedMotion() {
  const [value] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  return value
}

function useHtmlHasClass(className: string) {
  const [has, setHas] = useState(() =>
    typeof document !== 'undefined'
      ? document.documentElement.classList.contains(className)
      : false,
  )

  useEffect(() => {
    const root = document.documentElement
    const sync = () => setHas(root.classList.contains(className))
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [className])

  return has
}

function responsiveFontSize() {
  if (typeof window === 'undefined') return 40
  return Math.round(Math.min(24, Math.max(16, window.innerWidth * 0.042)))
}

export function SignatureName({ className }: SignatureNameProps) {
  const reduceMotion = usePrefersReducedMotion()
  const isDark = useHtmlHasClass('dark')
  const reactId = useId()
  const containerId = `vara-signature-${reactId.replace(/:/g, '')}`

  useEffect(() => {
    if (reduceMotion) return

    const el = document.getElementById(containerId)
    if (!el) return

    el.replaceChildren()

    const color = isDark ? '#f4f4f5' : '#18181b'

    new Vara(`#${CSS.escape(containerId)}`, satisfyFontUrl, [
      {
        text: FULL_NAME,
        fontSize: responsiveFontSize(),
        strokeWidth: 1.25,
        color,
        duration: 3200,
        textAlign: 'left',
      },
    ])

    return () => {
      el.replaceChildren()
    }
  }, [reduceMotion, isDark, containerId])

  if (reduceMotion) {
    return (
      <div className={className}>
        <h1 className="m-0 font-['Caveat',cursive] text-[clamp(2rem,4.5vw,2.85rem)] font-semibold leading-[1.08] tracking-wide text-zinc-900 dark:text-zinc-100">
          {FULL_NAME}
        </h1>
      </div>
    )
  }

  return (
    <div className={className}>
      <h1 className="sr-only">{FULL_NAME}</h1>
      <div
        id={containerId}
        className="min-h-[clamp(2.5rem,5vw,3.25rem)] w-full max-w-full"
        aria-hidden="true"
      />
    </div>
  )
}
