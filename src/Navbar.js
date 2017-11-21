import React from 'react';


class Navbar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isSolid: false
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    console.log(event);
    let app = $('#root');
    let scrollTop = event.srcElement.app.scrollHeight;
    console.log(scrollTop);
  }

  render () {
    return (
      <div className='nav row navbar'>
        <div className='logo col-md-8 col-sm-8 col-xs-8'>
          <h2>QuickChain</h2>
        </div>
        <div className='github-link col-md-4 col-sm-4 col-xs-4'>
          <a href="https://github.com/Sebastiaanvk" target="_blank" rel="noopener noreferrer"><i className="fa fa-github fa-2x"></i></a>
        </div>
      </div>
      )
  }
}

export default Navbar;
