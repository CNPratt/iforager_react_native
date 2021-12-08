import React, { Component } from "react";
import { Text, View, ImageBackground, Button, Platform } from "react-native";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "../../../shared/Styles";
import cardBG from "../../../assets/textures/cloth-alike.png";
import pageBG from "../../../assets/textures/fabric-dark.png";
import * as Animatable from "react-native-animatable";
import NetInfo from "@react-native-community/netinfo";

class ErrorDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.pageBackground}>
        <ImageBackground
          source={pageBG}
          resizeMode="repeat"
          style={{ height: "100%", width: "100%" }}
        >
          <Animatable.View
            style={styles.pageBackground}
            animation="fadeIn"
            useNativeDriver={true}
          >
            <ImageBackground
              source={pageBG}
              resizeMode="repeat"
              style={{ height: "100%", width: "100%" }}
            >
              <ScrollView
                contentContainerStyle={{
                  ...styles.pageBackground,
                }}
                bounces={false}
              >
                <ImageBackground
                  source={pageBG}
                  resizeMode="repeat"
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      ...styles.cardHeader,
                    }}
                  >
                    You have encountered an error:
                  </Text>
                  <Text
                    style={{
                      ...styles.cardHeader,
                    }}
                  >
                    {this.props.name}
                  </Text>
                  <Text
                    style={{
                      ...styles.cardHeader,
                    }}
                  >
                    {this.props.message}
                  </Text>
                  <Button
                    title="Try again"
                    color="#8dc08d"
                    style={{ margin: 10 }}
                    onPress={() => this.checkConnectivity()}
                  />
                </ImageBackground>
              </ScrollView>
            </ImageBackground>
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }
}

export default ErrorDisplay;
