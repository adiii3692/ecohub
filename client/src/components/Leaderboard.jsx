import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Ranker from './Ranker.jsx';

const Leaderboard = () => {

    const [leaderboard,setLeaderboard] = useState([]);

    const getLeaderboard = ()=>{
        axios.get(`http://localhost:5555/leaderboard`)
        .then((response)=>{
            if (!(response.data.leaderboard)){
                console.log('Could not load leaderboard');
                return;
            }
            else{
                setLeaderboard(response.data.leaderboard);
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

    useEffect(()=>{getLeaderboard();},[])

  return (
    <div className='m-4'>
      {(leaderboard.length==0)?(<div>No Rankers</div>):
      (leaderboard.map((ranker,index)=>(
        <div key={index} className='flex flex-col'>
            <Ranker ranker={ranker} key={index+1} index={index}/>
        </div>
      )))}
    </div>
  )
}

export default Leaderboard
