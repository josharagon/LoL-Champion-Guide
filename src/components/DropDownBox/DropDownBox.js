import React from 'react';

const DropDownBox = (props) => {
  return (
  <select name='filterChampions' id='filter' onChange={props.handleChange} value={props.value}>
    <option value='' defaultValue>All Classes</option>
    <option value='Assassin'>Assassin</option>
    <option value='Fighter'>Fighter</option>
    <option value='Mage'>Mage</option>
    <option value='Marksman'>Marksman</option>
    <option value='Support'>Support</option>
    <option value='Tank'>Tank</option>
  </select>
  )
}

export default DropDownBox;