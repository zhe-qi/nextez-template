import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function CreateRoleButton() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button asChild>
          <Link href="/admin/roles/new" prefetch>
            <Plus className="size-4" />
            <span className="sr-only">create role</span>
            <span className="ml-2 hidden md:block">Create role</span>
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="md:hidden" align="end">
        <p>Create role</p>
      </TooltipContent>
    </Tooltip>
  );
}
