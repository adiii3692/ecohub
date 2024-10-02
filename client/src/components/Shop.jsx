import React,{useState,useEffect} from 'react'
import Navbar from './Navbar.jsx';
import trophyIcon from '/trophy_icon.png';
import ipad from '/shopPad.png';
import tshirt from '/shopClothing.png';
import watch from '/shopWatch.png';
import shoes from '/shopShoes.png';
import purfume from '/shopPerfume.png';
import wallet from '/shopWallet.png';
import Buy from './Buy.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
    const colors = ['#18dd9d', '#fef72f', '#de982e', '#ca2fff', '#ff1e9a', '#ff1b12'];
    const images = [tshirt, wallet, purfume, shoes, watch, ipad];
    const [products,setProducts] = useState([]);
    const [tickets,setTickets] = useState(0);
    const navigate = useNavigate();
    const [authenticated,setAuthenticated] = useState(false);
    
    const checkLoggedIn = ()=>{
        if (!(localStorage.getItem('person_id'))){
            console.log('Not logged in');
            setAuthenticated(false);
            navigate('/login');
        }
        else{
            console.log('Logged in');
            setAuthenticated(true);
        }
    };

    const getProducts = ()=>{
      axios.get(`http://localhost:5555/products`)
      .then((response)=>{
        setProducts(response.data.products);
        console.log(response.data.products);
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

    const getTickets = ()=>{
      axios.get(`http://localhost:5555/tickets/${localStorage.getItem('person_id')}`)
      .then((response)=>{
        setTickets(response.data.userTickets);
        console.log('Tickets: '+response.data.userTickets)
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

    const getImage = (title)=>{
      if (title.includes('Clothing')) return tshirt;
      if (title.includes('Wallet')) return wallet;
      if (title.includes('Perfume')) return purfume;
      if (title.includes('Shoes')) return shoes;
      if (title.includes('Watch')) return watch;
      if (title.includes('Pad')) return ipad;
    }

    useEffect(()=>{
        checkLoggedIn();
        getProducts();
        getTickets();
    },[])

    return (
      <div className="shop">
        <Navbar authenticated={authenticated}/>
        <div className="shop-content">
          <h1>Welcome to the Shop!</h1>
          <div className="score-container">
            <div className="score">
              <div className="score-shape">
                <img src={trophyIcon} alt="Trophy Icon" className="trophy-icon" />
              </div>
              <span>{tickets}</span>
            </div>
          </div>
          <div className="items-grid">
            {products.map((product, index) => (
              <Buy
                key={index}
                commodity={product.title}
                m={getImage(product.title)}
                price={product.price}
                color={colors[index]}
              />
            ))}
          </div>
        </div>
      </div>
    );
}

export default Shop
