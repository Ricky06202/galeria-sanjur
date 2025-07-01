import { auth as middleware } from "@/modules/shared/lib/auth"
import { NextResponse } from "next/server"

const protectedRoutes = ["/medallas/editar", "/medallas/nueva", "/colores/editar", "/colores/nuevo"]

export default middleware((req) => {
  const { nextUrl, auth } = req

  const isAdmin = auth?.user?.role === "admin"

  const path = nextUrl.pathname
  const isProtected = protectedRoutes.some((route) => path.startsWith(route))

  if (isProtected && !isAdmin) {
    const redirectUrl = path.startsWith("/medallas/") ? "/medallas" : "/colores"
    return NextResponse.redirect(new URL(redirectUrl, req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}