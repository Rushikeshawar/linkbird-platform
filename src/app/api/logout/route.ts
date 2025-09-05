// src/app/api/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sessions } from "@/../drizzle/schema";
import { eq } from "drizzle-orm";
import { verifySession } from "@/lib/auth-middleware";

export async function POST(request: NextRequest) {
  try {
    const sessionData = await verifySession(request);
    
    if (sessionData) {
      // Delete session from database
      await db.delete(sessions).where(eq(sessions.id, sessionData.sessionId));
    }

    // Clear cookie
    const response = NextResponse.json({ success: true });
    response.cookies.delete("auth-token");
    
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}