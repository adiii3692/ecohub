import React, { useEffect, useState }from 'react'
import { toast } from "react-toastify-modernize";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';

const Signup = () => {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState(''); 
    const navigate = useNavigate();
    const notify = (response) => toast.success(response.data.message);

    const signUser = ()=>{
        const user={
            username:username,
            email: email,
            password: password
        };

        axios.post(`http://localhost:5555/signup`,user)
        .then((response)=>{
            if (response.data.validated){
                notify(response);
                navigate('/login');
            }
            else{
                notify(response);
                console.log(response.data.message);
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
    };
    
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
        <div className="flex flex-col h-full">
      <Navbar authenticated={authenticated}/>
      <div data-test="signup-form" className="flex flex-col rounded-xl w-[400px] my-8 p-4 mx-auto bg-transparent blur-bg bg-shadow">
        <div className="p-4 flex justify-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
        </div>
        <div className="my-4 p-white">
          <input
            data-test = "username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="wrapper-border bg-transparent px-4 py-2 w-full rounded-full"
          />
        </div>
        <div className="my-4 p-white">
          <input
            data-test = "password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="wrapper-border bg-transparent rounded-full px-4 py-2 w-full"
          />
        </div>
        <div className="my-4 p-white">
          <input
            data-test = "email"
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="wrapper-border bg-transparent rounded-full px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 m-8 rounded-full bg-my-green" onClick={signUser}>
          <span className="text-white font-bold">Signup</span>
        </button>
      </div>
    </div>
      )
}

export default Signup
