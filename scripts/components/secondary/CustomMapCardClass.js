import React, { Component, PureComponent } from "react";
import { Card, Icon } from "react-native-elements";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../../shared/Styles";
import { SwipeRow } from "react-native-swipe-list-view";
import * as Linking from "expo-linking";
import cardBG from "../../../assets/textures/cloth-alike.png";
import * as Animatable from "react-native-animatable";
import drawerBG from "../../../assets/textures/black-linen.png";

export class CustomMapCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let thisMap = {
      title: this.props.title,
      ids: this.props.ids,
    };

    return (
      <Card
        containerStyle={{
          ...styles.cardContainerStyle,
          backgroundColor: "#f8ecdb",
          borderColor: "#575046",
          flex: 0,
          margin: 10,
          borderRadius: 25,
          overflow: "hidden",
        }}
      >
        <ImageBackground source={cardBG} resizeMode="repeat" style={{}}>
          <View style={styles.mainCardBody}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.props.nav.navigate("CMapMaster", {
                  ids: `${this.props.ids}`,
                  mapName: `${this.props.title}`,
                });
              }}
              onLongPress={() => {
                this.props.deleteCustomMap(thisMap);
              }}
              style={{ zIndex: 1 }}
            >
              <View
                style={{
                  //   position: "absolute",
                  //   zIndex: 1,
                  height: 100,
                  width: 100,
                  flex: 1,
                  backgroundColor: "#8dc08d",
                  //   opacity: 0.7,
                }}
              >
                <ImageBackground
                  source={drawerBG}
                  resizeMode="repeat"
                  style={{ height: "100%", width: "100%" }}
                >
                  <Icon
                    name="sprout-outline"
                    color="#34302A"
                    type="material-community"
                    containerStyle={{ flex: 1 }}
                    size={100}
                  />
                </ImageBackground>
              </View>
              {/* <Image source={this.props.uri} style={styles.cardImg} /> */}
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  margin: 0,
                  padding: 0,
                }}
              >
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={2}
                  style={{ ...styles.cardHeader }}
                >
                  {this.props.title}
                </Text>
                <Text
                  // adjustsFontSizeToFit
                  numberOfLines={2}
                  style={styles.cardSubheader}
                >
                  {this.props.ids.split(",").join(", ")}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Card>
    );
  }
}
