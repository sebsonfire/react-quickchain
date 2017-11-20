import React, { Component } from 'react';
import './App.css';
import Blockchain from './Blockchain';
import Navbar from './Navbar';

class App extends Component {
  render() {
    return (
      <div className='wrapper'>
        <div className='container'>
          <Navbar />
          <div className='row'>
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
