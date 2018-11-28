import React, {Component} from 'react';

class FilterPanel extends Component {
  state = {
  }
  componentDidMount = () => {
  }

  render(){
      console.log(`FilterPanel.js rendered.`);
      return (
          <nav className="main-drawer, dark_blue">
              <div className="main-filter-options">
                  <select id="main-filter-select"
                      name="main-filter-select-category"
                      onChange="updateTipList()"
                  >
                      <option value="all">All Categories</option>
                      <option value="bbq">Eat BBQ</option>
                      <option value="ent">Live Entertainment</option>
                      <option value="mov">Watch a Movie</option>
                      <option value="air">Where`s The Airport</option>
                  </select>
              </div>
              <ul id="tip-list">Filtered list appears below. TODO: add li s
                  <ol className="tempOl">TODO:
                      <li>awesome font hamburger with working toggle functionality</li>
                      <li>load the markers using json api and utility functions</li>
                      <li>add the sidebar/menu/collapsible list</li>
                      <li>npm shorid for indexing the jsx elements</li>
                      <li>window popups for markers already done load from api</li>
                      <li>activate service worker and test</li>
                  </ol>
                  <p></p>
                  <ul>
                      <li>testing</li>
                      <li>rubric checklist in issue 1</li>
                      <li>bonus more info from another api like squarspace</li>
                  </ul>
                  <p></p>
                  <ol className="tempOl">DONE:
                      <li>paint the search box or selectable filter</li>
                      <li>paint the map</li>
                      <li>load dfwTips data from api with error handling</li>
                      <li>parse into components as i go</li>
                  </ol>
              </ul>
          </nav>
      );
  }

}

export default FilterPanel;
