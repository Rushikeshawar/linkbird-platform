 
// src/app/(dashboard)/campaigns/page.tsx
import { CampaignsTable } from "@/components/campaigns/campaigns-table";
import { CampaignsFilters } from "@/components/campaigns/campaigns-filters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Campaigns</h1>
          <p className="text-gray-600">Manage your campaigns and track their performance.</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>
      
      <CampaignsFilters />
      <CampaignsTable />
    </div>
  );
}