import React, { Component } from 'react';
import './SingleChampionView.css';
import { fetchSingleChampion } from '../../fetchAPI.js'

class SingleChampionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChampion: {
        tags: []
      },
      activeAbility: '',
    }
  }

  componentDidMount() {
    fetchSingleChampion(this.props.selectedChampionId)
      .then(singleChamp => this.setState({ selectedChampion: singleChamp}))
      .then(() => this.setState({activeAbility: this.state.selectedChampion.spells[0] }))
  }

  render() {
    if (!this.state.selectedChampion.tags.length) {
      return <h1 className='fetching-data'> LOADING DATA... </h1>
    }
    return (
      <article className='singleChamp'>
        <div className='title-tag'>
          <h3>{this.state.selectedChampion.title}</h3>
          <div>
            <img src={require(`../../img/legacyLogos/${this.state.selectedChampion.tags[0]}_icon.png`).default}></img>
            <h4>{this.state.selectedChampion.tags[0]}</h4>
          </div>
        </div>
        <h2 className='champion-name'>{this.state.selectedChampion.name}</h2>
        <p className='champion-blurb'>"{this.state.selectedChampion.blurb}" <span className='read-more'>Read More...</span></p>
        <p className='champion-lore hidden'>"{this.state.selectedChampion.lore}"</p>
        <div className='champion-abilities'>
          <h1 className='abilities-header'>Abilities</h1>
          <div className='ability-list'>
            {this.state.selectedChampion.spells.map(ability => {
              return <h3 className='ability' key={ability.name} onClick={() => this.setState({activeAbility: ability})}>{ability.name}</h3>
            })}
          </div>
          <p className='ability-description'>{this.state.activeAbility.description}</p>
        </div>
      </article>
    )
  }
}


export default SingleChampionView;