import { auth as middleware } from "@/modules/shared/lib/auth"
import { NextResponse } from "next/server"

export default middleware((req) => {
  const { nextUrl, auth } = req

  const isAdmin = auth?.user?.role === "admin"

  const path = nextUrl.pathname
  const isMedallasProtected = path.startsWith("/medallas/") && path !== "/medallas"
  const isColoresProtected = path.startsWith("/colores/") && path !== "/colores"

  if ((isMedallasProtected || isColoresProtected) && !isAdmin) {
    const redirectUrl = path.startsWith("/medallas/") ? "/medallas" : "/colores"
    return NextResponse.redirect(new URL(redirectUrl, req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}