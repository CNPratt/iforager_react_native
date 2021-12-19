import React, { Component, PureComponent } from "react";
import { Card, Icon } from "react-native-elements";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../../shared/Styles";
import { SwipeRow } from "react-native-swipe-list-view";
import * as Linking from "expo-linking";
import cardBG from "../../../assets/textures/cloth-alike.png";
import * as Animatable from "react-native-animatable";
import drawerBG from "../../../assets/textures/black-linen.png";
import pageBG from "../../../assets/textures/fabric-dark.png";

export class SearchResult extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let idArray = this.props.newMapIds.split(",");
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
              onPress={
                idArray.includes(this.props.taxonId.toString())
                  ? this.props.remove
                  : this.props.add
              }
              onLongPress={() => {}}
              style={{ zIndex: 1 }}
            >
              <View
                style={{
                  height: 100,
                  width: 100,
                  flex: 1,
                  backgroundColor: idArray.includes(
                    this.props.taxonId.toString()
                  )
                    ? "#8dc08d"
                    : "#796d5b",
                }}
              >
                <ImageBackground
                  source={
                    idArray.includes(this.props.taxonId.toString())
                      ? drawerBG
                      : pageBG
                  }
                  resizeMode="repeat"
                  style={{ height: "100%", width: "100%" }}
                >
                  {idArray.includes(this.props.taxonId.toString()) ? (
                    <Icon
                      name="minus"
                      color="#575046"
                      type="material-community"
                      containerStyle={{ flex: 1 }}
                      size={100}
                    />
                  ) : (
                    <Icon
                      name="plus"
                      color="#8dc08d"
                      type="material-community"
                      containerStyle={{ flex: 1 }}
                      size={100}
                    />
                  )}
                </ImageBackground>
              </View>
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
                  {this.props.commonName
                    ? this.props.commonName
                    : this.props.name}
                </Text>
                <Text
                  // adjustsFontSizeToFit
                  numberOfLines={1}
                  style={styles.cardSubheader}
                >
                  {this.props.name}
                </Text>
                <Text
                  // adjustsFontSizeToFit
                  numberOfLines={1}
                  style={styles.cardSubheader}
                >
                  {this.props.taxonId}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Card>
    );
  }
}

export default SearchResult;
