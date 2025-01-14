import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import * as React from 'react';
import { ThemeToggler } from './theme-toggler';

export function ModeToggle() {
  return (
    <ThemeToggler>
      <Button className="cursor-default" variant="outline" size="icon" aria-label="切换主题" role="switch" aria-checked="false">
        <Sun className="rotate-0 scale-100 transition-transform duration-300 ease-in-out dark:-rotate-90 dark:scale-0" aria-hidden="true" />
        <Moon className="absolute rotate-90 scale-0 transition-transform duration-300 ease-in-out dark:rotate-0 dark:scale-100" aria-hidden="true" />
        <span className="sr-only">切换主题模式</span>
      </Button>
    </ThemeToggler>
  );
}
