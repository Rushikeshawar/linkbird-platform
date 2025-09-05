// src/app/api/auth/[...betterauth]/route.ts
import { auth } from "@/lib/auth";

// Better Auth handler for all HTTP methods
export async function GET(request: Request) {
  return auth.handler(request);
}

export async function POST(request: Request) {
  return auth.handler(request);
}

export async function PUT(request: Request) {
  return auth.handler(request);
}

export async function DELETE(request: Request) {
  return auth.handler(request);
}

export async function PATCH(request: Request) {
  return auth.handler(request);
}