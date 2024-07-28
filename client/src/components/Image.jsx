import React, { useState,useEffect } from 'react'
import Progress from './Progress.jsx';
import Proof from './Proof.jsx';

const Image = ({task}) => {

  const energyChallenge = '/energyChallenge.png';
  const plasticChallenge = '/plasticChallenge.png';
  const treeChallenge = '/treeChallenge.png';
  const zeroChallenge = '/zeroChallenge.png';
  const waterChallenge = '/waterChallenge.png';
  const compostingChallenge = '/compostingChallenge.png';

  const [src,setSrc] = useState();

  const getSrc = ()=>{
    if (task.title.includes('Energy')){
      setSrc(energyChallenge);
    }
    else if (task.title.includes('Plastic')){
      setSrc(plasticChallenge);
    }
    else if (task.title.includes('Tree')){
      setSrc(treeChallenge);
    }
    else if (task.title.includes('Zero')){
      setSrc(zeroChallenge);
    }
    else if (task.title.includes('Water')){
      setSrc(waterChallenge);
    }
    else if (task.title.includes('Compost')){
      setSrc(compostingChallenge);
    }
  }

  useEffect(()=>{getSrc();},[])
  return (
    <div>
      <div className="state">
        <p>{task.title}</p>
        <img src={src} alt="Event" />
        <div id="prog">
          <Progress task={task}/>
        </div>
        <Proof task={task}/>
      </div>
    </div>
  )
}

export default Image
