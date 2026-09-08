import type { IconType } from '@vn-dylan/icons'
import { TbIcons } from '@vn-dylan/icons'

/**
 * One gallery category. `slug` is the route segment (`/gallery/:slug`) and the
 * scroll-spy target; `components` lists every `@vn-dylan/ui` export the category
 * page must demo. The union of all `components` arrays covers the full library
 * exactly once.
 */
export interface GalleryCategory {
  slug: string
  title: string
  /** One-line description shown under the category heading. */
  blurb: string
  icon: IconType
  components: string[]
}

export const galleryCategories: GalleryCategory[] = [
  {
    slug: 'common',
    title: 'Common',
    blurb: 'Actions, layout scaffolding and the display primitives every screen leans on.',
    icon: TbIcons.TbSquaresFilled,
    components: [
      'Button',
      'Segment',
      'Divider',
      'Container',
      'Grid',
      'Typography',
      'Scroll',
      'Affix',
      'ActionLink',
      'IconFrame',
      'InfoBar',
      'EmptyState',
      'Avatar',
      'UsersAvatarGroup',
      'AuthorityCheck',
    ],
  },
  {
    slug: 'forms',
    title: 'Forms',
    blurb: 'Text, numeric, choice and date inputs plus the form layout primitives.',
    icon: TbIcons.TbForms,
    components: [
      'Input',
      'DebounceInput',
      'PasswordInput',
      'PatternInput',
      'NumericInput',
      'NumericInputStepper',
      'CustomFormatInput',
      'OtpInput',
      'Checkbox',
      'Radio',
      'Switcher',
      'Select',
      'SelectExtension',
      'AutoComplete',
      'MultiValueInput',
      'InputGroup',
      'Slider',
      'DatePicker',
      'TimeInput',
      'Upload',
      'Form',
      'Dropdown',
      'RichTextEditor',
    ],
  },
  {
    slug: 'feedback',
    title: 'Feedback & Overlay',
    blurb: 'Dialogs, drawers, popovers, toasts and the loading / progress indicators.',
    icon: TbIcons.TbBell,
    components: [
      'Dialog',
      'ConfirmDialog',
      'Drawer',
      'Popover',
      'Tooltip',
      'Toast',
      'Alert',
      'ActionBar',
      'Spinner',
      'Loading',
      'Loaders',
      'Skeleton',
      'Progress',
      'ClockProgress',
      'ReactionEmojiPicker',
    ],
  },
  {
    slug: 'navigation',
    title: 'Navigation',
    blurb: 'Menus, tabs, steppers and pagination for moving through an application.',
    icon: TbIcons.TbDirections,
    components: [
      'Menu',
      'Tabs',
      'OverflowTabs',
      'Steps',
      'Pagination',
      'NavToggle',
      'ToggleDrawer',
      'Wizard',
    ],
  },
  {
    slug: 'data-display',
    title: 'Data Display',
    blurb: 'Tables, cards, tags, timelines and the richer read-only containers.',
    icon: TbIcons.TbTable,
    components: [
      'Table',
      'DataTable',
      'Card',
      'StatisticCard',
      'Badge',
      'Tag',
      'GrowShrinkTag',
      'SegmentProgressBar',
      'Timeline',
      'Collapsible',
      'Carousel',
      'FileIcon',
      'PopoverFilter',
      'AdvancedFilterBuilder',
      'SyntaxHighlighter',
    ],
  },
  {
    slug: 'data-viz',
    title: 'Data Viz',
    blurb: 'Charts, histograms, calendars and the Gantt / geographic visualisations.',
    icon: TbIcons.TbChartHistogram,
    components: ['Chart', 'Histogram', 'GanttChart', 'VectorMap', 'Calendar', 'FullCalendar'],
  },
  {
    slug: 'primitives',
    title: 'Primitives',
    blurb: 'Low-level helpers with no visual surface of their own.',
    icon: TbIcons.TbCode,
    components: ['VisuallyHidden', 'StickyRegion'],
  },
]

/** Total number of `@vn-dylan/ui` component exports on show. */
export const galleryComponentCount = galleryCategories.reduce(
  (total, category) => total + category.components.length,
  0,
)

export function getGalleryCategory(slug: string | undefined): GalleryCategory | undefined {
  return galleryCategories.find((category) => category.slug === slug)
}
