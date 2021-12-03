import React, { Component } from "react";
import {
  Text,
  View,
  Platform,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "../shared/Styles";
import cardBG from "../assets/textures/cloth-alike.png";
import pageBG from "../assets/textures/fabric-dark.png";
import * as Animatable from "react-native-animatable";

import { withNavigationFocus } from "react-navigation";
import { taxaPagesObject } from "./data/TaxaPagesObject";
import { Linking } from "react-native";

import { ActivityIndicator } from "react-native";

class TaxaInfoClass extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "TaxaInfo",
    headerTitleStyle: {
      textShadowColor: "black",
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 5,
    },
  };

  render() {
    // console.log(
    //   this.props.navigation.dangerouslyGetParent().getParam("taxaName", 0)
    // );

    let imageVisibility;

    const taxaNameParameter = this.props.navigation
      .dangerouslyGetParent()
      .getParam("taxaName", "laetiporus");

    if (this.props.isFocused) {
      return (
        <View style={styles.pageBackground}>
          <ImageBackground
            source={pageBG}
            resizeMode="repeat"
            style={{ height: "100%", width: "100%" }}
          >
            <ScrollView>
              <Animatable.View
                style={{ flex: 1 }}
                animation="fadeIn"
                useNativeDriver={true}
              >
                <ScrollView
                  contentContainerStyle={{
                    flex: 1,
                  }}
                  bounces={false}
                >
                  <View
                    style={{
                      flex: 1,
                      // backgroundColor: "white",
                      width: "100%",
                      height: 200,
                      paddingTop: 20,
                      paddingLeft: 20,
                    }}
                  >
                    <Image
                      source={
                        taxaPagesObject[taxaNameParameter].mainImage.imageUri
                      }
                      style={{
                        alignSelf: "center",
                        flex: 1,
                        resizeMode: "contain",
                      }}
                      onLoadStart={(ImageLoadEvent) => console.log("started")}
                      onLoad={(ImageLoadEvent) => {
                        console.log("loaded");
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      ...styles.cardHeader,
                      fontWeight: "bold",
                      fontSize: 24,
                      textAlign: "center",
                      marginVertical: 10,
                    }}
                  >
                    {taxaPagesObject[taxaNameParameter].taxaLevel + ": "}
                    {taxaPagesObject[taxaNameParameter].taxaName}
                  </Text>
                  <Text
                    style={{
                      ...styles.cardSubheader,
                      marginBottom: 10,
                      fontSize: 18,
                      textAlign: "center",
                    }}
                  >
                    {taxaPagesObject[taxaNameParameter].taxaSubname}
                  </Text>
                  <Text
                    style={{
                      ...styles.homeCardText,
                      color: "white",
                      textShadowColor: "black",
                      textShadowOffset: { width: -1, height: 1 },
                      textShadowRadius: 3,
                    }}
                  >
                    {taxaPagesObject[taxaNameParameter].mainContent}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("Taxa Directory")
                      }
                    >
                      <Text style={{}}>GO BACK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      // onPress={() =>
                      //   Linking.openURL(
                      //     `https://www.inaturalist.org/taxa/${taxaPagesObject[taxaNameParameter].id}`
                      //   )
                      // }
                      onPress={() =>
                        this.props.navigation.navigate("WebViewer", {
                          uri: `https://www.inaturalist.org/taxa/${taxaPagesObject[taxaNameParameter].id}`,
                        })
                      }
                    >
                      <Text style={{}}>SOURCE</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </Animatable.View>
            </ScrollView>
          </ImageBackground>
        </View>
      );
    } else {
      return null;
    }
  }
}

export default withNavigationFocus(TaxaInfoClass);
