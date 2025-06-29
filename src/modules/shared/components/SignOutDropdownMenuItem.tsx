"use client"
import React from 'react'
import { DropdownMenuItem } from './ui/dropdown-menu'
import { signOut } from 'next-auth/react'
import { LogOutIcon } from 'lucide-react'

export default function SignOutDropdownMenuItem() {
  return <DropdownMenuItem onClick={() => signOut()}> <LogOutIcon /> Cerrar Sesión</DropdownMenuItem>
}
