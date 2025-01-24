'use client';

import { signOut } from 'next-auth/react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Suspense, useEffect } from 'react';

function Logout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl: string
    = (searchParams.get('callbackUrl') as string) ?? '/';

  useEffect(() => {
    const handleLogout = async () => {
      await signOut({ redirect: true, callbackUrl });
    };
    handleLogout();
  }, [router, callbackUrl]);

  return null;
}
export default function LogoutPage() {
  return (
    <Suspense>
      <Logout />
    </Suspense>
  );
}
