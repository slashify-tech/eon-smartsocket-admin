"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const LineChartCard = ({ title, data, xKey, yKey, lineColor = "#2563eb", price }) => {
  const hasData = data && data.length > 0;

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {title}
          {price && (
            <span className="flex items-center gap-1 text-sm font-medium text-gray-600">
              <img src="/images/icons/SAR.svg" alt="sar" className="w-4 h-4" />
              {price}
            </span>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-center h-[300px]">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={yKey}
                stroke={lineColor}
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <span className="text-gray-400 font-bold text-lg">No Results</span>
        )}
      </CardContent>
    </Card>
  );
};

export default LineChartCard;
