import React, {Component} from 'react';
// import MakeMarkers from './MakeMarkers';

class MapMaker extends Component {
  state = {
  }
  componentDidMount = () => {
      // this
      //     .props
      //     .onRefreshAllMarkers();
  }

  render(){
      let markersToRender = this.props.markers;
      // if (this.props.markers && this.props.markers.length)
      //     //shelves = this.updateMarkers();
      // 
      console.log(`MapMaker.js rendered.`)
      console.log(markersToRender);
      return (
        <div className="tempTODO">
          i will be the map.
        </div>
      );
  }

}

export default MapMaker;
