'use client';

import type { z } from 'zod';
import AuthTemplate from '@/components/auth/auth-template';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { confirmEmailRequestSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type FormData = z.infer<typeof confirmEmailRequestSchema>;

function ConfirmForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const error = searchParams?.get('error') ?? null;

  const form = useForm<FormData>({
    resolver: zodResolver(confirmEmailRequestSchema),
  });

  useEffect(() => {
    // eslint-disable-next-line react-web-api/no-leaked-timeout
    setTimeout(() => {
      if (error === '1') {
        toast.error('Token expired or invalid', { id: error });
      }
    }, 100);
  }, [error]);

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('请求失败');
      }

      toast('Please check your email to confirm your account');
      router.push('/auth/login');
    } catch {
      toast.error('Something went wrong, Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthTemplate>
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
        Your email address has not been confirmed yet
      </h1>
      <p className="pt-4 text-sm text-muted-foreground">
        To access all the features of our platform, please verify your email or
        request a new confirmation email.
      </p>
      <div className="my-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col items-center justify-center space-y-3">
              <Button
                size="sm"
                className="w-full"
                disabled={isLoading}
                type="submit"
              >
                {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
                Send verification
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/auth/login">Back to login</Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AuthTemplate>
  );
}

export default function ConfirmEmailPage() {
  return (
    <Suspense>
      <ConfirmForm />
    </Suspense>
  );
}
