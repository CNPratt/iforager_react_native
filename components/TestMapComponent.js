import * as React from "react";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useRef, useEffect, Component } from "react";
import { render } from "react-dom";

const mapRef = React.createRef();
// let thisMarker;

export default class TestMap extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (this.marker) {
      // console.log(this.marker);
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
  }

  render() {
    const markers = this.props.observations.map((element) => {
      return (
        <Marker
          stopPropagation="true"
          ref={
            element.trueID === this.props.selectedMarker
              ? (ref) => (this.marker = ref)
              : null
          }
          title={
            element.trueID === this.props.selectedMarker
              ? element.species
              : null
          }
          coordinate={{ latitude: element.obsLat, longitude: element.obsLon }}
          pinColor={
            element.trueID === this.props.selectedMarker ? "blue" : "green"
          }
          key={element.trueID}
          onPress={() => {
            this.props.handler(element.trueID);
          }}
        />
      );
    });

    return (
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: 300,
    height: 300,
  },
});
