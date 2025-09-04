 
// src/types/leads.ts
export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  jobTitle?: string;
  linkedinUrl?: string;
  status: "pending" | "contacted" | "responded" | "converted" | "do_not_contact";
  campaignId: string;
  userId: string;
  lastContactedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface LeadInteraction {
  id: string;
  leadId: string;
  type: "message_sent" | "replied" | "connected" | "viewed_profile";
  message?: string;
  createdAt: Date;
}

export interface LeadWithCampaign extends Lead {
  campaignName?: string;
  interactions?: LeadInteraction[];
}

