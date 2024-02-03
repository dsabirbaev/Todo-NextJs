import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Profile | Todo",
  description: "Login todo",
};

export default function ProfileLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <>
       <Header />
       <main className="h-full">
           {children}
       </main>
       <Footer />
    </>
  )
}