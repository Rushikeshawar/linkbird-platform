 
// src/components/leads/leads-table.tsx
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { LeadDetailSheet } from "./lead-detail-sheet";

const mockLeads = [
  {
    id: "1",
    name: "Anav Sachdeva",
    jobTitle: "Building Bodybuilding India | ...",
    email: "anav@example.com",
    company: "BodyBuilding India",
    campaign: "BodyBuilding India",
    status: "sent",
    lastContact: "1 hr ago",
    avatar: "/placeholder-avatar.jpg",
  },
  {
    id: "2",
    name: "Mritunjay Sharma",
    jobTitle: "Retail |Regional Manager|Opera...",
    email: "mritunjay@example.com",
    company: "BodyBuilding India", 
    campaign: "BodyBuilding India",
    status: "sent",
    lastContact: "1 hr ago",
    avatar: "/placeholder-avatar.jpg",
  },
  {
    id: "3",
    name: "Priya Das",
    jobTitle: "Digital Media Specialist",
    email: "priya@example.com",
    company: "Social beat",
    campaign: "Social beat",
    status: "sent",
    lastContact: "1 hr ago",
    avatar: "/placeholder-avatar.jpg",
  },
  {
    id: "4",
    name: "Pallavi K.",
    jobTitle: "Driving Growth and Client Succ...",
    email: "pallavi@example.com",
    company: "Social beat",
    campaign: "Social beat", 
    status: "sent",
    lastContact: "1 hr ago",
    avatar: "/placeholder-avatar.jpg",
  },
  {
    id: "5",
    name: "Garima Bisht",
    jobTitle: "Client Servicing | Marketing C...",
    email: "garima@example.com",
    company: "Social beat",
    campaign: "Social beat",
    status: "sent", 
    lastContact: "1 hr ago",
    avatar: "/placeholder-avatar.jpg",
  },
  {
    id: "6",
    name: "Simran Sharma",
    jobTitle: "Senior Executive -Brand Soluti...",
    email: "simran@example.com",
    company: "Social beat",
    campaign: "Social beat",
    status: "sent",
    lastContact: "1 hr ago", 
    avatar: "/placeholder-avatar.jpg",
  },
  {
    id: "7",
    name: "Rimmi Agarwal",
    jobTitle: "Social Media Manager | Content...",
    email: "rimmi@example.com",
    company: "Social beat",
    campaign: "Social beat",
    status: "sent",
    lastContact: "1 hr ago",
    avatar: "/placeholder-avatar.jpg",
  },
  {
    id: "8",
    name: "Darshana G",
    jobTitle: "Senior Growth & Client Success...",
    email: "darshana@example.com",
    company: "Social beat",
    campaign: "Social beat",
    status: "sent",
    lastContact: "1 hr ago",
    avatar: "/placeholder-avatar.jpg",
  },
];

export function LeadsTable() {
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleLeadClick = (lead: any) => {
    setSelectedLead(lead);
    setIsSheetOpen(true);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      sent: "bg-orange-100 text-orange-800",
      pending: "bg-purple-100 text-purple-800",
      contacted: "bg-blue-100 text-blue-800",
      responded: "bg-green-100 text-green-800",
      converted: "bg-green-100 text-green-800",
      do_not_contact: "bg-gray-100 text-gray-800",
    };

    return (
      <Badge className={variants[status as keyof typeof variants] || variants.pending}>
        {status === "sent" ? "Sent 1 hr ago" : status}
      </Badge>
    );
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("name")}
                  className="h-auto p-0 font-medium"
                >
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("campaign")}
                  className="h-auto p-0 font-medium"
                >
                  Campaign Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("status")}
                  className="h-auto p-0 font-medium"
                >
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLeads.map((lead) => (
              <TableRow
                key={lead.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleLeadClick(lead)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={lead.avatar} />
                      <AvatarFallback className="bg-gray-500 text-white">
                        {lead.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{lead.name}</div>
                      <div className="text-sm text-gray-500">{lead.jobTitle}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{lead.campaign}</span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(lead.status)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Loading indicator */}
        <div className="flex items-center justify-center py-8 text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            <span>Loading more...</span>
          </div>
        </div>
      </div>

      <LeadDetailSheet
        lead={selectedLead}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </>
  );
}
