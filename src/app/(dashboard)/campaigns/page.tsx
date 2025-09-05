// src/app/(dashboard)/campaigns/page.tsx
"use client";

import { CampaignsTable } from "@/components/campaigns/campaigns-table";
import { CampaignsFilters } from "@/components/campaigns/campaigns-filters";
import { CampaignStats } from "@/components/campaigns/campaign-stats";
import { Button } from "@/components/ui/button";
import { Plus, BarChart3 } from "lucide-react";

export default function CampaignsPage() {
  // Mock data - replace with actual data fetching
  const campaignStats = {
    totalCampaigns: 9,
    activeCampaigns: 6,
    totalLeads: 102,
    responseRate: 23.5,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Campaigns</h1>
          <p className="text-gray-600">Manage your campaigns and track their performance.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      </div>
      
      <CampaignStats {...campaignStats} />
      <CampaignsFilters />
      <CampaignsTable />
    </div>
  );
}