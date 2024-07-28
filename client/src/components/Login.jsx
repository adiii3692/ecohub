import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { toast } from "react-toastify-modernize";
import Navbar from './Navbar.jsx';

const Login = () => {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const notify = (response) => toast.success(response.data.message);

    const logUser = ()=>{

        const user = {
            username: username,
            password: password
        }

        axios.post(`http://localhost:5555/login`,user)
        .then((response)=>{
            if (response.data.validated){
                notify(response);
                localStorage.setItem('person_id',response.data.user.id)
                navigate('/');
            }
            else{
                console.log(response.data.message);
                notify(response);
            }
        })
        .catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.data.message);
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
    }

    const [authenticated,setAuthenticated] = useState(false);
    const checkLoggedIn = ()=>{
        if (!(localStorage.getItem('person_id'))){
            console.log('Not logged in');
            setAuthenticated(false);
        }
        else{
            console.log('Logged in');
            setAuthenticated(true);
        }
    };

    useEffect(()=>{
        checkLoggedIn();
    })
  return (
    // <div className='flex flex-col h-full'>
    //     <Navbar authenticated={authenticated}/>
    //     <div className='flex justify-center items-center'>Login</div>
    //     <div className='flex flex-col'>
    //         <div className='flex justify-center'>
    //             <input type='text' value={username} placeholder='Username' onChange={(e)=>setUsername(e.target.value)}></input>
    //         </div>
    //         <div className='flex justify-center'>
    //             <input type='text' value={password} placeholder='Password' onChange={(e)=>setPassword(e.target.value)}></input>
    //         </div>
    //         <div className='flex justify-center'>
    //             <button onClick={logUser}>Login</button>
    //         </div>
    //     </div>
    // </div>

    <div className="flex flex-col h-full">
      <Navbar authenticated={authenticated}/>
      <div className="flex flex-col rounded-xl w-[400px] my-8 p-4 mx-auto bg-transparent blur-bg bg-shadow">
        <div className="p-4 flex justify-center">
          <h1 className="text-3xl font-bold">Login</h1>
        </div>
        <div className="my-4 p-white">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="wrapper-border bg-transparent text-white px-4 py-2 w-full rounded-full"
          />
        </div>
        <div className="my-4 p-white">
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="wrapper-border bg-transparent rounded-full px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 m-8 rounded-full bg-my-green" onClick={logUser}>
          <span className="text-white font-bold">Login!</span>
        </button>
        <div className="flex justify-center">
          <p>
            Don't have an account?{" "}
            <Link to={"/signup"}>
              <span className="underline">Register</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
