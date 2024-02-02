import type { Metadata } from "next";
import { Poppins } from "next/font/google";



const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Login | Todo",
  description: "Login todo",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <section className={poppins.className}>
            {children}
        </section>     
    
  );
}
