import React, { Component } from "react";
import { View, ImageBackground } from "react-native";
import * as Location from "expo-location";
import { inputRelay } from "../../utility/GetFileFunctions";
import pageBG from "../../../assets/textures/fabric-dark.png";

import AsyncStorage from "@react-native-async-storage/async-storage";
import AppContainer from "./NavsAndScreens";

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
    // saving error
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // console.log(value);
      return value;
      // value previously stored
    }
  } catch (e) {
    console.log(e);
    // error reading value
  }
};

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latlon: [0, 0],
      unfiltered: false,
      radius: "15",
      customMapsArray: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.customMapsArray !== this.state.customMapsArray) {
      storeData("customMapsArray", JSON.stringify(this.state.customMapsArray));
    }
  }

  toggleFilter = () => {
    storeData("unfiltered", `${!this.state.unfiltered}`);
    this.setState({
      unfiltered: !this.state.unfiltered,
    });
  };

  toggleRadius = (value) => {
    storeData("radius", value);
    this.setState({
      radius: value,
    });
  };

  componentDidMount() {
    Location.installWebGeolocationPolyfill();
    this.getLocation();

    getData("unfiltered").then((value) => {
      if (value) {
        value === "true"
          ? this.setState({
              unfiltered: true,
            })
          : this.setState({
              unfiltered: false,
            });
      }
    });

    getData("customMapsArray").then((value) => {
      if (value) {
        this.setState({
          customMapsArray: JSON.parse(value),
        });
      }
    });

    getData("radius").then((value) => {
      if (value) {
        this.setState({
          radius: value,
        });
      }
    });
  }

  handleSubmit = async (text) => {
    const receivedLocation = await inputRelay(text);

    this.setState({
      latlon: [
        parseFloat(receivedLocation.lat),
        parseFloat(receivedLocation.lon),
      ],
    });
  };

  getLocation = () => {
    const positionRelay = (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      this.setState({
        latlon: [lat, lon],
      });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(positionRelay, positionError);
    }

    function positionError() {
      console.log(
        "Geolocation is not enabled. Please enable to use this feature"
      );
    }
  };

  addCustomMap = (map) => {
    this.setState({
      customMapsArray: [...this.state.customMapsArray, map],
    });
  };

  deleteCustomMap = (map) => {
    console.log(map);
    this.setState({
      customMapsArray: this.state.customMapsArray.filter(
        (element) => element.title !== map.title
      ),
    });
  };

  render() {
    // AsyncStorage.getAllKeys()
    //   .then((keys) => AsyncStorage.multiRemove(keys))
    //   .then(() => alert("success"));

    // console.log(this.state.radius);

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
              unfiltered: this.state.unfiltered,
              toggleFilter: this.toggleFilter,
              customMapsArray: this.state.customMapsArray,
              addCustomMap: this.addCustomMap,
              deleteCustomMap: this.deleteCustomMap,
              toggleRadius: this.toggleRadius,
              radius: this.state.radius,
            }}
          />
        </ImageBackground>
      </View>
    );
  }
}

export default Main;