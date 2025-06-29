"use client"
import React from 'react'
import { DropdownMenuItem } from './ui/dropdown-menu'
import { LogInIcon } from 'lucide-react'
import { redirect } from 'next/navigation'


export default function SignInDropdownMenuItem() {
  return (
    <DropdownMenuItem onClick={() => redirect('/login')}> <LogInIcon /> Iniciar Sesión</DropdownMenuItem>
  )
}
