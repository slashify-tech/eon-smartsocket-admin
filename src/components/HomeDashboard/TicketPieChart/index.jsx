"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector, Cell } from "recharts"

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

export const description = "Tickets distribution chart"

const chartConfig = {
  open: { label: "Open", color: "#DDCE24" },
  resolved: { label: "Resolved", color: "#256670" },
  others: { label: "Others", color: "#256670" },
}

const TicketsPieChart = ({ title = "Tickets", data, description }) => {
  const id = "tickets-pie"
  const [timeRange, setTimeRange] = React.useState("last_10_days")
  const [region, setRegion] = React.useState("all")
  const [activeName, setActiveName] = React.useState(data[0]?.name ?? "")

  const activeIndex = React.useMemo(
    () => data.findIndex((item) => item.name === activeName),
    [activeName, data]
  )

  const hasData = data && data.length > 0
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />

      {/* Header */}
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>

        {/* Filters */}
        <div className="flex gap-2 ml-auto">
          {/* Time Range */}
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="h-7 w-[130px] rounded-lg pl-2.5">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl">
              <SelectItem value="last_10_days">Last 10 Days</SelectItem>
              <SelectItem value="last_week">Last Week</SelectItem>
              <SelectItem value="last_month">Last Month</SelectItem>
            </SelectContent>
          </Select>

          {/* Region */}
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="h-7 w-[130px] rounded-lg pl-2.5">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="north">North</SelectItem>
              <SelectItem value="south">South</SelectItem>
              <SelectItem value="east">East</SelectItem>
              <SelectItem value="west">West</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
                activeShape={({ outerRadius = 0, ...props }) => (
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
                            {total}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Tickets
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
          <div className="flex items-center justify-center h-[250px] text-gray-400 font-bold text-lg">
            No Results
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default TicketsPieChart
