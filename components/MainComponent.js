import React, { Component } from "react";
import Constants from "expo-constants";
import {
  View,
  Text,
  TextInput,
  Switch,
  ImageBackground,
  Image,
  StatusBar,
} from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import Home from "./HomeComponent";
import * as Location from "expo-location";
import { inputRelay } from "./data/GetFileFunctions";
import { styles } from "../shared/Styles";
import { Icon } from "react-native-elements";
import CardDisplay from "./CardDisplayComponent";
import pageBG from "../assets/textures/fabric-dark.png";
import drawerBG from "../assets/textures/black-linen.png";
import TaxaDirectory from "./TaxaDirectoryComponent";
import TaxaInfoClass from "./TaxaInfoClassComponent";

const statusBarHeight = Constants.statusBarHeight;

class NullLabel extends Component {
  render() {
    return null;
  }
}

class CustomDrawer extends Component {
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
        <ImageBackground
          source={drawerBG}
          resizeMode="repeat"
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <StatusBar />
          <DrawerItems {...this.props} />

          <View style={styles.switch}>
            <Text>
              <Switch
                value={this.props.screenProps.unfiltered}
                onValueChange={() => {
                  this.props.screenProps.toggleFilter();
                }}
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
        </ImageBackground>
      </View>
    );
  }
}

const HomeNavigator = createStackNavigator(
  {
    Home: { screen: Home },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#8dc08d",
      },
      headerBackground: () => (
        <Image
          source={drawerBG}
          resizeMode="repeat"
          style={{ height: "100%", width: "100%" }}
        />
      ),
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: (
        <Icon
          onPress={() => navigation.toggleDrawer()}
          name="sprout-outline"
          type="material-community"
          iconStyle={styles.stackicon}
        />
      ),
    }),
  }
);

const FinderNav = (type) =>
  createStackNavigator(
    {
      type: {
        screen: (props) => (
          <CardDisplay {...props.screenProps} type={type.toLowerCase()} />
        ),
      },
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        title: type,
        headerStyle: {
          backgroundColor: "#8dc08d",
        },
        headerBackground: () => (
          <Image
            source={drawerBG}
            resizeMode="repeat"
            style={{ height: "100%", width: "100%" }}
          />
        ),
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
          textShadowColor: "black",
          textShadowOffset: { width: -1, height: 1 },
          textShadowRadius: 5,
        },
        headerLeft: (
          <Icon
            onPress={() => navigation.toggleDrawer()}
            name="sprout-outline"
            color="#796d5b"
            type="material-community"
            iconStyle={styles.stackicon}
          />
        ),
      }),
    }
  );

const TaxaDirectoryNavigator = createStackNavigator(
  {
    TaxaDirectory: { screen: TaxaDirectory },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#8dc08d",
      },
      headerBackground: () => (
        <Image
          source={drawerBG}
          resizeMode="repeat"
          style={{ height: "100%", width: "100%" }}
        />
      ),
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: (
        <Icon
          onPress={() => navigation.toggleDrawer()}
          name="sprout-outline"
          type="material-community"
          iconStyle={styles.stackicon}
        />
      ),
    }),
  }
);

const TaxaInfoClassNavigator = createStackNavigator(
  {
    TaxaInfoClass: { screen: TaxaInfoClass },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#8dc08d",
      },
      headerBackground: () => (
        <Image
          source={drawerBG}
          resizeMode="repeat"
          style={{ height: "100%", width: "100%" }}
        />
      ),
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: (
        <Icon
          onPress={() => navigation.toggleDrawer()}
          name="sprout-outline"
          type="material-community"
          iconStyle={styles.stackicon}
        />
      ),
    }),
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        drawerIcon: () => (
          <Icon
            name="sprout-outline"
            color="#34302A"
            type="material-community"
            size={24}
          />
        ),
      },
    },
    Mushrooms: {
      screen: FinderNav("Mushrooms"),
      navigationOptions: {
        drawerIcon: () => (
          <Icon
            name="sprout-outline"
            color="#34302A"
            type="material-community"
            size={24}
          />
        ),
      },
    },
    Berries: {
      screen: FinderNav("Berries"),
      navigationOptions: {
        drawerIcon: () => (
          <Icon
            name="sprout-outline"
            color="#34302A"
            type="material-community"
            size={24}
          />
        ),
      },
    },
    Fruit: {
      screen: FinderNav("Fruit"),
      navigationOptions: {
        drawerIcon: () => (
          <Icon
            name="sprout-outline"
            color="#34302A"
            type="material-community"
            size={24}
          />
        ),
      },
    },
    Alliums: {
      screen: FinderNav("Alliums"),
      navigationOptions: {
        drawerIcon: () => (
          <Icon
            name="sprout-outline"
            color="#34302A"
            type="material-community"
            size={24}
          />
        ),
      },
    },
    TaxaDirectory: {
      screen: TaxaDirectoryNavigator,
      navigationOptions: {
        drawerIcon: () => (
          <Icon
            name="sprout-outline"
            color="#34302A"
            type="material-community"
            size={24}
          />
        ),
      },
    },
    TaxaInfo: {
      screen: TaxaInfoClassNavigator,
      navigationOptions: {
        drawerLabel: <NullLabel />,
      },
    },
  },
  {
    drawerBackgroundColor: "#8dc08d",
    contentOptions: {
      labelStyle: {
        color: "white",
        textShadowColor: "black",
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
      },
      itemsContainerStyle: {
        paddingTop: statusBarHeight,
      },
    },
    contentComponent: (props) => <CustomDrawer {...props} />,
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
      <View style={{ flex: 1, backgroundColor: "#796d5b" }}>
        <ImageBackground
          source={pageBG}
          resizeMode="repeat"
          style={{ height: "100%", width: "100%" }}
        >
          <AppNavigator
            screenProps={{
              // type: "berries",
              latlon: this.state.latlon,
              relay: this.handleSubmit,
              unfiltered: this.state.unfiltered,
              toggleFilter: this.toggleFilter,
            }}
          />
        </ImageBackground>
      </View>
    );
  }
}

export default Main;
