import React, { Component } from 'react';
import './SingleChampionView.css';
import { fetchSingleChampion } from '../../fetchAPI.js'
import { Link } from 'react-router-dom'

class SingleChampionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChampion: {
        tags: []
      },
      activeAbility: '',
      activeSkin: '',
    }
  }

  componentDidMount() {
    fetchSingleChampion(this.props.selectedChampionId)
      .then(singleChamp => this.setState({ selectedChampion: singleChamp }))
      .then(() => this.setState({ activeAbility: this.state.selectedChampion.spells[0], activeSkin: this.state.selectedChampion.skins[0] }))
  }

  render() {
    if (!this.state.selectedChampion.tags.length || !this.state.activeSkin) {
      return <h1 className='fetching-data'> LOADING DATA... </h1>
    }
    return (
      <article className='singleChamp' style={{
        background:
          `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${require(`../../img/splash/${this.state.selectedChampion.name.replace(/\s/g, '')}_${this.state.activeSkin.num}.jpg`).default})`
      }}>
        <Link to='/'>
          <h4>Back to home</h4>
        </Link>
        <div className='title-tag'>
          <h3>{this.state.selectedChampion.title}</h3>
          <div>
            <img src={require(`../../img/legacyLogos/${this.state.selectedChampion.tags[0]}_icon.png`).default} alt='champion-class'></img>
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
              return (
                <div className='ability' key={ability.name} onClick={() => this.setState({ activeAbility: ability })}>
                  <img src={require(`../../img/spell/${ability.image.full}`).default} alt={`${ability.name}`}></img>
                  <h3>{ability.name}</h3>
                </div>
                )
            })}
          </div>
          <p className='ability-description'>{this.state.activeAbility.name}: {this.state.activeAbility.description}</p>
        </div>
        <div className='champion-skins'>
          <h2 className='abilities-header'>Skins</h2>
          <div className='skin-list'>
            {this.state.selectedChampion.skins.map(skin => {
              return <h3 className='skin' key={skin.name} onClick={() => this.setState({ activeSkin: skin })}>{skin.name}</h3>
            })}
          </div>

        </div>
      </article>
    )
  }
}


export default SingleChampionView;