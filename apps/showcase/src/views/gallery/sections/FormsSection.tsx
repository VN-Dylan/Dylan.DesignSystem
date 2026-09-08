import { useState } from 'react'
import {
  AutoComplete,
  Button,
  Checkbox,
  CustomFormatInput,
  DatePicker,
  DebounceInput,
  Dropdown,
  Form,
  Input,
  InputGroup,
  MultiValueInput,
  NumericInput,
  NumericInputStepper,
  OtpInput,
  PasswordInput,
  PatternInput,
  Radio,
  RichTextEditor,
  Select,
  SelectInputWithPrefix,
  SelectOptionWithPrefix,
  Slider,
  Switcher,
  TimeInput,
  Upload,
  type CheckboxValue,
  type DatePickerRangeValue,
  type RadioValue,
  type SelectOption,
  type SliderRangeValue,
  type TimeInputRangeValue,
  type TimeInputValue,
} from '@vn-dylan/ui'
import { HiIcons, Icon, TbIcons } from '@vn-dylan/icons'
import { Demo } from '@/views/gallery/components/Demo'
import { SectionShell } from '@/views/gallery/sections/SectionShell'
import { gallerySelectOptions, galleryTreeCountries } from '@/mock/gallery'

const cardDate = new Date(2026, 8, 9)
const deliveryStart = new Date(2026, 8, 9)
const deliveryEnd = new Date(2026, 8, 13)
const meetingTime = new Date(2026, 8, 9, 9, 30)
const meetingEndTime = new Date(2026, 8, 9, 10, 30)

const sliderMarks = [
  { value: 0, label: '0' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 75, label: '75' },
  { value: 100, label: '100' },
]

const formatCurrency = (value: string) => {
  if (value === '') return ''
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Number(value))
}

