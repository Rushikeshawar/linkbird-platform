// src/app/api/test-better-auth-signup/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Testing Better Auth signup with:", body);

    // Forward the request to Better Auth's actual signup endpoint
    const betterAuthResponse = await fetch(`${process.env.BETTER_AUTH_URL || 'http://localhost:3000'}/api/auth/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const responseText = await betterAuthResponse.text();
    console.log("Better Auth response status:", betterAuthResponse.status);
    console.log("Better Auth response:", responseText);

    if (betterAuthResponse.ok) {
      return NextResponse.json({
        success: true,
        message: "Better Auth signup worked",
        response: responseText
      });
    } else {
      return NextResponse.json({
        error: "Better Auth signup failed",
        status: betterAuthResponse.status,
        response: responseText
      }, { status: betterAuthResponse.status });
    }

  } catch (error) {
    console.error("Error testing Better Auth:", error);
    return NextResponse.json({
      error: "Failed to test Better Auth",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Test Better Auth signup endpoint",
    info: "Use POST with { name, email, password }"
  });
}