import type { DefaultSession, NextAuthConfig } from 'next-auth';
import { db } from '@/server/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { verify } from '@node-rs/argon2';
import Credentials from 'next-auth/providers/credentials';
import { object, string } from 'zod';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

const signInSchema = object({
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        // 1. 验证表单字段
        const validatedFields = signInSchema.safeParse({
          email: credentials.email,
          password: credentials.password,
        });

        // 如果表单字段无效,提前返回
        if (!validatedFields.success) {
          throw new Error('Invalid credentials.');
        }

        const { email, password } = validatedFields.data;

        // 2. 查询数据库中是否存在该用户
        const user = await db.user.findUnique({
          where: { email },
        });

        // 如果用户不存在,提前返回
        if (!user) {
          throw new Error('Invalid credentials.');
        }

        // 3. 比较用户密码与数据库中的哈希密码
        if (!user.password) {
          throw new Error('Invalid credentials.');
        }

        const passwordMatch = verify(user.password, password);

        // 如果密码不匹配,提前返回
        if (!passwordMatch) {
          throw new Error('Invalid credentials.');
        }

        // 4. 登录成功,返回用户信息
        return user;
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
} satisfies NextAuthConfig;
