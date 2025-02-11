'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Loader2, SearchIcon, XCircleIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef, useTransition } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type DataTableFilterProps = {
  searchField: string;
  query?: string;
};

export function DataTableFiltersSSR({
  query,
  searchField,
}: DataTableFilterProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearching, startTransition] = useTransition();

  const handleSearch = useDebouncedCallback((query: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set('q', query);
        params.delete('page');
      } else {
        params.delete('q');
      }
      replace(`${pathname}?${params.toString()}`);
    });
  }, 300);

  const handleClearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      handleSearch('');
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="relative h-8 items-center">
        {isSearching
          ? (
              <Loader2 className="absolute left-2 top-2 size-4 animate-spin text-muted-foreground" />
            )
          : (
              <SearchIcon className="absolute left-2 top-2 size-4 text-muted-foreground" />
            )}

        <Input
          className="h-8 w-[180px] pl-8 lg:w-[250px]"
          placeholder={`Search ${searchField}...`}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={query}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              inputRef?.current?.blur();
            }
          }}
          ref={inputRef}
        />
        {query && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="absolute right-2 top-2 size-4"
                onClick={handleClearInput}
                variant="ghost"
                size="icon"
              >
                <XCircleIcon className="size-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear search</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
