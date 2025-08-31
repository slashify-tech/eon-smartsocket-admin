"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const LineChartCard = ({
  title,
  data,
  xKey,
  yKey,
  lineColor = "var(--chart-1)",
  price,
  description = "",
  footerNote = "Showing results for the selected period",
}) => {
  const hasData = data && data.length > 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {title}
          {price && (
            <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
              <img src="/images/icons/SAR.svg" alt="sar" className="w-4 h-4" />
              {price}
            </span>
          )}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent>
        {hasData ? (
          <ChartContainer
            config={{
              [yKey]: {
                label: title,
                color: lineColor,
              },
            }}
          >
            <LineChart
              accessibilityLayer
              data={data}
              margin={{
                top: 20,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={xKey}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey={yKey}
                type="natural"
                stroke={lineColor}
                strokeWidth={2}
                dot={{
                  fill: lineColor,
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ChartContainer>
        ) : (
          <span className="text-gray-400 font-bold text-lg flex justify-center items-center h-[200px]">
            No Results
          </span>
        )}
      </CardContent>

      {hasData && (
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Trending up this period <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">{footerNote}</div>
        </CardFooter>
      )}
    </Card>
  )
}

export default LineChartCard
