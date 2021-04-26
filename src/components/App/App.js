import './App.css';
import { Component } from 'react'
import leagueLogo from '../../img/league-logo.png'
import { fetchAllChampions } from '../../fetchAPI';
import Container from '../Container/Container';
import SearchBox from '../SearchBox/SearchBox.js'
import RecommendForm from '../RecommendForm/RecommendForm.js'
import SingleChampionView from '../SingleChampionView/SingleChampionView.js'
import {
  Switch,
  Link,
  Route
} from "react-router-dom";
import DropDownBox from '../DropDownBox/DropDownBox';

class App extends Component {
  constructor() {
    super();
    this.state = {
      championData: [],
      error: '',
      searchValue: '',
      dropDownValue: '',
    }
  }

  componentDidMount = () => {
    fetchAllChampions()
      .then(data => { this.setState({ championData: data }) })
      .catch(error => this.setState({ error: error.message }))
  }

  checkForErrors = () => {
    if (this.state.error) {
      return <h1 className='error'>Error loading champions. Please try refreshing the page.</h1>
    } else if (this.state.championData?.length === 0 && !this.state.error && !this.state.searchValue) {
      return <h1 className='error'>Loading Data...</h1>
    } else if (this.state.championData?.length === 0 && !this.state.error && this.state.searchValue) {
      return <h1 className='error'>No champions found. Try a different search.</h1>
    }
  }

   getRecommendations = (e, classFilter, hpFilter, damageFilter, movementFilter) => {
    e.preventDefault();
    let recommendedChampions;
    // classFilter = 'Assassin'
    // hpFilter = 340;
    // damageFilter = 40;
    // movementFilter = 315;

    if(!classFilter) {
       recommendedChampions = this.state.championData.filter(champion => {
        return champion.stats.hp >= hpFilter && 
        champion.stats.attackdamage >= damageFilter && 
        champion.stats.movespeed >= movementFilter
      })
    } else if (classFilter) {
      let filteredRecChamps = this.state.championData.filter(champion => {
        return champion.tags.includes(classFilter)
      })
      recommendedChampions = filteredRecChamps.filter(champion => {
        return champion.stats.hp >= hpFilter && 
        champion.stats.attackdamage >= damageFilter && 
        champion.stats.movespeed >= movementFilter
      })
    }
    
    console.log(recommendedChampions)
  }


  render() {
    const { championData, searchValue, dropDownValue } = this.state
    let filterChampions;
    if (!dropDownValue) {
      filterChampions = championData.filter(champion => (
        champion.name.toLowerCase().includes(searchValue.toLowerCase())
      ))
    } else {
      const dropDownFilter = championData.filter(champion => (
        champion.tags.includes(dropDownValue)
      ))
      filterChampions = dropDownFilter.filter(champion => (
        champion.name.toLowerCase().includes(searchValue.toLowerCase())
      ))
    }
    return (
      <section>
        <Switch>
          <Route
            exact path='/'
            render={() => {
              return (
                <>
                  <nav>
                    {console.log(this.state.championData.sort((a, b) => a.stats.movespeed - b.stats.movespeed))}
                    <div className='logo-container'>
                      <img src={leagueLogo} className='league-logo' alt='league of legends logo'></img>
                      <p>eague of Legends <br></br> <br></br>Champion Guide</p>
                    </div>
                    <Link to={'/recommend'}>
                      <button className='recommend-button'>Recommend me a Champion</button>
                    </Link>
                  </nav>
                  <nav>
                    <h2>Find Your Champion!</h2>
                    <div className='filter-search'>
                      <DropDownBox handleChange={(e) => this.setState({ dropDownValue: e.target.value })} value={this.state.dropDownValue} />
                      <SearchBox placeholder='Search Champions' handleChange={(e) => this.setState({ searchValue: e.target.value })} />
                    </div>
                  </nav>
                  {this.checkForErrors()}
                  <Container championData={filterChampions} />
                </>
              )
            }}
          />
          <Route
            exact path='/recommend' render={() =>
              <RecommendForm getRecommendations={this.getRecommendations} championData={this.state.championData}/>
            }/>
          <Route
            exact path='/:id'
            render={({ match }) => {
              const champion = this.state.championData.find(champion => {
                return champion.id === match.params.id;
              })
              if (!champion) {
                return (<h1>This Champion does not exist!</h1>)
              }
              return (
                <SingleChampionView selectedChampionId={match.params.id} />
              )
            }}
          />
        </Switch>
      </section>
    )
  }
}

export default App;