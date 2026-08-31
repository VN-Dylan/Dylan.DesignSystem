import { forwardRef, type HTMLAttributes } from 'react'
import { TbIcons } from '@dylan-ds/icons'
import { classNames } from '@dylan-ds/utils'
import './FileIcon.scss'

export interface FileIconProps extends HTMLAttributes<HTMLSpanElement> {
  /** File name or extension (`report.pdf` or `pdf`). */
  name?: string
  /** Explicit type, overriding detection from `name`. */
  type?: FileKind
  /** Icon size in pixels or any CSS length. @default 40 */
  size?: number | string
}

type FileKind =
  | 'image'
  | 'video'
  | 'audio'
  | 'pdf'
  | 'doc'
  | 'sheet'
  | 'slides'
  | 'archive'
  | 'code'
  | 'text'
  | 'file'

const EXT_MAP: Record<string, FileKind> = {
  png: 'image',
  jpg: 'image',
  jpeg: 'image',
  gif: 'image',
  webp: 'image',
  svg: 'image',
  mp4: 'video',
  mov: 'video',
  webm: 'video',
  mkv: 'video',
  mp3: 'audio',
  wav: 'audio',
  flac: 'audio',
  ogg: 'audio',
  pdf: 'pdf',
  doc: 'doc',
  docx: 'doc',
  rtf: 'doc',
  xls: 'sheet',
  xlsx: 'sheet',
  csv: 'sheet',
  ppt: 'slides',
  pptx: 'slides',
  key: 'slides',
  zip: 'archive',
  rar: 'archive',
  '7z': 'archive',
  tar: 'archive',
  gz: 'archive',
  js: 'code',
  ts: 'code',
  tsx: 'code',
  jsx: 'code',
  json: 'code',
  html: 'code',
  css: 'code',
  py: 'code',
  rb: 'code',
  go: 'code',
  rs: 'code',
  java: 'code',
  txt: 'text',
  md: 'text',
  log: 'text',
}

const ICONS: Record<FileKind, React.ComponentType> = {
  image: TbIcons.TbPhoto,
  video: TbIcons.TbVideo,
  audio: TbIcons.TbMusic,
  pdf: TbIcons.TbFileTypePdf,
  doc: TbIcons.TbFileText,
  sheet: TbIcons.TbFileSpreadsheet,
  slides: TbIcons.TbPresentation,
  archive: TbIcons.TbFileZip,
  code: TbIcons.TbFileCode,
  text: TbIcons.TbFileDescription,
  file: TbIcons.TbFile,
}

const detect = (name: string | undefined, type: FileKind | undefined): FileKind => {
  if (type) return type
  if (!name) return 'file'
  const ext = name.split('.').pop()?.toLowerCase() ?? name.toLowerCase()
  return EXT_MAP[ext] ?? 'file'
}

/**
 * A coloured icon representing a file, chosen from its extension or an explicit
 * `type`.
 */
export const FileIcon = forwardRef<HTMLSpanElement, FileIconProps>(function FileIcon(
  { name, type, size = 40, className, ...rest },
  ref,
) {
  const kind = detect(name, type)
  const Glyph = ICONS[kind]
  return (
    <span
      ref={ref}
      data-kind={kind}
      style={{ fontSize: size }}
      className={classNames('dyl-file-icon', className)}
      role="img"
      aria-label={name ? `${name} file` : `${kind} file`}
      {...rest}
    >
      <Glyph />
    </span>
  )
})
