import React, { Component } from 'react';
import './App.css';
import Blockchain from './Blockchain';
import Navbar from './Navbar';
import Footer from './Footer';

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
      <div>
        <Navbar isTop={this.state.isTop}/>
        <div className='container'>
          <div id='main'>
            <Blockchain />
          </div>
        <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
