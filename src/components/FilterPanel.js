import React, {Component} from 'react';
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
  }

  /**
   * It triggers the filter change method passed down
   */
  handleFilterChange = (e) => {
      this.props.onFilterChange(e.target.value);
  }

  render(){
      return (
          <nav className="drawer, dark_blue"
              id="drawer"
          >
              <div className="drawer-filter-options">
                  <select
                      tabIndex="0"
                      id="drawer-filter-selector"
                      name="drawer-filter-selected-category"
                      onChange={this.handleFilterChange}
                  >
                      <option tabIndex="0" value="all">All Categories</option>
                      <option tabIndex="0" value="bbq">Eat BBQ</option>
                      <option tabIndex="0" value="liv">Live Entertainment</option>
                      <option tabIndex="0" value="mov">Watch a Movie</option>
                      <option tabIndex="0" value="air">Where`s The Airport</option>
                  </select>
              </div>
              <ul id="filtered-tip-list" className="filtered-tip-list">
                  <List filteredTips={ this.props.filteredTips }
                      onFilteredTipListItemClick={
                          this.props.onFilteredTipListItemClick}
                  />
              </ul>
          </nav>
      );
  }

}

FilterPanel.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    onFilteredTipListItemClick: PropTypes.func.isRequired,
    filteredTips: PropTypes.array.isRequired,
    activeMarkerStack: PropTypes.array.isRequired,
    liveFilterCategory: PropTypes.string.isRequired
};

export default FilterPanel;
