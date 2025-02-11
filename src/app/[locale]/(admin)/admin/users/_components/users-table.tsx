'use client';

import type { User } from '@prisma/client';
import { DataTable } from '@/components/ui/data-tables/data-table';
import { CheckCircle, Clock, Verified, XCircle } from 'lucide-react';
import { columns } from './columns';
import UsersEmptyStateTable from './users-empty-state-table';

export default function UsersTable({
  data,
}: {
  data: Omit<User, 'password'>[];
}) {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchFieldLabel="users"
      emptyState={<UsersEmptyStateTable />}
      hiddenColumns={{ 'ID': false, 'Created At': false, 'Updated At': false }}
      filters={[
        {
          column: 'Role',
          title: 'Role',
          options: [
            { label: 'Admin', value: 'true' },
            { label: 'User', value: 'false' },
          ],
          isBoolean: true,
        },
        {
          column: 'Verified',
          title: 'Verified',
          options: [
            { label: 'Verified', value: 'true', icon: Verified },
            { label: 'Pending', value: 'false', icon: Clock },
          ],
          isBoolean: true,
        },
        {
          column: 'Active',
          title: 'Active',
          options: [
            { label: 'Active', value: 'true', icon: CheckCircle },
            { label: 'Inactive', value: 'false', icon: XCircle },
          ],
          isBoolean: true,
        },
      ]}
    />
  );
}
