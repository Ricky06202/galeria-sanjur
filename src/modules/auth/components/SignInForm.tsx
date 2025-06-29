'use client'
import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { signInSchema } from '../lib/zod'
import { z } from 'zod'

import { Button } from '@/modules/shared/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/modules/shared/components/ui/form'
import { Input } from '@/modules/shared/components/ui/input'
import { signInAction } from '../actions/authActions'
import TextInput from '@/modules/shared/components/TextInput'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { GoogleIcon } from '@/modules/shared/components/icons/GoogleIcon'

export default function SignInForm() {
  const [error, setError] = React.useState<string | null>(null)
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof signInSchema>) {
    setError(null)
    startTransition(() => {
      signInAction(values).then((result) => {
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
      <h1 className="text-2xl font-bold text-center">Iniciar Sesión</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextInput
                    {...field}
                    label="Email"
                    placeholder="your@email.com"
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
                    placeholder="your@email.com"
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
            disabled={isPending}
          >
            Submit
          </Button>
        </form>
      </Form>
      <Button
        variant="ghost"
        className="w-full"
        onClick={() => signIn('google', { callbackUrl: '/medallas' })}
      >
        Iniciar Sesión con Google <GoogleIcon />
      </Button>
      <p className="text-center">
        ¿No tienes cuenta?
        <Link href="/register" className="ml-1 text-blue-500 hover:underline">
          Regístrate
        </Link>
      </p>
    </div>
  )
}
