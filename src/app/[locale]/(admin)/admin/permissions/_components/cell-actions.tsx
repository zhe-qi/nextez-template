import type { IColumns } from './columns';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Copy, MoreHorizontal, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import DeletePermissionDialog from './delete-permission-dialog';

export default function CellActions({ row }: { row: IColumns }) {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu
        open={isDropdownMenuOpen}
        onOpenChange={setIsDropdownMenuOpen}
      >
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 p-2 data-[state=open]:bg-muted"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard
                .writeText(String(row.id))
                .then(() => {
                  toast.success('Permission ID copied!');
                })
                .catch(() => {
                  toast.error('Failed to copy user ID');
                });
            }}
          >
            <Copy className="mr-2 size-4" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/admin/permissions/${row.id}`} prefetch>
              <Pencil className="mr-2 size-4" />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              setIsDeleteDialogOpen(true);
              setIsDropdownMenuOpen(false);
            }}
            className="hover:!bg-destructive/80 hover:!text-destructive-foreground"
          >
            <Trash className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeletePermissionDialog
        key={`delete-${row.id}`}
        permissionId={row.id}
        permissionKey={row.key}
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
      />
    </>
  );
}
