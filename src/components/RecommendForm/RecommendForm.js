import React, { useState } from 'react';
import './RecommendForm.css'
import {Link} from 'react-router-dom'

const RecommendForm = (props) => {
  const [hpVal, setHpVal] = useState(340);
  const [movementSpeedVal, setMovementSpeedVal] = useState(315);
  const [damageVal, setDamageVal] = useState(40);

  return (
    <form className='recommend-form'>
      <h1>Recommend Me A Champion</h1>
      <select name='recommendChampions' id='filter'>
        <option value='' defaultValue>All Classes</option>
        <option value='Assassin'>Assassin</option>
        <option value='Fighter'>Fighter</option>
        <option value='Mage'>Mage</option>
        <option value='Marksman'>Marksman</option>
        <option value='Support'>Support</option>
        <option value='Tank'>Tank</option>
      </select>
      <div className='slider-div'>
        <label>Min Hp:</label>
        <input  type="range" min="340" max="626" onChange={(e) => setHpVal(e.target.value)}></input>
        <p>{hpVal}</p>
      </div>
      <div className='slider-div'>
        <label>Min Damage:</label>
        <input type="range" min="40" max="72" defaultValue='40' onChange={(e) => setDamageVal(e.target.value)}></input>
        <p>{damageVal}</p>
      </div>
      <div className='slider-div'>
        <label>Min Movement Speed:</label>
        <input type="range" min="315" max="355" onChange={(e) => setMovementSpeedVal(e.target.value)}></input>
        <p>{movementSpeedVal}</p>
      </div>
      <button onClick={props.getRecommendations}>Get Recommendations</button>
      <Link to='/'><h1>Back to home</h1></Link>
    </form>
  )
}

export default RecommendForm;