 
// src/app/(auth)/layout.tsx
import { AuthLayout } from "@/components/auth/auth-layout";

export default function AuthRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}

// src/components/auth/auth-layout.tsx
import Link from "next/link";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Blurred background */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 to-blue-100 relative">
        <div className="absolute inset-0 bg-blue-600/10 backdrop-blur-sm"></div>
        <div className="relative z-10 flex items-center justify-center p-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">LinkBird</h1>
            <p className="text-gray-600 text-lg">
              Automate your LinkedIn outreach and grow your network
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              LinkBird
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

