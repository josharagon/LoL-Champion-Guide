import './App.css';
import { Component } from 'react'
import Card from '../Card/Card.js'
import leagueLogo from '../../img/league-logo.png'
import { fetchAllChampions } from '../../fetchAPI';
import Container from '../Container/Container';

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
    .then(data => {this.setState({championData: data.data})})
    .catch(error => this.setState({error: error.message}))
  }

  render() {
    return (
      <section>
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
            <input type='text' placeholder='Search for a Champion' className='search'></input>
          </div>
        </nav>
        {/* <Container championData={this.state.championData}/> */}
      </section>
    )
  }
}

export default App;