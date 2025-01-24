'use client';

import type { Role, UserRole } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/data-tables/data-table-column-header';
import Link from 'next/link';
import CellActions from './cell-actions';

export type IColumns = {
  role: Role;
} & UserRole;

export const columns: ColumnDef<IColumns>[] = [
  {
    id: 'name',
    accessorKey: 'role.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" disableColumnHide />
    ),
    cell: ({ row }) => {
      const linkName = (
        <Link href={`/admin/roles/${row.original.role.id}`}>
          {row.original.role.name}
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
