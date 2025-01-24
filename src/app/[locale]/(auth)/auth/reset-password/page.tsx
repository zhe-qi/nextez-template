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
import { resetPasswordRequestSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type FormData = z.infer<typeof resetPasswordRequestSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(resetPasswordRequestSchema),
  });

  async function onSubmit(data: FormData) {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('请求失败');
      }

      toast.success('Check your email');
      router.push('/auth/login');
    } catch {
      toast.error('Something went wrong');
    }
  }

  return (
    <AuthTemplate>
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
        Reset your password
      </h1>
      <div className="my-7">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col items-center justify-center space-y-3">
              <Button
                variant="default"
                size="sm"
                className="w-full"
                disabled={form.formState.isSubmitting}
                type="submit"
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                )}
                Reset password
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
