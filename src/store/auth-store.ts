 
// src/hooks/use-auth.ts
"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export function useAuth() {
  const router = useRouter();
  const { toast } = useToast();

  const signOut = async () => {
    try {
      await fetch("/api/auth/sign-out", {
        method: "POST",
      });
      router.push("/login");
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  return {
    signOut,
  };
}

