import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * A class that presents the title and menu icon from which to open
 * the sidebar panel if it is not already open //TODO: should it toggle open/cl?
 */
class HamburgerBar extends Component {
  state = {
  }
  componentDidMount () {
  }

  /**
   * It opens or closes the filter sidebar ONLY when it is not already opens
   * becuase screen size allows
   */
  handleClick(e) {
      // media queries keep sidebar open unless under a certain size
      // when closed, activating will open or close
      document.querySelector('nav#drawer').classList.toggle('open');
      e.stopPropagation();
  }
  render(){
      return (
          <div className="hamburger-title"
              onClick={this.handleClick}
          >
              <FontAwesomeIcon
                  icon="bars"
                  color="#099dd9"
                  // size="lg"
                  className="hamburger"
                  id="hamburger-one"
                  onClick={this.handleClick}
              />dfwTips - Where to go!
          </div>
      );
  }

}

export default HamburgerBar;
