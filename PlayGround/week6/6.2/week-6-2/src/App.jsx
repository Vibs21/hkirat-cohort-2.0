import axios from 'axios'
import './App.css'
import { useState } from 'react'
import { useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("https://sum-server.100xdevs.com/todos").then((res) => {
      console.log(res.data.todos);
      setTodos(res.data.todos);
    });
  }, [])
 
  return (
    <div>
        {
          todos.map(todo => (
            <Todo key={todo.id} title={todo.title} description={todo.description} />
          ))
        }
    </div>
  )
}

function Todo ({title,description}) {
  return(
    <div> 
      <h2> {title} </h2>
      <h4> {description} </h4>
    </div>
  )
}

export default App
