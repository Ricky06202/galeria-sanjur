import NextAuth from "next-auth"
import authConfig from "/auth.config"
import { NextResponse } from "next/server"
 
const { auth: middleware } = NextAuth(authConfig)

export default middleware((req) => {
  const { nextUrl, auth } = req
  const isAdmin = auth?.user?.role === "admin"
  // Redirige de "/" a "/home"
  // if (nextUrl.pathname === "/") {
  //   return NextResponse.redirect(new URL("/home", req.url))
  // }

  // Proteger rutas /medallas/* y /colores/*, pero NO /medallas ni /colores
  const path = nextUrl.pathname

  const isMedallasProtected = path.startsWith("/medallas/") && path !== "/medallas"
  const isColoresProtected = path.startsWith("/colores/") && path !== "/colores"

  if (isMedallasProtected && !isAdmin) {
    return NextResponse.redirect(new URL("/medallas", req.url))
  }

  if (isColoresProtected && !isAdmin) {
    return NextResponse.redirect(new URL("/colores", req.url))
  }
  // Si no, sigue normalmente
  return NextResponse.next()
})