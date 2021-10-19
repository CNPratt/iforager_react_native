import CardDisplay from "./CardDisplayComponent";
import React, { Component } from "react";
import { styles } from "../shared/Styles";

export class MushroomsPage extends Component {
  static navigationOptions = {
    title: "Mushrooms",
  };

  render() {
    return (
      <CardDisplay
        unfiltered={this.props.screenProps.unfiltered}
        latlon={this.props.screenProps.latlon}
        type="mushrooms"
      />
    );
  }
}

export class BerriesPage extends Component {
  static navigationOptions = {
    title: "Berries",
  };

  render() {
    return (
      <CardDisplay
        unfiltered={this.props.screenProps.unfiltered}
        latlon={this.props.screenProps.latlon}
        type="berries"
      />
    );
  }
}

export class FruitPage extends Component {
  static navigationOptions = {
    title: "Fruit",
  };

  render() {
    return (
      <CardDisplay
        unfiltered={this.props.screenProps.unfiltered}
        latlon={this.props.screenProps.latlon}
        type="fruit"
      />
    );
  }
}

export class AlliumsPage extends Component {
  static navigationOptions = {
    title: "Alliums",
  };

  render() {
    return (
      <CardDisplay
        unfiltered={this.props.screenProps.unfiltered}
        latlon={this.props.screenProps.latlon}
        type="alliums"
      />
    );
  }
}
