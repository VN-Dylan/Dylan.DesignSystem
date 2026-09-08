import { useRef, useState } from 'react'
import {
  Button,
  Menu,
  NavToggle,
  OverflowTabs,
  Pagination,
  Select,
  Spinner,
  Steps,
  Tabs,
  ToggleDrawer,
  Wizard,
  type OverflowTabItem,
  type SelectOption,
  type ToggleDrawerPlacement,
  type ToggleDrawerRef,
  type WizardStep,
} from '@vn-dylan/ui'
import { HiIcons, Icon } from '@vn-dylan/icons'
import { Demo } from '@/views/gallery/components/Demo'
import { SectionShell } from '@/views/gallery/sections/SectionShell'

const { TabContent, TabList, TabNav } = Tabs

const overflowTabList: OverflowTabItem[] = [
  { label: 'Overview', value: 'overview' },
  { label: 'Activity', value: 'activity' },
  { label: 'Settings', value: 'settings' },
  { label: 'Members', value: 'members' },
  { label: 'Integrations', value: 'integrations' },
  { label: 'Billing', value: 'billing' },
  { label: 'Audit log', value: 'audit' },
]

const pageSizeOptions: SelectOption[] = [
  { value: '5', label: '5 / page' },
  { value: '10', label: '10 / page' },
  { value: '20', label: '20 / page' },
  { value: '50', label: '50 / page' },
]

const wizardSteps: WizardStep[] = [
  { title: 'Account', content: <p>Create your account credentials.</p> },
  { title: 'Profile', content: <p>Tell us about yourself.</p> },
  { title: 'Review', content: <p>Confirm and finish.</p> },
]

const DrawerContent = () => (
  <div className="space-y-4">
    <h5 className="font-semibold text-content">Navigation</h5>
    <ul className="space-y-2 text-sm text-content">
      {['Home', 'Dashboard', 'Settings', 'Profile'].map((item) => (
        <li key={item} className="rounded-md p-2 hover:bg-surface-sunken">
          {item}
        </li>
      ))}
    </ul>
  </div>
)

const MenuContent = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <span className="flex items-center gap-2">
    {icon}
    <span>{label}</span>
  </span>
)

const TabPanel = ({ label }: { label: string }) => (
  <p className="text-content-muted">{label} content keeps related information in one view.</p>
)

const stepItems = () => [
  <Steps.Item key="login" title="Login" />,
  <Steps.Item key="order" title="Order placed" />,
  <Steps.Item key="review" title="In review" />,
  <Steps.Item key="approved" title="Approved" />,
]

