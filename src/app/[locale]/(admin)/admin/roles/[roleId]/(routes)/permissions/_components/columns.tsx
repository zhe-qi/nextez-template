'use client';

import type { Permission, RolePermission } from '@prisma/client';

import type { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';

import { DataTableColumnHeader } from '@/components/ui/data-tables/data-table-column-header';
import Link from 'next/link';

import CellActions from './cell-actions';

export type IColumns = {
  permission: Permission;
} & RolePermission;

export const columns: ColumnDef<IColumns>[] = [
  {
    id: 'permission.name',
    accessorKey: 'permission.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" disableColumnHide />
    ),
    cell: ({ row }) => {
      const linkName = (
        <Link href={`/admin/permissions/${row.original.permission.id}`}>
          {row.original.permission.name}
        </Link>
      );
      return linkName;
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: 'permission.description',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Description"
        disableColumnHide
      />
    ),
    enableGlobalFilter: true,
  },
  {
    accessorKey: 'permission.key',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Key" disableColumnHide />
    ),
    cell: ({ row }) => {
      return <Badge variant="secondary">{row.original?.permission.key}</Badge>;
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
