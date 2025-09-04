// src/components/dashboard/header.tsx
"use client";

import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  
  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.map((segment, index) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: "/" + segments.slice(0, index + 1).join("/"),
      isLast: index === segments.length - 1,
    }));
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.href} className="flex items-center">
            <span
              className={
                crumb.isLast
                  ? "font-medium text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }
            >
              {crumb.name}
            </span>
            {!crumb.isLast && (
              <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            )}
          </div>
        ))}
      </div>
    </header>
  );
}

