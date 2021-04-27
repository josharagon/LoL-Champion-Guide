import React from 'react'
import './Container.css'
import Card from '../Card/Card.js'

const Container = (championData) => {
  const allChampions = championData ? championData.championData.map(champion => {
    return (
      <Card key={champion.id} id={champion.id} name={champion.name} title={champion.title} tags={champion.tags}  />
    )
  }) :
  <p>Error loading Champion, try reloading your browser.</p>
  return (
    <section className='card-container'>
      {allChampions}
    </section>
  )
}
export default Container;