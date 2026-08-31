import type { ReactNode } from 'react'

export interface UploadProps {
  /** Accepted file types (the `accept` attribute). */
  accept?: string
  /** Allow selecting multiple files. @default true */
  multiple?: boolean
  /** Disable the control. */
  disabled?: boolean
  /** Render the drag-and-drop zone. @default false */
  draggable?: boolean
  /** Controlled file list. */
  fileList?: File[]
  /** Initial file list for uncontrolled usage. */
  defaultFileList?: File[]
  /**
   * Called before a file is added. Return `false` (or a rejecting promise) to
   * skip it.
   */
  beforeUpload?: (file: File, currentList: File[]) => boolean | Promise<boolean>
  /** Called when the file list changes. */
  onChange?: (files: File[]) => void
  /** Called when a file is removed from the list. */
  onFileRemove?: (file: File, nextList: File[]) => void
  /** Show the list of selected files. @default true */
  showList?: boolean
  /** Maximum number of files. */
  uploadLimit?: number
  /** Helper text shown under the trigger. */
  tip?: ReactNode
  /** Custom trigger content. */
  children?: ReactNode
  className?: string
}
