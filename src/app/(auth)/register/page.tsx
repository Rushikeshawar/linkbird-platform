 

// src/app/(auth)/register/page.tsx
import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Register with email
        </h1>
        <p className="text-sm text-muted-foreground">
          Register using your email address.
        </p>
      </div>
      <RegisterForm />
      <div className="text-center">
        <Link
          href="/login"
          className="text-sm text-muted-foreground hover:underline"
        >
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}

