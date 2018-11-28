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
      console.log(`MapMaker component rendered.`);
      console.log(markersToRender);
      return (
          <div className="tempTODO">
          i will be changed from MapMaker to marker painter.
          </div>
      );
  }

}

export default MapMaker;
