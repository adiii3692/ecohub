import React, { useEffect, useState } from 'react'
import { FaTrophy } from "react-icons/fa";
import axios from 'axios';

const Ranker = ({ranker,index}) => {

    const [username,setUsername] = useState('');
    
    const getPersonDetails = ()=>{
        axios.get(`${import.meta.env.VITE_BASE_URL}details/${ranker.person_id}`)
        .then((response)=>{
            setUsername(response.data.personDetails.username);
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

    useEffect(()=>{getPersonDetails()},[])

  return (
    <div key={'grid'+ranker.id} className='grid grid-cols-5 gap-4'>
        <div className='col-span-1' key={index+1}>{index+1}</div>
        <div className='col-span-2'>{username}</div>
        <div className='col-span-1'><FaTrophy /></div>
        <div className='col-span-1'>{ranker.amount}</div>
    </div>
  )
}

export default Ranker
