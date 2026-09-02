import type { Meta, StoryObj } from '@storybook/react'
import { TbIcons } from '@vn-dylan/icons'
import { Dropdown } from './Dropdown'
import { Button } from '../Button'

const items = [
  { key: 'a', name: 'Item A' },
  { key: 'b', name: 'Item B' },
  { key: 'c', name: 'Item C' },
  { key: 'd', name: 'Item D' },
]

const DropdownItems = () => (
  <>
    {items.map((item) => (
      <Dropdown.Item key={item.key} eventKey={item.key}>
        {item.name}
      </Dropdown.Item>
    ))}
  </>
)

const DropdownItemWrapper = ({
  icon,
  suffix,
  children,
}: {
  icon: React.ReactNode
  suffix?: React.ReactNode
  children: React.ReactNode
}) => (
  <div className="flex w-full items-center justify-between gap-2">
    <span className="flex items-center gap-2">
      <span className="text-lg text-content-muted">{icon}</span>
      {children}
    </span>
    {suffix && <span className="text-content-faint">{suffix}</span>}
  </div>
)

const meta = {
  title: 'Forms/Dropdown',
  component: Dropdown,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    trigger: { control: 'inline-radio', options: ['click', 'hover', 'context'] },
    placement: {
      control: 'select',
      options: [
        'top-start',
        'top-center',
        'top-end',
        'bottom-start',
        'bottom-center',
        'bottom-end',
        'middle-start-top',
        'middle-start-bottom',
        'middle-end-top',
        'middle-end-bottom',
      ],
    },
  },
  args: { title: 'Click Me!' },
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dropdown title="Click Me!">
      <DropdownItems />
    </Dropdown>
  ),
}

export const CustomToggle: Story = {
  name: 'Custom Toggle',
  render: () => (
    <Dropdown renderTitle={<Button>Toggle as Button</Button>}>
      <DropdownItems />
    </Dropdown>
  ),
}

export const Trigger: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Dropdown title="Click">
        <DropdownItems />
      </Dropdown>
      <Dropdown title="Hover" trigger="hover">
        <DropdownItems />
      </Dropdown>
      <Dropdown title="Right Click" trigger="context">
        <DropdownItems />
      </Dropdown>
    </div>
  ),
}

export const Submenu: Story = {
  render: () => (
    <Dropdown title="Click Me!">
      <Dropdown.Item>Item 1</Dropdown.Item>
      <Dropdown.Menu title="Right Item 2">
        <Dropdown.Menu title="Item 2-1">
          <Dropdown.Item active>Item 2-1-1</Dropdown.Item>
          <Dropdown.Item>Item 2-1-2</Dropdown.Item>
          <Dropdown.Item>Item 2-1-3</Dropdown.Item>
        </Dropdown.Menu>
        <Dropdown.Item>Item 2-2</Dropdown.Item>
        <Dropdown.Item>Item 2-3</Dropdown.Item>
      </Dropdown.Menu>
      <Dropdown.Menu title="Right Item 3">
        <Dropdown.Item>Item 3-1</Dropdown.Item>
        <Dropdown.Item>Item 3-2</Dropdown.Item>
      </Dropdown.Menu>
      <Dropdown.Item>Item 4</Dropdown.Item>
    </Dropdown>
  ),
}

export const Placement: Story = {
  render: () => (
    <div className="grid max-w-xl grid-cols-3 gap-4">
      <Dropdown placement="top-start" title="Top start">
        <DropdownItems />
      </Dropdown>
      <Dropdown placement="top" title="Top center">
        <DropdownItems />
      </Dropdown>
      <Dropdown placement="top-end" title="Top end">
        <DropdownItems />
      </Dropdown>
      <Dropdown placement="bottom-start" title="Bottom start">
        <DropdownItems />
      </Dropdown>
      <Dropdown placement="bottom" title="Bottom center">
        <DropdownItems />
      </Dropdown>
      <Dropdown placement="bottom-end" title="Bottom end">
        <DropdownItems />
      </Dropdown>
      <Dropdown placement="right-start" title="Right start">
        <DropdownItems />
      </Dropdown>
      <Dropdown placement="right" title="Right center">
        <DropdownItems />
      </Dropdown>
      <Dropdown placement="right-end" title="Right end">
        <DropdownItems />
      </Dropdown>
      <Dropdown placement="left-start" title="Left start">
        <DropdownItems />
      </Dropdown>
      <Dropdown placement="left" title="Left center">
        <DropdownItems />
      </Dropdown>
      <Dropdown placement="left-end" title="Left end">
        <DropdownItems />
      </Dropdown>
    </div>
  ),
}

