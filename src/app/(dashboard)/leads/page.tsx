 
// src/app/(dashboard)/leads/page.tsx
import { LeadsTable } from "@/components/leads/leads-table";
import { LeadsFilters } from "@/components/leads/leads-filters";

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Leads</h1>
      </div>
      
      <LeadsFilters />
      <LeadsTable />
    </div>
  );
}






