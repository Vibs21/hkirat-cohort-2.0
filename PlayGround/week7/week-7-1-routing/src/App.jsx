import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css';
import React, { Suspense, lazy } from 'react';
import { useState } from 'react';
import { CountContext } from './context';
import { useContext } from 'react';
import App2 from './contextDeepDive';
const Landing = React.lazy(()=> import('./components/Landing'));
const Dashboard = lazy(()=> import('./components/Dashboard'));

function App() {

  const[count, setCount] = useState(0);

  return (
    // <BrowserRouter>
    //   <AppBar/> 
    //   <Routes>
    //     <Route path='/dashboard' element={<Suspense fallback={<div>Loading...</div>}><Dashboard/></Suspense>} />
    //     <Route path='/' element={<Suspense fallback={<div>Loading...</div>}><Landing/></Suspense>} />
    //   </Routes>
    // </BrowserRouter>
    <div>
      <CountContext.Provider value={count} >
        <Count count={count} setCount={setCount} />
      </CountContext.Provider>

      <App2></App2>
        
    </div>
  )
}

function Count({count, setCount}) {
  return <div>
    <CountRenderer count={count} />
    <Buttons count={count} setCount={setCount} />
  </div>
}

function CountRenderer() {
  const count = useContext(CountContext);
  return <div>
    renderer: {count}
  </div>
}


function Buttons({count, setCount}) {
  return(
    <div>
      <button onClick={()=> {setCount(count+1)}}>Increase</button>
      <button onClick={()=> {setCount(count-1)}}>Decrease</button>
    </div>
  )
}
// function AppBar() {
  
//     const navigate = useNavigate();

//     return <div>
//     <button onClick={()=> {navigate('/')}}>Landing</button>
//     <button onClick={()=> {navigate('/dashboard')}}>Dashboard</button>
//   </div>
// }

export default App
