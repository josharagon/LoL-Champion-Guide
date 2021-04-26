import React from 'react'
import './RecommendForm.css'

const RecommendForm = () => {
  return (
    <form>
      <select name='recommendChampions' id='filter'>
        <option value='' defaultValue>All Classes</option>
        <option value='Assassin'>Assassin</option>
        <option value='Fighter'>Fighter</option>
        <option value='Mage'>Mage</option>
        <option value='Marksman'>Marksman</option>
        <option value='Support'>Support</option>
        <option value='Tank'>Tank</option>
      </select>
      <h1>AHHH</h1>
    </form>
  )
}

export default RecommendForm;