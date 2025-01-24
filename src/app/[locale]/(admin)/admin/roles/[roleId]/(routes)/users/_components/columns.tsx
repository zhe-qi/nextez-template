'use client';

import type { User, UserRole } from '@prisma/client';

import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/data-tables/data-table-column-header';

import Link from 'next/link';

import CellActions from './cell-actions';

export type IColumns = {
  user: User;
} & UserRole;

export const columns: ColumnDef<IColumns>[] = [
  {
    id: 'email',
    accessorKey: 'user.email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" disableColumnHide />
    ),
    cell: ({ row }) => {
      const linkName = (
        <Link href={`/admin/users/${row.original.user.id}`}>
          {row.original.user.email}
        </Link>
      );
      return linkName;
    },
    enableGlobalFilter: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <CellActions row={row.original} />;
    },
  },
];
