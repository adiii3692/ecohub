import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from './Navbar.jsx';
import Challenges from './Challenges.jsx';
import About from './About.jsx';

const Home = () => {

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
        <>
            {authenticated?
            (<>
                <Navbar authenticated={authenticated}/>
                <Challenges/>
            </>):
            <About/>}
        </>
    )
}

export default Home
