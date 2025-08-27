"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import AdminCard from "./AdminCard";
import AddEditModal from "./AddEditModal"; // ← import your modal

const mockAdmins = [
  {
    id: "A001",
    name: "Anita Sharma",
    email: "anita.sharma@company.com",
    phone: "+91 98765 43210",
    region: "North Zone",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
  },
  {
    id: "A002",
    name: "Rahul Verma",
    email: "rahul.verma@company.com",
    phone: "+91 99887 76655",
    region: "East Zone / Block A",
    avatar:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400",
  },
  {
    id: "A003",
    name: "Sara Ali",
    email: "sara.ali@company.com",
    phone: "+91 93456 78901",
    region: "South Zone",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400",
  },
  {
    id: "A004",
    name: "David Brown",
    email: "david.brown@company.com",
    phone: "+44 7700 900123",
    region: "West Zone / Block C",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400",
  },
  {
    id: "A005",
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+1 202 555 0199",
    region: "North Zone / Block B",
    avatar:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?q=80&w=400",
  },
  {
    id: "A006",
    name: "Priya Singh",
    email: "priya.singh@company.com",
    phone: "+91 90987 65432",
    region: "East Zone",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400",
  },
  {
    id: "A007",
    name: "Michael Johnson",
    email: "michael.johnson@company.com",
    phone: "+1 303 555 0144",
    region: "South Zone / Block D",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400",
  },
  {
    id: "A008",
    name: "Kavita Rao",
    email: "kavita.rao@company.com",
    phone: "+91 91234 56789",
    region: "West Zone",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400",
  },
];

const Admins = () => {
  const [query, setQuery] = useState("");
  const [admins, setAdmins] = useState(mockAdmins);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return admins;
    const q = query.toLowerCase();
    return admins.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.phone.toLowerCase().includes(q) ||
        a.region.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q)
    );
  }, [admins, query]);

  const handleAdd = () => {
    setSelectedAdmin(null); // new member
    setModalOpen(true);
  };

  const handleEdit = (id) => {
    const admin = admins.find((a) => a.id === id);
    setSelectedAdmin(admin);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSubmit = (form) => {
    if (selectedAdmin) {
      // editing existing
      setAdmins((prev) =>
        prev.map((a) =>
          a.id === selectedAdmin.id
            ? {
                ...a,
                name: `${form.firstName} ${form.lastName}`,
                email: form.email,
                phone: form.phone,
                region:
                  form.role === "block-admin"
                    ? `${form.region} / ${form.block}`
                    : form.region,
                avatar: form.avatar || a.avatar,
              }
            : a
        )
      );
    } else {
      // adding new
      const newAdmin = {
        id: `A${String(admins.length + 1).padStart(3, "0")}`,
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
        region:
          form.role === "block-admin"
            ? `${form.region} / ${form.block}`
            : form.region,
        avatar: form.avatar,
      };
      setAdmins((prev) => [...prev, newAdmin]);
    }
  };

  return (
    <div className="flex flex-1 flex-col p-6 gap-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">
          Region/Block Admins ({admins.length})
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage and view region/block admins details in one place
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[220px] max-w-md">
          <Input
            placeholder="Search by name, email, phone, region or ID..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      {/* Grid of admin cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {filtered.map((admin) => (
          <AdminCard
            key={admin.id}
            admin={admin}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-0">
            <div className="text-base font-medium">No admins found</div>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Try adjusting your search or{" "}
            <button
              className="underline underline-offset-2"
              onClick={() => setQuery("")}
            >
              clear the filter
            </button>
            .
          </CardContent>
        </Card>
      )}

      {/* ✅ Add/Edit Modal */}
      <AddEditModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        admin={selectedAdmin}
      />
    </div>
  );
};

export default Admins;
