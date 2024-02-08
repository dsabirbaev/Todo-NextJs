
import type { Metadata } from "next";
import { Poppins } from "next/font/google";



const poppins = Poppins({ subsets: ["latin"], weight: "400" });


export const metadata: Metadata = {
    title: "Login | Todo",
    description: "Register todo",
};
  

export default function RegisterLayout({
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