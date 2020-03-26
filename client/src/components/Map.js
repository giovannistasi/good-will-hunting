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
    const createMapOptions = (map) => {
      return {
        scrollwheel: this.props.job,
        zoomControlOptions: {
          position: map.ControlPosition.RIGHT_BOTTOM,
          style: map.ZoomControlStyle.SMALL
        },
        mapTypeControlOptions: {
          position: map.ControlPosition.BOTTOM_RIGHT
        },
        draggable: this.props.job,
        rotateControl: false,
        scaleControl: false,
        streetViewControl: false,
        panControl: false,
        fullscreenControl: this.props.job,
      };
    }
    return (
      <GoogleMapReact
        options={createMapOptions}
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
