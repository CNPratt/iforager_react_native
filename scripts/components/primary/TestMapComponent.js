import * as React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { View, ImageBackground } from "react-native";
import { Component } from "react";
import { styles } from "../../../shared/Styles";
import pageBG from "../../../assets/textures/fabric-dark.png";

// let thisMarker;

export default class TestMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // currentRegion: {
      //   latitude: 0,
      //   longitude: 0,
      //   latitudeDelta: 0.5,
      //   longitudeDelta: 0.5,
      // },
      mapRef: null,
    };
  }

  cameraSetter = async () => {
    // const camera = await mapRef.current.getCamera();

    // console.log(
    //   "camera set",
    //   this.props.observations.filter(
    //     (obs) => obs.trueID === this.props.selectedMarker
    //   )[0]
    // );
    // Note that we do not have to pass a full camera object to setCamera().
    // Similar to setState(), we can pass only the properties you like to change.

    this.state.mapRef.current.setCamera({
      center: {
        latitude: this.props.observations.filter(
          (obs) => obs.trueID === this.props.selectedMarker
        )[0].obsLat,
        longitude: this.props.observations.filter(
          (obs) => obs.trueID === this.props.selectedMarker
        )[0].obsLon,
      },
    });

    this.props.handleCameraFulfilled();
  };

  componentDidMount() {
    const mapRef = React.createRef();
    this.setState({
      mapRef: mapRef,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.marker) {
      this.marker.showCallout();
    }

    if (
      prevProps.latlon !== this.props.latlon ||
      prevProps.radius !== this.props.radius
    ) {
      this.state.mapRef.current.animateToRegion({
        latitude: this.props.latlon[0],
        longitude: this.props.latlon[1],
        latitudeDelta: this.adjustRadiusDelta(this.props.radius),
        longitudeDelta: this.adjustRadiusDelta(this.props.radius),
      });
    }

    if (
      this.props.selectedMarker &&
      this.props.animateToMarker !== prevProps.animateToMarker &&
      this.props.animateToMarker !== null
    ) {
      // mapRef.current.animateToRegion({
      //   latitude: this.props.observations.filter(
      //     (obs) => obs.trueID === this.props.selectedMarker
      //   )[0].obsLat,
      //   longitude: this.props.observations.filter(
      //     (obs) => obs.trueID === this.props.selectedMarker
      //   )[0].obsLon,
      //   latitudeDelta: this.state.currentRegion.latitudeDelta,
      //   longitudeDelta: this.state.currentRegion.longitudeDelta,
      // });

      this.cameraSetter();
    }
  }

  adjustRadiusDelta(radius) {
    switch (radius) {
      case "1":
        return 0.05;
        break;
      case "5":
        return 0.2;
        break;
      case "10":
        return 0.35;
        break;
      case "15":
        return 0.5;
        break;
      default:
        return distMethod;
    }
  }

  render() {
    // const mapRef = React.createRef();

    const markers = this.props.sorted.map((element) => {
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
            this.props.handler(element.trueID, "map");
          }}
        />
      );
    });

    return (
      <View style={styles.mapContainer}>
        <ImageBackground
          source={pageBG}
          resizeMode="repeat"
          style={{ height: "100%", width: "100%" }}
        >
          <MapView
            ref={this.state.mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: this.props.latlon[0],
              longitude: this.props.latlon[1],
              latitudeDelta: this.adjustRadiusDelta(this.props.radius),
              longitudeDelta: this.adjustRadiusDelta(this.props.radius),
            }}
            loadingEnabled={true}
            loadingBackgroundColor="#8dc08d"
            loadingIndicatorColor="#796d5b"
            showsUserLocation={true}
            // onUserLocationChange={(coords) =>
            //   console.log("location change detected :" + coords)
            // }
            // onRegionChange={(region, isGesture) =>
            //   this.setState({
            //     currentRegion: region,
            //   })
            // }
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
        </ImageBackground>
      </View>
    );
  }
}
