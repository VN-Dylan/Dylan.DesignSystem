import { Button, Card, Input, Steps, Table } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { kycProgress } from '@/mock/crypto'

const kycStatusTone = {
  done: 'success',
  active: 'info',
  todo: 'neutral',
} as const

const kycStatusLabel = {
  done: 'Done',
  active: 'Active',
  todo: 'To do',
} as const

const levels = [
  { level: 'Level 1', limit: '$2,000 daily withdrawals', requirement: 'Email and phone' },
  { level: 'Level 2', limit: '$50,000 daily withdrawals', requirement: 'Identity and address' },
  { level: 'Level 3', limit: 'Institutional limits', requirement: 'Enhanced due diligence' },
]

/** Identity verification screen with progress steps and level unlock summary. */
export function KycView() {
  const activeIndex = kycProgress.findIndex((step) => step.status === 'active')

  return (
    <div className="space-y-6">
      <PageHeader
        title="Identity verification"
        description="Track verification progress and submit the active proof step."
      />

      <Card bordered bodyClass="p-4">
        <Steps current={activeIndex} vertical>
          {kycProgress.map((step) => (
            <Steps.Item key={step.step} title={step.label} />
          ))}
        </Steps>
      </Card>

      <div className="grid gap-3 lg:grid-cols-2">
        {kycProgress.map((step) => (
          <Card key={step.step} bordered bodyClass="space-y-3 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium text-content">{step.label}</p>
                <p className="text-sm text-content-muted">Verification step: {step.step}</p>
              </div>
              <StatusTag tone={kycStatusTone[step.status]}>{kycStatusLabel[step.status]}</StatusTag>
            </div>
            {step.status === 'active' && (
              <div className="grid gap-3 xl:grid-cols-[minmax(12rem,1fr)_minmax(12rem,1fr)_auto]">
                <Input placeholder="Document reference" aria-label="Document reference" />
                <Input type="file" aria-label="Upload proof" />
                <Button variant="solid" icon={<Icon as={TbIcons.TbUpload} size={16} />}>
                  Submit
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      <Card
        bordered
        header={{ content: 'Verification level 2 of 3', bordered: true }}
        bodyClass="p-0"
      >
        <Table>
          <Table.THead>
            <Table.Tr>
              <Table.Th>Level</Table.Th>
              <Table.Th>Unlocks</Table.Th>
              <Table.Th>Requirement</Table.Th>
            </Table.Tr>
          </Table.THead>
          <Table.TBody>
            {levels.map((level) => (
              <Table.Tr key={level.level}>
                <Table.Td className="font-medium text-content">{level.level}</Table.Td>
                <Table.Td>{level.limit}</Table.Td>
                <Table.Td>{level.requirement}</Table.Td>
              </Table.Tr>
            ))}
          </Table.TBody>
        </Table>
      </Card>
    </div>
  )
}
