import React, { Component } from "react";
import { View, ImageBackground } from "react-native";
import * as Location from "expo-location";
import { inputRelay } from "../../utility/GetFileFunctions";
import pageBG from "../../../assets/textures/fabric-dark.png";

import AsyncStorage from "@react-native-async-storage/async-storage";
import AppContainer from "./NavsAndScreens";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latlon: [0, 0],
    };
  }

  componentDidMount() {
    Location.installWebGeolocationPolyfill();
    this.getLocation();
  }

  handleSubmit = async (text) => {
    const receivedLocation = await inputRelay(text);

    this.setState({
      latlon: [receivedLocation.latitude, receivedLocation.longitude],
    });
  };

  getLocation = () => {
    const positionRelay = (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // console.log(position);

      this.setState({
        latlon: [lat, lon],
      });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(positionRelay, positionError);
    }

    function positionError() {
      //     console.log(
      //       "Geolocation is not enabled. Please enable to use this feature"
      //     );
    }
  };

  render() {
    // AsyncStorage.getAllKeys()
    //   .then((keys) => AsyncStorage.multiRemove(keys))
    //   .then(() => alert("success"));

    // console.log(this.state.radius);

    // console.log(this.state.target);

    // this.props.favoritesArray.forEach((item) => console.log(item.trueID));

    return (
      <View style={{ flex: 1, backgroundColor: "#796d5b" }}>
        <ImageBackground
          source={pageBG}
          resizeMode="repeat"
          style={{ height: "100%", width: "100%" }}
        >
          <AppContainer
            screenProps={{
              // type: "berries",
              latlon: this.state.latlon,
              relay: this.handleSubmit,
              unfiltered: this.props.unfiltered,
              toggleFilter: this.props.toggleFilter,
              customMapsArray: this.props.customMapsArray,
              addCustomMap: this.props.addCustomMap,
              deleteCustomMap: this.props.deleteCustomMap,
              toggleRadius: this.props.toggleRadius,
              radius: this.props.radius,
              getLocation: this.getLocation,
              addFavorite: this.props.addFavorite,
              deleteFavorite: this.props.deleteFavorite,
              favorites: this.props.favoritesArray,
              setTarget: this.props.setTarget,
              target: this.props.target,
              measurements: this.props.measurements,
              toggleMeasurements: this.props.toggleMeasurements,
            }}
          />
        </ImageBackground>
      </View>
    );
  }
}

export default Main;
