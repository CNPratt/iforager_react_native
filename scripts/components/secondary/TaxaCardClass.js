import React, { Component } from "react";
import { Card, Image } from "react-native-elements";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../../shared/Styles";
import { SwipeRow } from "react-native-swipe-list-view";
import * as Linking from "expo-linking";
import cardBG from "../../../assets/textures/cloth-alike.png";
import * as Animatable from "react-native-animatable";

export class TaxaCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
                this.props.nav.navigate("TaxaInfo", {
                  taxaName: `${this.props.taxaName}`,
                  back: this.props.nav.state.routeName,
                });
              }}
              style={{ zIndex: 1 }}
            >
              <View
                style={{
                  position: "absolute",
                  //   zIndex: 1,
                  height: 100,
                  width: 100,
                  flex: 1,
                  backgroundColor: "grey",
                  //   opacity: 0.7,
                }}
              ></View>
              <Image source={this.props.uri} style={styles.cardImg} />
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
                <Text style={styles.cardSubheader}>{this.props.subtitle}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Card>
    );
  }
}
