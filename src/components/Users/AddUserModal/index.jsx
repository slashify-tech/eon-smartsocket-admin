"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const AddUserModal = ({ open, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      region: "",
      block: "",
      rfid: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      country: Yup.string().required("Country is required"),
      region: Yup.string().required("Region is required"),
      block: Yup.string().required("Block is required"),
      rfid: Yup.string().required("RFID is required"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted", { ...values, profilePic });
      onClose();
    },
  });

  const handleFile = (file) => {
    if (file) setProfilePic(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add New User</DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          {/* Drag & Drop Profile Picture */}
          <div
            className={cn(
              "border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition",
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            )}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileInput").click()}
          >
            {profilePic ? (
              <p className="text-sm text-gray-700">{profilePic.name}</p>
            ) : (
              <p className="text-sm text-gray-500">Click to upload or drag & drop profile picture</p>
            )}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </div>

          {/* Full Name */}
          <div>
            <Label className="mb-2 block">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="Enter full name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.fullName}</p>
            )}
          </div>

          {/* Grid Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-2 block">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <Label className="mb-2 block">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter phone number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
              )}
            </div>

            <div>
              <Label className="mb-2 block">Country</Label>
              <Input
                id="country"
                name="country"
                placeholder="Enter country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.country && formik.errors.country && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.country}</p>
              )}
            </div>

            <div>
              <Label className="mb-2 block">Region</Label>
              <Input
                id="region"
                name="region"
                placeholder="Enter region"
                value={formik.values.region}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.region && formik.errors.region && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.region}</p>
              )}
            </div>

            <div>
              <Label className="mb-2 block">Block</Label>
              <Input
                id="block"
                name="block"
                placeholder="Enter block"
                value={formik.values.block}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.block && formik.errors.block && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.block}</p>
              )}
            </div>

            <div>
              <Label className="mb-2 block">RFID</Label>
              <Input
                id="rfid"
                name="rfid"
                placeholder="Enter RFID"
                value={formik.values.rfid}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.rfid && formik.errors.rfid && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.rfid}</p>
              )}
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full rounded-xl">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
