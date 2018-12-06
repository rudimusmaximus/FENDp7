import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import NoGo from './components/NoGo';
import FilterPanel from './components/FilterPanel';
import HamburgerBar from './components/HamburgerBar';
import * as Utilities from './Utilities';
// Load our icons
// import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faBars);

/**
 * A class that returns the "dfwTips" React single page app
 */
class App extends Component {
  state = {
      message: "Nothing to say yet.",
      appGreenLight: true,
      selectedFilterValue: "all",
      dfwTips: [],
      filteredTips: [],

      map: {},
      markers: [{}],
      drawerIsOpen: false,
      activeMarkerStack: [],
      filteredTip: [],
      //TODO: maybe set a default set of filteredTips
      // since title will be same as marker title
      // pass to panel for initial render
      //verify order is state > render > did Mount > other
      //well when map is made is

  }
  /**
   * A lifecycle method that run once per lifecycle after this component and all
   * sub-components have rendered properly
   */
  componentDidMount = () => {
      this.activeMarkerStack = [];
      this.infoContentStack = [];
      this.filteredTips = [];
      this.realFilterValue = "all";//see lesson learned notes 13

      console.log(`React App did mount...checking drawer state.`);

      //Get tips from a json API 'dfwTipsAPI'
      fetch('https://rudimusmaximus.github.io/dfwTips/dfwTipsAPI.json')
          .then(Utilities.status)
          .then(Utilities.json)
          .then(data => {
              console.log(`dfwTips Request succeeded with JSON response: `, data);

              // create a new "state" object without mutating
              // the original state object. see readme for
              // credit to for this binding/loading data approach
              //TODO:              // https://www.andreasreiterer.at/connect-react-app-rest-api/
              const newState = Object.assign({}, this.state, {
                  dfwTips: data
              });
              //load the tips so we can make markers from them
              //also triggers new render
              this.setState(newState);
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
                      window.initMapWithMarkers = this.initMapWithMarkers;
                      this.initMapWithMarkers();
                      console.log(`Map rendered.`);
                  });
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
  // onClearStateActiveMarkerStack = () => {
  //     this.setState({ activeMarkerStack: [] });
  // }
  /**
   * It
   *
   */
  setInitialDrawerState = () => {
      //need to read class (called after mounted) and
      //if contained, set drawerIsOpen to match
      //TODO: review. setting with class from call back triggered in
      //child component.
  }

  /**
   * It
   *
   */
  toggleDrawerState = () => {
      this.setState((state) => {
          return { drawerIsOpen: !this.state.drawerIsOpen };
      });
      console.log("App's toggleDrawerState just set drawerIsOpen to: ",
          this.state.drawerIsOpen);
  }

  /**
   * It
   *
   */
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

  /**
   * It uses loaded google maps api to create a map with active markers
   * and information windows based on the tips retrieved
   */
  initMapWithMarkers = () => {
      console.log(`Running initMapWithMarkers`);
      // create map with starting center and zoom
      this.map = new window.google.maps.Map(document.getElementById('map'), {
          center: {
              lat: 32.7603,
              lng: -97.047797
          },
          zoom: 10,
          mapTypeControl: false
      });

      // pop up info window
      this.infoWindow = new window.google.maps.InfoWindow();

      //filter by active selection if necessary
      let filterValue = this.state.selectedFilterValue;
      filterValue = this.realFilterValue;//see note 13, managing locally
      this.filteredTips = [];
      if (filterValue === "all") { //use them all
          console.log(`Using all the tips from dfwTipsAPI`);
          this.filteredTips = this.state.dfwTips;
      } else { // Just get the ones in the active selection
          console.log(`Using tips from dfwTipsAPI with category `,
              filterValue);
          this.filteredTips = this.state.dfwTips.filter(function(tip) {
              return (tip.short_cat_key === filterValue);
          });
          console.log(`The this.filteredTips are `, this.filteredTips);
          console.log(`The this.state.dfwTips were `, this.state.dfwTips);
      }
      const newStateTwo = Object.assign({}, this.state, {
          filteredTips: this.filteredTips
      });
      this.setState(newStateTwo);

      //use our JSON api data to create markers
      console.log(`Dropping markers`);
      this.filteredTips.map((tip) => {
          //content for the info window
          const infoString =
            `<div id="content">
              <div id="dfwTipsInfowindow">
              <h1 id="firstHeading">${tip.location_name}</h1>
              <div id="bodyContent">
                <p><em>Our tip: </em>${tip.rudy_says_tip}</p>
                <p><em>Tell the driver: </em>${tip.address}</p>
                <a className = "search-link" href = "${tip.search_on_google}"
                >Google it now</a>
              </div>
            </div>`;
          //styles for marker default and mouse over highlight
          //inspired by project code 5 being stylish course material
          var droppedIcon = Utilities.makeMarkerIcon('0091ff');
          var mousedOverIcon = Utilities.makeMarkerIcon('FFFF24');
          const marker = new window.google.maps.Marker({
              position: {
                  lat: tip.lat,
                  lng: tip.lng
              },
              map: this.map,
              title: tip.location_name,
              animation: window.google.maps.Animation.DROP,
              icon: droppedIcon,
              id: tip.short_name_key
          });
          this.activeMarkerStack.push(marker);//save marker to list
          this.infoContentStack.push({id: marker.id,
              contentString: infoString
          });
          //setup marker event handlers
          marker.addListener(`mouseover`, function () {
              this.setIcon(mousedOverIcon);
          });
          marker.addListener(`mouseout`, function () {
              this.setIcon(droppedIcon);
          });
          marker.addListener('click', () => {
              this.infoWindow.setContent(infoString);
              this.infoWindow.open(this.map, marker);
          });
          return null;
      });
      // this.onClearStateActiveMarkerStack();
      // this.forceUpdate();

      this.setState((state) => {
          return { activeMarkerStack: this.activeMarkerStack };
      });
  }

  /**
   * It replicates the click action of a marker click when same marker is clicked
   * as listing in filter panel
   */
   onFilteredTipListItemClick = (m) => {//todo: or should i pass the whole listing?
       // const infoWindow = new window.google.maps.InfoWindow();

       //get info content for this marker
       const localContent = this.infoContentStack.filter(c => {
           return c.id === m.id;
       });
       //animate the right marker
       // let marker = this.activeMarkerStack.filter(m => m.id === markerId)[0];
       console.log(`App onFilteredTipListItemClick with this marker `, m);
       this.infoWindow.setContent(localContent);

       this.infoWindow.open(this.map, m);
       // console.log(this.activeMarkerStack);
       // // Force a render with a simulated state change
       // this.setState({ state: this.state });
   }

   render() {
       return (
           <div id = "body-two">
               <FilterPanel
                   onFilterChange={this.onFilterChange}
                   onFilteredTipListItemClick={this.onFilteredTipListItemClick}
                   filteredTips={this.state.filteredTips}

                   // activeMarkerStack={this.state.activeMarkerStack}
                   activeMarkerStack={this.activeMarkerStack}
                   liveFilterCategory={this.state.selectedFilterValue}
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

FilterPanel.propTypes = {
    filteredTips: PropTypes.array.isRequired
};

export default App;
