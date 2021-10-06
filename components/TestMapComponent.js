import * as React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";

export default function TestMap(props) {
  const markers = props.observations.map((element) => (
    <Marker
      title={element.species}
      coordinate={{ latitude: element.obsLat, longitude: element.obsLon }}
      pinColor="green"
      key={element.trueID}
    />
  ));

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: props.latlon[0],
          longitude: props.latlon[1],
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        <Marker
          title="Home"
          coordinate={{ latitude: props.latlon[0], longitude: props.latlon[1] }}
          pinColor="brown"
        />
        {markers}
      </MapView>
    </View>
  );
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
