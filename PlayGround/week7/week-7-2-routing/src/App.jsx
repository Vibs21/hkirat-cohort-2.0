import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css';
import React, { Suspense, lazy } from 'react';
const Landing = React.lazy(()=> import('./components/Landing'));
const Dashboard = lazy(()=> import('./components/Dashboard'));

function App() {


  return (
    <BrowserRouter>
      <AppBar/> 
      <Routes>
        <Route path='/dashboard' element={<Suspense fallback={<div>Loading...</div>}><Dashboard/></Suspense>} />
        <Route path='/' element={<Suspense fallback={<div>Loading...</div>}><Landing/></Suspense>} />
      </Routes>
    </BrowserRouter>
  )
}

function AppBar() {
  
    const navigate = useNavigate();

    return <div>
    <button onClick={()=> {navigate('/')}}>Landing</button>
    <button onClick={()=> {navigate('/dashboard')}}>Dashboard</button>
  </div>
}

export default App
