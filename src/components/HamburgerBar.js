import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class HamburgerBar extends Component {
  state = {
  }
  componentDidMount = () => {
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
              />dfwTips - Where to go!
          </div>
      );
  }

}

export default HamburgerBar;
