import { customers } from "@/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: (schema) => schema.min(1, "First name is required!"),
  lastName: (schema) => schema.min(1, "Last name is required!"),
  address1: (schema) => schema.min(1, "Address is required!"),
  upazilla: (schema) => schema.min(1, "Upazilla is required!"),
  district: (schema) => schema.min(1, "District is required!"),
  email: (schema) => schema.email("Invalid e-mail address!"),
  zip: (schema) =>
    schema.regex(
      /^[1-8]\d{3}$/,
      "Invalid ZIP code! Use 4 digits where first digit must be between 1-8."
    ),
  phone: (schema) =>
    schema.regex(
      /^(\+?88)?01[3-9]\d\d-?\d{6}$/,
      "Invalid phone number format! Use +8801XX-XXXXXXX format."
    ),
});

export const selectCustomerSchema = createSelectSchema(customers);

export type insertCustomerSchemaType = typeof insertCustomerSchema._type;

export type selectCustomerSchemaType = typeof selectCustomerSchema._type;
