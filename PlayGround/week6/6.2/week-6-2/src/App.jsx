import axios from 'axios'
import './App.css'
import { useState } from 'react'
import { useEffect } from 'react';
import UseMemo from './Component/useMemo';

function App() {

  const [todoId, setTodoId] = useState(1);
  
 
  return (
    <div>
      {/* <button onClick={()=> setTodoId(1)}>1</button>
      <button onClick={()=> setTodoId(2)}>2</button>
      <button onClick={()=> setTodoId(3)}>3</button>
        <Todo id={todoId}/> */}

      <UseMemo/>  
    </div>
  )
} 

function Todo ({id}) {

  const [todo, setTodo] = useState({});


  useEffect(() => {
    axios.get(`https://sum-server.100xdevs.com/todo?id=${id}`).then((res) => {
      console.log(res.data);
      setTodo(res.data.todo);
    });
  }, [id])

  return(
    <div> 
      <h2> {todo.title} </h2>
      <h4> {todo.description} </h4>
    </div>
  )
}

export default App
