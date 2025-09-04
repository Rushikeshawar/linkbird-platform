 
// src/app/(auth)/login/page.tsx
import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Login with email
        </h1>
        <p className="text-sm text-muted-foreground">
          Login using your email address.
        </p>
      </div>
      <LoginForm />
      <div className="text-center">
        <Link
          href="/register"
          className="text-sm text-muted-foreground hover:underline"
        >
          Create New Account
        </Link>
      </div>
    </div>
  );
}

