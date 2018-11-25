import React, { Component } from 'react';

class NoGo extends Component {
  state = {}
  componentDidMount = () => {
    console.log('component NoGo.js did mount');
    let tellUser = this.props.message;
    console.log(`NoGoError.js rendered.`)
    console.log(tellUser);
  }

  render() {
    if (this.props.appGreenLight) {
      return null;
    } else {
      return ( 
        <div className="do_not_start">
          not this time!please
          try again.this is what we know: 
        </div>
      );
    }
  }
}

export default NoGo;
