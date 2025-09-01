"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockInvoices = [
  { id: "INV001", user: "John Doe", period: "07/2025", kwh: 320, cost: "$120", region: "North" },
  { id: "INV002", user: "Jane Smith", period: "07/2025", kwh: 450, cost: "$160", region: "South" },
  { id: "INV003", user: "Michael Lee", period: "06/2025", kwh: 290, cost: "$110", region: "East" },
  { id: "INV004", user: "Emma Wilson", period: "06/2025", kwh: 500, cost: "$180", region: "West" },
];

const Invoices = () => {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");

  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(search.toLowerCase()) ||
      invoice.user.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = region === "all" || invoice.region === region;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="flex flex-1 flex-col p-6 gap-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold">Invoices Management Page</h1>
        <p className="text-muted-foreground">Review your Invoices here.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex gap-4 items-center">
          <Input
            placeholder="Search by Invoice ID or User"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />

          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="North">North</SelectItem>
              <SelectItem value="South">South</SelectItem>
              <SelectItem value="East">East</SelectItem>
              <SelectItem value="West">West</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline">Export</Button>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice Id</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Billing Period</TableHead>
              <TableHead>kWh Consumed</TableHead>
              <TableHead>Total Cost</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.user}</TableCell>
                <TableCell>{invoice.period}</TableCell>
                <TableCell>{invoice.kwh}</TableCell>
                <TableCell>{invoice.cost}</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Invoice
                  </Button>
                  <Button variant="secondary" size="sm">
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredInvoices.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No invoices found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Invoices;
