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
import { styles } from "../shared/Styles";
import { Icon } from "react-native-elements";
import CardDisplay from "./CardDisplayComponent";
import drawerBG from "../assets/textures/black-linen.png";
import TaxaDirectory from "./TaxaDirectoryComponent";
import TaxaInfoClass from "./TaxaInfoClassComponent";
import CustomMapScreen from "./CustomMapScreenComponent";

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
            text={this.state.addressText}
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

const CustomMapScreenNavigator = createStackNavigator(
  {
    CustomMapScreen: {
      screen: (props) => (
        <CustomMapScreen {...props.screenProps} navigation={props.navigation} />
      ),
    },
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
    CustomMapScreen: {
      screen: CustomMapScreenNavigator,
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

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;
