// Alternative src/app/api/auth/[...betterauth]/route.ts
import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await auth.handler(req);
}

export async function POST(req: NextRequest) {
  return await auth.handler(req);
}

export async function PUT(req: NextRequest) {
  return await auth.handler(req);
}

export async function DELETE(req: NextRequest) {
  return await auth.handler(req);
}

export async function PATCH(req: NextRequest) {
  return await auth.handler(req);
}