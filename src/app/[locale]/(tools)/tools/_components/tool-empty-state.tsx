import EmptyState from "@/components/ui/data-tables/empty-state";
import { LayoutGrid } from "lucide-react";

export default function ToolEmptyState() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed p-14 shadow-sm">
      <EmptyState
        title="No results found"
        description="Your search did not return any results."
        icon={LayoutGrid}
      />
    </div>
  );
}