export const DefaultActive: Story = {
  name: 'Default Active',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Dropdown title="Click Me!" activeKey="a">
        <DropdownItems />
      </Dropdown>
      <Dropdown title="With submenu" activeKey="item-2-1-2">
        <Dropdown.Item eventKey="item-1">Item 1</Dropdown.Item>
        <Dropdown.Menu eventKey="item-2" title="Item 2">
          <Dropdown.Menu eventKey="item-2-1" title="Item 2-1">
            <Dropdown.Item eventKey="item-2-1-1">Item 2-1-1</Dropdown.Item>
            <Dropdown.Item eventKey="item-2-1-2">Item 2-1-2</Dropdown.Item>
            <Dropdown.Item eventKey="item-2-1-3">Item 2-1-3</Dropdown.Item>
          </Dropdown.Menu>
          <Dropdown.Item eventKey="item-2-2">Item 2-2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Dropdown title="Disabled" disabled>
      <DropdownItems />
    </Dropdown>
  ),
}

export const DropdownItemType: Story = {
  name: 'Dropdown Item Type',
  render: () => (
    <Dropdown title="Click Me!">
      <Dropdown.Item variant="header">My Account</Dropdown.Item>
      <Dropdown.Item variant="divider" />
      <Dropdown.Item>
        <DropdownItemWrapper icon={<TbIcons.TbUser />} suffix="P">
          Profile
        </DropdownItemWrapper>
      </Dropdown.Item>
      <Dropdown.Item>
        <DropdownItemWrapper icon={<TbIcons.TbSettings2 />} suffix="S">
          Setting
        </DropdownItemWrapper>
      </Dropdown.Item>
      <Dropdown.Item variant="divider" />
      <Dropdown.Item variant="custom">
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left font-semibold text-error hover:bg-error-subtle"
        >
          <TbIcons.TbLogout className="text-lg" />
          Logout
        </button>
      </Dropdown.Item>
    </Dropdown>
  ),
}

export const ContextMenu: Story = {
  name: 'Context Menu',
  render: () => (
    <div className="w-80">
      <Dropdown.ContextMenu areaContent={<span>Right click here</span>}>
        <Dropdown.Item>Item 1</Dropdown.Item>
        <Dropdown.Menu title="Right Item 2">
          <Dropdown.Item>Item 2-1</Dropdown.Item>
          <Dropdown.Item>Item 2-2</Dropdown.Item>
        </Dropdown.Menu>
        <Dropdown.Item>Item 3</Dropdown.Item>
      </Dropdown.ContextMenu>
    </div>
  ),
}

const RouterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <a className="block w-full" href={to}>
    {children}
  </a>
)

export const WithRouterLink: Story = {
  name: 'With RouterLink',
  render: () => (
    <Dropdown title="Click Me!">
      <Dropdown.Item>
        <RouterLink to="/ui-components/checkbox">Checkbox</RouterLink>
      </Dropdown.Item>
      <Dropdown.Item>
        <RouterLink to="/ui-components/button">Button</RouterLink>
      </Dropdown.Item>
      <Dropdown.Item>
        <RouterLink to="/ui-components/alert">Alert</RouterLink>
      </Dropdown.Item>
      <Dropdown.Item>
        <RouterLink to="/ui-components/dialog">Dialog</RouterLink>
      </Dropdown.Item>
    </Dropdown>
  ),
}

export const DropdownStory: Story = {
  name: 'Dropdown',
  render: () => (
    <Dropdown title="Click Me!">
      <DropdownItems />
    </Dropdown>
  ),
}
