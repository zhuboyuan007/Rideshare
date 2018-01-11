import React, { Component }from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MapView from 'react-native-maps';
import isEqual from 'lodash/isEqual';

import styles from '../Styles/locatorStyles';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: false };
const ANCHOR = { x: 0.5, y: 0.5 };
const initialRegion = {
  latitude: 37.774929,
  longitude: -122.419416,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};


const propTypes = {
  region: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    latitudeDelta: PropTypes.number.isRequired,
    longitudeDelta: PropTypes.number.isRequired,
  }),
  children: PropTypes.node,
  geolocationOptions: PropTypes.shape({
    enableHighAccuracy: PropTypes.bool,
    timeout: PropTypes.number,
    maximumAge: PropTypes.number,
  }),
  heading: PropTypes.number,
  enableHack: PropTypes.bool,
  setCurrentLocation: PropTypes.func,
};

const defaultProps = {
  enableHack: false,
  geolocationOptions: GEOLOCATION_OPTIONS,
};


export default class Locator extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = {
      region: initialRegion,
      coordinate: {
        latitude: null,
        longitude: null,
      },
      error: null
    };
  }
  componentDidMount() {
    this.mounted = true;
    // If you supply a coordinate prop, we won't try to track location automatically
    // if (this.props.coordinate) return;

    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then(granted => {
          if (granted && this.mounted) this.watchLocation();
        });
    } else {
      this.watchLocation();
    }
  }
  watchLocation() {
    // eslint-disable-next-line no-undef
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const myLastPosition = this.state.coordinate;
      const coordinate = position.coords;
      const myPosition = coordinate;
      if (!isEqual(myPosition, myLastPosition)) {
        this.props.setCurrentLocation( coordinate['latitude'], coordinate['longitude'] );
      }
    }, 
    (error) => this.setState({ error: error.message }),
    this.props.geolocationOptions
    );

    // debugging
    console.log(this.state);
  }

  componentWillUnmount() {
    this.mounted = false;
    // eslint-disable-next-line no-undef
    if (this.watchID) navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    // commenting out becaue we're not embedding this in another component so 
    // it will not receive props
    // let { heading, coordinate } = this.props;
    console.log(this.props)
    const myRegion = this.props.region;
    const myCoordinate = this.props.coordinate;
    if (!myCoordinate.latitude && !myCoordinate.longitude) {
      return (
          <MapView
            style={styles.map}
            region={myRegion}
          />

      );
    }
    return (
        <MapView
          //provider={MapView.PROVIDER_GOOGLE}
          style={styles.map}
          region={myRegion}
        >
                  <MapView.Marker
                  anchor={ANCHOR}
                  pinColor="blue"
                  //style={styles.mapMarker}
                  coordinate={myCoordinate}
                  />	
        </MapView>
      );
  }
}

// Assign the proptypes to Locator class
Locator.propTypes = propTypes;
Locator.defaultProps = defaultProps;