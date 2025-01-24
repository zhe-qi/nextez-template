import { auth } from '@/auth';
import { PageHeader } from '@/components/page-header';
import prismadb from '@/lib/prismadb';
import { protectPage } from '@/lib/rbac';
import { redirect } from 'next/navigation';
import CreateUserButton from './_components/create-user-button';
import UsersTable from './_components/users-table';

export default async function UsersAdminPage() {
  const session = await auth();

  if (!session) {
    redirect('/auth/login?callbackUrl=/admin/users');
  }

  await protectPage({ permission: 'admin:all' });

  const data = await prismadb.user.findMany({ orderBy: { updatedAt: 'desc' } });

  return (
    <>
      <PageHeader
        title="Users"
        description="Manage all user accounts."
        actions={<CreateUserButton />}
      />
      <UsersTable data={data} />
    </>
  );
}