/** Forms category page with text, choice, numeric, date and editor demos. */
export function FormsSection() {
  const [inputValue, setInputValue] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [patternValue, setPatternValue] = useState('424242')
  const [numericValue, setNumericValue] = useState('1280')
  const [quantity, setQuantity] = useState(5)
  const [customValue, setCustomValue] = useState('1200')
  const [otpValue, setOtpValue] = useState('')
  const [checked, setChecked] = useState(false)
  const [checkedList, setCheckedList] = useState<CheckboxValue[]>(['Email'])
  const [radioValue, setRadioValue] = useState<RadioValue>('weekly')
  const [switcherChecked, setSwitcherChecked] = useState(true)
  const [selectValue, setSelectValue] = useState<SelectOption | null>(
    gallerySelectOptions[0] ?? null,
  )
  const [multiSelectValue, setMultiSelectValue] = useState<SelectOption[]>(
    gallerySelectOptions.slice(0, 2),
  )
  const [selectExtensionValue, setSelectExtensionValue] = useState<SelectOption | null>(
    gallerySelectOptions[1] ?? null,
  )
  const [countryQuery, setCountryQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<
    (typeof galleryTreeCountries)[number] | null
  >(null)
  const [tags, setTags] = useState<string[]>(['React', 'TypeScript'])
  const [sliderValue, setSliderValue] = useState(45)
  const [sliderRange, setSliderRange] = useState<SliderRangeValue>([20, 70])
  const [date, setDate] = useState<Date | null>(cardDate)
  const [dateRange, setDateRange] = useState<DatePickerRangeValue>([deliveryStart, deliveryEnd])
  const [dateTime, setDateTime] = useState<Date | null>(meetingTime)
  const [timeValue, setTimeValue] = useState<TimeInputValue>(meetingTime)
  const [timeRange, setTimeRange] = useState<TimeInputRangeValue>([meetingTime, meetingEndTime])
  const [editorHtml, setEditorHtml] = useState('<p>Draft copy with <strong>bold</strong> text.</p>')

  const selectedExtensionIcon =
    selectExtensionValue?.value === 'wearables' ? TbIcons.TbDeviceWatch : TbIcons.TbCategory

  return (
    <SectionShell slug="forms">
      <Demo
        title="Input - sizes"
        description="Small, medium and large text inputs."
        code={`<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />`}
      >
        <Demo.Stack>
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium" />
          <Input size="lg" placeholder="Large" />
        </Demo.Stack>
      </Demo>

      <Demo
        title="Input - affixes and states"
        code={`<Input prefix={<Icon as={TbIcons.TbSearch} />} placeholder="Search" />
<Input invalid defaultValue="not-an-email" />
<Input textArea rows={4} placeholder="Write a message" />`}
      >
        <Demo.Stack>
          <Input
            prefix={<Icon as={TbIcons.TbSearch} size={16} />}
            placeholder="Search"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <Input invalid defaultValue="not-an-email" aria-label="Invalid email" />
          <Input textArea rows={4} placeholder="Write a message" />
        </Demo.Stack>
      </Demo>

      <Demo
        title="DebounceInput"
        description="Change events are delayed until the user pauses typing."
        code={`<DebounceInput wait={1000} onChange={(event) => setValue(event.target.value)} />`}
      >
        <Demo.Stack>
          <DebounceInput
            wait={1000}
            placeholder="Search..."
            onChange={(event) => setDebouncedValue(event.target.value)}
          />
          <p className="text-sm text-content-muted">{debouncedValue || 'Waiting for input'}</p>
        </Demo.Stack>
      </Demo>

      <Demo
        title="PasswordInput"
        code={`<PasswordInput aria-label="Password" onVisibleChange={setVisible} />`}
      >
        <Demo.Stack>
          <PasswordInput aria-label="Password" onVisibleChange={setPasswordVisible} />
          <p className="text-xs text-content-muted">
            Password is {passwordVisible ? 'visible' : 'hidden'}
          </p>
        </Demo.Stack>
      </Demo>

      <Demo
        title="PatternInput"
        description="Card and code formatting via pattern masks."
        code={`<PatternInput
  format="#### #### #### ####"
  mask="_"
  onValueChange={(event) => setValue(event.value)}
/>`}
      >
        <Demo.Stack>
          <PatternInput
            aria-label="Card number"
            format="#### #### #### ####"
            mask="_"
            placeholder="Card number"
            value={patternValue}
            onValueChange={(event) => setPatternValue(event.value)}
          />
          <p className="text-xs text-content-muted">{patternValue || 'No card number'}</p>
        </Demo.Stack>
      </Demo>

      <Demo
        title="NumericInput"
        code={`<NumericInput
  thousandSeparator
  prefix="$"
  decimalScale={2}
  fixedDecimalScale
/>`}
      >
        <Demo.Stack>
          <NumericInput
            aria-label="Amount"
            thousandSeparator
            prefix="$"
            decimalScale={2}
            fixedDecimalScale
            value={numericValue}
            onValueChange={(event) => setNumericValue(event.value)}
          />
          <p className="text-xs text-content-muted">Raw value: {numericValue || '0'}</p>
        </Demo.Stack>
      </Demo>

      <Demo
        title="NumericInputStepper"
        code={`<Input
  readOnly
  suffix={<NumericInputStepper value={value} onChange={setValue} min={0} max={20} />}
/>`}
      >
        <Demo.Stack>
          <Input
            aria-label="Quantity"
            value={quantity}
            readOnly
            className="text-center"
            suffix={
              <NumericInputStepper value={quantity} onChange={setQuantity} min={0} max={20} />
            }
          />
        </Demo.Stack>
      </Demo>

      <Demo
        title="CustomFormatInput"
        code={`<CustomFormatInput
  format={(next) => formatCurrency(next)}
  onValueChange={(event) => setValue(event.value)}
/>`}
      >
        <Demo.Stack>
          <CustomFormatInput
            aria-label="Budget"
            value={customValue}
            format={formatCurrency}
            inputPrefix="USD"
            onValueChange={(event) => setCustomValue(event.value)}
          />
        </Demo.Stack>
      </Demo>

      <Demo title="OtpInput" code={`<OtpInput length={6} value={value} onChange={setValue} />`}>
        <Demo.Stack>
          <OtpInput
            length={6}
            value={otpValue}
            invalid={otpValue.length > 0 && otpValue.length < 6}
            onChange={setOtpValue}
          />
          <p className="text-xs text-content-muted">{otpValue || 'No code'}</p>
        </Demo.Stack>
      </Demo>

      <Demo
        title="Checkbox"
        description="Single, grouped and indeterminate selection."
        code={`<Checkbox checked={checked} onChange={setChecked}>Newsletter</Checkbox>
<Checkbox.Group value={value} onChange={setValue}>...</Checkbox.Group>`}
      >
        <Demo.Stack>
          <Checkbox checked={checked} onChange={setChecked}>
            Newsletter
          </Checkbox>
          <Checkbox indeterminate>Partially selected</Checkbox>
          <Checkbox.Group value={checkedList} onChange={setCheckedList}>
            <Checkbox value="Email">Email</Checkbox>
            <Checkbox value="SMS">SMS</Checkbox>
            <Checkbox value="Push">Push</Checkbox>
          </Checkbox.Group>
        </Demo.Stack>
      </Demo>

      <Demo
        title="Radio"
        code={`<Radio.Group value={value} onChange={setValue}>
  <Radio value="weekly">Weekly</Radio>
  <Radio value="monthly">Monthly</Radio>
</Radio.Group>`}
      >
        <Demo.Stack>
          <Radio.Group value={radioValue} onChange={setRadioValue} aria-label="Billing cadence">
            <Radio value="weekly">Weekly</Radio>
            <Radio value="monthly">Monthly</Radio>
            <Radio value="annual">Annual</Radio>
          </Radio.Group>
          <Radio.Group vertical value="monthly" aria-label="Vertical billing cadence">
            <Radio value="weekly">Weekly</Radio>
            <Radio value="monthly">Monthly</Radio>
          </Radio.Group>
        </Demo.Stack>
      </Demo>

      <Demo
        title="Switcher"
        code={`<Switcher checked={checked} onChange={setChecked} />
<Switcher defaultChecked checkedContent="On" unCheckedContent="Off" />`}
      >
        <Demo.Row>
          <Switcher
            checked={switcherChecked}
            onChange={setSwitcherChecked}
            aria-label="Notifications"
          />
          <Switcher defaultChecked checkedContent="On" unCheckedContent="Off" />
          <Switcher disabled aria-label="Disabled switcher" />
        </Demo.Row>
      </Demo>

      <Demo
        title="Select - basic and searchable"
        code={`<Select
  options={options}
  value={value}
  isSearchable
  onChange={setValue}
/>`}
      >
        <Demo.Grid>
          <Select
            options={gallerySelectOptions}
            value={selectValue}
            isSearchable
            aria-label="Category"
            onChange={setSelectValue}
          />
          <Select
            options={gallerySelectOptions}
            defaultValue={gallerySelectOptions[1]}
            invalid
            aria-label="Invalid category"
          />
        </Demo.Grid>
      </Demo>

      <Demo
        title="Select - sizes"
        code={`<Select options={options} size="sm" />
<Select options={options} size="md" />
<Select options={options} size="lg" />`}
      >
        <Demo.Stack>
          <Select options={gallerySelectOptions} size="sm" placeholder="Small" aria-label="Small" />
          <Select
            options={gallerySelectOptions}
            size="md"
            placeholder="Medium"
            aria-label="Medium"
          />
          <Select options={gallerySelectOptions} size="lg" placeholder="Large" aria-label="Large" />
        </Demo.Stack>
      </Demo>

      <Demo
        title="Select - multi"
        code={`<Select.Multi
  options={options}
  value={value}
  onChange={setValue}
/>`}
      >
        <Demo.Stack>
          <Select.Multi
            options={gallerySelectOptions}
            value={multiSelectValue}
            onChange={setMultiSelectValue}
            aria-label="Categories"
          />
          <p className="text-xs text-content-muted">
            {multiSelectValue.map((option) => option.label).join(', ') || 'none'}
          </p>
        </Demo.Stack>
      </Demo>

      <Demo
        title="SelectExtension"
        description="Custom select value and option rows with prefixed icons."
        code={`<SelectInputWithPrefix prefix={<Icon as={TbIcons.TbUser} />} label="Profile" />
<SelectOptionWithPrefix prefix={<Icon as={TbIcons.TbBell} />} label="Notifications" selected />`}
      >
        <Demo.Stack>
          <Select
            options={gallerySelectOptions}
            value={selectExtensionValue}
            onChange={setSelectExtensionValue}
            aria-label="Icon category"
          />
          <SelectInputWithPrefix
            prefix={<Icon as={selectedExtensionIcon} size={18} />}
            label={selectExtensionValue?.label}
          />
          <SelectOptionWithPrefix
            prefix={<Icon as={TbIcons.TbBell} size={18} />}
            label="Notifications"
            selected
            checkIcon={<Icon as={TbIcons.TbCircleCheck} size={18} />}
          />
        </Demo.Stack>
      </Demo>

      <Demo
        title="AutoComplete"
        code={`<AutoComplete
  data={countries}
  optionKey={(country) => country.name}
  onInputChange={setValue}
  onOptionSelected={setSelected}
/>`}
      >
        <Demo.Stack>
          <AutoComplete
            data={galleryTreeCountries}
            optionKey={(country) => country.name}
            value={countryQuery}
            onInputChange={setCountryQuery}
            onOptionSelected={setSelectedCountry}
            placeholder="Search countries..."
            aria-label="Country"
            renderOption={(country) => (
              <span className="flex items-center justify-between gap-3">
                <span className="font-medium">{country.name}</span>
                <span className="text-content-muted">{country.code}</span>
              </span>
            )}
          />
          <p className="text-sm text-content-muted">
            {selectedCountry ? `Selected: ${selectedCountry.name}` : 'No country selected'}
          </p>
        </Demo.Stack>
      </Demo>

      <Demo
        title="MultiValueInput"
        code={`<MultiValueInput
  value={tags}
  onChange={setTags}
  placeholder="Type and press Enter"
/>`}
      >
        <Demo.Stack>
          <MultiValueInput value={tags} onChange={setTags} placeholder="Add skills..." />
          <MultiValueInput
            defaultValue={['user@example.com']}
            placeholder="Enter email addresses..."
            validate={(tag) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(tag)}
          />
        </Demo.Stack>
      </Demo>

      <Demo
        title="InputGroup"
        code={`<InputGroup>
  <InputGroup.Addon>https://</InputGroup.Addon>
  <Input placeholder="project" />
  <Button variant="solid">Create</Button>
</InputGroup>`}
      >
        <Demo.Stack>
          <InputGroup>
            <InputGroup.Addon>https://</InputGroup.Addon>
            <Input aria-label="Project URL" placeholder="project" />
            <Button variant="solid">Create</Button>
          </InputGroup>
          <InputGroup>
            <Input prefix={<Icon as={TbIcons.TbMicrophone} size={16} />} aria-label="Message" />
            <Button icon={<Icon as={TbIcons.TbSend} size={16} />} aria-label="Send" />
          </InputGroup>
        </Demo.Stack>
      </Demo>

      <Demo
        title="Slider - value and range"
        code={`<Slider value={value} onChange={setValue} />
<Slider.Range value={range} onChange={setRange} />`}
      >
        <Demo.Stack>
          <Slider value={sliderValue} onChange={setSliderValue} thumbAriaLabel="Volume" />
          <p className="text-sm text-content-muted">Slider value: {sliderValue}</p>
          <Slider.Range value={sliderRange} onChange={setSliderRange} />
        </Demo.Stack>
      </Demo>

      <Demo
        title="Slider - marks and tooltips"
        code={`<Slider
  defaultValue={50}
  marks={marks}
  showTooltipOnHover
  tooltip={(value) => \`\${value}%\`}
/>`}
      >
        <Demo.Stack>
          <Slider
            defaultValue={50}
            marks={sliderMarks}
            showTooltipOnHover
            tooltip={(value) => `${value}%`}
          />
          <Slider defaultValue={25} step={25} marks={sliderMarks} />
        </Demo.Stack>
      </Demo>

      <Demo
        title="DatePicker - controlled"
        code={`<DatePicker value={date} onChange={setDate} />
<DatePicker.DatePickerRange value={range} onChange={setRange} />`}
      >
        <Demo.Stack>
          <DatePicker placeholder="Pick a date" value={date} onChange={setDate} />
          <DatePicker.DatePickerRange
            placeholder="Select dates range"
            value={dateRange}
            onChange={setDateRange}
          />
        </Demo.Stack>
      </Demo>

      <Demo
        title="DatePicker - date time and affixes"
        code={`<DatePicker.DateTimepicker value={value} onChange={setValue} />
<DatePicker inputPrefix={<Icon as={TbIcons.TbCalendar} />} />`}
      >
        <Demo.Stack>
          <DatePicker.DateTimepicker
            placeholder="Pick date and time"
            value={dateTime}
            onChange={setDateTime}
          />
          <DatePicker
            defaultValue={cardDate}
            inputPrefix={<Icon as={TbIcons.TbCalendar} size={16} />}
            inputSuffix={null}
          />
        </Demo.Stack>
      </Demo>

      <Demo
        title="TimeInput"
        code={`<TimeInput value={value} onChange={setValue} />
<TimeInput.TimeInputRange value={range} onChange={setRange} />`}
      >
        <Demo.Stack>
          <TimeInput value={timeValue} onChange={setTimeValue} />
          <TimeInput.TimeInputRange value={timeRange} onChange={setTimeRange} />
          <TimeInput
            defaultValue={meetingTime}
            format="12"
            prefix={<Icon as={TbIcons.TbClockHour4} size={16} />}
          />
        </Demo.Stack>
      </Demo>

      <Demo
        title="Upload"
        code={`<Upload draggable uploadLimit={3} tip="Up to 3 files." />
<Upload accept="image/*" tip="Images only." />`}
      >
        <Demo.Grid>
          <Upload tip="PNG, JPG or PDF up to 5MB." />
          <Upload draggable uploadLimit={3} tip="Up to 3 files." />
        </Demo.Grid>
      </Demo>

      <Demo
        title="Form"
        description="Form.Item labels, errors, helper text and submit layout."
        code={`<Form onSubmit={(event) => event.preventDefault()}>
  <Form.Item label="Name" htmlFor="name" asterisk>
    <Input id="name" />
  </Form.Item>
</Form>`}
      >
        <Demo.Stack>
          <Form onSubmit={(event) => event.preventDefault()}>
            <Form.Item label="Name" htmlFor="gallery-name" asterisk>
              <Input id="gallery-name" placeholder="Ada Lovelace" />
            </Form.Item>
            <Form.Item
              label="Email"
              htmlFor="gallery-email"
              errorMessage="Enter a valid email address."
            >
              <Input id="gallery-email" invalid defaultValue="not-an-email" />
            </Form.Item>
            <Form.Item label="Role" htmlFor="gallery-role" extra="Optional">
              <Select
                id="gallery-role"
                options={[
                  { label: 'Engineer', value: 'eng' },
                  { label: 'Designer', value: 'design' },
                ]}
                aria-label="Role"
              />
            </Form.Item>
            <Button variant="solid" type="submit">
              Save
            </Button>
          </Form>
        </Demo.Stack>
      </Demo>

      <Demo
        title="Dropdown"
        code={`<Dropdown renderTitle={<Button>Actions</Button>}>
  <Dropdown.Item eventKey="profile">Profile</Dropdown.Item>
  <Dropdown.Menu title="More">...</Dropdown.Menu>
</Dropdown>`}
      >
        <Demo.Row>
          <Dropdown renderTitle={<Button>Actions</Button>}>
            <Dropdown.Item eventKey="profile">Profile</Dropdown.Item>
            <Dropdown.Item eventKey="settings">Settings</Dropdown.Item>
            <Dropdown.Item variant="divider" />
            <Dropdown.Item eventKey="logout">Logout</Dropdown.Item>
          </Dropdown>
          <Dropdown title="More">
            <Dropdown.Item>Item 1</Dropdown.Item>
            <Dropdown.Menu title="Nested">
              <Dropdown.Item active>Item 2.1</Dropdown.Item>
              <Dropdown.Item>Item 2.2</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Demo.Row>
      </Demo>

      <Demo
        title="RichTextEditor"
        code={`<RichTextEditor
  value={html}
  onChange={setHtml}
  placeholder="Start typing..."
/>`}
      >
        <div className="w-full max-w-2xl space-y-2">
          <RichTextEditor
            value={editorHtml}
            onChange={setEditorHtml}
            placeholder="Start typing..."
          />
          <pre className="overflow-auto rounded-md bg-surface p-2 text-xs text-content-muted">
            {editorHtml}
          </pre>
        </div>
      </Demo>

      <Demo title="Input - disabled" code={`<Input disabled defaultValue="Read only" />`}>
        <Demo.Stack>
          <Input disabled defaultValue="Read only" />
          <PasswordInput disabled defaultValue="secret" aria-label="Disabled password" />
          <Button icon={<Icon as={HiIcons.HiOutlineLockClosed} size={16} />}>
            Locked field set
          </Button>
        </Demo.Stack>
      </Demo>
    </SectionShell>
  )
}
