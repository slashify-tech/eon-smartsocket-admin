"use client";

import LineChartCard from "./LineChartGraph";
import StatsCard from "./StatsCard";
import PieChartCard from "./PieChartCard";
import TicketsPieChart from "./TicketPieChart";

const usageData = [
  { year: "2019", price: 200 },
  { year: "2020", price: 400 },
  { year: "2021", price: 650 },
  { year: "2022", price: 900 },
  { year: "2023", price: 1200 },
];

const revenueData = [
  { month: "Jan", price: 120 },
  { month: "Feb", price: 180 },
  { month: "Mar", price: 250 },
  { month: "Apr", price: 220 },
  { month: "May", price: 300 },
  { month: "Jun", price: 400 },
];

const ticketsData = [
  { name: "Open", value: 120 },
  { name: "Resolved", value: 300 },
];

const regionData = [
  { name: "North America", value: 400 },
  { name: "Europe", value: 300 },
  { name: "Asia", value: 300 },
  { name: "South America", value: 200 },
];

const HomeDashboard = () => {
  return (
    <div className="flex flex-1 gap-6 flex-col p-6 bg-gradient-to-b">
      {/* Stats cards row */}
      <StatsCard />

      {/* Line Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2" dir='ltr'>
        <LineChartCard
          title="Usage Over Time"
          data={usageData}
          xKey="year"
          yKey="price"
          lineColor="#2563eb"
        />
        <LineChartCard
          title="Monthly Revenue"
          data={revenueData}
          xKey="month"
          yKey="price"
          lineColor="#16a34a"
        />
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2" dir='ltr'>
        <TicketsPieChart title="Tickets Distribution" data={ticketsData} />
        <PieChartCard title="Usage by Region" data={regionData} />
      </div>
    </div>
  );
};

export default HomeDashboard;
