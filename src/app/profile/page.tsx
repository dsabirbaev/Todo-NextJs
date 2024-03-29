"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { ACCOUNT, STORAGE_ID, STORAGE, UNIQUE_ID, DATABASE, COLLECTION_USERS_ID, DB_ID } from "@/lib/appwrite"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Query } from "appwrite";
import { useToast } from "@/components/ui/use-toast"
import { IProfile } from "@/types"
import { Oval, TailSpin } from 'react-loading-icons'
const Profile = () => {
  const[name, setName] = useState<string>('');
  const[email, setEmail] = useState<string>('');
  const[pic, setPic] = useState<any>();
  const[userData, setUserData] = useState<IProfile[]>([]);
  const[userId, setUserId] = useState<string>('');
  const[loadingData, setLoadingData] = useState<boolean>(false);
  const[loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const { toast } = useToast()
 
  const handleCahange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      setPic(target.files[0]);
    } else {
      setPic(undefined);
    }
   
  };

  const getData = async() => {
    setLoadingData(true)
    try{
      const response = await ACCOUNT.get();
      setName(response.name)
      setEmail(response.email)
      getUserData(response.email)
      setLoadingData(false)
    }catch(error: any){
      console.log(error)
      setLoadingData(false)
    }
  }

  const sendFile = async() => {
    setLoadingUpdate(true)
    try{
      const response = await STORAGE.createFile(STORAGE_ID, UNIQUE_ID, pic);
      const res = await STORAGE.getFilePreview(STORAGE_ID, response.$id);
      
      const data = {
        email: email,
        avatar_url: res
      }
      await DATABASE.createDocument( DB_ID, COLLECTION_USERS_ID, UNIQUE_ID, data);
     
      toast({
        title: "Image uploaded",
				description: "Image uploaded successfully"
       
      })
      getData();
      setLoadingUpdate(false)
    }catch(error: any){
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message,
      })
      setLoadingUpdate(false)
    }

   
  }
 
  

  const getUserData = async(data: string) => {

    try{
      const response = await DATABASE.listDocuments(DB_ID, COLLECTION_USERS_ID, [
        Query.equal('email', data)
      ]);
      const res = response.documents.map((item) => {
        return {
          avatar_url: item.avatar_url,
          email: item.email,
          $id: item.$id,
        };
      });
      
      setUserData(res)
      response.documents.map(item => setUserId(item.$id))
    }catch(error: any){
      console.log(error)
    }
  }



  const updateUserData = async() => {
    setLoadingUpdate(true)
    try{

      const response = await STORAGE.createFile(STORAGE_ID, UNIQUE_ID, pic);
      const res = await STORAGE.getFilePreview(STORAGE_ID, response.$id);

      const data = {
        email: email,
        avatar_url: res
      }
      const x = await DATABASE.updateDocument( DB_ID, COLLECTION_USERS_ID, userId, data);


      toast({
        title: "Image updated",
				description: "Image updated successfully"
       
      })
      getData();
      setLoadingUpdate(false)
    }catch(error: any){
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
      setLoadingUpdate(false)
    }
  }

  useEffect(() => {
    getData();
    
  }, [])
  

  
 
  return (
    <section>
      <div className="flex items-center justify-center w-full h-screen flex-col">
      {
        loadingData ? (
            <div className="bg-gray-200 w-full h-full flex items-center justify-center">
              <Oval className="w-20 h-20"/>
            </div>
        ):
        (
          <div> 
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
                  <Input className="mb-2" id="picture" type="file"  onChange={(e) => handleCahange(e)}/>
                  <div className="flex gap-x-2">
                    {
                      userId ? <Button onClick={updateUserData}>
                          {
                            loadingUpdate ? (
                              <div className="flex items-center justify-center ">
                                <TailSpin className="w-8 h-5"/>
                              </div>
                            ):
                            (
                              <span>Update</span>
                            )
                          }
                        
                        </Button> : <Button onClick={sendFile}>
                          {
                            loadingUpdate ? (
                              <div className="flex items-center justify-center ">
                                <TailSpin className="w-8 h-5"/>
                              </div>
                            ):
                            (
                              <span>Upload</span>
                            )
                          }
                        </Button>  
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
        )
      }

      </div>
    </section>
  )
}

export default Profile