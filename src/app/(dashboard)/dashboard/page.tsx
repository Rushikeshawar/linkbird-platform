// src/app/(dashboard)/dashboard/page.tsx
import { CampaignStats } from "@/components/campaigns/campaign-stats";
import { LinkedInAccounts } from "@/components/dashboard/linkedin-accounts";
import { RecentActivity } from "@/components/dashboard/recent-activity";

export default function DashboardPage() {
  // Mock data for demonstration
  const mockStats = {
    totalCampaigns: 9,
    activeCampaigns: 6,
    totalLeads: 102,
    responseRate: 23.5,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your campaigns.</p>
      </div>
      
      <CampaignStats {...mockStats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <LinkedInAccounts />
      </div>
    </div>
  );
}