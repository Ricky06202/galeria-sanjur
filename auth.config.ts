import Google from 'next-auth/providers/google'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { signInSchema } from '@/modules/auth/lib/zod'
import prisma from '@/modules/shared/lib/prisma'
import bcrypt from 'bcryptjs'

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Google,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'your@email.com' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '*********',
        },
      },
      authorize: async (credentials) => {
        const { success, data } = await signInSchema.safeParse(credentials)
        if (!success) {
          throw new Error('Invalid data')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: data.email,
          },
        })
        if (!user || !user.password) {
          throw new Error('Invalid credentials')
        }

        const isPasswordValid = await bcrypt.compare(
          data.password,
          user.password
        )
        if (!isPasswordValid) {
          throw new Error('Invalid credentials')
        }

        return user
      },
    }),
  ],
} satisfies NextAuthConfig
