"use client";


import { useState } from "react"
import { DATABASE, DB_ID, COLLECTION_ID } from "@/lib/appwrite";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"

import { FaPencil } from "react-icons/fa6";

const Modal = ({id}) => {

  const[text, setText] = useState("");


  const editTodo = async(id) => {

    const data ={
      text: text
    }
    try{
      const response = await DATABASE.updateDocument(DB_ID, COLLECTION_ID, id, data)
      console.log(response)
      
      
    }catch(error){
      console.log(error)
    }
  }

  return (
    <Dialog>
      
      <DialogTrigger asChild>
        <Button className="bg-blue-800 hover:bg-transparent hover:text-blue-800"><FaPencil /></Button>
      </DialogTrigger>


      <DialogContent className="max-w-[500px]">
        <div className="pt-4">
          <Textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-[300px]"/>
        </div>

        
        <DialogFooter>
          <DialogClose >
            <Button onClick={() => editTodo(id)} type="submit">Edit</Button>
          </DialogClose>
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


export default Modal;