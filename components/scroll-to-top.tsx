'use client';

import { cn } from '@/lib/utils';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export function ScrollToTop() {
  // 初始状态统一设为 false
  const [show, setShow] = useState(false);
  // 添加一个状态来追踪组件是否已经挂载
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 标记组件已挂载
    setMounted(true);

    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    // 初始化时检查滚动位置
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 如果组件未挂载，返回 null 避免服务端渲染不匹配
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'fixed right-4 bottom-4 z-50 rounded-full opacity-0 transition-all duration-300',
        show && 'opacity-100',
      )}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="回到顶部"
    >
      <ArrowUp className="size-4" />
    </Button>
  );
}
