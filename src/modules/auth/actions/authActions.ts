"use server"
import z from 'zod'
import { registerSchema, signInSchema } from '../lib/zod'
import { signIn } from '@/modules/shared/lib/auth'
import { AuthError } from 'next-auth'
import prisma from '@/modules/shared/lib/prisma'
import bcrypt from 'bcryptjs'

export async function signInAction(values: z.infer<typeof signInSchema>): Promise<{ success: boolean; error: string }> {
  try {
    await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })
    return { success: true, error: "" }
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: error.cause?.err?.message || "Something went wrong" }
    }
    return { success: false, error: "Something went wrong" }
  }
}

export async function registerAction(values: z.infer<typeof registerSchema>): Promise<{ success: boolean; error: string }> {
  try {
    const { success, data } = registerSchema.safeParse(values)
    if (!success) {
      return { success: false, error: "Invalid data" }
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    })
    if (userExists) {
      return { success: false, error: "Email already exists" }
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    })

    await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })
    return { success: true, error: "" }
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: error.cause?.err?.message || "Something went wrong" }
    }
    console.error("error", error)
    return { success: false, error: "Something went wrong" }
  }
}
