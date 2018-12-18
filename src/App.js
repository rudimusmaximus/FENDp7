import React, { Component } from 'react';
import './App.css';
import NoGo from './components/NoGo';
import FilterPanel from './components/FilterPanel';
import HamburgerBar from './components/HamburgerBar';
import * as Utilities from './Utilities';
// Load our icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
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
      activeMarkerStack: [],
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

      //Get tips from a json API 'dfwTipsAPI'
      fetch('https://rudimusmaximus.github.io/dfwTips/dfwTipsAPI.json')
          .then(Utilities.status)
          .then(Utilities.json)
          .then(data => {

              // create a new "state" object without mutating
              // the original state object. see readme for
              // credit to for this binding/loading data approach
              // https://www.andreasreiterer.at/connect-react-app-rest-api/
              const newState = Object.assign({}, this.state, {
                  dfwTips: data
              });
              //load the tips so we can make markers from them
              //also triggers new render
              this.setState(newState);
              // console.log(`dfwTips data loaded into state.`);
              let googleMapsPromise = Utilities.loadGoogleMapsPromise();
              Promise.all([
                  googleMapsPromise
                  // future additional 3rd party info apis
              ])
                  .then(moreData => {
                      let google = moreData[0];//the first return (only one for now)
                      this.google = google; //keep google related out of state
                      //Load it with markers made from the tips fetched above
                      window.initMapWithMarkers = this.initMapWithMarkers;
                      this.initMapWithMarkers();
                  });
          })
          .catch(error => {
              let eMessage = 'Problem loading APIs';
              // console.log(`Request failed: `, error);
              this.setState((state) => {
                  return { message: eMessage };
              });
              this.setState((state) => {
                  return { appGreenLight: false };
              });
          });
  }

  /**
   * It updates the filter value in two places and runs the initMapWithMarkers
   */
  onFilterChange = (newValue) => {
      this.realFilterValue = newValue;
      this.setState((state) => {
          return {selectedFilterValue: newValue};
      });
      this.initMapWithMarkers();
  }

  /**
   * It uses loaded google maps api to create a map with active markers
   * and information windows based on the tips retrieved
   */
  initMapWithMarkers = () => {
      this.activeMarkerStack = [];

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
          this.filteredTips = this.state.dfwTips;
      } else { // Just get the ones in the active selection
          this.filteredTips = this.state.dfwTips.filter(function(tip) {
              return (tip.short_cat_key === filterValue);
          });
      }
      const newStateTwo = Object.assign({}, this.state, {
          filteredTips: this.filteredTips
      });
      this.setState(newStateTwo);

      //use our JSON api data to create markers
      this.filteredTips.map((tip) => {
          //content for the info window
          const infoString =
            `<div aria-label="Info window for the listing just clicked on map or in filter list." id="content">
              <div id="dfwTipsInfowindow">
              <h1 tabIndex="0" id="firstHeading">${tip.location_name}</h1>
              <div id="bodyContent">
                <p tabIndex="0"><em>Our tip: </em>${tip.rudy_says_tip}</p>
                <p tabIndex="0"><em>Tell the driver: </em>${tip.address}</p>
                <a tabIndex="0" aria-label="search link" className = "search-link" href = "${tip.search_on_google}"
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

      this.setState((state) => {
          return { activeMarkerStack: this.activeMarkerStack };
      });
  } //end initMapWithMarkers

  /**
   * It replicates the click action of a marker click when same marker is clicked
   * as listing in filter panel
   */
   onFilteredTipListItemClick = (clickItemName, e) => {
       //will be called from listing clicks
       if (this.activeMarkerStack.length > 0 && clickItemName){
           //get the right marker with only the item click item name
           //this matches the marker titles when they were created
           let m = this.activeMarkerStack
               .filter(m => m.title === clickItemName)[0];
           //simulate a marker click, so it's event listener animates
           //marker by opening it's information window
           window.google.maps.event.trigger(m, 'click');
       }
       // media queries keep sidebar open unless under a certain size
       // when closed, activating will open or close
       document.querySelector('nav#drawer').classList.toggle('open');
       e.stopPropagation();

   }

   render() {
       return (
           <div id = "body-two">
               <FilterPanel
                   onFilterChange={this.onFilterChange}
                   onFilteredTipListItemClick={this.onFilteredTipListItemClick}
                   filteredTips={this.state.filteredTips}

                   // activeMarkerStack={this.state.activeMarkerStack}
                   activeMarkerStack={this.activeMarkerStack || []}
                   liveFilterCategory={this.state.selectedFilterValue}
               />
               <main className = "main, light_blue">
                   <NoGo message = { this.state.message }
                       appGreenLight = { this.state.appGreenLight }
                   />
                   <HamburgerBar />
                   <div tabIndex="0" aria-label="locations-on-a-google-map" role="application" id="map"> </div>
                   <footer tabIndex="0" aria-label="footer-with-source-data-credits" className = "footer"
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
