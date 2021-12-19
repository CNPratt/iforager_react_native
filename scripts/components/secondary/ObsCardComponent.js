import React, { PureComponent } from "react";
import { Card, Icon, Image } from "react-native-elements";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../../shared/Styles";
import { SwipeRow } from "react-native-swipe-list-view";
import * as Linking from "expo-linking";
import cardBG from "../../../assets/textures/cloth-alike.png";
import * as Animatable from "react-native-animatable";

// const cardBG = require("../assets/textures/cloth-alike.png");

function milesToKM(miles) {
  return miles * 1.60934;
}

class ObsCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.props.obsid === nextProps.selectedMarker ||
      this.props.obsid === this.props.selectedMarker ||
      this.props.measurements !== nextProps.measurements ||
      this.props.isFavorite !== nextProps.isFavorite
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
      <SwipeRow rightOpenValue={-100} leftOpenValue={100} friction={10}>
        <Animatable.View
          style={{
            flexShrink: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "row",
            paddingTop: 12,
          }}
          animation="fadeIn"
          delay={1000}
          useNativeDriver={true}
        >
          <View
            style={{
              flex: 1,
              // backgroundColor: "grey",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                justifyContent: "space-evenly",
                // backgroundColor: "white",
                alignSelf: "flex-start",
                paddingLeft: 15,
                height: "100%",
              }}
            >
              <View
                style={{
                  ...styles.swipeButtons,
                  height: "80%",
                  borderRadius: 25,
                }}
              >
                <ImageBackground
                  source={cardBG}
                  resizeMode="repeat"
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.props.setTarget();
                      this.props.navigation.navigate("Compass");
                    }}
                  >
                    <Text
                      style={{
                        ...styles.swipeBtnText,
                        backgroundColor: "none",
                        padding: 10,
                      }}
                    >
                      TRACK
                    </Text>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            </View>
            <View
              style={{
                justifyContent: "space-evenly",
                // backgroundColor: "white",
                alignSelf: "flex-end",
                height: "100%",
              }}
            >
              <View style={styles.swipeButtons}>
                <ImageBackground source={cardBG} resizeMode="repeat" style={{}}>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        `https://www.google.com/maps/search/?api=1&query=${this.props.observation.obsLat}%2C${this.props.observation.obsLon}`
                      )
                    }
                  >
                    <Text
                      style={{
                        ...styles.swipeBtnText,
                        backgroundColor: "none",
                        padding: 3,
                      }}
                    >
                      DROP PIN
                    </Text>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
              <View style={styles.swipeButtons}>
                <ImageBackground source={cardBG} resizeMode="repeat" style={{}}>
                  <TouchableOpacity
                    // onPress={() => Linking.openURL(this.props.observation.url)}
                    onPress={() =>
                      this.props.navigation.navigate("WebViewer", {
                        uri: this.props.observation.url,
                        back: this.props.navigation.state.routeName,
                      })
                    }
                  >
                    <Text
                      style={{
                        ...styles.swipeBtnText,
                        backgroundColor: "none",
                        padding: 3,
                      }}
                    >
                      SOURCE
                    </Text>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
              <View style={{ ...styles.swipeButtons }}>
                <ImageBackground source={cardBG} resizeMode="repeat" style={{}}>
                  <TouchableOpacity
                    onPress={() => {
                      !this.props.isFavorite
                        ? this.props.addFavorite()
                        : this.props.deleteFavorite();
                      // console.log(this.props.navigation.state);
                    }}
                  >
                    <Text
                      style={{
                        ...styles.swipeBtnText,
                        backgroundColor: "none",
                        padding: 3,
                      }}
                    >
                      {!this.props.isFavorite ? "FAVORITE" : "DELETE"}
                    </Text>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            </View>
          </View>
        </Animatable.View>

        <Animatable.View animation="fadeIn" useNativeDriver={true}>
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
              <ImageBackground source={cardBG} resizeMode="repeat" style={{}}>
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
                        {this.props.measurements
                          ? milesToKM(this.props.observation.distance).toFixed(
                              2
                            ) + "km"
                          : this.props.observation.distance.toFixed(2) + "mi"}
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
        </Animatable.View>
      </SwipeRow>
    );
  }
}

export default ObsCard;
