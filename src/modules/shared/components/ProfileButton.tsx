import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from './ui/dropdown-menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SignOutDropdownMenuItem from './SignOutDropdownMenuItem'
import SignInDropdownMenuItem from './SignInDropdownMenuItem'
import { auth } from '@/modules/shared/lib/auth'

export default async function ProfileButton() {
  const session = await auth()
  const isLoggedIn = session?.user ? true : false
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost">
          {isLoggedIn ? (
            <>
              <Avatar>
                <AvatarFallback>
                  {session?.user?.name?.charAt(0)}
                </AvatarFallback>
                <AvatarImage src={session?.user?.image || ''} />
              </Avatar>
            </>
          ) : (
            <AccountCircleIcon />
          )}
          {session?.user?.name || 'Usuario'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isLoggedIn ? <SignOutDropdownMenuItem /> : <SignInDropdownMenuItem />}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
