import React, { PureComponent } from "react";
import { Card, Image, withTheme } from "react-native-elements";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../shared/Styles";
import { SwipeRow } from "react-native-swipe-list-view";
import * as Linking from "expo-linking";
import cardBG from "../assets/textures/cloth-alike.png";

// const cardBG = require("../assets/textures/cloth-alike.png");

class ObsCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.props.obsid === nextProps.selectedMarker ||
      this.props.obsid === this.props.selectedMarker
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    // console.log(this.props.observation.trueDistance);
    // console.log(this.props.observation.image.replace("original", "thumb"));
    // console.log(this.props.selectedMarker, this.props.obsid);

    let thisColor;
    let borderColor;
    let thisPressFunction;

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
      thisColor = "#aea599";
      borderColor = "#d4c980";
    } else {
      thisColor = "#f8ecdb";
      borderColor = "#575046";
    }

    return (
      <SwipeRow rightOpenValue={-100} friction={10}>
        <View
          style={{
            flexShrink: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "row",
            paddingTop: 3,
          }}
        >
          <View style={{ justifyContent: "space-evenly" }}>
            <View style={styles.swipeButtons}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    `https://www.google.com/maps/search/?api=1&query=${this.props.observation.obsLat}%2C${this.props.observation.obsLon}`
                  )
                }
              >
                <Text style={styles.swipeBtnText}>DROP PIN</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.swipeButtons}>
              <TouchableOpacity
                onPress={() => Linking.openURL(this.props.observation.url)}
              >
                <Text style={styles.swipeBtnText}>SOURCE</Text>
              </TouchableOpacity>
            </View>
            <View style={{ ...styles.swipeButtons }}>
              <TouchableOpacity
                onPress={() => Linking.openURL("https://google.com")}
              >
                <Text style={styles.swipeBtnText}>FAVORITE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={1}
          // onLongPress={
          //   this.props.click ? () => this.props.click(this.props.obsid) : null
          // }
          style={{ flex: 1 }}
        >
          <Card
            containerStyle={{
              backgroundColor: thisColor,
              // flex: 1,
              ...styles.cardContainerStyle,
              margin: 10,
              borderColor: borderColor,
              borderRadius: 25,
              overflow: "hidden",
            }}
            obsid={this.props.obsid}
            id={this.props.obsid}
            key={this.props.observation.trueID}
          >
            <ImageBackground source={cardBG} style={{ flex: 1 }}>
              <View style={styles.mainCardBody}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={
                    this.props.click
                      ? () => this.props.click(this.props.obsid, "flatlist")
                      : null
                  }
                  style={{ zIndex: 1 }}
                >
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
                        paddingLeft: 10,
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
                    source={{
                      uri: this.props.observation.image.replace(
                        "original",
                        "thumb"
                      ),
                    }}
                    style={styles.cardImg}
                  />
                </TouchableOpacity>
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
            </ImageBackground>
          </Card>
        </TouchableOpacity>
      </SwipeRow>
    );
  }
}

export default ObsCard;
