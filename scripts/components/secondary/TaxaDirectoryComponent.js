import React, { Component } from "react";
import { View, ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "../../../shared/Styles";
import pageBG from "../../../assets/textures/fabric-dark.png";
import * as Animatable from "react-native-animatable";
import { AccordionView } from "./AccordionView";
import { taxaSections } from "../../data/TaxaSections";

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
                <AccordionView sections={taxaSections(this.props.navigation)} />
              </ScrollView>
            </Animatable.View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

export default TaxaDirectoryComponent;
