import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './Card.css'
import champion from '../../singleCharacterData'

const Card = (props) => {
  console.log(props)
  const championObject = champion[Object.keys(champion)[0]];
  const [isShown, setIsShown] = useState(false);

  return (
    <article 
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}>
      <img src={require(`../../img/loading/${props.name}_0.jpg`).default} className='champion-card'></img>
      <img src ={require(`../../img/legacyLogos/${props.tags[0]}_icon.png`).default} className='legacy-logo' title={`Class: ${props.tags}`}></img>
      {isShown && (
        <div className='hover-message'>
          <h2>{props.name}</h2>
          <h4>{props.title}</h4>
        </div>
      )}
    </article>
  )
}

export default Card;
