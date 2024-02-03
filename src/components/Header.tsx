"use client"


import Link from "next/link"
import { ModeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation'
import { ACCOUNT } from "@/lib/appwrite"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {

  const { email, name} = JSON.parse(localStorage.getItem("user"));
  const router = useRouter()

  const logout = async () => {

    await ACCOUNT.deleteSession('current')
    localStorage.clear();
    router.push('/login')
   
  }

  return (

    
    <header className="shadow">
       <div className="flex items-center justify-between container mx-auto h-[60px]">
        <Link href={'/'}>
            D.T
        </Link>

        <div className="flex items-center gap-x-4">
           <ModeToggle/>
           
              {
                name ? (

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer"> 
                            <AvatarFallback>{name.slice(0,1).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-20">
                      
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                              <Link href={'/profile'}>Profile</Link>
                            
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                              Log out
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                    </DropdownMenuContent>

                  </DropdownMenu>
                  
                  
                ): (
                  <Button variant="outline"> 
                    <Link href={'/login'}>
                      Login
                    </Link>
                  </Button>
                )
              }
              
           
           
        </div>
       </div>
    </header>
  )
}

export default Header