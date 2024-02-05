
"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button"
import Todo from "@/components/Todo";

export default function Home() {

  const[todoText, setTodoText] = useState<String>("");
  
  
  

  const onSubmit = () => {


    
  }


 

  return (
    <section className="min-h-screen my-5">
      <div className="container mx-auto">
          <div className="flex items-center justify-center flex-col">
            <h1 className="text-[40px] mb-10">My Daily <span className="font-bold text-pink-500">Task</span></h1>

            <div className="flex items-center gap-x-5 flex-col">
             <div className="flex items-center gap-x-5 mb-5">

                <input value={todoText} onChange={(e) => setTodoText(e.target.value)} type="text" placeholder="Add todo" className="border p-2 rounded-lg w-[500px]"/>
                <Button onClick={onSubmit} className="p-5">Add</Button>
             </div>

              <div className="border rounded-md border-pink-300 w-[700px] p-2 flex flex-col gap-y-5">
               
               <Todo />
                
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
