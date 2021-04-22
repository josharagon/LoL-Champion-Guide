import './App.css';
import { Component } from 'react'
import leagueLogo from '../../img/league-logo.png'

class App extends Component {
  constructor() {
    super();
    this.state = {

    }
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
      </section>
    )
  }
}

export default App;