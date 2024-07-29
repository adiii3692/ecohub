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

const Shop = () => {
    const colors = ['#18dd9d', '#fef72f', '#de982e', '#ca2fff', '#ff1e9a', '#ff1b12'];
    const names = ['T-Shirt', 'Wallet', 'Perfume', 'Shoes', 'Watch', 'iPad'];
    const images = [tshirt, wallet, purfume, shoes, watch, ipad];
    const prices = ['13', '29', '56', '77', '85', '152'];
  

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
      <div className="shop">
        <Navbar authenticated={authenticated}/>
        <div className="shop-content">
          <h1>Welcome to the Shop!</h1>
          <div className="score-container">
            <div className="score">
              <div className="score-shape">
                <img src={trophyIcon} alt="Trophy Icon" className="trophy-icon" />
              </div>
              <span>56</span>
            </div>
          </div>
          <div className="items-grid">
            {names.map((name, index) => (
              <Buy
                key={index}
                commodity={name}
                m={images[index]}
                price={prices[index]}
                color={colors[index]}
              />
            ))}
          </div>
        </div>
      </div>
    );
}

export default Shop
