import EmptyState from '@/components/ui/data-tables/empty-state';
import { FilePlus } from 'lucide-react';
import AddPermissionButton from './add-permission-button';

export default function AddPermissionsEmptyStateTable({ id }: { id: number }) {
  return (
    <EmptyState
      icon={FilePlus}
      title="You have no permissions for this role"
      description="You can start adding permissions"
      action={<AddPermissionButton id={id} />}
    />
  );
}
