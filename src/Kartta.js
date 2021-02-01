import React, { Component } from 'react';
 
// Import Markers On Map
import MarkersOnMap from 'markers-on-map-react';
 
// Any component you need to use
class Kartta extends Component {
    constructor(props) {
        super(props);
        this.state = { x: props.X, y: props.Y }
    }
 
  // Any lifecycle method you need to use
  componentDidMount() {
 
    // Basic initialize
    MarkersOnMap.Init({
 
      googleApiKey: 'AIzaSyBbWlHfpoDxVKnPpy3GgIg7JL1GhJH1aZk', // required => Google Maps JavaScript API Key (in string format)
 
      markerObjects: [
        // at least one object required 
        {
          markerLat: this.state.y, // marker latitude as number
          markerLong: this.state.x, // marker longitude as number
        },
      ],
    });
 
    // Select map element (ID or Class)
    MarkersOnMap.Run('div#GoogleMap');
 
  }
  
  render() {
 
    return (
 
      // Map element
      <div id="GoogleMap"></div>
 
    );
 
  }
 
}

export default Kartta