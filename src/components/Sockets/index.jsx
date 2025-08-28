"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

const mockData = [
  {
    id: "S001",
    region: "North",
    date: "2024-05-01",
    sessions: 120,
    kwh: 340,
  },
  {
    id: "S002",
    region: "South",
    date: "2024-05-10",
    sessions: 90,
    kwh: 280,
  },
  {
    id: "S003",
    region: "East",
    date: "2024-06-02",
    sessions: 140,
    kwh: 420,
  },
  {
    id: "S004",
    region: "West",
    date: "2024-06-15",
    sessions: 100,
    kwh: 310,
  },
];

const Sockets = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredData = mockData.filter((socket) =>
    socket.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-1 flex-col p-6 gap-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold">Socket Management Page</h1>
        <p className="text-muted-foreground">
          Review your sockets here. Stay updated on status and view detailed
          issues for each socket.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Sockets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">450</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Sockets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">390</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total kWh Consumed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12,400</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">8,230</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="table" className="w-full">
        <TabsList>
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>

        {/* Table Tab */}
        <TabsContent value="table">
          {/* Search */}
          <div className="flex justify-between items-center py-4">
            <Input
              placeholder="Search by Socket ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Socket Id</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Installation Date</TableHead>
                  <TableHead>Sessions</TableHead>
                  <TableHead>kWh Consumed</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((socket) => (
                  <TableRow key={socket.id}>
                    <TableCell>{socket.id}</TableCell>
                    <TableCell>{socket.region}</TableCell>
                    <TableCell>{socket.date}</TableCell>
                    <TableCell>{socket.sessions}</TableCell>
                    <TableCell>{socket.kwh}</TableCell>
                    <TableCell>
                      <Button asChild variant="outline" size="sm">
                        <a
                          href={`/sockets/${socket.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Details
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No sockets found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Map Tab */}
        <TabsContent value="map">
          <div className="flex items-center justify-center h-64 border rounded-md">
            <p className="text-muted-foreground">Map view coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Sockets;
