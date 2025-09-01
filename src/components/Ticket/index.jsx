"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye } from "lucide-react"
import TicketModal from "./TicketModal"

const mockTickets = [
  {
    id: "T001",
    rfid: "RF123",
    user: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    region: "North",
    type: "Billing",
    date: "2025-08-01",
    dateCreated: "2025-08-01",
    status: "pending",
    title: "Billing Issue",
    description: "Invoice generated incorrectly",
    file: { name: "invoice.pdf", url: "/files/invoice.pdf" },
    comments: [{ id: 1, text: "Initial complaint", author: "John", date: "2025-08-01" }],
  },
  {
    id: "T002",
    rfid: "RF124",
    user: "Alice",
    email: "alice@example.com",
    phone: "9876500000",
    region: "South",
    type: "Software",
    date: "2025-08-10",
    dateCreated: "2025-08-09",
    status: "resolved",
    title: "Software Bug",
    description: "System crashes on login",
    file: { name: "error-log.txt", url: "/files/error-log.txt" },
    comments: [{ id: 1, text: "Bug reported", author: "Alice", date: "2025-08-09" }],
  },
]

export default function Tickets() {
  const [tab, setTab] = useState("pending")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [tickets, setTickets] = useState(mockTickets)

  const handleView = (ticket) => {
    setSelectedTicket(ticket)
    setIsModalOpen(true)
  }

  const handleResolve = (ticketId) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId ? { ...t, status: "resolved" } : t
      )
    )
    setIsModalOpen(false)
  }

  const filteredTickets = tickets.filter((t) => t.status === tab)

  return (
    <div className="flex flex-col p-6 gap-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">Ticket Support (5000)</h2>
        <p className="text-sm text-muted-foreground">
          Review your tickets here. Stay updated on status and view detailed issues for each ticket raised.
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="pending">Pending ({tickets.filter((t) => t.status === "pending").length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({tickets.filter((t) => t.status === "resolved").length})</TabsTrigger>
        </TabsList>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mt-4 items-center">
          <Input placeholder="Search by Ticket ID / User" className="w-64" />

          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="north">North</SelectItem>
              <SelectItem value="south">South</SelectItem>
              <SelectItem value="east">East</SelectItem>
              <SelectItem value="west">West</SelectItem>
            </SelectContent>
          </Select>

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

        {/* Table inside Card */}
        <TabsContent value={tab} className="mt-6">
          <Card className="rounded-2xl shadow-sm">
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>RFID</TableHead>
                    <TableHead>User Name</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date Created</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>{ticket.id}</TableCell>
                      <TableCell>{ticket.rfid}</TableCell>
                      <TableCell>{ticket.user}</TableCell>
                      <TableCell>{ticket.region}</TableCell>
                      <TableCell>{ticket.type}</TableCell>
                      <TableCell>{ticket.date}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleView(ticket)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal */}
      <TicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ticket={selectedTicket}
        onResolve={handleResolve}
      />
    </div>
  )
}
