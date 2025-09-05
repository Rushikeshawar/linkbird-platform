// src/lib/auth-middleware.ts
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { db } from "@/lib/db";
import { users, sessions } from "@/../drizzle/schema";
import { eq, and, gt } from "drizzle-orm";

const JWT_SECRET = new TextEncoder().encode(
  process.env.BETTER_AUTH_SECRET || "your-secret-key-at-least-32-characters"
);

export async function verifySession(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value;
    
    if (!token) {
      return null;
    }

    // Verify JWT
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    // Check if session exists and is valid
    const session = await db
      .select({
        userId: sessions.userId,
        sessionId: sessions.id,
        userName: users.name,
        userEmail: users.email,
      })
      .from(sessions)
      .innerJoin(users, eq(sessions.userId, users.id))
      .where(
        and(
          eq(sessions.id, payload.sessionId as string),
          gt(sessions.expiresAt, new Date())
        )
      )
      .limit(1);

    if (session.length === 0) {
      return null;
    }

    return {
      user: {
        id: session[0].userId,
        name: session[0].userName,
        email: session[0].userEmail,
      },
      sessionId: session[0].sessionId,
    };
  } catch (error) {
    console.error("Session verification error:", error);
    return null;
  }
}

