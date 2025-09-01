"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockSessions = [
  { id: "SE001", user: "John Doe", rfid: "RF1234", status: "In Session" },
  { id: "SE002", user: "Jane Smith", rfid: "RF5678", status: "Completed" },
  { id: "SE003", user: "Michael Lee", rfid: "RF9876", status: "Failed" },
  { id: "SE004", user: "Emma Wilson", rfid: "RF3456", status: "Completed" },
];

const SocketDetails = ({ socketId = "S001" }) => {
  const [search, setSearch] = useState("");

  const filteredSessions = mockSessions.filter(
    (session) =>
      session.id.toLowerCase().includes(search.toLowerCase()) ||
      session.user.toLowerCase().includes(search.toLowerCase()) ||
      session.rfid.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "In Session":
        return <Badge className="bg-blue-500 hover:bg-blue-600">In Session</Badge>;
      case "Completed":
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
      case "Failed":
        return <Badge className="bg-red-500 hover:bg-red-600">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col p-6 gap-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold">Socket Details - {socketId}</h1>
        <p className="text-muted-foreground">Review session details for this socket.</p>
      </div>

      {/* Search */}
      <div className="flex justify-between items-center py-2">
        <Input
          placeholder="Search by Session ID, User, or RFID"
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
              <TableHead>Session Id</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>RFID</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>{session.id}</TableCell>
                <TableCell>{session.user}</TableCell>
                <TableCell>{session.rfid}</TableCell>
                <TableCell>{getStatusBadge(session.status)}</TableCell>
              </TableRow>
            ))}
            {filteredSessions.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No sessions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SocketDetails;
