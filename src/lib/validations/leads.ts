 
// src/lib/validations/leads.ts
import { z } from "zod";

export const leadSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  linkedinUrl: z.string().url().optional(),
  campaignId: z.string().min(1, "Campaign is required"),
  status: z.enum(["pending", "contacted", "responded", "converted", "do_not_contact"]).default("pending"),
});

export const updateLeadStatusSchema = z.object({
  status: z.enum(["pending", "contacted", "responded", "converted", "do_not_contact"]),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type UpdateLeadStatusInput = z.infer<typeof updateLeadStatusSchema>;

