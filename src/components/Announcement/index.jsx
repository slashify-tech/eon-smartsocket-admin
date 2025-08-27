"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Edit2, Trash2, Paperclip } from "lucide-react";
import CreateAnnouncementModal from "./CreateAnnouncementModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

// Dummy announcements data
const initialAnnouncements = Array.from({ length: 5 }).map((_, i) => ({
  id: i + 1,
  title: `Announcement ${i + 1}`,
  description:
    "This is a sample announcement for testing the layout and UI optimizations.",
  attachment: i % 2 === 0 ? `/docs/sample-${i + 1}.pdf` : null,
  date: `2025-08-${(i % 30) + 1}`,
  status: i % 2 === 0 ? "Published" : "Scheduled",
}));

const Announcements = () => {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  // Delete confirm modal state
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Form state
  const [form, setForm] = useState({
    title: "",
    description: "",
    attachment: "",
    date: "",
    status: "Published",
  });

  const openForm = (announcement) => {
    if (announcement) {
      setEditing(announcement);
      setForm(announcement);
    } else {
      setEditing(null);
      setForm({
        title: "",
        description: "",
        attachment: "",
        date: "",
        status: "Published",
      });
    }
    setShowForm(true);
  };

  const saveAnnouncement = () => {
    if (editing) {
      setAnnouncements((prev) =>
        prev.map((a) => (a.id === editing.id ? { ...editing, ...form } : a))
      );
    } else {
      setAnnouncements((prev) => [...prev, { ...form, id: prev.length + 1 }]);
    }
    setShowForm(false);
  };

  const confirmDelete = (id) => {
    setDeleteTarget(id);
  };

  const handleDelete = () => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== deleteTarget));
    setDeleteTarget(null);
  };

  return (
    <div className="flex flex-1 flex-col p-6 gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Announcements</h2>
          <p className="text-muted-foreground text-sm">
            Create and review all the announcements
          </p>
        </div>
        <Button size="sm" onClick={() => openForm()}>
          + Add Announcement
        </Button>
      </div>

      {/* Date Filter */}
      <div className="flex items-center gap-2">
        <Label className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar size={16} /> Filter by Date
        </Label>
        <Input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="max-w-[160px]"
        />
        <span className="text-muted-foreground">-</span>
        <Input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="max-w-[160px]"
        />
      </div>

      {/* Announcements List */}
      <div className="flex flex-col gap-4">
        {announcements.map((a) => (
          <Card
            key={a.id}
            className="w-full hover:shadow-md transition-shadow rounded-2xl"
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center text-lg">
                <span>{a.title}</span>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    a.status === "Published"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {a.status}
                </span>
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {a.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {a.attachment && (
                <a
                  href={a.attachment}
                  target="_blank"
                  className="flex items-center gap-1 text-blue-600 text-sm hover:underline"
                >
                  <Paperclip size={14} /> View Attachment
                </a>
              )}
              <div className="flex justify-between items-center border-t pt-2">
                <span className="text-xs text-muted-foreground">{a.date}</span>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    aria-label="Edit"
                    onClick={() => openForm(a)}
                  >
                    <Edit2 size={14} />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-7 w-7"
                    aria-label="Delete"
                    onClick={() => confirmDelete(a.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {showForm && (
        <CreateAnnouncementModal
          open={showForm}
          onClose={() => setShowForm(false)}
          onSubmit={saveAnnouncement}
          announcement={editing}
        />
      )}

      {/* Confirm Delete Modal */}

      {deleteTarget && (
        <ConfirmDeleteModal
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default Announcements;
