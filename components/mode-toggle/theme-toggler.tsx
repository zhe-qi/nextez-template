'use client';

import type { ButtonProps } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { cloneElement } from 'react';

type ThemeTogglerProps = {
  children: React.ReactNode;
} & ButtonProps;

export function ThemeToggler({ children, onClick, ...props }: ThemeTogglerProps) {
  const { setTheme, theme } = useTheme();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    onClick?.(e);
  };

  // eslint-disable-next-line react/no-clone-element
  return cloneElement(children as React.ReactElement<ButtonProps>, {
    ...props,
    onClick: handleClick,
  });
}
