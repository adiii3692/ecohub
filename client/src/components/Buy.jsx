import React from 'react'
import { motion } from "framer-motion";
import trophy_new from '/trophy_new.png';

const Buy = (props) => {
  return (
    <motion.div className="buy-component"
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.5 }
      }}
    >
      <p>{props.commodity}</p>
      <img src={props.m} alt="Item" className="item-image" />
      <div className="price" style={{ backgroundColor: props.color }}>
        {props.price}
        <img src={trophy_new} alt="Trophy Icon" className="trophy-icon" />
      </div>
      <div className="buy-button">Buy</div>
    </motion.div>
  )
}

export default Buy
