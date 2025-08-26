"use client";

import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444", "#8b5cf6"];

const TicketsPieChart = ({ title, data }) => {
  const [timeRange, setTimeRange] = useState("last_10_days");
  const [region, setRegion] = useState("all");

  const hasData = data && data.length > 0;

  return (
    <Card className="rounded-2xl shadow-sm">
      {/* Header with dropdowns */}
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>{title}</CardTitle>
        <div className="flex gap-2">
          {/* Time Range Dropdown */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border rounded-lg px-2 py-1 text-sm"
          >
            <option value="last_10_days">Last 10 Days</option>
            <option value="last_week">Last Week</option>
            <option value="last_month">Last Month</option>
          </select>

          {/* Region Dropdown */}
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="border rounded-lg px-2 py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="north">North</option>
            <option value="south">South</option>
            <option value="east">East</option>
            <option value="west">West</option>
          </select>
        </div>
      </CardHeader>

      {/* Chart or No Results */}
      <CardContent className="flex items-center justify-center h-[300px]">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <span className="text-gray-400 font-bold text-lg">No Results</span>
        )}
      </CardContent>
    </Card>
  );
};

export default TicketsPieChart;
