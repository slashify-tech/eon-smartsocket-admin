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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDropzone } from "react-dropzone";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Regions & blocks
const regionsData = {
  "North Region": ["Block A1", "Block A2", "Block A3"],
  "South Region": ["Block B1", "Block B2"],
  "East Region": ["Block C1", "Block C2", "Block C3"],
  "West Region": ["Block D1"],
};

// Validation schema
const getValidationSchema = (isEdit) =>
  Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    role: Yup.string().required("Role is required"),
    region: Yup.string().required("Region is required"),
    block: Yup.string().when("role", {
      is: "block-admin",
      then: Yup.string().required("Block is required"),
    }),
    password: isEdit
      ? Yup.string().nullable()
      : Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: isEdit
      ? Yup.string().nullable()
      : Yup.string()
          .oneOf([Yup.ref("password")], "Passwords must match")
          .required("Confirm password is required"),
  });

// Reusable field wrapper
const Field = ({ label, error, children }) => (
  <div className="flex flex-col gap-1">
    <Label>{label}</Label>
    {children}
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

const AddEditModal = ({ open, onClose, onSubmit, admin }) => {
  const isEdit = !!admin;

  const formik = useFormik({
    initialValues: {
      firstName: admin?.firstName || "",
      lastName: admin?.lastName || "",
      email: admin?.email || "",
      phone: admin?.phone || "",
      region: admin?.region || "",
      block: admin?.block || "",
      role: admin?.role || "region-admin",
      password: "",
      confirmPassword: "",
      avatar: admin?.avatar || null,
    },
    validationSchema: getValidationSchema(isEdit),
    enableReinitialize: true, // important when editing
    onSubmit: (values) => {
      onSubmit(values);
      onClose();
    },
  });

  // file upload
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      formik.setFieldValue("avatar", URL.createObjectURL(file));
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Profile" : "Add New Member"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <section className="space-y-4">
            <h3 className="font-medium text-sm">Personal Information</h3>

            {/* Avatar */}
            <div
              {...getRootProps()}
              className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer"
            >
              <input {...getInputProps()} />
              {formik.values.avatar ? (
                <div className="flex flex-col items-center space-y-2">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={formik.values.avatar} />
                    <AvatarFallback>IMG</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">
                    Click or drag to replace
                  </span>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {isDragActive
                    ? "Drop the image here..."
                    : "Upload or drag & drop profile picture"}
                </p>
              )}
            </div>

            {/* First + Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="First Name" error={formik.errors.firstName}>
                <Input
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Field>
              <Field label="Last Name" error={formik.errors.lastName}>
                <Input
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Field>
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Email" error={formik.errors.email}>
                <Input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Field>
              <Field label="Phone" error={formik.errors.phone}>
                <Input
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Field>
            </div>
          </section>

          {/* Region & Role */}
          <section className="space-y-4">
            <h3 className="font-medium text-sm">Choose Region & Block</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Role */}
              <Field label="Role" error={formik.errors.role}>
                <Select
                  value={formik.values.role}
                  onValueChange={(val) => formik.setFieldValue("role", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="region-admin">Region Admin</SelectItem>
                    <SelectItem value="block-admin">Block Admin</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              {/* Region */}
              <Field label="Region" error={formik.errors.region}>
                <Select
                  value={formik.values.region}
                  onValueChange={(val) => {
                    formik.setFieldValue("region", val);
                    formik.setFieldValue("block", ""); // reset block
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Region" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(regionsData).map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              {/* Block */}
              {formik.values.role === "block-admin" && (
                <Field label="Block" error={formik.errors.block}>
                  <Select
                    value={formik.values.block}
                    onValueChange={(val) => formik.setFieldValue("block", val)}
                    disabled={!formik.values.region}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Block" />
                    </SelectTrigger>
                    <SelectContent>
                      {formik.values.region &&
                        regionsData[formik.values.region]?.map((block) => (
                          <SelectItem key={block} value={block}>
                            {block}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            </div>
          </section>

          {/* Password (only add mode) */}
          {!isEdit && (
            <section className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Create Password" error={formik.errors.password}>
                  <Input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Field>
                <Field label="Confirm Password" error={formik.errors.confirmPassword}>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Field>
              </div>
            </section>
          )}

          {/* Submit */}
          <div>
            <Button className="w-full" type="submit">
              {isEdit ? "Save Changes" : "Create Member"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditModal;
