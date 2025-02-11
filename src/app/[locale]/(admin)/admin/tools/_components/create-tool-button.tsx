'use client';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import ToolDialog from './tool-dialog';

export default function CreateToolButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={() => setIsOpen(true)}>
            <Plus className="size-4" />
            <span className="sr-only">create tool</span>
            <span className="ml-2 hidden md:block">Create tool</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="md:hidden" align="end">
          <p>Create tool</p>
        </TooltipContent>
      </Tooltip>
      <ToolDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
