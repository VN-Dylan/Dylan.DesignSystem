export const spacingKeys = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24] as const

export type SpacingKey = (typeof spacingKeys)[number]
export type SemanticGap = 'tight' | 'base' | 'loose' | 'group'
export type GapToken = SemanticGap | SpacingKey

export type LayoutAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type LayoutJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
