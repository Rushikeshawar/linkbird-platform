 
// src/app/api/campaigns/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { campaigns, leads } from "@/../drizzle/schema";
import { eq, sql, count } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const allCampaigns = await db
      .select({
        id: campaigns.id,
        name: campaigns.name,
        status: campaigns.status,
        description: campaigns.description,
        createdAt: campaigns.createdAt,
        totalLeads: sql<number>`count(${leads.id})`.as("totalLeads"),
      })
      .from(campaigns)
      .leftJoin(leads, eq(campaigns.id, leads.campaignId))
      .groupBy(campaigns.id);

    return NextResponse.json({ campaigns: allCampaigns });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json(
      { error: "Failed to fetch campaigns" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newCampaign = await db.insert(campaigns).values({
      id: crypto.randomUUID(),
      name: body.name,
      status: body.status || "draft",
      description: body.description,
      userId: body.userId,
    });

    return NextResponse.json({ success: true, campaign: newCampaign });
  } catch (error) {
    console.error("Error creating campaign:", error);
    return NextResponse.json(
      { error: "Failed to create campaign" },
      { status: 500 }
    );
  }
}

// src/components/campaigns/campaign-stats.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CampaignStatsProps {
  totalCampaigns: number;
  activeCampaigns: number;
  totalLeads: number;
  responseRate: number;
}

export function CampaignStats({
  totalCampaigns,
  activeCampaigns,
  totalLeads,
  responseRate,
}: CampaignStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCampaigns}</div>
          <p className="text-xs text-muted-foreground">All campaigns</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeCampaigns}</div>
          <p className="text-xs text-muted-foreground">Currently running</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalLeads}</div>
          <p className="text-xs text-muted-foreground">Across all campaigns</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{responseRate}%</div>
          <Progress value={responseRate} className="mt-2" />
        </CardContent>
      </Card>
    </div>
  );
}

// src/components/common/loading-spinner.tsx
interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]} ${className}`}></div>
  );
}

// src/components/common/error-boundary.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[400px] bg-white rounded-lg border border-gray-200">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong</h3>
            <p className="text-gray-500 mb-4">We're sorry, but something unexpected happened.</p>
            <Button onClick={() => this.setState({ hasError: false })}>
              Try again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// src/components/common/infinite-scroll.tsx
"use client";

import { useEffect, useRef } from "react";

interface InfiniteScrollProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  children: React.ReactNode;
}

export function InfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  children,
}: InfiniteScrollProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      {children}
      <div ref={loadMoreRef} className="h-10" />
    </>
  );
}

// src/lib/validations/auth.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

// src/lib/validations/leads.ts
import { z } from "zod";

export const leadSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  linkedinUrl: z.string().url().optional(),
  campaignId: z.string().min(1, "Campaign is required"),
  status: z.enum(["pending", "contacted", "responded", "converted", "do_not_contact"]).default("pending"),
});

export const updateLeadStatusSchema = z.object({
  status: z.enum(["pending", "contacted", "responded", "converted", "do_not_contact"]),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type UpdateLeadStatusInput = z.infer<typeof updateLeadStatusSchema>;

// src/lib/validations/campaigns.ts
import { z } from "zod";

export const campaignSchema = z.object({
  name: z.string().min(1, "Campaign name is required"),
  description: z.string().optional(),
  status: z.enum(["draft", "active", "paused", "completed"]).default("draft"),
});

export const updateCampaignSchema = z.object({
  name: z.string().min(1, "Campaign name is required").optional(),
  description: z.string().optional(),
  status: z.enum(["draft", "active", "paused", "completed"]).optional(),
});

export type CampaignInput = z.infer<typeof campaignSchema>;
export type UpdateCampaignInput = z.infer<typeof updateCampaignSchema>;

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

// src/lib/queries/campaigns.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useCampaigns() {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const response = await fetch("/api/campaigns");
      if (!response.ok) throw new Error("Failed to fetch campaigns");
      return response.json();
    },
  });
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (campaignData: any) => {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campaignData),
      });
      if (!response.ok) throw new Error("Failed to create campaign");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
}

// src/store/auth-store.ts
import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, isLoading: false }),
}));

// src/store/filter-store.ts
import { create } from 'zustand';

interface FilterStore {
  searchTerm: string;
  selectedCampaign: string;
  selectedStatus: string;
  setSearchTerm: (term: string) => void;
  setSelectedCampaign: (campaign: string) => void;
  setSelectedStatus: (status: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  searchTerm: "",
  selectedCampaign: "all",
  selectedStatus: "all",
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setSelectedCampaign: (selectedCampaign) => set({ selectedCampaign }),
  setSelectedStatus: (selectedStatus) => set({ selectedStatus }),
  resetFilters: () => set({ 
    searchTerm: "", 
    selectedCampaign: "all", 
    selectedStatus: "all" 
  }),
}));

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

// src/types/auth.ts
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  emailVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
  token: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// src/types/leads.ts
export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  jobTitle?: string;
  linkedinUrl?: string;
  status: "pending" | "contacted" | "responded" | "converted" | "do_not_contact";
  campaignId: string;
  userId: string;
  lastContactedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface LeadInteraction {
  id: string;
  leadId: string;
  type: "message_sent" | "replied" | "connected" | "viewed_profile";
  message?: string;
  createdAt: Date;
}

export interface LeadWithCampaign extends Lead {
  campaignName?: string;
  interactions?: LeadInteraction[];
}

// src/types/campaigns.ts
export interface Campaign {
  id: string;
  name: string;
  status: "draft" | "active" | "paused" | "completed";
  description?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CampaignWithStats extends Campaign {
  totalLeads: number;
  pendingLeads: number;
  contactedLeads: number;
  respondedLeads: number;
  convertedLeads: number;
  responseRate: number;
}