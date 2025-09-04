 
// src/app/(dashboard)/dashboard/page.tsx
import { CampaignsList } from "@/components/dashboard/campaigns-list";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { LinkedInAccounts } from "@/components/dashboard/linkedin-accounts";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaigns */}
        <div className="lg:col-span-1">
          <CampaignsList />
        </div>
        
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>
      
      {/* LinkedIn Accounts */}
      <LinkedInAccounts />
    </div>
  );
}

// src/components/dashboard/campaigns-list.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const campaigns = [
  { id: 1, name: "Just Herbs", status: "Active" },
  { id: 2, name: "Juicy chemistry", status: "Active" },
  { id: 3, name: "Hyugalife 2", status: "Active" },
  { id: 4, name: "Honeyveda", status: "Active" },
  { id: 5, name: "HempStreet", status: "Active" },
  { id: 6, name: "HealthyHey 2", status: "Active" },
];

export function CampaignsList() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Campaigns</h2>
        <Select defaultValue="all">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Campaigns</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-3">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md">
            <span className="font-medium">{campaign.name}</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {campaign.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}