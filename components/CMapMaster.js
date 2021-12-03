import React, { Component } from "react";
import CardDisplay from "./CardDisplayComponent";
import { withNavigationFocus } from "react-navigation";

class CMapMaster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maps: [],
    };
  }

  static navigationOptions = {
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
    // console.log(
    //   this.props.navigation.dangerouslyGetParent().getParam("ids", "0")
    // );

    let thisType = this.props.navigation
      .dangerouslyGetParent()
      .getParam("ids", "0");

    return <CardDisplay {...this.props} type={thisType} />;
  }
}

export default withNavigationFocus(CMapMaster);
