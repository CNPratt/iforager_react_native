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
import { styles } from "../shared/Styles";

class FinderOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addressText: "",
    };
  }

  render() {
    // console.log(this.props.screenProps.unfiltered);
    return (
      <View>
        <SafeAreaView>
          <DrawerItems {...this.props} />

          <View style={styles.switch}>
            <Text>
              <Switch
                value={this.props.screenProps.unfiltered}
                onValueChange={() => this.props.screenProps.toggleFilter()}
                trackColor={{ false: "white", true: "black" }}
                thumbColor="darkgrey"
                ios_backgroundColor="white"
              />

              {"Unfiltered Mode"}
            </Text>
          </View>
          <TextInput
            style={styles.addressInput}
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
        backgroundColor: "#8dc08d",
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
        backgroundColor: "#8dc08d",
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
        backgroundColor: "#8dc08d",
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
        backgroundColor: "#8dc08d",
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
        backgroundColor: "#8dc08d",
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
    drawerBackgroundColor: "#8dc08d",
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
      unfiltered: false,
    };
  }

  toggleFilter = () =>
    this.setState({
      unfiltered: !this.state.unfiltered,
    });

  componentDidMount() {
    Location.installWebGeolocationPolyfill();
    this.getLocation();
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppNavigator
          screenProps={{
            type: "berries",
            latlon: this.state.latlon,
            relay: this.handleSubmit,
            unfiltered: this.state.unfiltered,
            toggleFilter: this.toggleFilter,
          }}
        />
      </View>
    );
  }
}

export default Main;
