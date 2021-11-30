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

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      return true;
    }
  }

  render() {
    console.log(
      this.props.navigation.dangerouslyGetParent().getParam("taxaName", 0)
    );
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
                  style={{ flex: 1 }}
                >
                  <Card
                    containerStyle={{
                      // flex: 1,
                      borderStyle: "solid",
                      borderWidth: 3,
                      padding: 0,
                      margin: 10,
                      borderRadius: 25,
                      backgroundColor: "#f8ecdb",
                      borderColor: "#575046",
                      overflow: "hidden",
                    }}
                  >
                    <ImageBackground
                      source={cardBG}
                      resizeMode="repeat"
                      style={{}}
                    >
                      <View
                        style={{
                          minWidth: "100%",
                          maxWidth: "100%",
                        }}
                      >
                        <Text
                          style={{
                            marginBottom: 10,
                            fontWeight: "bold",
                            fontSize: 24,
                            textAlign: "center",
                            marginVertical: 10,
                          }}
                        >
                          {this.props.navigation
                            .dangerouslyGetParent()
                            .getParam("taxaName", 0)}
                        </Text>
                        <Text style={styles.homeCardText}>
                          This is where the information goes.
                        </Text>
                      </View>
                    </ImageBackground>
                  </Card>
                </ImageBackground>
              </ScrollView>
            </ImageBackground>
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }
}

export default withNavigationFocus(TaxaInfoClass);
