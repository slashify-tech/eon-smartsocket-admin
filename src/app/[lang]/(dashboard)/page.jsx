import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

import data from "./data.json";
import HomeDashboard from "@/components/HomeDashboard";

export default async function Page({ params }) {
  const { lang } = await params;
  return (
    <>
      <HomeDashboard />
      
    </>
  );
}
