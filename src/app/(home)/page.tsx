
"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { ACCOUNT, DATABASE, DB_ID, COLLECTION_ID, UNIQUE_ID } from "@/lib/appwrite"
import Todo from "@/components/Todo";
import { Query } from "appwrite";
import Modal from "@/components/Modal";
export default function Home() {

  const[todoText, setTodoText] = useState<String>("");
  const[email, setEmail] = useState("");
  const[todos, setTodos] = useState([]);

  const getData = async() => {
    try{  
      const response = await ACCOUNT.get('current');
      setEmail(response.email)
      // localStorage.setItem("email", response.email);
      getTodo(response.email)
    }catch(error){
      console.log(error)
    }
  }

  const onSubmit = async() => {
   
    const data = {
      text: todoText,
      email: email,
    }
   
    try{
      const response = await DATABASE.createDocument( DB_ID, COLLECTION_ID, UNIQUE_ID, data);
      getData();

      setTodoText("");
    
    }catch(error){
      console.log(error)
    }
  }



  
  const getTodo = async(data) => {

    try{
      const response = await DATABASE.listDocuments(DB_ID, COLLECTION_ID, [
        Query.equal('email', data)

      ]);
      setTodos(response.documents);
     
    }catch(error){
      console.log(error)
    }
  }
 
  const deleteTodo = async(id) => {
    try{
      const response = await DATABASE.deleteDocument(DB_ID, COLLECTION_ID, id)
      console.log(response)
      getData();
    }catch(error){
      console.log(error)
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
                <Button onClick={onSubmit} className="p-5">Add</Button>
             </div>

              <div className="border rounded-md border-pink-300 w-[700px] p-2 flex flex-col gap-y-5">
              {
                todos?.map((item) => (
                    <Todo data={item} key={item?.$id} deleteTodo={deleteTodo}/>
                ))
              }
               
               
              </div>

            
              
            </div>
          </div>
      </div>
    </section>
  );
}
