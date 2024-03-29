
import Link from "next/link"
import { FaTelegram, FaFacebook, FaInstagram } from "react-icons/fa";
const Footer = () => {

  const date = new Date().getFullYear();  
  return (
    <footer className='shadow'>
        <div className='flex items-center justify-between h-[60px] container mx-auto'>
            <div className='flex items-center gap-x-2'>
                <Link href={'/'}>
                    D.T
                </Link>
                <span className="font-bold">D-Production</span>
            </div>

            <div className='flex items-center gap-x-2 cursor-pointer text-2xl'>
                <FaFacebook className="text-blue-600 dark:text-white"/>
                <FaInstagram className="text-red-600 dark:text-white"/>
                <FaTelegram className="text-blue-300 dark:text-white"/>
            </div>
        </div>
        <div className="flex items-center justify-center bg-gray-100 py-2 font-light text-[10px] dark:text-white dark:bg-gray-800">
                © { date } Copyright: D-production
        </div>
    </footer>
  )
}

export default Footer