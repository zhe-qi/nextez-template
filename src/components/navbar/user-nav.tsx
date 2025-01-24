import type { Dispatch, JSX, SetStateAction } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

import { LayoutGrid, LogOut, Settings, User } from "lucide-react";
import { useSession } from "next-auth/react";

import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { Skeleton } from "../ui/skeleton";
import UserAvatar from "./user-avatar";

type IMenu = {
  name: string;
  href: string;
  separator: boolean;
  shortcut?: string;
  icon?: JSX.Element;
};
const menu: IMenu[] = [
  {
    name: "My tools",
    href: "/tools",
    separator: false,
    icon: <LayoutGrid className="mr-2 size-4" aria-hidden="true" />,
  },
  {
    name: "Profile",
    href: "/profile",
    separator: false,
    shortcut: "⇧⌘P",
    icon: <User className="mr-2 size-4" aria-hidden="true" />,
  },
  {
    name: "Settings",
    href: "/settings",
    separator: false,
    shortcut: "⇧⌘S",
    icon: <Settings className="mr-2 size-4" aria-hidden="true" />,
  },
  {
    name: "Log out",
    href: "/auth/logout",
    separator: true,
    shortcut: "⇧⌘Q",
    icon: <LogOut className="mr-2 size-4" aria-hidden="true" />,
  },
];

export default function UserNav({
  setOpenSheet,
}: {
  setOpenSheet?: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (status != "authenticated") {
    return (
      <div className="flex items-center">
        <Skeleton className="size-8 gap-x-6 rounded-full" />
      </div>
    );
  }

  return (
    <>
      <div className="hidden items-center lg:ml-0 lg:flex">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvatar />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Signed in as</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session?.user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator aria-hidden="true" />
            {menu.map((item, index) => (
              <React.Fragment key={index}>
                {item.separator && (
                  <DropdownMenuSeparator
                    key={`menu_dropdown_separator_${index}`}
                    aria-hidden="true"
                  />
                )}
                <DropdownMenuItem
                  key={`menu_dropdown_${index}`}
                  onClick={() => router.push(item.href)}
                  className={cn(pathname === item.href && "bg-muted")}
                >
                  {item.icon}
                  {item.name}
                  {item.shortcut && (
                    <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                  )}
                </DropdownMenuItem>
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex lg:hidden">
        <div className="flex grow flex-col">
          <UserAvatar />
          <div className="space-y-2 py-2">
            {menu.map((item, index) => (
              <Link
                key={`menu_user_${index}`}
                href={item.href}
                onClick={() => setOpenSheet?.(false)}
                className={cn(
                  "-mx-3 block px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                  pathname != item.href && "text-muted-foreground",
                )}
              >
                <div className="flex items-center">
                  {item.icon}
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
