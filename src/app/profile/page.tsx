"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { ACCOUNT } from "@/lib/appwrite"


const Profile = () => {
  const[name, setName] = useState<String>('');
  const[email, setEmail] = useState<String>('');

  const getData = async() => {

    try{
      const response = await ACCOUNT.get('current');
      setName(response.name)
      setEmail(response.email)
    }catch(error){
      console.log(error)
    }
  }
  
  useEffect(() => {
    getData();
  }, [])

  return (
    <section>
      <div className="flex items-center justify-center w-full h-screen flex-col">
       <h1 className="mb-5 text-4xl font-bold">
        { 
         
         `${name.charAt(0).toUpperCase()}${name.slice(1)}'s profile `
        }
       </h1>
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