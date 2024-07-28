import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { toast } from "react-toastify-modernize";
import { useNavigate } from 'react-router-dom';

const Proof = ({task}) => {

    const [image,setImage] = useState('');
    const notify = (response) => toast.success(response.data.message);
    const challengeId = task.id;
    const personId = localStorage.getItem('person_id');
    const navigate = useNavigate();

    function imgUpload(e){
        console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = ()=>{
            setImage(reader.result);
        }
        reader.onerror = (error)=>{
            console.log("Error: "+error);
        }
    }

    const proof={
        binary:image
    }
    const uploadProof = ()=>{
        axios.post(`http://localhost:5555/upload/${personId}/${challengeId}`,proof)
        .then((response)=>{
            notify(response);
            navigate('/');
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
  return (
    <input type = "file" onChange={(e)=>{
        imgUpload(e);
        uploadProof();
    }}/>
  )
}

export default Proof
