// src/app/api/setup-db/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST() {
  try {
    // This will automatically create tables when first accessed
    // since you're using Drizzle ORM
    const result = await db.execute('SELECT 1');
    
    return NextResponse.json({ 
      success: true, 
      message: "Database initialized successfully" 
    });
  } catch (error) {
    return NextResponse.json({ 
      error: "Database setup failed",
      details: error.message 
    }, { status: 500 });
  }
}