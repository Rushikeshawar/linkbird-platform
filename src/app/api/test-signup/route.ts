// src/app/api/test-signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, accounts } from "@/../drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    console.log("Attempting signup with data:", { name, email });

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (existingUser.length > 0) {
      return NextResponse.json({ 
        error: "User already exists" 
      }, { status: 422 });
    }

    // Hash password - use the same method as Better Auth
    const hashedPassword = await bcrypt.hash(password, 10); // Better Auth typically uses 10 rounds

    // Create user
    const userId = crypto.randomUUID();
    const newUser = await db.insert(users).values({
      id: userId,
      name,
      email,
      emailVerified: false,
    }).returning();

    // Create account record that matches Better Auth's emailAndPassword provider exactly
    const accountData = {
      id: crypto.randomUUID(),
      accountId: userId, // Use userId as accountId for consistency
      providerId: "email-password", // This might be what Better Auth expects
      userId: userId,
      password: hashedPassword,
    };

    console.log("Creating account with data:", accountData);
    
    await db.insert(accounts).values(accountData);

    console.log("User created successfully:", newUser[0]);

    return NextResponse.json({ 
      success: true, 
      user: { 
        id: newUser[0].id, 
        name: newUser[0].name, 
        email: newUser[0].email 
      }
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