/** Navigation category page with menus, tabs, steppers and pagination demos. */
export function NavigationSection() {
  const [currentTab, setCurrentTab] = useState('home')
  const [overflowTab, setOverflowTab] = useState('overview')
  const [step, setStep] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [page, setPage] = useState(3)
  const [collapsed, setCollapsed] = useState(false)
  const [wizardCurrent, setWizardCurrent] = useState(0)
  const drawerRef = useRef<ToggleDrawerRef>(null)

  return (
    <SectionShell slug="navigation">
      <Demo
        title="Menu - simple and active"
        description="Vertical app navigation with active state."
        code={`<Menu defaultActiveKeys={['message']}>
  <Menu.MenuItem eventKey="settings">Settings</Menu.MenuItem>
  <Menu.MenuItem eventKey="message">Message</Menu.MenuItem>
</Menu>`}
      >
        <Demo.Grid>
          <div className="w-full rounded-md border border-border bg-surface p-2">
            <Menu defaultActiveKeys={['message']}>
              <Menu.MenuItem eventKey="settings">Settings</Menu.MenuItem>
              <Menu.MenuItem eventKey="message">Message</Menu.MenuItem>
              <Menu.MenuItem eventKey="gallery">Gallery</Menu.MenuItem>
            </Menu>
          </div>
          <div className="w-full rounded-md border border-border bg-surface p-2">
            <Menu>
              <Menu.MenuItem eventKey="settings">Settings</Menu.MenuItem>
              <Menu.MenuItem eventKey="message" disabled>
                Message
              </Menu.MenuItem>
              <Menu.MenuItem eventKey="gallery">Gallery</Menu.MenuItem>
            </Menu>
          </div>
        </Demo.Grid>
      </Demo>

      <Demo
        title="Menu - groups and collapse"
        code={`<Menu defaultExpandedKeys={['workspace']}>
  <Menu.MenuGroup label="General">...</Menu.MenuGroup>
  <Menu.MenuCollapse eventKey="workspace" label="Workspace">...</Menu.MenuCollapse>
</Menu>`}
      >
        <Demo.Grid>
          <div className="w-full rounded-md border border-border bg-surface p-2">
            <Menu>
              <Menu.MenuGroup label="General">
                <Menu.MenuItem eventKey="profile">Profile</Menu.MenuItem>
                <Menu.MenuItem eventKey="billing">Billing</Menu.MenuItem>
              </Menu.MenuGroup>
              <Menu.MenuGroup label="Workspace">
                <Menu.MenuItem eventKey="members">Members</Menu.MenuItem>
                <Menu.MenuItem eventKey="settings">Settings</Menu.MenuItem>
              </Menu.MenuGroup>
            </Menu>
          </div>
          <div className="w-full rounded-md border border-border bg-surface p-2">
            <Menu defaultExpandedKeys={['network']}>
              <Menu.MenuItem eventKey="settings">
                <MenuContent
                  icon={<Icon as={HiIcons.HiOutlineCog6Tooth} size={18} />}
                  label="Settings"
                />
              </Menu.MenuItem>
              <Menu.MenuCollapse
                eventKey="network"
                label={
                  <MenuContent
                    icon={<Icon as={HiIcons.HiOutlineGlobeAlt} size={18} />}
                    label="Network"
                  />
                }
              >
                <Menu.MenuItem eventKey="wifi">
                  <MenuContent icon={<Icon as={HiIcons.HiWifi} size={18} />} label="Wifi" />
                </Menu.MenuItem>
                <Menu.MenuItem eventKey="support">
                  <MenuContent
                    icon={<Icon as={HiIcons.HiOutlineLifebuoy} size={18} />}
                    label="Support"
                  />
                </Menu.MenuItem>
              </Menu.MenuCollapse>
            </Menu>
          </div>
        </Demo.Grid>
      </Demo>

      <Demo
        title="Tabs - underline"
        code={`<Tabs value={currentTab} onChange={setCurrentTab}>
  <Tabs.TabList>
    <Tabs.TabNav value="home">Home</Tabs.TabNav>
  </Tabs.TabList>
</Tabs>`}
      >
        <div className="w-full">
          <Tabs value={currentTab} onChange={setCurrentTab}>
            <TabList>
              <TabNav value="home">Home</TabNav>
              <TabNav value="profile">Profile</TabNav>
              <TabNav value="contact">Contact</TabNav>
            </TabList>
            <TabContent value="home">
              <TabPanel label="Home" />
            </TabContent>
            <TabContent value="profile">
              <TabPanel label="Profile" />
            </TabContent>
            <TabContent value="contact">
              <TabPanel label="Contact" />
            </TabContent>
          </Tabs>
        </div>
      </Demo>

      <Demo
        title="Tabs - pill and icons"
        code={`<Tabs defaultValue="home" variant="pill">
  <Tabs.TabNav value="home" icon={<Icon as={HiIcons.HiOutlineHome} />}>Home</Tabs.TabNav>
</Tabs>`}
      >
        <Demo.Grid>
          <Tabs defaultValue="home" variant="pill">
            <TabList>
              <TabNav value="home">Home</TabNav>
              <TabNav value="profile">Profile</TabNav>
              <TabNav value="contact">Contact</TabNav>
            </TabList>
            <TabContent value="home">
              <TabPanel label="Home" />
            </TabContent>
            <TabContent value="profile">
              <TabPanel label="Profile" />
            </TabContent>
            <TabContent value="contact">
              <TabPanel label="Contact" />
            </TabContent>
          </Tabs>
          <Tabs defaultValue="home">
            <TabList>
              <TabNav value="home" icon={<Icon as={HiIcons.HiOutlineHome} size={16} />}>
                Home
              </TabNav>
              <TabNav value="profile" icon={<Icon as={HiIcons.HiOutlineUser} size={16} />}>
                Profile
              </TabNav>
              <TabNav value="contact" icon={<Icon as={HiIcons.HiOutlinePhone} size={16} />}>
                Contact
              </TabNav>
            </TabList>
            <TabContent value="home">
              <TabPanel label="Home" />
            </TabContent>
            <TabContent value="profile">
              <TabPanel label="Profile" />
            </TabContent>
            <TabContent value="contact">
              <TabPanel label="Contact" />
            </TabContent>
          </Tabs>
        </Demo.Grid>
      </Demo>

      <Demo
        title="Tabs - disabled"
        code={`<Tabs defaultValue="home">
  <Tabs.TabNav value="profile" disabled>Profile</Tabs.TabNav>
</Tabs>`}
      >
        <Demo.Grid>
          <Tabs defaultValue="home">
            <TabList>
              <TabNav value="home">Home</TabNav>
              <TabNav value="profile" disabled>
                Profile
              </TabNav>
              <TabNav value="contact">Contact</TabNav>
            </TabList>
          </Tabs>
          <Tabs defaultValue="home" variant="pill">
            <TabList>
              <TabNav value="home">Home</TabNav>
              <TabNav value="profile" disabled>
                Profile
              </TabNav>
              <TabNav value="contact">Contact</TabNav>
            </TabList>
          </Tabs>
        </Demo.Grid>
      </Demo>

      <Demo
        title="OverflowTabs"
        description="Resize the dashed container to push extra tabs into overflow."
        code={`<OverflowTabs tabList={tabList} value={value} onChange={setValue}>
  <p>Panel: {value}</p>
</OverflowTabs>`}
      >
        <div className="w-full max-w-md resize-x overflow-auto rounded-md border border-dashed border-border p-2">
          <OverflowTabs tabList={overflowTabList} value={overflowTab} onChange={setOverflowTab}>
            <p className="pt-2 text-content-muted">Panel: {overflowTab}</p>
          </OverflowTabs>
        </div>
      </Demo>

      <Demo
        title="Steps"
        code={`<Steps current={step} onChange={setStep}>
  <Steps.Item title="Login" />
  <Steps.Item title="Order placed" />
</Steps>`}
      >
        <div className="w-full space-y-6">
          <Steps current={step} onChange={setStep}>
            {stepItems()}
          </Steps>
          <div className="flex h-40 items-center justify-center rounded-md bg-surface">
            <h3 className="text-base font-semibold text-content">Step {step + 1} content</h3>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              disabled={step === 0}
              onClick={() => setStep((value) => Math.max(0, value - 1))}
            >
              Previous
            </Button>
            <Button
              disabled={step === 3}
              variant="solid"
              onClick={() => setStep((value) => Math.min(3, value + 1))}
            >
              {step === 3 ? 'Completed' : 'Next'}
            </Button>
          </div>
        </div>
      </Demo>

      <Demo
        title="Steps - vertical and custom icons"
        code={`<Steps vertical current={2}>
  <Steps.Item title="Login" description="Login to your account" />
</Steps>`}
      >
        <Demo.Grid>
          <Steps vertical current={2}>
            <Steps.Item title="Login" description="Login to your account" />
            <Steps.Item title="Place order" description="Start placing an order" />
            <Steps.Item title="In review" description="We will review the order" />
            <Steps.Item title="Approved" description="Order approved" />
          </Steps>
          <Steps current={1}>
            <Steps.Item
              title="Login"
              customIcon={<Icon as={HiIcons.HiOutlineArrowLeftOnRectangle} size={16} />}
            />
            <Steps.Item title="Order placed" customIcon={<Spinner size="1em" />} />
            <Steps.Item
              title="In review"
              customIcon={<Icon as={HiIcons.HiOutlineDocumentMagnifyingGlass} size={16} />}
            />
            <Steps.Item
              title="Approved"
              customIcon={<Icon as={HiIcons.HiOutlineClipboardDocumentCheck} size={16} />}
            />
          </Steps>
        </Demo.Grid>
      </Demo>

      <Demo
        title="Pagination"
        code={`<Pagination displayTotal pageSize={pageSize} total={100} />
<Select size="sm" options={pageSizeOptions} onChange={setPageSize} />`}
      >
        <Demo.Stack>
          <Pagination
            displayTotal
            pageSize={pageSize}
            total={100}
            currentPage={page}
            onChange={setPage}
          />
          <div className="w-40">
            <Select
              size="sm"
              isSearchable={false}
              defaultValue={pageSizeOptions[0]}
              options={pageSizeOptions}
              aria-label="Page size"
              onChange={(selected) => {
                if (selected) setPageSize(Number(selected.value))
              }}
            />
          </div>
        </Demo.Stack>
      </Demo>

      <Demo
        title="NavToggle"
        code={`<Button
  aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
  icon={<NavToggle toggled={collapsed} />}
/>`}
      >
        <Demo.Row>
          <Button
            aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
            icon={<NavToggle toggled={collapsed} />}
            onClick={() => setCollapsed((value) => !value)}
          />
          <span className="text-sm text-content-muted">
            {collapsed ? 'Navigation collapsed' : 'Navigation expanded'}
          </span>
        </Demo.Row>
      </Demo>

      <Demo
        title="ToggleDrawer"
        code={`<ToggleDrawer title="Menu">
  <DrawerContent />
</ToggleDrawer>
<Button onClick={() => drawerRef.current?.handleOpenDrawer()}>Open with ref</Button>`}
      >
        <Demo.Row>
          <ToggleDrawer ref={drawerRef} title="Menu">
            <DrawerContent />
          </ToggleDrawer>
          <Button onClick={() => drawerRef.current?.handleOpenDrawer()}>Open with ref</Button>
          {(['left', 'right', 'top', 'bottom'] as ToggleDrawerPlacement[]).map((placement) => (
            <ToggleDrawer key={placement} placement={placement} title={`${placement} drawer`}>
              <DrawerContent />
            </ToggleDrawer>
          ))}
        </Demo.Row>
      </Demo>

      <Demo
        title="Wizard"
        code={`<Wizard
  steps={steps}
  current={current}
  onChange={setCurrent}
  onFinish={handleFinish}
/>`}
      >
        <Demo.Grid>
          <Wizard
            steps={wizardSteps}
            current={wizardCurrent}
            onChange={setWizardCurrent}
            onFinish={() => setWizardCurrent(0)}
          />
          <Wizard steps={wizardSteps} defaultCurrent={1} vertical />
        </Demo.Grid>
      </Demo>
    </SectionShell>
  )
}
