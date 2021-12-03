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
import CMapMaster from "./CMapMaster";
import WebViewerComponent from "./WebViewerComponent";

import SelectDropdown from "react-native-select-dropdown";

const radiusOptions = ["1", "5", "10", "15"];

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

          <View
            style={{
              ...styles.switch,
              flexDirection: "row",
              // backgroundColor: "white",
            }}
          >
            <Switch
              value={this.props.screenProps.unfiltered}
              onValueChange={() => {
                this.props.screenProps.toggleFilter();
              }}
              trackColor={{ false: "white", true: "black" }}
              thumbColor="darkgrey"
              ios_backgroundColor="white"
            />
            <Text
              style={{
                flex: 2,
                textAlign: "center",
                alignSelf: "center",
                fontSize: 14,
                fontWeight: "bold",
                color: "white",
                textShadowColor: "black",
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 3,
              }}
            >
              {"Unfiltered Mode: "}
            </Text>
            <Text
              style={{
                flex: 1,
                flexDirection: "row",
                textAlign: "start",
                alignSelf: "center",
                fontSize: 14,
                fontWeight: "bold",
                color: "white",
                textShadowColor: "black",
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 3,
              }}
            >
              {this.props.screenProps.unfiltered ? "On" : "Off"}
            </Text>
          </View>
          <View
            style={{
              flexShrink: 1,
              flexDirection: "row",
              margin: 12,
            }}
          >
            <SelectDropdown
              data={radiusOptions}
              defaultValue={this.props.screenProps.radius}
              buttonStyle={{
                width: "20%",
                borderStyle: "solid",
                borderColor: "#575046",
                borderWidth: 3,
                borderRadius: 15,
              }}
              buttonTextStyle={{
                fontSize: 12,
              }}
              onSelect={(value) => this.props.screenProps.toggleRadius(value)}
            />
            <Text
              style={{
                flex: 2,
                flexDirection: "row",
                textAlign: "center",
                alignSelf: "center",
                fontSize: 14,
                fontWeight: "bold",
                color: "white",
                textShadowColor: "black",
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 3,
              }}
            >
              Radius(in miles)
            </Text>
            <View style={{ flex: 1 }} />
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
          size="45"
        />
      ),
    }),
  }
);

export const FinderNav = (type) =>
  createStackNavigator(
    {
      //   [type]: {
      [type]: (props) => (
        <CardDisplay
          {...props.screenProps}
          navigation={props.navigation}
          type={type.toLowerCase()}
        />
      ),
      //   },
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
            size="45"
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
          size="45"
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
          size="45"
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
      title: "Custom Maps",
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
        textShadowColor: "black",
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
      },
      headerLeft: (
        <Icon
          onPress={() => navigation.toggleDrawer()}
          name="sprout-outline"
          type="material-community"
          iconStyle={styles.stackicon}
          size="45"
        />
      ),
    }),
  }
);

const CMapMasterNavigator = createStackNavigator(
  {
    CMapMasterScreen: {
      screen: (props) => (
        <CMapMaster {...props.screenProps} navigation={props.navigation} />
      ),
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: navigation
        .dangerouslyGetParent()
        .getParam("mapName", "Custom Map"),
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
          size="45"
        />
      ),
    }),
  }
);

const WebNavigator = createStackNavigator(
  {
    WebViewer: { screen: WebViewerComponent },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: "Web Viewer",
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
          size="45"
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
    "Taxa Directory": {
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
    "Custom Maps": {
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
    CMapMaster: {
      screen: CMapMasterNavigator,
      navigationOptions: {
        drawerLabel: <NullLabel />,
      },
    },
    WebViewer: {
      screen: WebNavigator,
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
