import React, {Component} from 'react';
// const shortid = require('shortid');
// import shortid from 'shortid';
import List from './List';
import PropTypes from 'prop-types';

/**
 * A class that present a selection of categories from with which to filter
 * A clickalbe list of live marker titles represented on the map
 * Clicking on the list animates the corresponding map marker
 */
class FilterPanel extends Component {
  state = {
  }
  componentDidMount = () => {
      console.log(`Filter Panel component mounted`);
      // console.log("from filter panel, filtered list is ",
      //     this.props.activeMarkerStack);
  }

  /**
   * It
   *
   */
  handleFilterChange = (e) => {
      // // Force a render with a simulated state change
      // this.setState({ state: this.state });
      // this.forceUpdate();

      console.log(`The filter selection was changed.`+
      ` FilterPanel says tell state change to `, e.target.value);
      this.props.onFilterChange(e.target.value);
  }
  /**
   * It
   *
   */
  filteredTipListItemClick = (marker) => {
      console.log(`You clicked a filteredTipListItemClick with this marker `, marker);
      // this.props.onFilteredTipListItemClick(marker);//TODO: YOUARE here
  }
  render(){
      // // reset sidepanel list to avoid a ever growing listing
      // const ul = window.document.getElementById('filtered-tip-list');
      // // ul.innerHTML = '';
      console.log(`FilterPanel component rendered; Filtered tips are `,
          this.props.filteredTips);
      return (
          <nav className="drawer, dark_blue"
              id="drawer"
          >
              <div className="drawer-filter-options">
                  <select id="drawer-filter-selector"
                      name="drawer-filter-selected-category"
                      onChange={this.handleFilterChange}
                  >
                      <option value="all">All Categories</option>
                      <option value="bbq">Eat BBQ</option>
                      <option value="liv">Live Entertainment</option>
                      <option value="mov">Watch a Movie</option>
                      <option value="air">Where`s The Airport</option>
                  </select>
              </div>
              <ul id="filtered-tip-list" className="filtered-tip-list">
                  <List filteredTips={ this.props.filteredTips }/>
              </ul>
          </nav>
      );
  }

}

List.propTypes = {
    filteredTips: PropTypes.array.isRequired
};

export default FilterPanel;
