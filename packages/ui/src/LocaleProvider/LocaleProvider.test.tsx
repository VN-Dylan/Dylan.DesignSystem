import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ConfirmDialog } from '../ConfirmDialog'
import { DataTable } from '../DataTable'
import { Select } from '../Select'
import { LocaleProvider } from './LocaleProvider'
import { getUiMessages } from './messages'
import { useLocale } from './context'

describe('LocaleProvider', () => {
  it('defaults to English without a provider', () => {
    render(<ConfirmDialog isOpen title="Delete" />)
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument()
  })

  it('translates built-in component strings', () => {
    render(
      <LocaleProvider locale="vi">
        <ConfirmDialog isOpen title="Xoá" />
        <DataTable columns={[{ accessorKey: 'name', header: 'Tên' }]} data={[]} />
        <Select options={[]} />
      </LocaleProvider>,
    )
    expect(screen.getByRole('button', { name: 'Huỷ' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Xác nhận' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Đóng hộp thoại' })).toBeInTheDocument()
    expect(screen.getByText('Không có dữ liệu')).toBeInTheDocument()
    expect(screen.getByText('Chọn…')).toBeInTheDocument()
  })

  it('keeps explicit props over translated defaults', () => {
    render(
      <LocaleProvider locale="vi">
        <ConfirmDialog isOpen title="Xoá" confirmText="Xoá luôn" />
      </LocaleProvider>,
    )
    expect(screen.getByRole('button', { name: 'Xoá luôn' })).toBeInTheDocument()
  })

  it('merges partial overrides and exposes the locale', () => {
    function Probe() {
      const { locale, messages } = useLocale()
      return (
        <p>
          {locale} · {messages.confirmDialog.cancel} · {messages.confirmDialog.confirm}
        </p>
      )
    }
    render(
      <LocaleProvider locale="vi-VN" messages={{ confirmDialog: { confirm: 'Đồng ý' } }}>
        <Probe />
      </LocaleProvider>,
    )
    expect(screen.getByText('vi-VN · Huỷ · Đồng ý')).toBeInTheDocument()
  })

  it('falls back to the language, then English', () => {
    expect(getUiMessages('vi-VN').confirmDialog.cancel).toBe('Huỷ')
    expect(getUiMessages('fr').confirmDialog.cancel).toBe('Cancel')
  })
})
