import React, { Component } from "react";
import { Text, View, Platform, Image, ImageBackground } from "react-native";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "../shared/Styles";
import cardBG from "../assets/textures/cloth-alike.png";
import pageBG from "../assets/textures/fabric-dark.png";
import * as Animatable from "react-native-animatable";
import { AccordionView } from "./AccordionView";

import { TaxaCard } from "./TaxaCardClass";
import { taxaSections } from "./data/TaxaSections";

class TaxaDirectoryComponent extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Taxa Directory",
    headerTitleStyle: {
      textShadowColor: "black",
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 5,
    },
  };

  render() {
    // console.log(this.props.navigation.getParam("taxaName", 0));
    return (
      <View style={styles.pageBackground}>
        <ImageBackground
          source={pageBG}
          resizeMode="repeat"
          style={{ height: "100%", width: "100%" }}
        >
          <ScrollView>
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
                    <AccordionView
                      sections={taxaSections(this.props.navigation)}
                    />
                  </ImageBackground>
                </ScrollView>
              </ImageBackground>
            </Animatable.View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

export default TaxaDirectoryComponent;
