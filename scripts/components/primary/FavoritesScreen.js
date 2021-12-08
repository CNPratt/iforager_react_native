import React, { Component } from "react";
import CardDisplay from "./CardDisplayComponent";
import { withNavigationFocus } from "react-navigation";

class FavoritesMap extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Favorites",
    headerTitleStyle: {
      textShadowColor: "black",
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 5,
    },
  };

  render() {
    return <CardDisplay {...this.props} />;
  }
}

export default withNavigationFocus(FavoritesMap);
