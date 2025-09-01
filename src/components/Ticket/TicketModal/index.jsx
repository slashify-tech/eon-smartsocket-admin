"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const TicketModal = ({ isOpen, onClose, ticket, onResolve }) => {
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])

  // Reset comments when a new ticket opens
  useEffect(() => {
    if (ticket) setComments(ticket.comments || [])
  }, [ticket])

  const handleAddComment = () => {
    if (!comment.trim()) return
    const newComment = {
      id: Date.now(),
      text: comment,
      author: "Admin",
      date: new Date().toLocaleString(),
    }
    setComments((prev) => [...prev, newComment])
    setComment("")
  }

  if (!ticket) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex gap-4 items-center">
            <span>{ticket.title}</span>
            <Badge
              variant={ticket.status === "resolved" ? "success" : "destructive"}
            >
              {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        {/* Ticket Details */}
        <div className="space-y-4 mt-2">
          <p className="text-gray-700">{ticket.description}</p>

          {ticket.file && (
            <div className="flex items-center gap-2">
              <span className="font-semibold">Attachment:</span>
              <a
                href={ticket.file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {ticket.file.name}
              </a>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <p><strong>Ticket Date:</strong> {ticket.date}</p>
            <p><strong>RFID:</strong> {ticket.rfid}</p>
            <p><strong>User Name:</strong> {ticket.user}</p>
            <p><strong>Email:</strong> {ticket.email}</p>
            <p><strong>Phone:</strong> {ticket.phone}</p>
            <p><strong>Date Created:</strong> {ticket.dateCreated}</p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Comments</h3>
          <div className="max-h-40 overflow-y-auto border rounded p-2 space-y-2">
            {comments.length > 0 ? (
              comments.map((c) => (
                <div key={c.id} className="p-2 border-b">
                  <p className="text-sm">{c.text}</p>
                  <p className="text-xs text-gray-500">
                    {c.author} • {c.date}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No comments yet.</p>
            )}
          </div>

          <div className="mt-3 flex gap-2">
            <Textarea
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button onClick={handleAddComment}>Send</Button>
          </div>
        </div>
            
        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-2">
          {ticket.status === "pending" && (
            <Button variant="outline" className={"cursor-pointer"} onClick={() => onResolve(ticket.id)}>
              Mark as Resolved
            </Button>
          )}
          {/* <Button variant="outline" onClick={onClose}>Close</Button> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TicketModal
