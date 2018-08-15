import React from 'react';

class Footer extends React.Component {

  render() {
    let today = new Date();
    let year = today.getFullYear();
    return (
      <footer >
        <div className='row footer text-center'>
          <div className='col-md-2 col-sm-2 col-xs-2'></div>
          <div className='copyright col-md-8 col-sm-8 col-xs-8'>
            <p>Copyright<i className= "fa fa-copyright"></i>{year} SvK. All rights reserved.</p>
          </div>
          <div className='instagram col-md-2 col-sm-2 col-xs-2'>
            <a href="https://blockchain.info/payment_request?address=14LDwiSedwC5Lz9hKDS3S6W6PjyRtgjf8M" target="_blank" rel="noopener noreferrer"><i className="fa fa-bitcoin fa-2x"></i></a>
          </div>
        </div>
      </footer>
      )
  }
}

export default Footer;
