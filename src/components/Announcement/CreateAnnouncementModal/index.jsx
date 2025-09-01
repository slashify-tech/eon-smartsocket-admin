"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { Paperclip } from "lucide-react";

// Validation schema
const getValidationSchema = () =>
  Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    attachment: Yup.mixed().nullable(),
  });

// Reusable field wrapper
const Field = ({ label, error, children }) => (
  <div className="flex flex-col gap-1">
    <Label>{label}</Label>
    {children}
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

const CreateAnnouncementModal = ({ open, onClose, onSubmit, announcement }) => {
  const isEdit = !!announcement;
  const [fileName, setFileName] = useState(announcement?.attachment || "");

  const formik = useFormik({
    initialValues: {
      title: announcement?.title || "",
      description: announcement?.description || "",
      attachment: null,
    },
    validationSchema: getValidationSchema(),
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmit({ ...values, attachment: fileName });
      onClose();
    },
  });

  // file upload
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFileName(file.name);
      formik.setFieldValue("attachment", file);
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
      "image/*": [],
    },
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Announcement" : "Create Announcement"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Title */}
          <Field label="Title" error={formik.errors.title}>
            <Input
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter announcement title"
            />
          </Field>

          {/* Description */}
          <Field label="Description" error={formik.errors.description}>
            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Write announcement details here..."
              rows={4}
              className="w-full border rounded-md p-2 text-sm"
            />
          </Field>

          {/* Attachment (file upload only) */}
          <Field label="Attachment (optional)" error={formik.errors.attachment}>
            <div
              {...getRootProps()}
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer text-sm text-muted-foreground hover:border-primary transition-colors"
            >
              <input {...getInputProps()} />
              {fileName ? (
                <p className="flex items-center justify-center gap-2 text-primary">
                  <Paperclip className="h-4 w-4" /> {fileName}
                </p>
              ) : isDragActive ? (
                <p>Drop the file here...</p>
              ) : (
                <p>Click to upload or drag & drop (PDF, DOCX, Image)</p>
              )}
            </div>
          </Field>

          {/* Submit */}
          <div>
            <Button className="w-full" type="submit">
              {isEdit ? "Save Changes" : "Create Announcement"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAnnouncementModal;
