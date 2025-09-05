// src/app/api/debug-auth/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    // Test if the auth object is properly configured
    const config = {
      hasAuth: !!auth,
      hasHandler: !!auth.handler,
      baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
      secret: process.env.BETTER_AUTH_SECRET ? "SET" : "NOT SET",
    };
    
    return NextResponse.json({
      message: "Auth debug info",
      config,
      expectedEndpoints: [
        "/api/auth/sign-up",
        "/api/auth/sign-in/email",
        "/api/auth/sign-out",
        "/api/auth/session"
      ]
    });
  } catch (error) {
    return NextResponse.json({ 
      error: "Auth configuration error",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}