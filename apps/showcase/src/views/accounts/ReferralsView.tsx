import { useEffect, useState } from 'react'
import { Button, Card, Input, Table } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { formatCurrency, formatNumber } from '@dylan-ds/utils'
import { KpiCard } from '@/components/shared/KpiCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { referees, referral } from '@/mock/account'
import { fmtDate, refereeStatusTone } from './accountConstants'

/** Referral dashboard with share link, reward KPIs and referee status table. */
export function ReferralsView() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(referral.link)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Referrals" description="Invite teams and track earned account credits." />

      <Card bordered bodyClass="space-y-4 p-4">
        <div className="grid gap-3 lg:grid-cols-[minmax(16rem,1fr)_auto]">
          <Input name="referral-link" value={referral.link} readOnly aria-label="Referral link" />
          <Button
            variant="solid"
            icon={<Icon as={copied ? TbIcons.TbCheck : TbIcons.TbCopy} size={16} />}
            onClick={copyLink}
          >
            {copied ? 'Copied' : 'Copy link'}
          </Button>
        </div>
        <p className="text-sm text-content-muted">
          Referral code <span className="font-medium text-content">{referral.code}</span>
        </p>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard label="Invited" value={formatNumber(referral.invited, 0)} />
        <KpiCard label="Signed up" value={formatNumber(referral.signedUp, 0)} />
        <KpiCard label="Converted" value={formatNumber(referral.converted, 0)} />
        <KpiCard label="Credit earned" value={formatCurrency(referral.creditEarned)} />
        <KpiCard label="Credit pending" value={formatCurrency(referral.creditPending)} />
      </div>

      <Card bordered header={{ content: 'Referees', bordered: true }} bodyClass="p-0">
        <Table>
          <Table.THead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Reward</Table.Th>
              <Table.Th>Date</Table.Th>
            </Table.Tr>
          </Table.THead>
          <Table.TBody>
            {referees.map((referee) => (
              <Table.Tr key={referee.id}>
                <Table.Td>
                  <p className="font-medium text-content">{referee.name}</p>
                  <p className="text-xs text-content-muted">{referee.email}</p>
                </Table.Td>
                <Table.Td>
                  <StatusTag tone={refereeStatusTone[referee.status]}>
                    {referee.status === 'signed-up' ? 'signed up' : referee.status}
                  </StatusTag>
                </Table.Td>
                <Table.Td>{formatCurrency(referee.reward)}</Table.Td>
                <Table.Td>{fmtDate(referee.date)}</Table.Td>
              </Table.Tr>
            ))}
          </Table.TBody>
        </Table>
      </Card>
    </div>
  )
}
