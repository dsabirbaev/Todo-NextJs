"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { ACCOUNT, STORAGE_ID, STORAGE, UNIQUE_ID, DATABASE, COLLECTION_USERS_ID, DB_ID } from "@/lib/appwrite"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Query } from "appwrite";


const Profile = () => {
  const[name, setName] = useState<String>('');
  const[email, setEmail] = useState<String>('');
  const[pic, setPic] = useState('');
  const[userData, setUserData] = useState([]);
  const[userId, setUserId] = useState('');
  
  


  const getData = async() => {

    try{
      const response = await ACCOUNT.get();
      setName(response.name)
      setEmail(response.email)
      // console.log(response)
      getUserData(response.email)
    }catch(error){
      console.log(error)
    }
  }

  const sendFile = async() => {
   

    try{
      const response = await STORAGE.createFile(STORAGE_ID, UNIQUE_ID, pic);
      const res = await STORAGE.getFilePreview(STORAGE_ID, response.$id);
      

      const data = {
        email: email,
        avatar_url: res
      }

      const x = await DATABASE.createDocument( DB_ID, COLLECTION_USERS_ID, UNIQUE_ID, data);

      console.log(x)

      getData();

    }catch(error){
      console.log(error)
    }

   
  }
 
  

  const getUserData = async(data) => {

    try{
      const response = await DATABASE.listDocuments(DB_ID, COLLECTION_USERS_ID, [
        Query.equal('email', data)
      ]);
      
      setUserData(response.documents)
      response.documents.map(item => setUserId(item.$id))
    }catch(error){
      console.log(error)
    }
  }



  const updateUserData = async() => {
   
    try{

      const response = await STORAGE.createFile(STORAGE_ID, UNIQUE_ID, pic);
      const res = await STORAGE.getFilePreview(STORAGE_ID, response.$id);

      const data = {
        email: email,
        avatar_url: res
      }
      const x = await DATABASE.updateDocument( DB_ID, COLLECTION_USERS_ID, userId, data);

      console.log(x)

      getData();

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

       <div className="flex w-full max-w-sm items-center gap-x-4 my-5">

          {
            userId ? (
              userData?.map((item) => (
              
                <Avatar className="h-full w-20" key={item?.$id}>
                   <AvatarImage src={item?.avatar_url} className="object-cover"/>
                   <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              ))
            ): (
              <Avatar className="h-full w-20">
                
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )
           
          }
               
       <div>
          <Input className="mb-2" id="picture" type="file"  onChange={(e) => setPic(e.target.files[0])}/>
          <div className="flex gap-x-2">
          {
            userId ? <Button onClick={updateUserData}>Update</Button> : <Button onClick={sendFile}>Upload</Button>  
          }
            
        
          </div>
       </div>
       </div>

       <div className="border rounded-md p-5 shadow w-[400px]">
        <label htmlFor="name">
          <span className="text-[15px] text-gray-400 mb-1">Name</span>
          <Input id="name" type="text" className="mb-5" defaultValue={name}/>
        </label>

        <label htmlFor="">
          <span className="text-[15px] text-gray-400 mb-1">Email</span>
          <Input type="email" defaultValue={email}/>
        </label>
       
       </div>

      </div>
    </section>
  )
}

export default Profile