'use client';

import { cn } from '@/lib/utils';

import { useMotionValueEvent, useScroll } from 'motion/react';

import { useEffect, useState } from 'react';

import DesktopNav from './desktop-nav';
import MobileNav from './mobile-nav';

export type INavigation = {
  name: string;
  href: string;
};
const navigation: INavigation[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
];

export default function Navbar() {
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { scrollY } = useScroll();
  const [y, setY] = useState(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setY(latest);
  });

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    } else {
      const isNavTabsUsed = document.querySelector('#nav-tabs') !== null;
      setShowStickyNav(!isNavTabsUsed);
    }
  }, [mounted]);

  return (
    <header
      className={cn(
        showStickyNav
        && 'sticky top-0 z-40 flex h-14 items-center justify-start overflow-x-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        !showStickyNav && 'flex h-14 w-full',
        y > 56
        && 'after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-border after:content-[\'\']',
      )}
    >
      <DesktopNav navigation={navigation} />
      <MobileNav navigation={navigation} />
    </header>
  );
}
