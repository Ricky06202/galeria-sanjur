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
import { useSession } from 'next-auth/react'


export default function ProfileButton() {
  const session = useSession()
  const isLoggedIn = !!session?.data
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost">
          {isLoggedIn ? (
            <>
              <Avatar>
                <AvatarFallback>
                  {session?.data?.user?.name?.charAt(0)}
                </AvatarFallback>
                <AvatarImage src={session?.data?.user?.image || ''} />
              </Avatar>
            </>
          ) : (
            <AccountCircleIcon />
          )}
          {session?.data?.user?.name || 'Usuario'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isLoggedIn ? <SignOutDropdownMenuItem /> : <SignInDropdownMenuItem />}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
