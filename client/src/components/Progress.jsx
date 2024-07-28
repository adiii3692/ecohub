import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Progress = ({task}) => {

    const [maxProgress,setMaxProgress] = useState(task.max_progress);
    const [currentProgress,setProgress] = useState(0);

    const [percent,setPercent] = useState((currentProgress/maxProgress*100));

    const getProgress = ()=>{
        const person_id = localStorage.getItem('person_id');
        const task_id = task.id;
        
        axios.get(`http://localhost:5555/progress/${person_id}/${task_id}`)
        .then((response)=>{
            if ((!response.data.progress)||(response.data.progress.length==0)){
                setProgress(0);
            }
            else{
                console.log(response.data.progress[0].task_progress);
                setProgress(response.data.progress[0].task_progress);
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

    useEffect(()=>{getProgress();},[])
    useEffect(()=>{setPercent((currentProgress/maxProgress*100))},[currentProgress])
    useEffect(()=>{console.log(percent)},[percent])
    useEffect(()=>{console.log(currentProgress)},[currentProgress])
  return (
    <div className='progress'>
        <span style={{width:percent}}></span>
    </div>
  )
}

export default Progress
