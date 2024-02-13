
"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { ACCOUNT, DATABASE, DB_ID, COLLECTION_TODOS_ID, UNIQUE_ID } from "@/lib/appwrite"
import Todo from "@/components/Todo";
import { Query } from "appwrite";
import { useToast } from "@/components/ui/use-toast"
import { IData, ITodo } from "@/types";
import { TailSpin, Bars } from 'react-loading-icons'

const Home = () => {

  
  

  const[todoText, setTodoText] = useState<string>("");
  const[email, setEmail] = useState<string>("");
  const[todos, setTodos] = useState<ITodo[]>([]);
  const[loadingAddTodo, setLoadingAddTodo] = useState<boolean>(false);
  const[loadingData, setLoadingData] = useState<boolean>(false);

  const { toast } = useToast()

  const getData = async() => {
    setLoadingData(true)
    try{  
      const response = await ACCOUNT.get();
      setLoadingData(false)
      setEmail(response.email)
      getTodo(response.email)
      
    }catch(error: any){
      console.log(error)
      setLoadingData(false)
    }
  }

  const onSubmit = async() => {
    setLoadingAddTodo(true)
    const data: IData = {
      text: todoText,
      email: email,
    }
   
    try{
      await DATABASE.createDocument( DB_ID, COLLECTION_TODOS_ID, UNIQUE_ID, data);

      toast({
        title: "Added todo",
				description: "Todo was added successfully"
       
      })
      getData();
      setTodoText("");
      setLoadingAddTodo(false)
    }catch(error: any){
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })

      setLoadingAddTodo(false)
    }
  }

  
  const getTodo = async(data: string) => {

    try{
      const response = await DATABASE.listDocuments(DB_ID, COLLECTION_TODOS_ID, [
        Query.equal('email', data)
      ]);
      
      const res = response.documents.map((item) => {
        return {
          text: item.text,
          email: item.email,
          $id: item.$id,
        };
      });

      setTodos(res);
     
    }catch(error){
      console.log(error)
    }
  }
 
  const deleteTodo = async(id: string) => {
    try{
      await DATABASE.deleteDocument(DB_ID, COLLECTION_TODOS_ID, id)
      
      toast({
        title: "Deleted todo",
				description: "Todo was deleted successfully"
       
      })

      getData();
    }catch(error: any){
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    }
  }


  useEffect(() => {
    getData();

  }, [])

  return (
    <section className="min-h-screen my-5">
      <div className="container mx-auto">
          <div className="flex items-center justify-center flex-col">
            <h1 className="text-[40px] mb-10">My Daily <span className="font-bold text-pink-500">Task</span></h1>

            <div className="flex items-center gap-x-5 flex-col">
             <div className="flex items-center gap-x-5 mb-5">

                <input value={todoText} onChange={(e) => setTodoText(e.target.value)} type="text" placeholder="Add todo" className="border p-2 rounded-lg w-[500px]"/>
                <Button onClick={onSubmit} className="p-5">
                  {
                    loadingAddTodo ? (
                      <div className="flex items-center justify-center ">
                     
                        <TailSpin className="w-8 h-5"/>
                      </div>
                    ) : (
                      <span>Add</span>
                    )
                  }

                </Button>
             </div>
  
                {
                  loadingData ? (
                    <div className="bg-slate-100 w-full h-[50vh] flex items-center justify-center">
                       <Bars className="w-20 h-20" />
                    </div>
                  ):
                  (
                    <div className="border rounded-md border-pink-300 w-[700px] p-2 flex flex-col gap-y-5">
                      {
                        [... todos].reverse().map((item, index) => (
                          <Todo text={item.text} $id={item.$id} index={index+1} key={item?.$id} deleteTodo={deleteTodo}/>
                        ))
                      }
                    </div>
                  )
                }
            </div>
          </div>
      </div>
    </section>
  );
}


export default Home;