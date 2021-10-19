import * as React from "react";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useRef, useEffect, Component } from "react";
import { render } from "react-dom";
import { styles } from "../shared/Styles";

const mapRef = React.createRef();
// let thisMarker;

export default class TestMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRegion: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (this.marker) {
      this.marker.showCallout();
    }

    if (prevProps.latlon !== this.props.latlon) {
      mapRef.current.animateToRegion({
        latitude: this.props.latlon[0],
        longitude: this.props.latlon[1],
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      });
    }

    if (
      this.props.selectedMarker &&
      this.props.animateToMarker !== prevProps.animateToMarker
    ) {
      mapRef.current.animateToRegion({
        latitude: this.props.observations.filter(
          (obs) => obs.trueID === this.props.selectedMarker
        )[0].obsLat,
        longitude: this.props.observations.filter(
          (obs) => obs.trueID === this.props.selectedMarker
        )[0].obsLon,
        latitudeDelta: this.state.currentRegion.latitudeDelta,
        longitudeDelta: this.state.currentRegion.longitudeDelta,
      });
    }
  }

  render() {
    const markers = this.props.observations.map((element) => {
      let thisColor =
        element.trueID === this.props.selectedMarker ? "blue" : "green";
      let thisRef =
        element.trueID === this.props.selectedMarker
          ? (ref) => (this.marker = ref)
          : null;
      let thisTitle =
        element.trueID === this.props.selectedMarker ? element.species : null;
      let thisZ = element.trueID === this.props.selectedMarker ? 100 : 0;
      return (
        <Marker
          ref={thisRef}
          title={thisTitle}
          coordinate={{ latitude: element.obsLat, longitude: element.obsLon }}
          pinColor={thisColor}
          style={{ zIndex: thisZ }}
          key={element.trueID}
          onPress={() => {
            this.props.handler(element.trueID);
          }}
        />
      );
    });

    return (
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: this.props.latlon[0],
            longitude: this.props.latlon[1],
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
          onRegionChange={(region, isGesture) =>
            this.setState({
              currentRegion: region,
            })
          }
        >
          <Marker
            title="Home"
            coordinate={{
              latitude: this.props.latlon[0],
              longitude: this.props.latlon[1],
            }}
            pinColor="brown"
          />
          {markers}
        </MapView>
      </View>
    );
  }
}
