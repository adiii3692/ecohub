import React, { useState } from 'react'
import { Routes,Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Logout from './components/Logout.jsx';
import About from './components/About.jsx';

const App = () => {

  const [image,setImage] = useState('');

  const imgUpload = (e)=>{
    console.log(e);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = ()=>{
      console.log(reader.result);
      setImage(reader.result);
    }
    reader.onerror = (error)=>{
      console.log("Error: "+error);
    }
  }

  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/logout' element={<Logout/>}></Route>
      <Route path='/about' element={<About/>}></Route>
    </Routes>
    
  )
}

export default App
