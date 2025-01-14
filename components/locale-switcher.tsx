'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { routing, usePathname } from '@/lib/i18nNavigation';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

// 语言配置
const languages = {
  en: 'English',
  zh: '中文',
};

export const LocaleSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleValueChange = (newLocale: string) => {
    // 使用 replace 而不是 push
    router.replace(`/${newLocale}${pathname}`);
  };

  return (
    <>
      <Label htmlFor="lang-switcher" className="sr-only">Language</Label>
      <Select value={locale} onValueChange={handleValueChange}>
        <SelectTrigger
          id="lang-switcher"
          className="cursor-default hover:bg-muted focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
          aria-label="lang-switcher"
        >
          <SelectValue>
            {languages[locale as keyof typeof languages]}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {routing.locales.map(elt => (
              <SelectItem key={elt} value={elt}>
                {languages[elt as keyof typeof languages]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
