// src/app/api/test-signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Attempting signup with data:", body);
    
    // Try to use Better Auth's signUp method directly
    const result = await auth.api.signUpEmail({
      body: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
      headers: request.headers,
    });
    
    console.log("Signup result:", result);
    
    return NextResponse.json({ 
      success: true, 
      user: result 
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ 
      error: "Signup failed",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: "Test signup endpoint",
    info: "Use POST with { name, email, password }"
  });
}