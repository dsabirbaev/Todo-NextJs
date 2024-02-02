import Link from "next/link"
import { ModeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
const Header = () => {
  return (
    <header className="shadow">
       <div className="flex items-center justify-between container mx-auto h-[60px]">
        <Link href={'/'}>
            D.T
        </Link>

        <div className="flex items-center gap-x-4">
           <ModeToggle/>
           <Button variant="outline"> 
              <Link href={'/login'}>
                Login
              </Link>
            </Button>
           
        </div>
       </div>
    </header>
  )
}

export default Header