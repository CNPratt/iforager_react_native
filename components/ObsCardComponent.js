import React, { Component } from "react";
import { Card, Image, withTheme } from "react-native-elements";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../shared/Styles";

class ObsCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let thisColor;

    let titleName = this.props.observation.species
      ? this.props.observation.species
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
          .join(" ")
      : this.props.observation.name
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
          .join(" ");

    if (this.props.obsid === this.props.selectedMarker) {
      thisColor = "gray";
    } else {
      thisColor = "#f8ecdb";
    }

    return (
      <TouchableOpacity
        onLongPress={
          this.props.click ? () => this.props.click(this.props.obsid) : null
        }
        style={{ flex: 1 }}
      >
        <Card
          containerStyle={{
            backgroundColor: thisColor,
            // flex: 1,
            ...styles.cardContainerStyle,
          }}
          obsid={this.props.obsid}
          id={this.props.obsid}
          key={this.props.observation.trueID}
        >
          <View style={styles.mainCardBody}>
            <View
              style={{
                position: "absolute",
                zIndex: 1,
                height: 100,
                width: 100,
                flex: 1,
                // backgroundColor: "grey",
                // opacity: 0.7,
              }}
            >
              <Text
                style={{
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, .3)",
                  flexShrink: 1,
                  alignSelf: "flex-start",
                }}
              >
                {this.props.observation.distance}
              </Text>
              <View style={{ flexGrow: 1 }}></View>
              <Text
                style={{
                  color: "white",
                  alignSelf: "flex-end",
                  backgroundColor: "rgba(0, 0, 0, .3)",
                  flexShrink: 1,
                  // opacity: 0.7,
                }}
              >
                {this.props.observation.createDate}
              </Text>
            </View>
            <Image
              source={{ uri: this.props.observation.image }}
              style={styles.cardImg}
            />
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                  <Text
                    adjustsFontSizeToFit
                    numberOfLines={2}
                    style={{ ...styles.cardHeader }}
                  >
                    {titleName}
                  </Text>
                  <Text style={styles.cardSubheader}>
                    {this.props.observation.name}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  flexShrink: 1,
                  // backgroundColor: "blue",
                  justifyContent: "center",
                }}
              >
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={2}
                  style={styles.cardLocation}
                >
                  {this.props.observation.genLocation}
                </Text>
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default ObsCard;
