// import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import CardWrapper from './component/CardWrapper'
// import Header from './component/Header'

function App() {

  useEffect( () => {
    console.log('hi from use effect');
  }, []) 
  // let counter = 3;
  // const [todos, setTodo] = useState([{
  //   id:1,
  //   title: "go to gym",
  //   desc: "go to gym everyday",
  // },
  // {
  //   id:2,
  //   title: "go to study",
  //   desc: "Study everyday",
  // }])

  // const addTodo = () => {
  //   console.log('hello')
  //   setTodo([...todos, {
  //     id: counter++,
  //     title: "go to study",
  //     desc: Math.random(),
  //   }])
  // }
  function TextComponent () {
    return (
      <div>
        Hi There Bro!
      </div>
    )
  }
  
  function TextComponent2 () {
    return (
      <div>
        Hi There from second component!
      </div>
    )
  }

  return (
    <>
      {/* <Header title={'Hello '}></Header> */}
      {/* <button onClick={addTodo}>Add a Todo</button>
      {todos.map(todo => {
        return <Todo key={todo.id} title={todo.title} desc={todo.desc} />
      })} */}
      <CardWrapper innerComponent={<TextComponent/>}/> {/* Incorrect way */}
      <CardWrapper>   {/* Correct way */}
        <TextComponent2/>
      </CardWrapper>
    </>
  )
}

// function Todo ({title, desc}) {
//     return(
//       <div>
//         <h2> {title}</h2>
//         <h4> {desc}</h4>
//       </div>
//     )
// }

export default App
