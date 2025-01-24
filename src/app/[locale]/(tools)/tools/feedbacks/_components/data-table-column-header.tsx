import type { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <Button
      className={cn(className)}
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      {column.getIsSorted() === false ? (
        <ArrowUpDown className="ml-2 size-4" />
      ) : column.getIsSorted() === "asc" ? (
        <ArrowUp className="ml-2 size-4" />
      ) : (
        <ArrowDown className="ml-2 size-4" />
      )}
    </Button>
  );
}
