import React from 'react';


class Navbar extends React.Component {

  render () {
    return (
      <div className={`navbar row ${this.props.isTop ? null : "scrolled-navbar"}`}>
        <div className='logo col-md-8 col-sm-8 col-xs-8'>
          <h2>QuickChain</h2>
        </div>
        <div className='github-link col-md-4 col-sm-4 col-xs-4'>
          <a href="https://www.cryptokitties.co/" target="_blank" rel="noopener noreferrer"><i className="fa fa-github fa-2x"></i></a>
        </div>
      </div>
      )
  }
}

export default Navbar;
