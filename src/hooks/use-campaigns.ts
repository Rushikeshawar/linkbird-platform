 
// src/hooks/use-campaigns.ts
"use client";

import { useQuery } from "@tanstack/react-query";

interface Campaign {
  id: string;
  name: string;
  status: string;
  description?: string;
  totalLeads: number;
  createdAt: string;
}

export function useCampaignsData() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const response = await fetch("/api/campaigns");
      if (!response.ok) throw new Error("Failed to fetch campaigns");
      return response.json();
    },
  });

  return {
    campaigns: data?.campaigns || [],
    isLoading,
    error,
  };
}

