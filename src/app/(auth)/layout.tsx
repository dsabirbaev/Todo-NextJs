
import { Poppins } from "next/font/google";



const poppins = Poppins({ subsets: ["latin"], weight: "400" });


export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className={poppins.className}>
            {children}
        </div>     
    
  );
}
