import { forwardRef, useRef, useState, type DragEvent } from 'react'
import { TbIcons } from '@vn-dylan/icons'
import { classNames, fileSizeUnit, useControllableState } from '@vn-dylan/utils'
import type { UploadProps } from './types'
import './Upload.scss'

/**
 * File input with an optional drag-and-drop zone and a selected-file list.
 * `beforeUpload` gates each file; `uploadLimit` caps the count.
 */
export const Upload = forwardRef<HTMLInputElement, UploadProps>(function Upload(
  {
    accept,
    multiple = true,
    disabled = false,
    draggable = false,
    fileList,
    defaultFileList = [],
    beforeUpload,
    onChange,
    onFileRemove,
    showList = true,
    uploadLimit,
    tip,
    children,
    className,
  },
  ref,
) {
  const [files, setFiles] = useControllableState<File[]>({
    value: fileList,
    defaultValue: defaultFileList,
    onChange,
  })
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const addFiles = async (incoming: FileList | File[]) => {
    if (disabled) return
    let next = [...files]
    for (const file of Array.from(incoming)) {
      if (uploadLimit !== undefined && next.length >= uploadLimit) break
      const ok = beforeUpload ? await beforeUpload(file, next) : true
      if (ok) next = [...next, file]
    }
    setFiles(next)
  }

  const removeFile = (index: number) => {
    const removed = files[index]
    const next = files.filter((_, i) => i !== index)
    setFiles(next)
    if (removed) onFileRemove?.(removed, next)
  }

  const openPicker = () => {
    if (!disabled) inputRef.current?.click()
  }

  const onDrop = (event: DragEvent) => {
    event.preventDefault()
    setDragOver(false)
    void addFiles(event.dataTransfer.files)
  }

  return (
    <div className={classNames('dyl-upload', className)} data-disabled={disabled || undefined}>
      <input
        ref={(node) => {
          inputRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        type="file"
        className="dyl-upload__input"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
        onChange={(e) => {
          if (e.target.files) void addFiles(e.target.files)
          e.target.value = ''
        }}
      />

      {draggable ? (
        <button
          type="button"
          className="dyl-upload__dropzone"
          data-drag-over={dragOver || undefined}
          disabled={disabled}
          onClick={openPicker}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
        >
          <TbIcons.TbUpload className="dyl-upload__dropzone-icon" aria-hidden />
          {children ?? (
            <span>
              <strong>Click to upload</strong> or drag and drop
            </span>
          )}
        </button>
      ) : (
        <button
          type="button"
          className="dyl-upload__trigger"
          disabled={disabled}
          onClick={openPicker}
        >
          <TbIcons.TbUpload aria-hidden />
          {children ?? 'Choose file'}
        </button>
      )}

      {tip != null && <p className="dyl-upload__tip">{tip}</p>}

      {showList && files.length > 0 && (
        <ul className="dyl-upload__list">
          {files.map((file, index) => (
            <li key={`${file.name}-${index}`} className="dyl-upload__file">
              <TbIcons.TbFile aria-hidden />
              <span className="dyl-upload__file-name">{file.name}</span>
              <span className="dyl-upload__file-size">{fileSizeUnit(file.size)}</span>
              {!disabled && (
                <button
                  type="button"
                  className="dyl-upload__file-remove"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => removeFile(index)}
                >
                  <TbIcons.TbX aria-hidden />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
})
