import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = ({authenticated}) => {

    const navigate = useNavigate();

  return (
    <div className="navbar">
      <img src='/logo.png' alt="Logo" onClick={()=>{navigate('/')}}/>
      <div onClick={()=>{navigate('/')}}>Home</div>
      <div onClick={()=>{navigate('/about')}}>About</div>
      {(authenticated)?
      (<>
        <div onClick={()=>{navigate('/shop')}}>Shop</div>
        <div onClick={()=>{navigate('/logout')}}>Logout</div>
      </>
      )
      :
      (<>
        <div onClick={()=>{navigate('/login')}}>Login</div>
        <div onClick={()=>{navigate('/signup')}}>Signup</div>
        </>)}
      
    </div>
  )
}

export default Navbar
