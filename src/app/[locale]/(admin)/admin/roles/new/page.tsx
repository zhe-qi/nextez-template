import { PageHeader } from '@/components/page-header';
import { protectPage } from '@/lib/rbac';
import CreateRoleForm from './_components/create-role-form';

export default async function NewRolePage() {
  await protectPage({ permission: 'admin:all' });

  return (
    <>
      <PageHeader
        title="Create new role"
        description="Create a role which can be assigned to your users."
        linkBack="/admin/roles"
      />
      <CreateRoleForm />
    </>
  );
}
