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
import { Download, MoreHorizontal, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import AddUserModal from "./AddUserModal";

const mockUsers = [
  {
    id: "U001",
    name: "John Doe",
    contact: "+91 9876543210",
    email: "john@example.com",
    rfid: "RF12345",
    region: "North Block",
    status: "Active",
  },
  {
    id: "U002",
    name: "Jane Smith",
    contact: "+91 9988776655",
    email: "jane@example.com",
    rfid: "RF67890",
    region: "East Block",
    status: "Inactive",
  },
  {
    id: "U003",
    name: "Amit Kumar",
    contact: "+91 9123456789",
    email: "amitk@example.com",
    rfid: "RF11223",
    region: "South Block",
    status: "Active",
  },
  {
    id: "U004",
    name: "Sara Ali",
    contact: "+91 9345678901",
    email: "sara@example.com",
    rfid: "RF44556",
    region: "West Block",
    status: "Inactive",
  },
  {
    id: "U005",
    name: "Michael Johnson",
    contact: "+1 2025550199",
    email: "michaelj@example.com",
    rfid: "RF77889",
    region: "North Block",
    status: "Active",
  },
  {
    id: "U006",
    name: "Priya Sharma",
    contact: "+91 9098765432",
    email: "priya@example.com",
    rfid: "RF33445",
    region: "East Block",
    status: "Inactive",
  },
  {
    id: "U007",
    name: "David Brown",
    contact: "+44 7700 900123",
    email: "davidb@example.com",
    rfid: "RF66778",
    region: "South Block",
    status: "Active",
  },
  {
    id: "U008",
    name: "Emily Davis",
    contact: "+1 3035550144",
    email: "emilyd@example.com",
    rfid: "RF99001",
    region: "West Block",
    status: "Inactive",
  },
  {
    id: "U009",
    name: "Ravi Patel",
    contact: "+91 9988774411",
    email: "ravi@example.com",
    rfid: "RF22334",
    region: "North Block",
    status: "Active",
  },
];
const Users = () => {
  const [region, setRegion] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const usersPerPage = 10;
  const totalPages = Math.ceil(mockUsers.length / usersPerPage);
  const startIndex = (page - 1) * usersPerPage;
  const paginatedUsers = mockUsers.slice(startIndex, startIndex + usersPerPage);

  return (
    <div className="flex flex-1 flex-col p-6 gap-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">User Management</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="cursor-pointer">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="cursor-pointer" onClick={() => setOpenModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New User
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Input placeholder="Search users..." className="max-w-xs" />
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
        <Select onValueChange={setStatus}>
          <SelectTrigger className="w-[180px] cursor-pointer">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table in Card */}
      <Card className="rounded-2xl shadow-sm">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>RFID</TableHead>
                <TableHead>Region/Block</TableHead>
                <TableHead>Session Activity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.contact}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.rfid}</TableCell>
                  <TableCell>{user.region}</TableCell>
                  <TableCell>
                    <Button
                      variant="link"
                      className="p-0 text-blue-600 cursor-pointer"
                    >
                      View Activity
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "Active" ? "default" : "secondary"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 cursor-pointer"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Action</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {user.status === "Active" ? (
                          <DropdownMenuItem className="cursor-pointer">
                            Deactivate
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="cursor-pointer">
                            Activate
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center mt-4 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum}
                </Button>
              )
            )}
          </div>
        </CardContent>
      </Card>
      <AddUserModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Users;
