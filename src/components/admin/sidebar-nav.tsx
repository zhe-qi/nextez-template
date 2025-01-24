"use client";

import type { NavItem } from "@/types/types";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import Link from "next/link";

import { usePathname } from "next/navigation";

type SidebarNavProps = {
  items: NavItem[];
} & React.HTMLAttributes<HTMLElement>;

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            (item.type === "parent" && pathname === item.href) ||
              (item.type === "child" && pathname.includes(item.href))
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start",
          )}
          prefetch
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
