/* eslint-disable react-refresh/only-export-components */
'use server';

import { auth } from '@/auth';
import prismadb from '@/lib/prismadb';
import { redirect } from 'next/navigation';

type RolesCheck = { role: string; permission?: never };
type PermissionsCheck = { permission: string; role?: never };

type Opts = RolesCheck | PermissionsCheck;

async function getUserRoles(userId: number) {
  const userRoles = await prismadb.userRole
    .findMany({
      where: {
        userId,
        user: { id: userId, isActive: true },
        role: { isActive: true },
      },
      select: {
        role: {
          select: {
            key: true,
          },
        },
      },
    })
    .then(userRoles => userRoles.map(userRole => userRole.role.key));

  return userRoles;
}

async function getUserPermissions(userId: number) {
  const userPermissions = await prismadb.userRole
    .findMany({
      where: {
        userId,
        user: { id: userId, isActive: true },
        role: { isActive: true },
      },
      select: {
        role: {
          select: {
            permissions: {
              where: { permission: { isActive: true } },
              select: {
                permission: {
                  select: {
                    key: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    .then(userRoles =>
      userRoles.flatMap(userRole => userRole.role.permissions),
    )
    .then(permissions =>
      permissions.map(permission => permission.permission.key),
    );

  return userPermissions;
}

async function hasRequiredPermission(permission: string): Promise<boolean> {
  const session = await auth();
  if (session) {
    const userPermissions = await getUserPermissions(
      Number(session?.user.userId),
    );
    return userPermissions.includes(permission);
  }
  return false;
}

async function hasRequiredRole(role: string): Promise<boolean> {
  const session = await auth();
  if (session) {
    const userRoles = await getUserRoles(Number(session?.user.userId));

    return userRoles.includes(role);
  }
  return false;
}

export async function userHasRequiredRole(
  userId: number,
  role: string,
): Promise<boolean> {
  const userRoles = await getUserRoles(userId);

  return userRoles.includes(role);
}

export async function userHasRequiredPermission(
  userId: number,
  permission: string,
): Promise<boolean> {
  const userPermissions = await getUserPermissions(userId);

  return userPermissions.includes(permission);
}

export async function protectPage({ role, permission }: Opts) {
  if (role) {
    const hasRole = await hasRequiredRole(role);
    if (hasRole) {
      return true;
    }
  }
  if (permission) {
    const hasPermission = await hasRequiredPermission(permission);
    if (hasPermission) {
      return true;
    }
  }

  redirect('/auth/error/?error=AccessUnauthorized');
}

export async function ProtectComponent({
  children,
  requiredRole,
  requiredPermission,
  fallback,
}:
  | {
    children: React.ReactNode;
    requiredRole: string;
    requiredPermission?: never;
    fallback?: React.ReactElement;
  }
  | {
    children: React.ReactNode;
    requiredRole?: never;
    requiredPermission: string;
    fallback?: React.ReactElement;
  }) {
  if (requiredRole) {
    const hasRoles = await hasRequiredRole(requiredRole);
    if (hasRoles) {
      return <>{children}</>;
    }
  }
  if (requiredPermission) {
    const hasPermission = await hasRequiredPermission(requiredPermission);
    if (hasPermission) {
      return <>{children}</>;
    }
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return null;
}

export async function has({ role, permission }: Opts): Promise<boolean> {
  if (role) {
    const hasRole = await hasRequiredRole(role);
    return hasRole;
  }
  if (permission) {
    const hasPermission = await hasRequiredPermission(permission);
    return hasPermission;
  }
  return false;
}
