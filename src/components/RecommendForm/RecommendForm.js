import React, { useState } from 'react';
import './RecommendForm.css'
import {Link} from 'react-router-dom'
import Card from '../Card/Card';

const RecommendForm = (props) => {
  const [classVal, setClassVal] = useState('')
  const [hpVal, setHpVal] = useState(340);
  const [movementSpeedVal, setMovementSpeedVal] = useState(315);
  const [damageVal, setDamageVal] = useState(40);
  const [recommendedChampions, setRecommendedChampions] = useState([])

  function yourRecommendedCharacter() {
    if(recommendedChampions.length > 0) {
      for (var i = recommendedChampions.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = recommendedChampions[i];
        recommendedChampions[i] = recommendedChampions[j];
        recommendedChampions[j] = temp;
      }
      console.log(recommendedChampions[0])
      return <Card key={recommendedChampions[0].id} id={recommendedChampions[0].id} name={recommendedChampions[0].name} title={recommendedChampions[0].title} tags={recommendedChampions[0].tags}/>
    } else if (recommendedChampions.length === 0 && hpVal !== 340 || recommendedChampions.length === 0 && movementSpeedVal !== 315) {
      return <h1>No Champions Found.</h1>
    } else {
      return 
    }
  }

  return (
    <form className='recommend-form'>
      <h1>Recommend Me A Champion</h1>
      <select name='recommendChampions' id='filter' onChange={(e) => setClassVal(e.target.value)} value={classVal}>
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
        <input id='minHp' type="range" min="340" max="626" onChange={(e) => setHpVal(e.target.value)}></input>
        <p>{hpVal}</p>
      </div>
      <div className='slider-div'>
        <label>Min Damage:</label>
        <input id='minDamage' type="range" min="40" max="72" defaultValue='40' onChange={(e) => setDamageVal(e.target.value)}></input>
        <p>{damageVal}</p>
      </div>
      <div className='slider-div'>
        <label>Min Movement Speed:</label>
        <input id='minMoveSpeed' type="range" min="315" max="355" onChange={(e) => setMovementSpeedVal(e.target.value)}></input>
        <p>{movementSpeedVal}</p>
      </div>
      <button id='submitButton' onClick={(e) => setRecommendedChampions(props.getRecommendations(e, classVal, hpVal, damageVal, movementSpeedVal))}>Get Recommendation</button>
      {yourRecommendedCharacter()}
      <Link to='/'><h1>Back to home</h1></Link>
    </form>
  )
}

export default RecommendForm;