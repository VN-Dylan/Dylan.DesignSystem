import { useMemo, useState } from 'react'
import {
  Badge,
  Calendar,
  Chart,
  FullCalendar,
  GanttChart,
  Histogram,
  RangeCalendar,
  VectorMap,
  type CalendarRangeValue,
  type CalendarValue,
} from '@vn-dylan/ui'
import { Demo } from '@/views/gallery/components/Demo'
import { SectionShell } from '@/views/gallery/sections/SectionShell'
import {
  galleryCalendarEvents,
  galleryChart,
  galleryGanttTasks,
  galleryHistogram,
  galleryProducts,
  galleryTreeCountries,
} from '@/mock/gallery'

const galleryMonth = new Date(2026, 8, 1)

/** Data Viz category page with chart, calendar, map and timeline visualisation demos. */
export function DataVizSection() {
  const [calendarValue, setCalendarValue] = useState<CalendarValue>(new Date(2026, 8, 12))
  const [rangeValue, setRangeValue] = useState<CalendarRangeValue>([
    new Date(2026, 8, 8),
    new Date(2026, 8, 12),
  ])
  const [selectedRegion, setSelectedRegion] = useState('US')

  const categoryBreakdown = useMemo(() => {
    const totals = galleryProducts.reduce<Record<string, number>>((acc, product) => {
      acc[product.category] = (acc[product.category] ?? 0) + product.price
      return acc
    }, {})

    return {
      labels: Object.keys(totals),
      series: Object.values(totals),
    }
  }, [])

  const mapData = useMemo(
    () =>
      galleryTreeCountries.reduce<Record<string, number>>((acc, country) => {
        acc[country.code] = country.value
        return acc
      }, {}),
    [],
  )

  return (
    <SectionShell slug="data-viz">
      <Demo
        title="Chart - area and bar"
        description="ApexCharts-backed series with minimal options."
        code={`<Chart
  type="area"
  categories={galleryChart.categories}
  series={galleryChart.series}
/>
<Chart type="bar" categories={months} series={[orders]} />`}
      >
        <Demo.Grid>
          <Chart
            type="area"
            height={260}
            categories={galleryChart.categories}
            series={galleryChart.series}
          />
          <Chart
            type="bar"
            height={260}
            categories={galleryChart.categories.slice(0, 6)}
            series={[galleryChart.series[1]!]}
          />
        </Demo.Grid>
      </Demo>

      <Demo
        title="Chart - donut"
        description="Category totals derived from deterministic product mock data."
        code={`<Chart
  type="donut"
  series={[1189, 730, 145, 339]}
  options={{ labels: ['Laptops', 'Wearables', 'Bags', 'Accessories'] }}
/>`}
      >
        <div className="w-full max-w-sm">
          <Chart
            type="donut"
            height={260}
            series={categoryBreakdown.series}
            options={{ labels: categoryBreakdown.labels }}
          />
        </div>
      </Demo>

      <Demo
        title="Histogram"
        description="Buckets static sample values into a bar-chart distribution."
        code={`<Histogram data={galleryHistogram} bins={8} height={260} />`}
      >
        <div className="w-full max-w-2xl">
          <Histogram data={galleryHistogram} bins={8} height={260} />
        </div>
      </Demo>

      <Demo
        title="GanttChart"
        description="Task bars positioned across a shared deterministic date range."
        code={`<GanttChart tasks={galleryGanttTasks} unit="day" />`}
      >
        <div className="w-full overflow-x-auto">
          <GanttChart tasks={galleryGanttTasks} unit="day" />
        </div>
      </Demo>

      <Demo
        title="VectorMap - choropleth"
        description="World map data keyed by ISO region code."
        code={`<VectorMap
  data={{ US: 128, GB: 74, DE: 61 }}
  height={360}
  onRegionClick={setSelectedRegion}
/>`}
      >
        <Demo.Stack>
          <VectorMap
            data={mapData}
            height={360}
            onRegionClick={setSelectedRegion}
            aria-label="Gallery adoption by country"
          />
          <p className="text-sm text-content-muted">Selected region: {selectedRegion}</p>
        </Demo.Stack>
      </Demo>

      <Demo
        title="Calendar - selected and custom day"
        code={`<Calendar
  value={value}
  defaultMonth={new Date(2026, 8, 1)}
  renderDay={(date) => <span>{date.getDate()}</span>}
  onChange={setValue}
/>`}
      >
        <Calendar
          value={calendarValue}
          defaultMonth={galleryMonth}
          disabledDate={(date) => [7, 21].includes(date.getDate())}
          dayClassName={(date, { selected }) => {
            if (selected) return 'text-primary-fg'
            if (date.getDate() === 15) return 'text-error'
            return 'text-content'
          }}
          renderDay={(date) => {
            const day = date.getDate()
            if (day !== 15) return <span>{day}</span>
            return (
              <span className="relative flex h-full w-full items-center justify-center">
                {day}
                <Badge className="absolute bottom-1" innerClass="h-1 w-1" />
              </span>
            )
          }}
          onChange={setCalendarValue}
        />
      </Demo>

      <Demo
        title="Calendar - range"
        description="RangeCalendar shares the Calendar navigation and day grid."
        code={`<RangeCalendar
  value={range}
  defaultMonth={new Date(2026, 8, 1)}
  onChange={setRange}
/>`}
      >
        <RangeCalendar value={rangeValue} defaultMonth={galleryMonth} onChange={setRangeValue} />
      </Demo>

      <Demo
        title="FullCalendar"
        description="Month grid with deterministic events from mock data."
        code={`<FullCalendar
  defaultMonth={new Date(2026, 8, 1)}
  events={galleryCalendarEvents}
  firstDayOfWeek="monday"
/>`}
      >
        <div className="w-full overflow-x-auto">
          <FullCalendar
            defaultMonth={galleryMonth}
            events={galleryCalendarEvents}
            firstDayOfWeek="monday"
          />
        </div>
      </Demo>
    </SectionShell>
  )
}
