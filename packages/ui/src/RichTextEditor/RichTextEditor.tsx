import { useEffect } from 'react'
import { EditorContent, useEditor, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TbIcons } from '@dylan-ds/icons'
import { classNames } from '@dylan-ds/utils'
import './RichTextEditor.scss'

export interface RichTextEditorProps {
  /** Initial / controlled HTML content. */
  value?: string
  /** Called with the editor HTML on every change. */
  onChange?: (html: string) => void
  /** Placeholder-ish empty state (rendered when there is no content). */
  placeholder?: string
  /** Disable editing. */
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

interface ToolButton {
  icon: React.ReactNode
  label: string
  isActive: (e: Editor) => boolean
  run: (e: Editor) => void
}

const TOOLS: ToolButton[] = [
  {
    icon: <TbIcons.TbBold />,
    label: 'Bold',
    isActive: (e) => e.isActive('bold'),
    run: (e) => e.chain().focus().toggleBold().run(),
  },
  {
    icon: <TbIcons.TbItalic />,
    label: 'Italic',
    isActive: (e) => e.isActive('italic'),
    run: (e) => e.chain().focus().toggleItalic().run(),
  },
  {
    icon: <TbIcons.TbStrikethrough />,
    label: 'Strikethrough',
    isActive: (e) => e.isActive('strike'),
    run: (e) => e.chain().focus().toggleStrike().run(),
  },
  {
    icon: <TbIcons.TbH2 />,
    label: 'Heading',
    isActive: (e) => e.isActive('heading', { level: 2 }),
    run: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    icon: <TbIcons.TbList />,
    label: 'Bullet list',
    isActive: (e) => e.isActive('bulletList'),
    run: (e) => e.chain().focus().toggleBulletList().run(),
  },
  {
    icon: <TbIcons.TbListNumbers />,
    label: 'Ordered list',
    isActive: (e) => e.isActive('orderedList'),
    run: (e) => e.chain().focus().toggleOrderedList().run(),
  },
  {
    icon: <TbIcons.TbBlockquote />,
    label: 'Quote',
    isActive: (e) => e.isActive('blockquote'),
    run: (e) => e.chain().focus().toggleBlockquote().run(),
  },
]

/**
 * A compact rich-text editor built on Tiptap, with a formatting toolbar and
 * HTML in / HTML out.
 */
export function RichTextEditor({
  value = '',
  onChange,
  placeholder,
  disabled = false,
  className,
  'aria-label': ariaLabel = 'Rich text editor',
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editable: !disabled,
    editorProps: {
      attributes: {
        class: 'dyl-rte__content',
        role: 'textbox',
        'aria-multiline': 'true',
        'aria-label': ariaLabel,
        'data-placeholder': placeholder ?? '',
      },
    },
    onUpdate: ({ editor: e }) => onChange?.(e.getHTML()),
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false)
    }
  }, [value, editor])

  useEffect(() => {
    editor?.setEditable(!disabled)
  }, [disabled, editor])

  return (
    <div className={classNames('dyl-rte', className)} data-disabled={disabled || undefined}>
      <div className="dyl-rte__toolbar" role="toolbar" aria-label="Formatting">
        {editor &&
          TOOLS.map((tool) => (
            <button
              key={tool.label}
              type="button"
              className="dyl-rte__tool"
              aria-label={tool.label}
              aria-pressed={tool.isActive(editor)}
              disabled={disabled}
              onClick={() => tool.run(editor)}
            >
              {tool.icon}
            </button>
          ))}
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
