import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * A class that presents basic/'graceful' error message to the user
 */
class NoGo extends Component {
  state = {}

  render(){
      if (this.props.appGreenLight) {
          // console.log(`NoGo component rendered invisible/null. That's good.`);
          return null;
      } else {
          // console.log(`NoGo component rendered. There was an error.`);
          return (
              <div className="do_not_start_error">
                  <p className="error_intro">
                  Not this time! ***Please try again*** Curious?
                   This is what we know...
                  </p>
                  <p className="error_message"> {this.props.message}</p>
              </div>
          );
      }
  }
}

NoGo.propTypes = {
    message: PropTypes.string,
    appGreenLight: PropTypes.bool.isRequired
};

export default NoGo;
