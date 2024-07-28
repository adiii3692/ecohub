import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading.jsx';

const Logout = () => {

    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();

    const logoutUser = ()=>{
        localStorage.removeItem('person_id');
        setLoading(false);
        navigate('/');
    };

    useEffect(()=>{
        logoutUser();
    })

  return (
    <div>
      {loading?<Loading/>:<div>Rerouting to homepage</div>}
    </div>
  )
}

export default Logout
