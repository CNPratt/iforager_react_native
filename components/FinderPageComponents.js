import CardDisplay from "./CardDisplayComponent";
import React, { Component } from "react";

export class MushroomsPage extends Component {
  static navigationOptions = {
    title: "Mushrooms",
  };

  render() {
    return (
      <CardDisplay latlon={this.props.screenProps.latlon} type="mushrooms" />
    );
  }
}

export class BerriesPage extends Component {
  static navigationOptions = {
    title: "Berries",
  };

  render() {
    return (
      <CardDisplay latlon={this.props.screenProps.latlon} type="berries" />
    );
  }
}

export class FruitPage extends Component {
  static navigationOptions = {
    title: "Fruit",
  };

  render() {
    return <CardDisplay latlon={this.props.screenProps.latlon} type="fruit" />;
  }
}

export class AlliumsPage extends Component {
  static navigationOptions = {
    title: "Alliums",
  };

  render() {
    return (
      <CardDisplay latlon={this.props.screenProps.latlon} type="alliums" />
    );
  }
}
