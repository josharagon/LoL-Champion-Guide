import React from 'react';

const DropDownBox = (props) => {
  return (
    <select name='filterChampions' id='filter'>
    <option value='1'>Assassin</option>
    <option value='2'>Fighter</option>
    <option value='3'>Mage</option>
    <option value='4'>Marksman</option>
    <option value='5'>Support</option>
    <option value='6'>Tank</option>
  </select>
  )
}

export default DropDownBox;