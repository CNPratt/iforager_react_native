import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { LogBox, StyleSheet, Text, View } from "react-native";
import Main from "./scripts/components/primary/MainComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs([""]);

// export default function App() {
//   return <Main />;
// }

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

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
    // saving error
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      unfiltered: false,
      radius: "15",
      customMapsArray: [],
      favoritesArray: [],
      target: null,
      measurements: false,
      radiusLoaded: false,
      measurementsLoaded: false,
      favoritesLoaded: false,
      customsLoaded: false,
      targetLoaded: false,
      filterLoaded: false,
    };
  }

  toggleFilter = () => {
    storeData("unfiltered", `${!this.state.unfiltered}`);
    this.setState({
      unfiltered: !this.state.unfiltered,
    });
  };

  toggleMeasurements = () => {
    storeData("measurements", `${!this.state.measurements}`);
    this.setState({
      measurements: !this.state.measurements,
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

  setTarget = (observation) => {
    if (observation !== this.state.target) {
      this.setState({ target: observation });
    }
  };

  addCustomMap = (map) => {
    this.setState({
      customMapsArray: [map, ...this.state.customMapsArray],
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

  retrieveFromLocal = async () => {
    getData("unfiltered").then((value) => {
      if (value) {
        value === "true"
          ? this.setState({
              unfiltered: true,
              filterLoaded: true,
            })
          : this.setState({
              unfiltered: false,
              filterLoaded: true,
            });
      }
    });

    getData("customMapsArray").then((value) => {
      if (value) {
        this.setState({
          customMapsArray: JSON.parse(value),
          customsLoaded: true,
        });
        console.log("customs loaded");
      }
    });

    getData("favorites").then((value) => {
      if (value) {
        this.setState({
          favoritesArray: JSON.parse(value),
          favoritesLoaded: true,
        });
      }
    });

    getData("radius").then((value) => {
      if (value) {
        this.setState({
          radius: value,
          radiusLoaded: true,
        });
      }
    });

    getData("target").then((value) => {
      if (value) {
        this.setState({
          target: JSON.parse(value),
          targetLoaded: true,
        });
      }
    });

    getData("measurements").then((value) => {
      if (value) {
        value === "true"
          ? this.setState({
              measurements: true,
              measurementsLoaded: true,
            })
          : this.setState({
              measurements: false,
              measurementsLoaded: true,
            });
      }
    });
  };

  componentDidMount() {
    this.retrieveFromLocal();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.isReady) {
      if (
        this.state.customsLoaded &&
        this.state.targetLoaded &&
        this.state.favoritesLoaded &&
        this.state.filterLoaded &&
        this.state.radiusLoaded &&
        this.state.measurementsLoaded
      ) {
        this.setState({ isReady: true });
      }
    }

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

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          // startAsync={this.retrieveFromLocal}
          // onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <Main
        measurements={this.state.measurements}
        unfiltered={this.state.unfiltered}
        target={this.state.target}
        radius={this.state.radius}
        favoritesArray={this.state.favoritesArray}
        customMapsArray={this.state.customMapsArray}
        toggleFilter={this.toggleFilter}
        toggleMeasurements={this.toggleMeasurements}
        toggleRadius={this.toggleRadius}
        setTarget={this.setTarget}
        addFavorite={this.addFavorite}
        deleteFavorite={this.deleteFavorite}
        addCustomMap={this.addCustomMap}
        deleteCustomMap={this.deleteCustomMap}
      />
    );
  }
}
