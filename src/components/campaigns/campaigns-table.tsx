 
// src/components/campaigns/campaigns-table.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ArrowUpDown, Users, UserCheck } from "lucide-react";

const mockCampaigns = [
  {
    id: "1",
    name: "Just Herbs",
    status: "Active",
    totalLeads: 20,
    requestStatus: { accepted: 0, pending: 20, rejected: 0 },
    connectionStatus: { connected: 0, pending: 0 },
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Juicy chemistry",
    status: "Active",
    totalLeads: 11,
    requestStatus: { accepted: 0, pending: 11, rejected: 0 },
    connectionStatus: { connected: 0, pending: 0 },
    createdAt: "2024-01-12",
  },
  {
    id: "3",
    name: "Hyugalife 2", 
    status: "Active",
    totalLeads: 19,
    requestStatus: { accepted: 0, pending: 19, rejected: 0 },
    connectionStatus: { connected: 0, pending: 0 },
    createdAt: "2024-01-10",
  },
  {
    id: "4",
    name: "Honeyveda",
    status: "Active", 
    totalLeads: 3,
    requestStatus: { accepted: 0, pending: 3, rejected: 0 },
    connectionStatus: { connected: 0, pending: 0 },
    createdAt: "2024-01-08",
  },
  {
    id: "5",
    name: "HempStreet",
    status: "Active",
    totalLeads: 7,
    requestStatus: { accepted: 0, pending: 7, rejected: 0 },
    connectionStatus: { connected: 0, pending: 0 },
    createdAt: "2024-01-05",
  },
  {
    id: "6",
    name: "HealthyHey 2",
    status: "Active",
    totalLeads: 5,
    requestStatus: { accepted: 0, pending: 5, rejected: 0 },
    connectionStatus: { connected: 0, pending: 0 },
    createdAt: "2024-01-03",
  },
  {
    id: "7",
    name: "Herbal Chakra",
    status: "Active",
    totalLeads: 19,
    requestStatus: { accepted: 0, pending: 19, rejected: 0 },
    connectionStatus: { connected: 0, pending: 0 },
    createdAt: "2024-01-01",
  },
  {
    id: "8",
    name: "Healofy",
    status: "Active",
    totalLeads: 14,
    requestStatus: { accepted: 0, pending: 14, rejected: 0 },
    connectionStatus: { connected: 0, pending: 0 },
    createdAt: "2023-12-28",
  },
  {
    id: "9",
    name: "HealthSense",
    status: "Active",
    totalLeads: 2,
    requestStatus: { accepted: 0, pending: 2, rejected: 0 },
    connectionStatus: { connected: 0, pending: 0 },
    createdAt: "2023-12-25",
  },
];

export function CampaignsTable() {
  const getStatusBadge = (status: string) => {
    const variants = {
      Active: "bg-green-100 text-green-800",
      Paused: "bg-yellow-100 text-yellow-800", 
      Draft: "bg-gray-100 text-gray-800",
      Completed: "bg-blue-100 text-blue-800",
    };

    return (
      <Badge className={variants[status as keyof typeof variants] || variants.Draft}>
        {status}
      </Badge>
    );
  };

  const getResponseRate = (campaign: any) => {
    const total = campaign.requestStatus.accepted + campaign.requestStatus.pending + campaign.requestStatus.rejected;
    if (total === 0) return 0;
    return Math.round((campaign.requestStatus.accepted / total) * 100);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant="ghost" className="h-auto p-0 font-medium">
                Campaign Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Leads</TableHead>
            <TableHead>Request Status</TableHead>
            <TableHead>Connection Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockCampaigns.map((campaign) => (
            <TableRow key={campaign.id} className="hover:bg-gray-50">
              <TableCell>
                <div className="font-medium">{campaign.name}</div>
              </TableCell>
              <TableCell>
                {getStatusBadge(campaign.status)}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{campaign.totalLeads}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">{campaign.requestStatus.accepted}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">{campaign.requestStatus.pending}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm">{campaign.requestStatus.rejected}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <UserCheck className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">{campaign.connectionStatus.connected}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm">{campaign.connectionStatus.pending}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Pause Campaign</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Delete Campaign
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

