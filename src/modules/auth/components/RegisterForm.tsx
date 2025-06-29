'use client'
import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { registerSchema } from '../lib/zod'
import { z } from 'zod'

import { Button } from '@/modules/shared/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/modules/shared/components/ui/form'
import { registerAction } from '../actions/authActions'
import { useRouter } from 'next/navigation'
import TextInput from '@/modules/shared/components/TextInput'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { GoogleIcon } from '@/modules/shared/components/icons/GoogleIcon'

export default function RegisterForm() {
  const [error, setError] = React.useState<string | null>(null)
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof registerSchema>) {
    setError(null)
    startTransition(() => {
      registerAction(values).then((result) => {
        if (result.success) {
          router.push('/medallas')
        } else {
          setError(result.error)
        }
      })
    })
  }
  return (
    <div className="flex flex-col max-w-md mx-auto justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold text-center">Register</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextInput
                    {...field}
                    label="Username"
                    placeholder="Ej: Ricardo"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextInput
                    {...field}
                    label="Email"
                    placeholder="Ej: your@email.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextInput
                    {...field}
                    label="Password"
                    placeholder="*********"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <FormMessage>{error}</FormMessage>}
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
      <Button
        variant="ghost"
        className="w-full"
        onClick={() => signIn('google', { callbackUrl: '/medallas'})}
      >
        Registrate con Google <GoogleIcon />
      </Button>
      <p className="text-center">
        ¿Ya tienes cuenta?
        <Link href="/login" className="ml-1 text-blue-500 hover:underline">
          Inicia Sesión
        </Link>
      </p>
    </div>
  )
}
