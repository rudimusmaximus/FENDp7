import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class HamburgerBar extends Component {
  state = {
  }
  componentDidMount () {
  }
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
