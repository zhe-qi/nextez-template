import { Button } from '@/components/ui/button';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function AddUserButton({ id }: { id: number }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button size="sm" asChild>
          <Link href={`/admin/roles/${id}/users/add`} prefetch>
            <Plus className="size-4" />
            <span className="sr-only">add users</span>
            <span className="ml-2 hidden md:block">Add users</span>
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="md:hidden" align="end">
        <p>Add users</p>
      </TooltipContent>
    </Tooltip>
  );
}
