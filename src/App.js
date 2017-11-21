import React, { Component } from 'react';
import './App.css';
import Blockchain from './Blockchain';
import Navbar from './Navbar';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {  isTop: true };
   }

  componentDidMount() {
    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 50;
      if (isTop !== this.state.isTop) {
          this.setState({ isTop })
      }
    });
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='container'>
          <Navbar isTop={this.state.isTop}/>
          <div id='main' className='row'>
            <div className='col-md-12'>
              <Blockchain />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
