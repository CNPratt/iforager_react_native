import React, { Component } from "react";
import { Card } from "react-native-elements";
import { Text } from "react-native";

class ObsCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let thisColor;

    if (this.props.obsid == this.props.selectedId) {
      thisColor = "#b8aea2";
    }

    return (
      <Card
        onPress={
          this.props.click ? () => this.props.click(this.props.obsid) : null
        }
        obsid={this.props.obsid}
        id={this.props.obsid}
        key={this.props.observation.trueID}
        image={this.props.observation.image}
        title={
          this.props.observation.species
            ? this.props.observation.species
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
                .join(" ")
            : this.props.observation.name
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
                .join(" ")
        }
        subtitle={this.props.observation.name}
      >
        <Text>{this.props.observation.genLocation}</Text>
        <Text>{this.props.observation.distance}</Text>
        <Text>{this.props.observation.createDate}</Text>
      </Card>
    );
  }
}

export default ObsCard;
