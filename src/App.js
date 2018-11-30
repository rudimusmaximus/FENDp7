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
      selectedFilterValue: "all",
      dfwTips: [],
      message: "Nothing to say yet.",
      appGreenLight: true
  }

  componentDidMount = () => {
      this.realFilterValue = "all";//see lesson learned notes 13
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
              this.setState((state) => {
                  return { dfwTips: data };
              });
              console.log(`dfwTips data loaded into state.`);
              let googleMapsPromise = Utilities.loadGoogleMapsPromise();
              Promise.all([
                  googleMapsPromise
                  // future additional 3rd party info apis
              ])
                  .then(moreData => {
                      let google = moreData[0];//the first return (only one for now)
                      this.google = google; //keep google related out of state
                      // this.markers = [];
                      //Load it with markers made from the tips fetched above
                      // this.renderMap();
                      window.initMapWithMarkers = this.initMapWithMarkers;
                      this.initMapWithMarkers();
                      console.log(`Map rendered.`);
                  });

              //Render centered map
              //Load it with markers made from the tips fetched above
              // this.renderMap();
              // window.initMapWithMarkers = this.initMapWithMarkers;
              // this.initMapWithMarkers();
              // console.log(`Map rendered.`);
          })
          .catch(error => {
              let eMessage =
          'Problem loading APIs';
              console.log(`Request failed: `, error);
              this.setState((state) => {
                  return { message: eMessage };
              });
              this.setState((state) => {
                  return { appGreenLight: false };
              });
          });
  }

  setInitialDrawerState = () => {
      //need to read class (called after mounted) and
      //if contained, set drawerIsOpen to match
      //TODO: review. setting with class from call back triggered in
      //child component.
  }

  toggleDrawerState = () => {
      this.setState((state) => {
          return { drawerIsOpen: !this.state.drawerIsOpen };
      });
      console.log("App's toggleDrawerState just set drawerIsOpen to: ",
          this.state.drawerIsOpen);
  }

  // renderMap = () => {
  // //     //load google maps with call back for location, markers, and infor windows
  // //     Utilities.loadScript('https://maps.googleapis.com/maps/api/js?key=' +
  // //     'AIzaSyBQF4afYXb3lcv9KcI6BforUA1YfFBWank&callback=initMapWithMarkers');
  //     window.initMapWithMarkers = this.initMapWithMarkers;
  // }
  onFilterChange = (newValue) => {
      this.realFilterValue = newValue;
      this.setState((state) => {
          return {selectedFilterValue: newValue};
      });
      console.log("selectedFilterValue changed in state to ", newValue);
      console.log("this.state.selectedFilterValue is ",
          this.state.selectedFilterValue);
      console.log("Correcting, using this.realFilterValue which is ",
          this.realFilterValue);
      this.initMapWithMarkers();
  }
  // now that google maps api is loaded
  initMapWithMarkers = () => {
      console.log(`Running initMapWithMarkers`);
      // create map with starting center and zoom
      const map = new window.google.maps.Map(document.getElementById('map'), {
          center: {
              lat: 32.7603,
              lng: -97.047797
          },
          zoom: 10
      });

      // pop up info window
      const infoWindow = new window.google.maps.InfoWindow();

      //filter by active selection if necessary
      let filterValue = this.state.selectedFilterValue;
      filterValue = this.realFilterValue;//see note 13, managing locally
      let filteredTips = [];
      if (filterValue === "all") { //use them all
          console.log(`Using all the tips from dfwTipsAPI`);
          filteredTips = this.state.dfwTips;
      } else { // Just get the ones in the active selection
          console.log(`Using tips from dfwTipsAPI with category `,
              filterValue);
          filteredTips = this.state.dfwTips.filter(function(tip) {
              return (tip.short_cat_key === filterValue);
          });
          console.log(`The filteredTips are `, filteredTips);
          console.log(`The this.state.dfwTips were `, this.state.dfwTips);
      }
      //use our JSON api data to create markers
      console.log(`Dropping markers`);
      filteredTips.map((tip) => {
          //content for the info window
          const infoString = `${tip.location_name} wu-tang!`;
          //TODO: p7 create better info window with tip data
          const marker = new window.google.maps.Marker({
              position: {
                  lat: tip.lat,
                  lng: tip.lng
              },
              map: map,
              title: tip.location_name,
              animation: window.google.maps.Animation.DROP
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
          <div id = "body-two">
              <FilterPanel
                  onFilterChange={this.onFilterChange}
              />
              <main className = "main, light_blue">
                  <NoGo message = { this.state.message }
                      appGreenLight = { this.state.appGreenLight }
                  />
                  <HamburgerBar drawerIsOpen = { this.state.drawerIsOpen }
                      toggleDrawerState = { this.state.toggleDrawerState }
                  />
                  <div id = "map"> </div>
                  <footer className = "footer"
                      id = "footer"
                  >
                      <a className = "footer-link"
                          href = "https://github.com/rudimusmaximus/dfwTips"
                      >featuring dfwTips
                      </a>
                  </footer>
              </main>
          </div>
      );
  }
}

export default App;
