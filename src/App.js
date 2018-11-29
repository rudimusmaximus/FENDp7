import React, { Component } from 'react';
import './App.css';
import NoGo from './components/NoGo';
import FilterPanel from './components/FilterPanel';
import HamburgerBar from './components/HamburgerBar';
// import MapMaker from './components/MapMaker';
import * as Utilities from './Utilities';
// Load our icons
// import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faBars);

class App extends Component {

  state = {
      map: {},
      markers: [{}],
      activeMarkers: [{}],
      drawerIsOpen: false,
      dfwTips: [],
      message: "Nothing to say yet.",
      appGreenLight: true
  }

  componentDidMount = () =>{
      console.log(`React App did mount...checking drawer state.`);
      //TODO: determine if class contains open
      // and if we can set   this.state.drawerIsOpen accordingly

      //Get tips from a json API 'dfwTipsAPI'
      fetch('https://rudimusmaximus.github.io/dfwTips/dfwTipsAPI.json')
          .then(Utilities.status)
          .then(Utilities.json)
          .then(data => {
              console.log(`dfwTips Request succeeded with JSON response: `, data);
              //load the tips so we can make markers from them
              this.setState({dfwTips: data});
              console.log(`dfwTips data loaded into state.`);
              //Render centered map
              //Load it with markers made from the tips fetched above
              this.renderMap();
          })
          .catch(error => {
              let eMessage =
              'We could not reach the dfwTipsAPI we need to make map markers.';
              console.log(`Request failed: `, error);
              this.setState({message: eMessage});
              this.setState({appGreenLight: false});
          });
  }
  setInitialDrawerState = () => {
      //need to read class (called after mounted) and
      //if contained, set drawerIsOpen to match
      //TODO: review. setting with class from call back triggered in
      //child component.
  }
  toggleDrawerState = () => {
      this.setState({
          drawerIsOpen: !this.state.drawerIsOpen
      });
      console.log("App's toggleDrawerState just set drawerIsOpen to: ",
          this.state.drawerIsOpen);
  }
  renderMap = () => {
      //run script tag from outside of React
      loadScript('https://maps.googleapis.com/maps/api/js?key='+
      'AIzaSyBQF4afYXb3lcv9KcI6BforUA1YfFBWank&callback=initMap');
      window.initMap = this.initMap;
  }
  initMap = () => {
      // create map with starting center and zoom
      const map = new window.google.maps.Map(document.getElementById('map'),{
          center: {lat: 32.7603, lng: -97.047797},
          zoom: 10
      });

      // pop up info window
      const infoWindow = new window.google.maps.InfoWindow();

      //use our JSON api data to create markers
      this.state.dfwTips.map((tip) => {
          //content for the info window
          const infoString = `${tip.location_name} wu-tang!`;
          //TODO: p7 create better info window with tip data
          const marker = new window.google.maps.Marker({
              position: {lat: tip.lat, lng: tip.lng},
              map: map,
              title: tip.location_name
          });
          // handle marker click
          marker.addListener('click', () => {
              infoWindow.setContent(infoString);
              infoWindow.open(map, marker);
          });
          return marker;
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
                  <HamburgerBar drawerIsOpen={this.state.drawerIsOpen}
                      toggleDrawerState={this.state.toggleDrawerState}
                  />
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
