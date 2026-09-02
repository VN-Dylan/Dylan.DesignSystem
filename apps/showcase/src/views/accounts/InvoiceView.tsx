import { useState } from 'react'
import { Button, Card, Table } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { formatCurrency } from '@vn-dylan/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { invoices, invoiceTotal } from '@/mock/account'
import { fmtDate, invoiceStatusTone } from './accountConstants'

/** Invoice list with selected invoice details and line-item totals. */
export function InvoiceView() {
  const [selectedId, setSelectedId] = useState(invoices[0]!.id)
  const selectedInvoice = invoices.find((invoice) => invoice.id === selectedId) ?? invoices[0]!
  const totals = invoiceTotal(selectedInvoice)

  return (
    <div className="space-y-6">
      <PageHeader title="Invoices" description="Review billing history and invoice totals." />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <Card bordered header={{ content: 'Billing history', bordered: true }} bodyClass="p-0">
          <Table>
            <Table.THead>
              <Table.Tr>
                <Table.Th>Number</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Issued</Table.Th>
                <Table.Th>Due</Table.Th>
                <Table.Th>Total</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.THead>
            <Table.TBody>
              {invoices.map((invoice) => (
                <Table.Tr
                  key={invoice.id}
                  onClick={() => setSelectedId(invoice.id)}
                  className={invoice.id === selectedId ? 'bg-primary-subtle' : undefined}
                >
                  <Table.Td>
                    <span className="font-medium text-content">{invoice.number}</span>
                  </Table.Td>
                  <Table.Td>
                    <StatusTag tone={invoiceStatusTone[invoice.status]}>{invoice.status}</StatusTag>
                  </Table.Td>
                  <Table.Td>{fmtDate(invoice.issued)}</Table.Td>
                  <Table.Td>{fmtDate(invoice.due)}</Table.Td>
                  <Table.Td>{formatCurrency(invoiceTotal(invoice).total)}</Table.Td>
                  <Table.Td>
                    <div className="flex gap-2">
                      <Button
                        size="xs"
                        aria-label={`View ${invoice.number}`}
                        icon={<Icon as={TbIcons.TbEye} size={14} />}
                        onClick={(event) => {
                          event.stopPropagation()
                          setSelectedId(invoice.id)
                        }}
                      />
                      <Button
                        size="xs"
                        aria-label={`Download ${invoice.number}`}
                        icon={<Icon as={TbIcons.TbDownload} size={14} />}
                        onClick={(event) => event.stopPropagation()}
                      />
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.TBody>
          </Table>
        </Card>

        <Card
          bordered
          header={{ content: selectedInvoice.number, bordered: true }}
          bodyClass="space-y-4 p-4"
        >
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-content-muted">Status</span>
              <StatusTag tone={invoiceStatusTone[selectedInvoice.status]}>
                {selectedInvoice.status}
              </StatusTag>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-content-muted">Bill to</span>
              <span className="text-end font-medium text-content">{selectedInvoice.billTo}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-content-muted">Issued</span>
              <span className="text-content">{fmtDate(selectedInvoice.issued)}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-content-muted">Due</span>
              <span className="text-content">{fmtDate(selectedInvoice.due)}</span>
            </div>
          </div>

          <Table>
            <Table.THead>
              <Table.Tr>
                <Table.Th>Description</Table.Th>
                <Table.Th>Qty</Table.Th>
                <Table.Th>Unit</Table.Th>
                <Table.Th>Amount</Table.Th>
              </Table.Tr>
            </Table.THead>
            <Table.TBody>
              {selectedInvoice.lines.map((line) => (
                <Table.Tr key={line.description}>
                  <Table.Td>{line.description}</Table.Td>
                  <Table.Td>{line.qty}</Table.Td>
                  <Table.Td>{formatCurrency(line.unit)}</Table.Td>
                  <Table.Td>{formatCurrency(line.qty * line.unit)}</Table.Td>
                </Table.Tr>
              ))}
            </Table.TBody>
          </Table>

          <div className="space-y-2 rounded-md bg-surface-sunken p-3 text-sm">
            <div className="flex justify-between">
              <span className="text-content-muted">Subtotal</span>
              <span className="text-content">{formatCurrency(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-content-muted">Tax 10%</span>
              <span className="text-content">{formatCurrency(totals.tax)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 font-semibold text-content">
              <span>Total</span>
              <span>{formatCurrency(totals.total)}</span>
            </div>
          </div>

          <Button variant="solid" icon={<Icon as={TbIcons.TbDownload} size={16} />}>
            Download PDF
          </Button>
        </Card>
      </div>
    </div>
  )
}
