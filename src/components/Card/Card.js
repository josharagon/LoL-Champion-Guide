import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './Card.css'
import champion from '../../singleCharacterData'
const requestImageFile = require.context('../../img/', true, /.jpg$/);

const Card = () => {
  const championObject = champion[Object.keys(champion)[0]];
  const [isShown, setIsShown] = useState(false);

  return (
    <article 
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}>
      <img src={require(`../../img/loading/${championObject.name}_0.jpg`).default}></img>
      {isShown && (
        <div className='hover-message'>
          I'll appear when you hover over the button.
        </div>
      )}
    </article>
  )
}

export default Card;
