import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";

export default function TestMap(props) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: props.latlon[0],
          longitude: props.latlon[1],
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
      >
        <Marker
          title="Home"
          coordinate={{ latitude: props.latlon[0], longitude: props.latlon[1] }}
        />
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
