'use client';

import type { Tool } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/data-tables/data-table-column-header';
import { format } from 'date-fns';
import Link from 'next/link';
import CellActions from './cell-actions';

export type IColumns = {} & Tool;

export const columns: ColumnDef<IColumns>[] = [
  {
    id: 'ID',
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    enableGlobalFilter: true,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const linkName = (
        <Link href={`/admin/tools/${row.original.id}`}>
          {row.original.name}
        </Link>
      );
      return linkName;
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    enableGlobalFilter: true,
  },
  {
    id: 'Created At',
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const formattedDate = format(
        new Date(row.original.createdAt),
        'dd-MM-yyyy',
      );
      const formattedTime = format(
        new Date(row.original.createdAt),
        'HH:mm:ss',
      );

      return (
        <div className="text-xs">
          <div>{formattedDate}</div>
          <div>{formattedTime}</div>
        </div>
      );
    },
  },
  {
    id: 'Updated At',
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => {
      const formattedDate = format(
        new Date(row.original.updatedAt),
        'dd-MM-yyyy',
      );
      const formattedTime = format(
        new Date(row.original.updatedAt),
        'HH:mm:ss',
      );

      return (
        <div className="text-xs">
          <div>{formattedDate}</div>
          <div>{formattedTime}</div>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <CellActions row={row.original} />;
    },
  },
];
