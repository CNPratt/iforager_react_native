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

  componentDidUpdate() {
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
      />
    );
  }
}
