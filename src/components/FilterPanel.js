import React, {Component} from 'react';

class FilterPanel extends Component {
  state = {
  }
  componentDidMount = () => {
  }

  updateTipList(e) {
      console.log("The filter selection was changed.");
      e.stopPropagation();//TODO: compare stopPropagation to preventDefault
  }


  render(){
      console.log(`FilterPanel component rendered.`);
      return (
          <nav className="drawer, dark_blue"
              id="drawer"
          >
              <div className="drawer-filter-options">
                  <select id="drawer-filter-selector"
                      name="drawer-filter-selected-category"
                      onChange={this.updateTipList}
                  >
                      <option value="all">All Categories</option>
                      <option value="bbq">Eat BBQ</option>
                      <option value="ent">Live Entertainment</option>
                      <option value="mov">Watch a Movie</option>
                      <option value="air">Where`s The Airport</option>
                  </select>
              </div>
              <ul className="filtered-tip-list">TODO: add li s filtered list
                  <li className="filtered-tip-list-item">dfwTip One Example</li>
              </ul>
          </nav>
      );
  }

}

export default FilterPanel;
