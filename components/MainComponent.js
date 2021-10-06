import React, { Component } from "react";
import Constants from "expo-constants";
import { View, StyleSheet, Text, TextInput, Switch } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import Home from "./HomeComponent";
import * as Location from "expo-location";
import {
  MushroomsPage,
  FruitPage,
  BerriesPage,
  AlliumsPage,
} from "./FinderPageComponents";
import { SafeAreaView } from "react-native-safe-area-context";
import { withTheme } from "react-native-elements";
import { inputRelay } from "./GetFileFunctions";

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  switch: {
    padding: 10,
  },
});

class FinderOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addressText: "",
      unfiltered: false,
    };
  }

  render() {
    // console.log(this.props.screenProps.latlon);
    return (
      <View>
        <SafeAreaView>
          <DrawerItems {...this.props} />

          <View style={styles.switch}>
            <Text>
              <Switch
                value={this.state.unfiltered}
                onValueChange={() =>
                  this.setState({
                    unfiltered: !this.state.unfiltered,
                  })
                }
                trackColor={{ false: "white", true: "black" }}
                thumbColor="darkgrey"
                ios_backgroundColor="white"
              />

              {"Unfiltered Mode"}
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Address"
            onChangeText={(text) =>
              this.setState({
                addressText: text,
              })
            }
            onSubmitEditing={() =>
              this.props.screenProps.relay(this.state.addressText)
            }
          />
        </SafeAreaView>
      </View>
    );
  }
}

const HomeNavigator = createStackNavigator(
  {
    Home: { screen: Home },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "black",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    },
  }
);

const MushroomsNav = createStackNavigator(
  {
    Mushrooms: { screen: MushroomsPage },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "black",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    },
  }
);

const BerriesNav = createStackNavigator(
  {
    Berries: { screen: BerriesPage },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "black",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    },
  }
);

const FruitNav = createStackNavigator(
  {
    Fruit: { screen: FruitPage },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "black",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    },
  }
);

const AlliumsNav = createStackNavigator(
  {
    Alliums: { screen: AlliumsPage },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "black",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    },
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Home: { screen: HomeNavigator },
    Mushrooms: { screen: MushroomsNav },
    Berries: { screen: BerriesNav },
    Fruit: { screen: FruitNav },
    Alliums: { screen: AlliumsNav },
  },
  {
    drawerBackgroundColor: "grey",
    contentOptions: {
      labelStyle: {
        color: "white",
      },
    },
    contentComponent: (props) => <FinderOptions {...props} />,
  }
);

const AppNavigator = createAppContainer(MainNavigator);

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
    // console.log("handlesubmit " + text);
    // e.preventDefault();

    const receivedLocation = await inputRelay(text);

    // console.log(receivedLocation);

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

  render() {
    // console.log(this.state.latlon);

    return (
      <View style={{ flex: 1 }}>
        <AppNavigator
          screenProps={{
            type: "berries",
            latlon: this.state.latlon,
            relay: this.handleSubmit,
          }}
        />
      </View>
    );
  }
}

export default Main;
