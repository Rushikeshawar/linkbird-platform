 
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

