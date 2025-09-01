"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockSessions = [
  {
    id: "S001",
    user: "John Doe",
    socketId: "SKT-1001",
    rfid: "RF12345",
    region: "North Block",
    startTime: "2025-08-24 10:00 AM",
    endTime: "2025-08-24 11:15 AM",
    kwh: 5.2,
    cost: "120",
    status: "Completed",
  },
  {
    id: "S002",
    user: "Jane Smith",
    socketId: "SKT-1002",
    rfid: "RF67890",
    region: "East Block",
    startTime: "2025-08-25 02:30 PM",
    endTime: "-",
    kwh: 2.4,
    cost: "-",
    status: "In Session",
  },
  {
    id: "S003",
    user: "Amit Kumar",
    socketId: "SKT-1003",
    rfid: "RF11223",
    region: "South Block",
    startTime: "2025-08-23 09:00 AM",
    endTime: "2025-08-23 09:45 AM",
    kwh: 3.8,
    cost: "90",
    status: "Completed",
  },
];

const Sessions = () => {
  const [region, setRegion] = useState("");
  const [status, setStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  return (
    <div className="flex flex-1 flex-col p-6 gap-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Session Management</h2>
        <Button variant="outline" className="cursor-pointer">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <Input placeholder="Search sessions..." className="max-w-xs" />

        {/* Region Filter */}
        <Select onValueChange={setRegion}>
          <SelectTrigger className="w-[180px] cursor-pointer">
            <SelectValue placeholder="Select Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="north">North Block</SelectItem>
            <SelectItem value="east">East Block</SelectItem>
            <SelectItem value="south">South Block</SelectItem>
            <SelectItem value="west">West Block</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select onValueChange={setStatus}>
          <SelectTrigger className="w-[180px] cursor-pointer">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="in-session">In Session</SelectItem>
          </SelectContent>
        </Select>

        {/* Date Filters */}
        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
          <span>-</span>
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <Card className="rounded-2xl shadow-sm">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Session ID</TableHead>
                <TableHead>User Name</TableHead>
                <TableHead>Socket ID</TableHead>
                <TableHead>RFID</TableHead>
                <TableHead>Region/Block</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Kwh Consumed</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>{session.id}</TableCell>
                  <TableCell>{session.user}</TableCell>
                  <TableCell>{session.socketId}</TableCell>
                  <TableCell>{session.rfid}</TableCell>
                  <TableCell>{session.region}</TableCell>
                  <TableCell>{session.startTime}</TableCell>
                  <TableCell>{session.endTime}</TableCell>
                  <TableCell>{session.kwh}</TableCell>
                  <TableCell>{session.cost}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        session.status === "Completed"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {session.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sessions;
