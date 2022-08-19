import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.WidgetCreateArgs>({
  widget: {
    one: { data: { name: 'String1384822' } },
    two: { data: { name: 'String581208' } },
  },
})

export type StandardScenario = typeof standard
