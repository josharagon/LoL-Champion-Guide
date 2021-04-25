import './App.css';
import { Component } from 'react'
import leagueLogo from '../../img/league-logo.png'
import { fetchAllChampions } from '../../fetchAPI';
import Container from '../Container/Container';
import SearchBox from '../SearchBox/SearchBox.js'
import SingleChampionView from '../SingleChampionView/SingleChampionView.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      championData: [],
      allChampions: [],
      error: '',
      searchValue: '',
    }
  }

  componentDidMount = () => {
    fetchAllChampions()
      .then(data => { this.setState({ championData: data, allChampions: data}) })
      .catch(error => this.setState({ error: error.message }))
  }

  render() {
    const {championData, searchValue} = this.state
    const filterChampions = championData.filter(champion => (
      champion.name.toLowerCase().includes(searchValue.toLowerCase())
    ))
    return (
      <section>
        <Switch>
          <Route
            exact path='/'
            render={() => {
              return (
                <>
                  <nav>
                    <div className='logo-container'>
                      <img src={leagueLogo} className='league-logo'></img>
                      <p>eague of Legends <br></br> <br></br>Champion Guide</p>
                    </div>
                    <button className='recommend-button'>Recommend me a Champion</button>
                  </nav>
                  <nav>
                    <h2>Find Your Champion!</h2>
                    <div className='filter-search'>
                      <select name='filterChampions' id='filter'>
                        <option value='1'>Option1</option>
                        <option value='2'>Option2</option>
                        <option value='3'>Option3</option>
                        <option value='4'>Option4</option>
                        <option value='5'>Option5</option>
                      </select>
                      <SearchBox placeholder='Enter Champion Name' handleChange={(e) => this.setState({searchValue: e.target.value})} />
                    </div>
                  </nav>
                  <Container championData={filterChampions} />
                </>
              )
            }}
          />
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