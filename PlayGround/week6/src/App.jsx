import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './component/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header title={'Hello '}></Header>
      <Header title={'Testing '}></Header>
    </>
  )
}

export default App
