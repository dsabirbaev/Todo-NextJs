"use client"

import { Input } from "@/components/ui/input"


const Profile = () => {

  const { email, name} = JSON.parse(localStorage.getItem("user"));

  return (
    <section>
      <div className="flex items-center justify-center w-full h-screen">
          
       <div className="border rounded-md p-5 shadow w-[400px]">
        <label htmlFor="name">
          <span className="text-[15px] text-gray-400 mb-1">Name</span>
          <Input id="name" type="text" className="mb-5" value={name}/>
        </label>

        <label htmlFor="">
          <span className="text-[15px] text-gray-400 mb-1">Email</span>
          <Input type="email" value={email}/>
        </label>
       
       </div>

      </div>
    </section>
  )
}

export default Profile