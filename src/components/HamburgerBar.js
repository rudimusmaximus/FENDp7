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

  //TODO: perhaps it should rendor or return null based on a switch like
  //the error componenet
  //H2 make shown in that approach when bigg enough to show?
  //wait....i think a requirement is that all components always show?
  //in that case a width/max-width approach could work where max was % and width
  //was say 300px!!!!!

  /**
   * It
   *
   */
  handleClick(e,props) {
      console.log(`The HamburgerBar has been clicked!`);
      let testVar = document.querySelector('nav#drawer').classList.toggle('open');
      console.log(testVar);
      e.stopPropagation();
  }
  render(){
      console.log(`HamburgerBar component rendered.`);
      return (
          <div className="hamburger-title">
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
