 
// src/lib/validations/campaigns.ts
import { z } from "zod";

export const campaignSchema = z.object({
  name: z.string().min(1, "Campaign name is required"),
  description: z.string().optional(),
  status: z.enum(["draft", "active", "paused", "completed"]).default("draft"),
});

export const updateCampaignSchema = z.object({
  name: z.string().min(1, "Campaign name is required").optional(),
  description: z.string().optional(),
  status: z.enum(["draft", "active", "paused", "completed"]).optional(),
});

export type CampaignInput = z.infer<typeof campaignSchema>;
export type UpdateCampaignInput = z.infer<typeof updateCampaignSchema>;

