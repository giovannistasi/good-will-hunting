import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {

  static defaultProps = {
    zoom: 15,
  };



  render () {
    // function mapOptionsCreator(map) {
    //   return  {
    //     scrollwheel: false,
    //     zoomControlOptions: {
    //         position: map.ControlPosition.RIGHT_CENTER,    // as long as this is not set it works
    //         style: map.ZoomControlStyle.SMALL
    //     },
    //     mapTypeControlOptions: {
    //         position: map.ControlPosition.BOTTOM_RIGHT     // this makes the map type control disappear
    //     },
    //     draggable: false,
    //     rotateControl: false,
    //     scaleControl: false,
    //     streetViewControl: false,
    //     panControl: false,
    //   };
    // }
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLEAPIKEY }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <AnyReactComponent
          lat={this.props.center && this.props.center.lat}
          lng={this.props.center && this.props.center.lng} text={<FontAwesomeIcon icon={faMapMarkerAlt} size="3x" style={{ color: 'red' }} />} />
      </GoogleMapReact>
    );
  }
}

export default SimpleMap;
