import { PageHeader } from '@/components/page-header';
import prismadb from '@/lib/prismadb';
import { protectPage } from '@/lib/rbac';
import { KeySquare, UnlockIcon, User } from 'lucide-react';
import { Suspense } from 'react';
import CardKpi from './_components/card-kpi';
import CardKpiLoading from './_components/card-kpi-loading';

export default async function AdminPage() {
  await protectPage({ permission: 'admin:all' });

  const totalUsers = await prismadb.user.count();
  const totalRoles = await prismadb.role.count();
  const totalPermissions = await prismadb.permission.count();

  return (
    <>
      <PageHeader title="Overview" description="Admin status" />
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<CardKpiLoading />}>
          <CardKpi title="Users" Icon={User} kpi={totalUsers} />
        </Suspense>
        <Suspense fallback={<CardKpiLoading />}>
          <CardKpi title="Roles" Icon={UnlockIcon} kpi={totalRoles} />
        </Suspense>
        <Suspense fallback={<CardKpiLoading />}>
          <CardKpi
            title="Permissions"
            Icon={KeySquare}
            kpi={totalPermissions}
          />
        </Suspense>
      </div>
    </>
  );
}
