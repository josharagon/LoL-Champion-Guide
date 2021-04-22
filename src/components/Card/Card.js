import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './Card.css'
import champion from '../../singleCharacterData'

const Card = () => {
  const championObject = champion[Object.keys(champion)[0]];
  const [isShown, setIsShown] = useState(false);

  return (
    <article 
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}>
      <img src={require(`../../img/loading/${championObject.name}_0.jpg`).default} className='champion-card'></img>
      <img src ={require(`../../img/legacyLogos/${championObject.tags[0]}_icon.png`).default} className='legacy-logo' title={`Class: ${championObject.tags}`}></img>
      {isShown && (
        <div className='hover-message'>
          <h2>{championObject.name}</h2>
          <h4>{championObject.title}</h4>
        </div>
      )}
    </article>
  )
}

export default Card;
