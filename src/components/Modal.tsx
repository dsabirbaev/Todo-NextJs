"use client";


import { useState, FC } from "react"
import { DATABASE, DB_ID, COLLECTION_TODOS_ID } from "@/lib/appwrite";
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
import { useToast } from "@/components/ui/use-toast";
import { IModal } from "@/types";
import { TailSpin } from 'react-loading-icons';

const Modal: FC<IModal> = ({ id }) => {

  const[text, setText] = useState("");
  const [loadingEdit, setLoadingEdit] = useState<boolean>(false);
  const { toast } = useToast()

  const editTodo = async(id: string): Promise<void> => {
    setLoadingEdit(true);
    const data ={
      text: text
    }
    try{
      const response = await DATABASE.updateDocument(DB_ID, COLLECTION_TODOS_ID, id, data)

      toast({
        title: "Updated todo",
				description: "Todo was updated successfully"
       
      })
      setLoadingEdit(false);
    }catch(error: any){
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
      setLoadingEdit(false);
    }
  }

  return (
    <Dialog>
      
      <DialogTrigger asChild>
        <Button className="bg-blue-800 hover:bg-transparent hover:text-blue-800"><FaPencil className="dark:text-white"/></Button>
      </DialogTrigger>


      <DialogContent className="max-w-[500px]">
        <div className="pt-4">
          <Textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-[300px]"/>
        </div>

        
        <DialogFooter>
          <DialogClose >
            <Button onClick={() => editTodo(id)} type="submit">
              {
                loadingEdit ? (
                  <div className="flex items-center justify-center "> 
                    <TailSpin className="w-8 h-5"/>
                  </div>
                ):
                (
                  <span>Edit</span>
                )
              }
            </Button>
          </DialogClose>
        </DialogFooter>
        
      </DialogContent>
    </Dialog>
  )
}


export default Modal;