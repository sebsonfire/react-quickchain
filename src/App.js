import React, { Component } from 'react';
import './App.css';
import Blockchain from './Blockchain';

class App extends Component {
  render() {
    return (
      <div className='wrapper'>
        <div className='container'>
          <div className='nav row'>
            <div className='logo col-md-8 col-sm-8 col-xs-8'>
              <h2>QuickChain</h2>
            </div>
            <div className='github-link col-md-4 col-sm-4 col-xs-4'>
              <a href="https://github.com/Sebastiaanvk" target="_blank"><i class="fa fa-github fa-2x" aria-hidden="true"></i></a>
            </div>
          </div>
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
