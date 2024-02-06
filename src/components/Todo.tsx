
import { Button } from "@/components/ui/button"
import { FaRegTrashCan } from "react-icons/fa6";

import Modal from "./Modal";

const Todo = ({ data: { text, $id }, deleteTodo }) => {


  return (
    <div className="flex gap-x-5 items-center justify-between">
        <p className="line-clamp-2">{text}</p>

       
        <div className="flex items-center gap-x-2">
            <Button onClick={() => deleteTodo($id)} className="bg-red-600 hover:bg-transparent hover:text-red-600"><FaRegTrashCan /></Button>
            <Modal id={$id}/>
        </div>
    </div>
  )
  
}
export default Todo