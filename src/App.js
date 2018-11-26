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
      loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBQF4afYXb3lcv9KcI6BforUA1YfFBWank&v=3&callback=initMap');
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
          <div className="App">
              <NoGo  message={this.state.message}
                  appGreenLight={this.state.appGreenLight}
              />
              <h1 className="App-header">dfwTips</h1>
              <div id="map"></div>
              <MapMaker
                  markers={this.state.activeMarkers}
              />
              <ol className="tempOl">TODO:
                  <li className="done">load dfwTips data from api with error handling</li>
                  <li className="done">paint the map</li>
                  <li>load the markers using json api and utility functions</li>
                  <li>paint the search box or selectable filter</li>
                  <li>add the sidebar/menu/collapsible list</li>
                  <li>npm shorid for indexing the jsx elements</li>
                  <li>window popups for markers already done load from api</li>
                  <li className="done">parse into components as i go</li>
                  <li>testing</li>
                  <li>activate service worker and test</li>
                  <li className="done">bonus more info from another api like squarspace</li>
                  <li>THORUGHOUT check the rubric checklist in issue 1</li>
              </ol>
              <footer className="footer" id="footer">
                  Copyright (c) 2018 All Rights Reserved.
              </footer>
          </div>
      );
  }
}

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
