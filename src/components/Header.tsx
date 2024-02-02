import Link from "next/link"
import { ModeToggle } from "./theme-toggle"
const Header = () => {
  return (
    <header className="shadow">
       <div className="flex items-center justify-between container mx-auto h-[60px]">
        <Link href={'/'}>
            D.T
        </Link>

        <div className="flex items-center gap-x-4">
           <ModeToggle/>
            <button>
                Login
            </button>
        </div>
       </div>
    </header>
  )
}

export default Header