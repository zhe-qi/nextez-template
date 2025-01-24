import { auth } from '@/auth';

import TableLoading from '@/components/admin/table-loading';

import { PageHeader } from '@/components/page-header';

import { protectPage } from '@/lib/rbac';

import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import CreateRoleButton from './_components/create-role-button';
import RolesTable from './_components/roles-table';

export default async function RolesAdminPage() {
  const session = await auth();

  if (!session) {
    redirect('/auth/login?callbackUrl=/admin/roles');
  }

  await protectPage({ permission: 'admin:all' });

  return (
    <>
      <PageHeader
        title="Roles"
        description="Manage all roles."
        actions={<CreateRoleButton />}
      />
      <Suspense fallback={<TableLoading />}>
        <RolesTable />
      </Suspense>
    </>
  );
}
