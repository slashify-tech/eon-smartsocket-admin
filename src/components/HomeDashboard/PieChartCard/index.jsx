"use client"

import * as React from "react"
import { Cell, Label, Pie, PieChart, Sector } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const PieChartCard = ({ title, description, data }) => {
  const id = "pie-interactive"
  const hasData = data && data.length > 0

  // build config dynamically from data
  const chartConfig = data.reduce((acc, item, index) => {
    acc[item.name.toLowerCase()] = {
      label: item.name,
      color: `var(--chart-${(index % 5) + 1})`,
    }
    return acc
  }, {})

  // active slice state
  const [activeName, setActiveName] = React.useState(
    hasData ? data[0].name : ""
  )

  const activeIndex = React.useMemo(
    () => data.findIndex((item) => item.name === activeName),
    [activeName, data]
  )

  const names = React.useMemo(() => data.map((item) => item.name), [data])

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />

      {/* Header */}
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>

        {/* Dropdown to change active slice */}
        {hasData && (
          <Select value={activeName} onValueChange={setActiveName}>
            <SelectTrigger
              className="ml-auto h-7 w-[150px] rounded-lg pl-2.5"
              aria-label="Select a slice"
            >
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl">
              {names.map((key, idx) => {
                const config = chartConfig[key.toLowerCase()]
                return (
                  <SelectItem
                    key={key}
                    value={key}
                    className="rounded-lg [&_span]:flex"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className="flex h-3 w-3 shrink-0 rounded-xs"
                        style={{
                          backgroundColor: config?.color,
                        }}
                      />
                      {config?.label}
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        )}
      </CardHeader>

      {/* Chart */}
      <CardContent className="flex flex-1 justify-center pb-0">
        {hasData ? (
          <ChartContainer
            id={id}
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={activeIndex}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                    <Sector
                      {...props}
                      outerRadius={outerRadius + 25}
                      innerRadius={outerRadius + 12}
                    />
                  </g>
                )}
              >
                {data.map((entry, index) => {
                    const key = entry.name.toLowerCase() // e.g. "open" or "resolved"
                    const color = chartConfig[key]?.color || "#ccc" // fallback grey
                    return <Cell key={`cell-${index}`} fill={color} />
                  })}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      const activeValue = data[activeIndex]?.value ?? 0
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {activeValue.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            {activeName}
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <span className="text-gray-400 font-bold text-lg">No Results</span>
        )}
      </CardContent>
    </Card>
  )
}

export default PieChartCard
