import type { DefaultSession, NextAuthConfig } from "next-auth";
import { getUserByEmail, getUserByUsername } from "@/data/user";
import prismadb from "@/lib/prismadb";
import { PrismaAdapter } from "@auth/prisma-adapter";

declare module "next-auth" {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface Session extends DefaultSession {
    user: {
      userId: string;
      isActive: boolean;
      role: "admin" | "user";
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
    newUser: "/auth/register",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.type === "credentials") {
        const userExists = await getUserByEmail(user?.email as string);

        if (userExists && userExists.emailVerified === false) {
          throw new Error("ConfirmEmail");
        }

        if (userExists && userExists.isActive === false) {
          return false;
        }
      }

      if (account?.provider === "google" || account?.provider === "github") {
        const userExists = await getUserByEmail(profile?.email as string);

        if (userExists && userExists.emailVerified === false) {
          throw new Error("ConfirmEmail");
        }

        if (userExists && userExists.isActive === false) {
          return false;
        }

        if (!userExists) {
          let username: string = (profile?.name as string).replace(" ", ".");

          while (true) {
            const usernameExists = await getUserByUsername(username);

            if (usernameExists) {
              username = `${username}.${Math.floor(Math.random() * 100000)}`;
            } else {
              break;
            }
          }

          await prismadb.user.create({
            data: {
              username,
              email: profile?.email as string,
              isActive: true,
              emailVerified: true,
              image: profile?.picture ?? profile?.avatar_url,
            },
          });
        } else {
          await prismadb.user.update({
            where: { email: profile?.email as string },
            data: {
              image: profile?.picture ?? profile?.avatar_url,
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user && user.email) {
        const userExists = await getUserByEmail(user?.email);

        if (userExists) {
          token.userId = userExists.id;
          token.isActive = userExists.isActive;
          token.role = userExists.isAdmin ? "admin" : "user";
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.userId = token.userId as string;
        session.user.isActive = token.isActive as boolean;
        session.user.role = token.role as "admin" | "user";
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prismadb),
  providers: [],
} satisfies NextAuthConfig;
