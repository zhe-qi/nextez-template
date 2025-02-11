'use client';

import type { Permission } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/data-tables/data-table-column-header';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { format, formatDistanceToNow } from 'date-fns';
import { CheckCircle, XCircle } from 'lucide-react';
import CellActions from './cell-actions';

export type IColumns = {} & Permission;

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
    accessorKey: 'key',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Key" />
    ),
    cell: ({ row }) => {
      return <Badge variant="secondary">{row.original.key}</Badge>;
    },
    enableGlobalFilter: true,
  },
  {
    id: 'Active',
    accessorKey: 'is_active',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active" />
    ),
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.isActive ? 'default' : 'destructive'}>
          {row.original.isActive
            ? (
                <>
                  <CheckCircle size={16} style={{ marginRight: '5px' }} />
                  Active
                </>
              )
            : (
                <>
                  <XCircle size={16} style={{ marginRight: '5px' }} />
                  Inactive
                </>
              )}
        </Badge>
      );
    },
    enableGlobalFilter: true,
    sortingFn: (rowA, rowB) => {
      const valueA = rowA.original.isActive ? 1 : 0;
      const valueB = rowB.original.isActive ? 1 : 0;
      return valueA - valueB;
    },
  },
  {
    id: 'Created At',
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const createdAt = new Date(row.original.createdAt);
      const formattedDate = format(createdAt, 'dd-MM-yyyy');
      const formattedTime = format(createdAt, 'HH:mm:ss');
      const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="text-xs">{timeAgo}</div>
          </TooltipTrigger>
          <TooltipContent>
            <div>{`${formattedDate} ${formattedTime}`}</div>
          </TooltipContent>
        </Tooltip>
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
      const updatedAt = new Date(row.original.updatedAt);
      const formattedDate = format(updatedAt, 'dd-MM-yyyy');
      const formattedTime = format(updatedAt, 'HH:mm:ss');
      const timeAgo = formatDistanceToNow(updatedAt, { addSuffix: true });

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="text-xs">{timeAgo}</div>
          </TooltipTrigger>
          <TooltipContent>
            <div>{`${formattedDate} ${formattedTime}`}</div>
          </TooltipContent>
        </Tooltip>
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
