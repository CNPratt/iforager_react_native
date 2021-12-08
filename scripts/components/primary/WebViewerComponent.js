import React, { Component } from "react";
import { View, ImageBackground } from "react-native";
import { WebView } from "react-native-webview";
import { withNavigationFocus } from "react-navigation";
import * as Animatable from "react-native-animatable";
import pageBG from "../../../assets/textures/fabric-dark.png";

class WebViewer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      return true;
    }
  }

  render() {
    // console.log(
    //   this.props.navigation
    //     .dangerouslyGetParent()
    //     .getParam("uri", "https://www.inaturalist.org/")
    // );
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={pageBG}
          resizeMode="repeat"
          style={{ height: "100%", width: "100%" }}
        >
          <Animatable.View
            style={{ flex: 1 }}
            animation="fadeIn"
            useNativeDriver={true}
          >
            <WebView
              originWhitelist={["*"]}
              source={{
                uri: this.props.navigation
                  .dangerouslyGetParent()
                  .getParam("uri", "https://www.inaturalist.org/"),
              }}
            />
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }
}

export default withNavigationFocus(WebViewer);
