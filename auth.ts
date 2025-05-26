import NextAuth from 'next-auth';
import { z } from 'zod';
import Credentials from 'next-auth/providers/credentials';
import { signInSchema } from './app/lib/zod';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/dashboard/login',
  },
  providers: [
    Credentials({
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const { password } = await signInSchema.parseAsync(credentials);

          if (password === (process.env.DASHBOARD_PASSWORD || '')) {
            return { id: '1', name: 'Admin' };
          }

          return null;
        } catch (error) {
          if (error instanceof z.ZodError) {
            return null;
          }
          return null;
        }
      },
    }),
  ],
});
