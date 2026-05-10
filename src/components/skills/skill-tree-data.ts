export type SkillNode = {
  id: string
  iconSlug: string
  title: string
  detail?: string
  children?: SkillNode[]
}

export const SKILL_TREE: SkillNode[] = [
  {
    id: 'frontend',
    iconSlug: 'react',
    title: 'Frontend',
    children: [
      { id: 'react', iconSlug: 'react', title: 'React', detail: 'TypeScript' },
      { id: 'nextjs', iconSlug: 'nextdotjs', title: 'Next.js', detail: 'TypeScript' },
      { id: 'vue', iconSlug: 'vuedotjs', title: 'Vue', detail: 'TypeScript' },
      { id: 'tailwind', iconSlug: 'tailwindcss', title: 'Tailwind', detail: 'CSS' },
    ],
  },
  {
    id: 'backend',
    iconSlug: 'nodedotjs',
    title: 'Backend',
    children: [
      { id: 'express', iconSlug: 'express', title: 'Express', detail: 'Node.js / TypeScript' },
      { id: 'fastapi', iconSlug: 'fastapi', title: 'FastAPI', detail: 'Python' },
      { id: 'springboot', iconSlug: 'springboot', title: 'Spring Boot', detail: 'Java' },
      { id: 'aspnetcore', iconSlug: 'dotnet', title: 'ASP.NET Core', detail: 'C# / .NET' },
      { id: 'gorilla', iconSlug: 'go', title: 'Gorilla', detail: 'Go' },
      { id: 'grpc', iconSlug: 'grpc', title: 'gRPC', detail: 'Go / Java / C#' },
    ],
  },
  {
    id: 'databases',
    iconSlug: 'postgresql',
    title: 'Databases',
    children: [
      { id: 'postgresql', iconSlug: 'postgresql', title: 'Postgres', detail: 'SQL' },
      { id: 'mysql', iconSlug: 'mysql', title: 'MySQL', detail: 'SQL' },
      { id: 'mssql', iconSlug: 'microsoftsqlserver', title: 'MS SQL Server', detail: 'SQL' },
      { id: 'redis', iconSlug: 'redis', title: 'Redis', detail: 'Key-value store' },
    ],
  },
  {
    id: 'cloud-devops',
    iconSlug: 'kubernetes',
    title: 'Cloud / DevOps',
    children: [
      { id: 'aws', iconSlug: 'amazonaws', title: 'AWS', detail: 'Cloud' },
      { id: 'azure', iconSlug: 'microsoftazure', title: 'Azure', detail: 'Cloud' },
      { id: 'gcp', iconSlug: 'googlecloud', title: 'GCP', detail: 'Cloud' },
      { id: 'docker', iconSlug: 'docker', title: 'Docker', detail: 'Containers' },
      { id: 'kubernetes', iconSlug: 'kubernetes', title: 'Kubernetes', detail: 'Orchestration' },
    ],
  },
  {
    id: 'scripting',
    iconSlug: 'lua',
    title: 'Scripting',
    children: [{ id: 'lua', iconSlug: 'lua', title: 'Lua', detail: 'Scripting language' }],
  },
]

export type PlacedNode = {
  id: string
  iconSlug: string
  title: string
  detail?: string
  x: number
  y: number
  parentId: string | null
  parentTitle: string | null
  isParent: boolean
}

const PARENT_Y = 140
const CHILD_Y = 340
const CHILD_GAP = 88
const GROUP_GAP = 64

function layoutRaw(tree: SkillNode[]): PlacedNode[] {
  const placed: PlacedNode[] = []
  let groupStartX = 120

  for (const root of tree) {
    const kids = root.children ?? []
    const n = kids.length
    const groupWidth = Math.max(240, n * CHILD_GAP + 48)
    const rootX = groupStartX + groupWidth / 2

    placed.push({
      id: root.id,
      iconSlug: root.iconSlug,
      title: root.title,
      detail: root.detail,
      x: rootX,
      y: PARENT_Y,
      parentId: null,
      parentTitle: null,
      isParent: true,
    })

    const rowWidth = (n - 1) * CHILD_GAP
    const startChildX = rootX - rowWidth / 2

    kids.forEach((ch, i) => {
      placed.push({
        id: ch.id,
        iconSlug: ch.iconSlug,
        title: ch.title,
        detail: ch.detail,
        x: startChildX + i * CHILD_GAP,
        y: CHILD_Y,
        parentId: root.id,
        parentTitle: root.title,
        isParent: false,
      })
    })

    groupStartX += groupWidth + GROUP_GAP
  }

  return placed
}

export function layoutSkillTree(tree: SkillNode[]): PlacedNode[] {
  const raw = layoutRaw(tree)
  if (!raw.length) return raw

  let minX = Infinity,
    minY = Infinity
  for (const p of raw) {
    minX = Math.min(minX, p.x)
    minY = Math.min(minY, p.y)
  }
  const pad = 80
  minX -= pad
  minY -= pad

  return raw.map((p) => ({
    ...p,
    x: p.x - minX,
    y: p.y - minY,
  }))
}

export function treeBounds(placed: PlacedNode[]) {
  if (!placed.length) return { width: 900, height: 520 }
  let maxX = -Infinity,
    maxY = -Infinity
  const pad = 100
  const NODE = 44
  for (const p of placed) {
    maxX = Math.max(maxX, p.x + NODE / 2)
    maxY = Math.max(maxY, p.y + NODE / 2)
  }
  return {
    width: maxX + pad,
    height: maxY + pad,
  }
}
