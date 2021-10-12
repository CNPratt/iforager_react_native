import React, { Component } from "react";
import { Card } from "react-native-elements";
import { Text, TouchableOpacity } from "react-native";

class ObsCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let thisColor;

    if (this.props.obsid === this.props.selectedMarker) {
      thisColor = "gray";
    } else {
      thisColor = "white";
    }

    return (
      <TouchableOpacity
        onLongPress={
          this.props.click ? () => this.props.click(this.props.obsid) : null
        }
      >
        <Card
          containerStyle={{
            backgroundColor: thisColor,
            // flex: 1,
            // flexDirection: "row",
          }}
          obsid={this.props.obsid}
          id={this.props.obsid}
          key={this.props.observation.trueID}
          image={{ uri: this.props.observation.image }}
          imageStyle={{ height: 50 }}
          featuredTitle={
            this.props.observation.species
              ? this.props.observation.species
                  .toLowerCase()
                  .split(" ")
                  .map(
                    (word) => word.charAt(0).toUpperCase() + word.substring(1)
                  )
                  .join(" ")
              : this.props.observation.name
                  .toLowerCase()
                  .split(" ")
                  .map(
                    (word) => word.charAt(0).toUpperCase() + word.substring(1)
                  )
                  .join(" ")
          }
          featuredSubtitle={this.props.observation.name}
        >
          <Text>{this.props.observation.genLocation}</Text>
          <Text>{this.props.observation.distance}</Text>
          <Text>{this.props.observation.createDate}</Text>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default ObsCard;
