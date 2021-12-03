import React, { Component } from "react";
import { WebView } from "react-native-webview";
import { withNavigationFocus } from "react-navigation";

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
      <WebView
        originWhitelist={["*"]}
        source={{
          uri: this.props.navigation
            .dangerouslyGetParent()
            .getParam("uri", "https://www.inaturalist.org/"),
        }}
      />
    );
  }
}

export default withNavigationFocus(WebViewer);
