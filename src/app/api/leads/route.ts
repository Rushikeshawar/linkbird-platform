 
// src/app/api/leads/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads, campaigns } from "@/../drizzle/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    const allLeads = await db
      .select({
        id: leads.id,
        firstName: leads.firstName,
        lastName: leads.lastName,
        email: leads.email,
        company: leads.company,
        jobTitle: leads.jobTitle,
        status: leads.status,
        campaignName: campaigns.name,
        lastContactedAt: leads.lastContactedAt,
        createdAt: leads.createdAt,
      })
      .from(leads)
      .leftJoin(campaigns, eq(leads.campaignId, campaigns.id))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({
      leads: allLeads,
      pagination: {
        page,
        limit,
        hasMore: allLeads.length === limit,
      },
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newLead = await db.insert(leads).values({
      id: crypto.randomUUID(),
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      company: body.company,
      jobTitle: body.jobTitle,
      campaignId: body.campaignId,
      userId: body.userId,
      status: "pending",
    });

    return NextResponse.json({ success: true, lead: newLead });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}

