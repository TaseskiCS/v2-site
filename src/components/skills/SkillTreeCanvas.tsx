import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  layoutSkillTree,
  SKILL_TREE,
  treeBounds,
  type PlacedNode,
} from './skill-tree-data'

const NODE = 44
const ICON = 26
const ZOOM_MIN = 0.45
const ZOOM_MAX = 2.25

function iconUrl(slug: string, dark: boolean) {
  // Redis looks better in its brand red.
  if (slug === 'redis') return `https://cdn.simpleicons.org/redis/dc382d`
  const c = dark ? 'e4e4e7' : '3f3f46'
  return `https://cdn.simpleicons.org/${slug}/${c}`
}

type SkillTreeCanvasProps = {
  isDark: boolean
}

export function SkillTreeCanvas({ isDark }: SkillTreeCanvasProps) {
  const placed = useMemo(() => layoutSkillTree(SKILL_TREE), [])
  const bounds = useMemo(() => treeBounds(placed), [placed])

  const [pan, setPan] = useState({ x: 48, y: 36 })
  const [zoom, setZoom] = useState(1)
  const [activeId, setActiveId] = useState<string | null>(null)
  const drag = useRef({
    active: false,
    px: 0,
    py: 0,
    sx: 0,
    sy: 0,
  })
  const viewportRef = useRef<HTMLDivElement>(null)

  const edges = useMemo(() => {
    const list: { x1: number; y1: number; x2: number; y2: number }[] = []
    for (const n of placed) {
      if (!n.parentId) continue
      const p = placed.find((q) => q.id === n.parentId)
      if (!p) continue
      list.push({
        x1: p.x,
        y1: p.y + NODE / 2,
        x2: n.x,
        y2: n.y - NODE / 2,
      })
    }
    return list
  }, [placed])

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0) return
      const t = e.target as HTMLElement
      if (t.closest('button')) return
      setActiveId(null)
      e.currentTarget.setPointerCapture(e.pointerId)
      drag.current = {
        active: true,
        px: e.clientX,
        py: e.clientY,
        sx: pan.x,
        sy: pan.y,
      }
    },
    [pan.x, pan.y],
  )

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    const dx = e.clientX - drag.current.px
    const dy = e.clientY - drag.current.py
    setPan({ x: drag.current.sx + dx, y: drag.current.sy + dy })
  }, [])

  const endDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    drag.current.active = false
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const onWheel = (ev: WheelEvent) => {
      ev.preventDefault()
      const delta = -ev.deltaY * 0.0012
      setZoom((z) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z + delta)))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div
      ref={viewportRef}
      className="relative h-full min-h-[min(70dvh,520px)] w-full cursor-grab touch-none overflow-hidden rounded-xl border border-zinc-200/90 bg-zinc-100/80 active:cursor-grabbing dark:border-white/8 dark:bg-zinc-950/50"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      role="application"
      aria-label="Skill tree canvas, drag empty space to pan, scroll to zoom"
    >
      <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-wrap gap-2 rounded-lg border border-zinc-200/80 bg-white/90 px-2 py-1.5 text-[10px] font-medium text-zinc-500 shadow-sm dark:border-white/8 dark:bg-zinc-900/90 dark:text-zinc-400">
        <span>Drag to pan</span>
        <span className="text-zinc-300 dark:text-zinc-600">·</span>
        <span>Scroll to zoom</span>
      </div>

      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
        }}
      >
        <svg
          className="pointer-events-none absolute left-0 top-0 overflow-visible"
          width={bounds.width}
          height={bounds.height}
          aria-hidden
        >
          {edges.map((e, i) => (
            <line
              key={i}
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              stroke="currentColor"
              strokeWidth={1.25}
              strokeOpacity={0.2}
              className="text-zinc-900 dark:text-zinc-100"
            />
          ))}
        </svg>

        {placed.map((n) => (
          <SkillNodeView
            key={n.id}
            node={n}
            isDark={isDark}
            active={activeId === n.id}
            onActivate={() => setActiveId((cur) => (cur === n.id ? null : n.id))}
          />
        ))}
      </div>
    </div>
  )
}

function SkillNodeView({
  node,
  isDark,
  active,
  onActivate,
}: {
  node: PlacedNode
  isDark: boolean
  active: boolean
  onActivate: () => void
}) {
  const left = node.x - NODE / 2
  const top = node.y - NODE / 2
  const [imgOk, setImgOk] = useState(true)

  if (node.isParent) {
    return (
      <div
        className="pointer-events-none absolute flex items-center justify-center"
        style={{ left, top, width: NODE, height: NODE }}
      >
        <div className="rounded-full border border-zinc-300/90 bg-white px-3 py-1.5 text-[11px] font-semibold tracking-wide text-zinc-800 shadow-sm dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100">
          {node.title}
        </div>
      </div>
    )
  }

  return (
    <div
      className="pointer-events-auto absolute flex items-center justify-center"
      style={{ left, top, width: NODE, height: NODE }}
    >
      <button
        type="button"
        aria-label={`${node.title}${node.detail ? ` (${node.detail})` : ''}`}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={onActivate}
        className="group relative flex size-11 items-center justify-center rounded-full border border-zinc-200/90 bg-white/95 shadow-sm transition-[box-shadow,transform] duration-200 hover:scale-105 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 dark:border-white/10 dark:bg-zinc-900/95"
      >
        {imgOk ? (
          <img
            src={iconUrl(node.iconSlug, isDark)}
            alt=""
            width={ICON}
            height={ICON}
            className="pointer-events-none select-none"
            loading="lazy"
            decoding="async"
            onError={() => setImgOk(false)}
          />
        ) : (
          <span className="pointer-events-none select-none text-xs font-bold text-zinc-600 dark:text-zinc-300">
            {node.title.slice(0, 2).toUpperCase()}
          </span>
        )}

        <div
          className={`pointer-events-none absolute left-1/2 top-[calc(100%+10px)] z-20 w-45 -translate-x-1/2 rounded-xl border border-zinc-200/90 bg-white/95 px-3 py-2 text-left text-[11px] text-zinc-700 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-zinc-950/90 dark:text-zinc-200 ${
            active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          } transition-opacity duration-150`}
          role="tooltip"
        >
          <div className="font-semibold text-zinc-900 dark:text-zinc-100">
            {node.title}
          </div>
          <div className="mt-0.5 text-zinc-500 dark:text-zinc-400">
            {(node.parentTitle ? `${node.parentTitle}` : '') +
              (node.detail ? ` · ${node.detail}` : '')}
          </div>
          <div className="pointer-events-none absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-l border-t border-zinc-200/90 bg-white/95 dark:border-white/10 dark:bg-zinc-950/90" />
        </div>
      </button>
    </div>
  )
}
