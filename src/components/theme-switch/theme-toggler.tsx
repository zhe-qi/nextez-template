"use client";

import type { ButtonProps } from "@/components/ui/button";

import { useTheme } from "next-themes";

import { cloneElement } from "react";

type ThemeTogglerProps = {
  children: React.ReactNode;
} & ButtonProps;

export function ThemeToggler({
  children,
  onClick,
  ...props
}: ThemeTogglerProps) {
  const { setTheme, resolvedTheme } = useTheme();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 使用 resolvedTheme 来判断当前实际的主题状态
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    onClick?.(e);
  };

  // eslint-disable-next-line react/no-clone-element
  return cloneElement(children as React.ReactElement<ButtonProps>, {
    ...props,
    onClick: handleClick,
  });
}
