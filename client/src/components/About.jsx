import React, { useEffect, useState } from 'react'
import Navbar from './Navbar.jsx'

const About = () => {

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
    <div className="About">
      <Navbar authenticated={authenticated}/>
      <div className="content">
        <img data-test="bgimg" src='/banner.png' id="background-image" alt="Background" />
        <div id="text-container">
          <h1 id="title">EcoHub</h1>
          <div id="intro">
            A fun way to help the environment with prizes!
          </div>
        </div>
      </div>
      <div className="bottom-section">
        <div className="bottom-content">
          <h2>What is EcoHub?</h2>
          <p>
            Eco Hub encourages people all over the world to participate to take care
            of our environment. With an account, different eco-centered challenges
            will be available to complete. Each challenge will earn you trophies that
            can then be traded in for items in the shop.
          </p>
        </div>
        <img data-test="peopleimg" src='/people.png' id="people-image" alt="People participating" />
      </div>
    </div>
  )
}

export default About
