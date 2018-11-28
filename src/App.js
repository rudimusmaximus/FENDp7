import React, { Component } from 'react';
import './App.css';
import NoGo from './components/NoGo';
import * as Utilities from './Utilities';
import MapMaker from './components/MapMaker';
import FilterPanel from './components/FilterPanel';
// Load our icons
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faBars);

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
              <FilterPanel />
              <main className="main, light_blue">
                  <NoGo  message={this.state.message}
                      appGreenLight={this.state.appGreenLight}
                  />
                  <div className="hamburger-title">
                      <FontAwesomeIcon
                          icon="bars"
                          color="#099dd9"
                          // size="lg"
                          className="hamburger"
                      />dfwTips - Where to go!
                  </div>
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
    //basically, make sure our script is the first one
    index.parentNode.insertBefore(script, index);
}

export default App;
