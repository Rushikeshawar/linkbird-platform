 
// src/hooks/use-leads.ts
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  jobTitle?: string;
  status: string;
  campaignName?: string;
  lastContactedAt?: string;
}

export function useLeadsData() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    campaign: "all",
    status: "all",
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["leads", page, filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...filters,
      });
      
      const response = await fetch(`/api/leads?${params}`);
      if (!response.ok) throw new Error("Failed to fetch leads");
      return response.json();
    },
  });

  return {
    leads: data?.leads || [],
    isLoading,
    error,
    page,
    setPage,
    filters,
    setFilters,
    hasMore: data?.pagination?.hasMore || false,
  };
}

