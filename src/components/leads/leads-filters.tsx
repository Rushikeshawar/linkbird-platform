 
// src/components/leads/leads-filters.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

export function LeadsFilters() {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search leads..."
          className="pl-10"
        />
      </div>
      
      <Select defaultValue="all-campaigns">
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-campaigns">All Campaigns</SelectItem>
          <SelectItem value="just-herbs">Just Herbs</SelectItem>
          <SelectItem value="social-beat">Social beat</SelectItem>
          <SelectItem value="bodybuilding">BodyBuilding India</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="all-status">
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-status">All Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="contacted">Contacted</SelectItem>
          <SelectItem value="responded">Responded</SelectItem>
          <SelectItem value="converted">Converted</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" size="sm">
        <Filter className="w-4 h-4 mr-2" />
        More Filters
      </Button>
    </div>
  );
}
