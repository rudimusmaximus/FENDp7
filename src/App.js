import React, { Component } from 'react';
import './App.css';
import NoGo from './components/NoGo';
import * as Utilities from './Utilities';
import MapMaker from './components/MapMaker';

class App extends Component {

  state = {
      markers: [{}],
      activeMarkers: [{}],
      message: "Nothing to say yet.",
      appGreenLight: true
  }

  componentDidMount () {
      //Render plain map with known center using async script outside of React
      this.renderMap();
      //Get tips from a json API 'dfwTipsAPI'
      fetch('https://rudimusmaximus.github.io/dfwTips/dfwTipsAPI.json')
          .then(Utilities.status)
          .then(Utilities.json)
          .then(data => {
              //Make map markers from the tips information
              console.log(`Request succeeded with JSON response: `, data);
              //TODO: make markers from these tips
              //TODO: make the map one time at load
          })
          .catch(error => {
              let eMessage =
              'We could not reach the dfwTipsAPI we need to make map markers.';
              console.log(`Request failed: `, error);
              this.setState({message: eMessage});
              this.setState({appGreenLight: false});
          });

  }
  renderMap = () => {
      //run script tag from outside of React
      loadScript('https://maps.googleapis.com/maps/api/js?key='+
      'AIzaSyBQF4afYXb3lcv9KcI6BforUA1YfFBWank&v=3&callback=initMap');
      window.initMap = this.initMap;
  }
  initMap = () => {
      let map = new window.google.maps.Map(document.getElementById('map'),{
          center: {lat: 32.7603, lng: -97.047797},
          zoom: 11
      });
  }
  render() {
      return (
          <div id="body-two">
              <nav className="main-drawer, dark_blue">
                  <div className="main-filter-options">
                      <select id="main-filter-select"
                          name="main-filter-select-category"
                          onChange="updateTipList()"
                      >
                          <option value="all">All Categories</option>
                          <option value="bbq">Eat BBQ</option>
                          <option value="ent">Entertainment</option>
                          <option value="mov">Watch a Movie</option>
                          <option value="air">Where's The Airport</option>
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
                      </ul>
                      <p></p>
                      <ol className="tempOl">DONE:
                          <li>paint the search box or selectable filter</li>
                          <li>paint the map</li>
                          <li>load dfwTips data from api with error handling</li>
                          <li>parse into components as i go</li>
                          <li>bonus more info from another api like squarspace</li>
                      </ol>
                  </ul>
              </nav>
              <main className="light_blue">
                  <NoGo  message={this.state.message}
                      appGreenLight={this.state.appGreenLight}
                  />
                  <h1 className="main-app-header">dfwTips</h1>
                  <div id="map"></div>
                  <footer className="footer" id="footer">
                      <a className="footer-link"
                          href="https://github.com/rudimusmaximus/dfwTips"
                      >featuring dfwTips
                      </a>
                  </footer>
              </main>
          </div>
      );
  }
}
// removed                   <MapMaker
//                      markers={this.state.activeMarkers}
//                />

/**
 * Integrates Google Maps into the react app without any external components
 * credit to Elharony walk through video
 * https://www.youtube.com/watch?v=W5LhLZqj76s
 * for the excellent approach. Also used https://snazzymaps.com/build-a-map for
 * cetner lat long, zoom level, and styling inspirations.
 */
function loadScript(url) {
    let index = window.document.getElementsByTagName("script")[0];
    let script = window.document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script, index);
}

export default App;
