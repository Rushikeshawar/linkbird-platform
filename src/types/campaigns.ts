 
// src/types/campaigns.ts
export interface Campaign {
  id: string;
  name: string;
  status: "draft" | "active" | "paused" | "completed";
  description?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CampaignWithStats extends Campaign {
  totalLeads: number;
  pendingLeads: number;
  contactedLeads: number;
  respondedLeads: number;
  convertedLeads: number;
  responseRate: number;
}