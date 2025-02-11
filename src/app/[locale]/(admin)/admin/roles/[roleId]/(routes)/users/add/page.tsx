import { PageSection } from '@/components/page-header';
import prismadb from '@/lib/prismadb';
import { protectPage } from '@/lib/rbac';
import AddUserForm from '../_components/add-user-form';

type Params = Promise<{ roleId: number }>;

export default async function RolesAdminAddUsersPage(props: {
  params: Params;
}) {
  await protectPage({ permission: 'admin:all' });

  const params = await props.params;
  const roleId = Number(params.roleId);

  const selectedOptions = await prismadb.role.findUnique({
    where: { id: roleId },
    include: { users: { include: { user: true } } },
  });

  const users = await prismadb.user.findMany();

  const options = users.map(user => ({
    value: user.id,
    label: user.email,
  }));

  const selectedValues = new Set(
    selectedOptions?.users.map(user => user.userId),
  );

  return (
    <>
      <PageSection title="Users" description="Add users to this role." />
      <AddUserForm
        options={options}
        selectedValues={selectedValues}
        title="Users"
        roleId={roleId}
      />
    </>
  );
}
