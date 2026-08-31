import type { Meta, StoryObj } from '@storybook/react'
import { FileIcon } from './FileIcon'

const meta = {
  title: 'Data Display/FileIcon',
  component: FileIcon,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof FileIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Kinds: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {[
        'photo.png',
        'clip.mp4',
        'song.mp3',
        'report.pdf',
        'notes.docx',
        'budget.xlsx',
        'deck.pptx',
        'src.zip',
        'app.tsx',
        'readme.md',
        'unknown.bin',
      ].map((n) => (
        <div key={n} className="flex flex-col items-center gap-1">
          <FileIcon name={n} />
          <span className="text-xs text-content-muted">{n}</span>
        </div>
      ))}
    </div>
  ),
}
