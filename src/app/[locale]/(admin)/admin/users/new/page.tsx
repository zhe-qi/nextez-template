import { PageHeader } from '@/components/page-header';
import { protectPage } from '@/lib/rbac';
import CreateUserForm from './_components/create-user-form';

export default async function NewUserPage() {
  await protectPage({ permission: 'admin:all' });

  return (
    <>
      <PageHeader
        title="Create new user"
        description="Add a new user to the system."
        linkBack="/admin/users"
      />
      <CreateUserForm />
    </>
  );
}
