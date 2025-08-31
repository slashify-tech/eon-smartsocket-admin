"use client";

import LineChartCard from "./LineChartGraph";
import StatsCard from "./StatsCard";
import PieChartCard from "./PieChartCard";
import TicketsPieChart from "./TicketPieChart";
import { Card } from "@/components/ui/card";
import ActivePolesCard from "./ActivePolesCard";
import Announcement from "./Announcement";
import { useTranslations } from "next-intl";

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

// Example socket poles data
const socketPoles = [
  { id: "S-001", location: "North Zone", status: "Online", sessions: 12 },
  { id: "S-002", location: "East Zone", status: "In Session", sessions: 8 },
  { id: "S-003", location: "South Zone", status: "Maintenance", sessions: 0 },
  { id: "S-004", location: "West Zone", status: "Offline", sessions: 0 },
];

const announcements = [
  { title: "System maintenance scheduled", date: "Aug 25, 2025" },
  { title: "New socket pole installed in East Zone", date: "Aug 20, 2025" },
  { title: "Mobile app update v2.3 released", date: "Aug 15, 2025" },
  { title: "Quarterly performance report published", date: "Aug 10, 2025" },
  { title: "New customer support hotline launched", date: "Aug 05, 2025" },
  { title: "Scheduled downtime for database upgrade", date: "Jul 28, 2025" },
  { title: "Employee town hall meeting announced", date: "Jul 20, 2025" },
  { title: "New billing portal launched", date: "Jul 15, 2025" },
  { title: "Security patch applied successfully", date: "Jul 10, 2025" },
  { title: "Partnership with Green Energy Co. signed", date: "Jul 01, 2025" },
];


const HomeDashboard = () => {
  const t = useTranslations();
  return (
    <div className="flex flex-1 gap-6 flex-col p-6 bg-gradient-to-b">
      {/* Stats cards row */}
      <StatsCard />

      {/* Line Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2" dir="ltr">
        <LineChartCard
          title={t('homeDashboard.totalRevenue')}
          data={usageData}
          xKey="year"
          yKey="price"
          lineColor="#2563eb"
        />
        <LineChartCard
          title={t('homeDashboard.usageOverTime')}
          data={revenueData}
          xKey="month"
          yKey="price"
          lineColor="#16a34a"
        />
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2" dir="ltr">
        <TicketsPieChart title={t('homeDashboard.ticketsDistribution')} data={ticketsData} />
        <PieChartCard title={t('homeDashboard.usageByRegion')} data={regionData} />
      </div>

      {/* Map + Active Sockets Table */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2" dir="ltr">
        {/* Map View Placeholder */}
        <Card className="rounded-2xl shadow-sm h-[400px] flex items-center justify-center text-gray-400">
          Map View (Integration Placeholder)
        </Card>

        {/* Active Sockets Table */}
        <ActivePolesCard socketPoles={socketPoles} />
      </div>
      <Announcement announcements={announcements} />
    </div>
  );
};

export default HomeDashboard;
