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
      favoritesArray: [],
      target: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.customMapsArray !== this.state.customMapsArray) {
      storeData("customMapsArray", JSON.stringify(this.state.customMapsArray));
    }

    if (prevState.favoritesArray !== this.state.favoritesArray) {
      storeData("favorites", JSON.stringify(this.state.favoritesArray));
    }

    if (prevState.target !== this.state.target) {
      storeData("target", JSON.stringify(this.state.target));
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

  addFavorite = (observation) => {
    if (
      !this.state.favoritesArray.includes(observation) &&
      this.state.favoritesArray.length < 201
    )
      this.setState({
        favoritesArray: [...this.state.favoritesArray, observation],
      });
  };

  setTarget = (observation) => {
    if (observation !== this.state.target) {
      this.setState({ target: observation });
    }
  };

  deleteFavorite = (observation) => {
    if (this.state.favoritesArray.includes(observation)) {
      newArray = this.state.favoritesArray.filter(
        (obs) => obs.trueID !== observation.trueID
      );

      this.setState({
        favoritesArray: newArray,
      });
    }
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

    getData("favorites").then((value) => {
      if (value) {
        this.setState({
          favoritesArray: JSON.parse(value),
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

    getData("target").then((value) => {
      if (value) {
        this.setState({
          target: JSON.parse(value),
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

      // console.log(position);

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

    // console.log(this.state.target);

    this.state.favoritesArray.forEach((item) => console.log(item.trueID));

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
              getLocation: this.getLocation,
              addFavorite: this.addFavorite,
              deleteFavorite: this.deleteFavorite,
              favorites: this.state.favoritesArray,
              setTarget: this.setTarget,
              target: this.state.target,
            }}
          />
        </ImageBackground>
      </View>
    );
  }
}

export default Main;
