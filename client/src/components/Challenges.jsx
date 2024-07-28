import React, { useEffect, useState } from 'react'
import Image from './Image.jsx'
import Leaderboard from './Leaderboard.jsx'
import axios from 'axios';

const Challenges = () => {

  const [challenge,setChallenge] = useState([]);

  //Get challenges
  const getChallenges = ()=>{
    axios.get(`http://localhost:5555/challenge`)
    .then((response)=>{
        setChallenge(response.data.challenges);
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

  useEffect(()=>{getChallenges()},[]);

  return (
    <div>
      <div className = 'nested'>
        <div className = "acts">
          {challenge.map((task,index)=>(
            <Image task={task} key={index}/>
          ))}
        </div>
        <div className = "scoreboard">
          <div className='flex justify-center items-center'>Leaderboard</div>
          <Leaderboard/>
        </div>
      </div>
    </div>
  )
}

export default Challenges
