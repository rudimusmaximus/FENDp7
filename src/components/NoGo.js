import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * A class that presents basic/'graceful' error message to the user
 */
class NoGo extends Component {
  state = {}

  render(){
      if (this.props.appGreenLight) {
          return null;
      } else {
          return (
              <div aria-label="page-not-ready-error-reload"
                  className="do_not_start_error"
              >
                  <p tabIndex="0" className="error_intro">
                  Not this time! ***Please try again by reloading page.*** Curious?
                   This is what we know...
                  </p>
                  <p tabIndex="0" className="error_message"> {this.props.message}</p>
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
