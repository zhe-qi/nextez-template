'use client';

import { cn } from '@/lib/utils';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

type NavProps = {
  items: {
    href: string;
    title: string;
    type: 'parent' | 'child';
  }[];
} & React.HTMLAttributes<HTMLElement>;

export default function NavTabs({ items }: NavProps) {
  const pathname = usePathname();

  const { scrollY } = useScroll();
  const [y, setY] = useState(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setY(latest);
  });

  const useRange = (
    num: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number,
  ) => {
    const mappedValue = useMemo(() => {
      const newValue
        = ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
      const largest = Math.max(outMin, outMax);
      const smallest = Math.min(outMin, outMax);
      return Math.min(Math.max(newValue, smallest), largest);
    }, [inMax, inMin, num, outMax, outMin]);

    return mappedValue;
  };

  const navX = useRange(y, 0, 50, 0, 50);

  const durationX = y === 0 ? 0.25 : null;

  return (
    <nav
      id="nav-tabs"
      className="sticky -top-1 z-40 mb-[-3px] flex h-[46px] items-center justify-start space-x-1 overflow-x-auto border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      {items.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className="relative h-[44px]"
          style={{
            transform: `translateX(${navX}px)`,
          }}
          prefetch
        >
          <div className="m-1 rounded-md px-3 py-2 transition-all duration-75 hover:bg-muted">
            <p
              className={cn(
                'text-sm font-normal text-muted-foreground hover:text-primary',
                ((item.type === 'parent' && pathname === item.href)
                  || (item.type === 'child' && pathname.includes(item.href)))
                && 'text-primary',
              )}
            >
              {item.title}
            </p>
          </div>
          {((item.type === 'parent' && pathname === item.href)
            || (item.type === 'child' && pathname.includes(item.href))) && (
            <motion.div
              layoutId="indicator"
              transition={{
                duration: durationX,
              }}
              className="absolute bottom-0 w-full px-1.5"
            >
              <div className="h-0.5 bg-primary" />
            </motion.div>
          )}
        </Link>
      ))}
    </nav>
  );
}
