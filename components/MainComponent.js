import React, { Component } from "react";
import Constants from "expo-constants";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import Home from "./HomeComponent";
import CardDisplay from "./CardDisplayComponent";

const test = async () => {
  let response = await fetch("https://quotes.rest/qod");

  let responseObject = await response.json();

  console.log(responseObject.contents.quotes[0].quote);

  return responseObject.contents.quotes[0].quote;
};

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

const CardsNavigator = createStackNavigator(
  {
    Cards: { screen: CardDisplay },
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
    Cards: { screen: CardsNavigator },
  },
  {
    drawerBackgroundColor: "grey",
    contentOptions: {
      labelStyle: {
        color: "white",
      },
    },
  }
);

const AppNavigator = createAppContainer(MainNavigator);

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latlon: [0, 0],
      quote: "Loading...",
    };
  }

  componentDidMount() {
    this.getLocation();
    test().then((quote) =>
      this.setState({
        quote: quote,
      })
    );
  }

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
    console.log(this.state.latlon);
    console.log(this.state.quote);

    return (
      <View style={{ flex: 1 }}>
        <AppNavigator
          screenProps={{
            type: "berries",
            latlon: this.state.latlon,
            quote: this.state.quote,
          }}
        />
      </View>
    );
  }
}

export default Main;
