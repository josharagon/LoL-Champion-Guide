import './App.css';
import { Component } from 'react'
import leagueLogo from '../../img/league-logo.png'
import { fetchAllChampions } from '../../fetchAPI';
import Container from '../Container/Container';
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
      error: ''
    }
  }

  componentDidMount = () => {
    fetchAllChampions()
      .then(data => { this.setState({ championData: data }) })
      .catch(error => this.setState({ error: error.message }))
  }

  render() {
    return (
      <section>
        <Link to='/'>
          <nav>
            <div className='logo-container'>
              <img src={leagueLogo} className='league-logo'></img>
              <p>eague of Legends <br></br> <br></br>Champion Guide</p>
            </div>
            <button className='recommend-button'>Recommend me a Champion</button>
          </nav>
        </Link>
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
            <input type='text' placeholder='Search for a Champion' className='search'></input>
          </div>
        </nav>
        <Container championData={this.state.championData} />
        <Route
          exact path ='/:id'
          render={({ match }) => {
            const champion = this.state.championData.find(champion => {
              return champion.id === match.params.id;
            })
            if(!champion) {
              return (<h1>This Champion does not exist!</h1>)
            }
            return (
              <SingleChampionView id={match.params.id} />
            )
          }}
        />
      </section>
    )
  }
}

export default App;