

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { FaRegTrashCan } from "react-icons/fa6";

import Modal from "./Modal";

interface IProps {
  text: string;
  $id: string;
  deleteTodo: (id: string) => void;
  index: number;
}



const Todo: FC<IProps> = ({ text, $id, deleteTodo, index }) => {


  return (
    <div className="flex gap-x-5 items-center justify-between border border-red-100 p-2 rounded-md hover:bg-pink-400 hover:text-white">
        
        <p className="line-clamp-2"><span className="mr-2">{index}.</span> {text}</p>

       
        <div className="flex items-center gap-x-2">
            <Button onClick={() => deleteTodo($id)} className="bg-red-600 hover:bg-transparent hover:text-red-600"><FaRegTrashCan className="dark:text-white"/></Button>
            <Modal id={$id}/>
        </div>
    </div>
  )
  
}
export default Todo