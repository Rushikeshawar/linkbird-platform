 
// src/lib/queries/leads.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useLeads(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["leads", page, limit],
    queryFn: async () => {
      const response = await fetch(`/api/leads?page=${page}&limit=${limit}`);
      if (!response.ok) throw new Error("Failed to fetch leads");
      return response.json();
    },
  });
}

export function useCreateLead() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (leadData: any) => {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });
      if (!response.ok) throw new Error("Failed to create lead");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}

