import prisma from '@/modules/shared/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email')

    if (!email) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
      })
    }
    const user = await prisma.user.findUnique({
      where: { email: email },
    })
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
      })
    }
    return new Response(JSON.stringify(user.role), {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
    })
  }
}
