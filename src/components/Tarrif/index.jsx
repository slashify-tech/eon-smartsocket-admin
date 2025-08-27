"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockTarrifs = [
  {
    id: 1,
    region: "North Zone",
    lastPrice: "0.12",
    currentPrice: "0.15",
    effectiveDate: "2025-08-01",
  },
  {
    id: 2,
    region: "South Zone",
    lastPrice: "0.10",
    currentPrice: "0.11",
    effectiveDate: "2025-08-10",
  },
];

const Tarrif = () => {
  const [regionFilter, setRegionFilter] = useState("all");
  const [editData, setEditData] = useState(null);

  const filteredTarrifs =
    regionFilter === "all"
      ? mockTarrifs
      : mockTarrifs.filter((t) => t.region === regionFilter);

  return (
    <div className="flex flex-1 flex-col p-6 gap-6">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Tarrif Management
          </CardTitle>
          <p className="text-sm text-gray-500">
            Review your tariffs here. Stay updated on status and view detailed
            issues for each tariff raised.
          </p>
        </CardHeader>
        <CardContent>
          {/* Region Filter */}
          <div className="flex justify-between items-center mb-4">
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="North Zone">North Zone</SelectItem>
                <SelectItem value="South Zone">South Zone</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Region</TableHead>
                <TableHead>Last Price (kWh)</TableHead>
                <TableHead>Current Price (kWh)</TableHead>
                <TableHead>Effective Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTarrifs.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.region}</TableCell>
                  <TableCell>{t.lastPrice}</TableCell>
                  <TableCell>{t.currentPrice}</TableCell>
                  <TableCell>{t.effectiveDate}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditData(t)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={!!editData} onOpenChange={() => setEditData(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Tarrif</DialogTitle>
          </DialogHeader>
          {editData && (
            <div className="flex flex-col gap-4">
              <Input value={editData.region} disabled />
              <Input
                defaultValue={editData.currentPrice}
                placeholder="Current Price (kWh)"
              />
              <Input
                type="date"
                defaultValue={editData.effectiveDate}
                placeholder="Effective Date"
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditData(null)}>
              Cancel
            </Button>
            <Button>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tarrif;
