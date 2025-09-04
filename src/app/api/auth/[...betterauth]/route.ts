// src/app/api/auth/[...betterauth]/route.ts
import { auth } from "@/lib/auth";

export const GET = auth.handler;
export const POST = auth.handler;