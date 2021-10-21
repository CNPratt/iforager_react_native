import React, { Component } from "react";
import { getFile } from "./GetFileFunctions";
import ObsCard from "./ObsCardComponent";
import { CardStack, CardFlatList } from "./CardStackComponent";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-elements";
import TestMap from "./TestMapComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../shared/Styles";
import pageBG from "../assets/textures/fabric-dark.png";

let sortMethodArray = ["dist", "date", "species"];

class CardDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      observations: [],
      selectedMarker: null,
      sortBy: "dist",
      errorMsg: null,
      loading: false,
      animateToMarker: null,
      scrollToCard: false,
    };
  }

  static navigationOptions = {
    title: "Cards",
  };

  handleCameraFulfilled = () => {
    this.setState({
      animateToMarker: null,
    });
  };

  handleScrollTo = () => {
    this.setState({
      scrollToCard: true,
    });
  };

  scrollFulfilled = () => {
    this.setState({
      scrollToCard: false,
    });
  };

  handleSortSwitch(method) {
    this.setState({
      sortBy: method,
    });
  }

  handleMarkerClick = (id, source) => {
    if (id === this.state.selectedMarker) {
      if (source === "map") {
        this.setState({
          animateToMarker: id,
          scrollToCard: true,
        });
      }

      if (source === "flatlist") {
        this.setState({
          animateToMarker: id,
        });
      }
    } else {
      this.setState({
        selectedMarker: id,
      });
    }
  };

  getData() {
    this.setState({
      observations: [],
      selectedMarker: null,
      loading: true,
      animateToMarker: null,
    });

    // console.log(this.props.type);

    getFile(this.props.latlon, this.props.type, this.props.unfiltered)
      .then((value) => {
        // console.log("value: " + value.length, this.props.type);
        this.setState({
          observations: value,
          errorMsg: null,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          errorMsg: (
            <ScrollView>
              <Card title={error.name}>
                {/* Sorry! You have encountered an error. You may have been
              temporarily blocked by iNaturalist due to request frequency.
              Please wait a minute or two and try again. */}

                <Text style={{ marginBottom: 20 }}>{error.message}</Text>
                <Text>{error.stack}</Text>
              </Card>
            </ScrollView>
          ),
          loading: false,
        });

        console.log(error.stack, error.name, error);
      });
  }

  componentDidMount() {
    // console.log("mounted");
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("updated");
    // console.log(prevState.selectedMarker, this.state.selectedMarker);
    if (
      this.props.type !== prevProps.type ||
      this.props.latlon !== prevProps.latlon
    ) {
      this.getData();
    }

    if (prevState.observations !== this.state.observations) {
    }

    if (prevProps.unfiltered !== this.props.unfiltered) {
      this.getData();
    }
  }

  render() {
    // if (this.state.observations.length) {
    //   console.log("state obs: " + this.state.observations.length);
    // }

    if (this.state.errorMsg) {
      return <Text>{this.state.errorMsg}</Text>;
    }

    if (this.state.observations) {
      return (
        <View style={styles.pageBackground}>
          <ImageBackground
            source={pageBG}
            resizeMode="repeat"
            style={{ height: "100%", width: "100%" }}
          >
            <TestMap
              latlon={this.props.latlon}
              observations={this.state.observations}
              handler={this.handleMarkerClick}
              selectedMarker={this.state.selectedMarker}
              animateToMarker={this.state.animateToMarker}
              handleCameraFulfilled={this.handleCameraFulfilled}
            />
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (
                    sortMethodArray.indexOf(this.state.sortBy) !==
                    sortMethodArray.length - 1
                  ) {
                    this.handleSortSwitch(
                      sortMethodArray[
                        sortMethodArray.indexOf(this.state.sortBy) + 1
                      ]
                    );
                  } else {
                    this.handleSortSwitch("dist");
                  }
                }}
              >
                <Text
                  style={{
                    ...styles.swipeBtnText,
                    marginLeft: 10,
                    marginVertical: 10,
                    padding: 10,
                  }}
                >
                  {this.state.sortBy}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cardstackContainer}>
              <CardFlatList
                observations={this.state.observations}
                handleMarkerClick={this.handleMarkerClick}
                selectedMarker={this.state.selectedMarker}
                sortBy={this.state.sortBy}
                scrollToCard={this.state.scrollToCard}
                scrollFulfilled={this.scrollFulfilled}
                loading={this.state.loading}
              />
            </View>
          </ImageBackground>
        </View>
      );
    } else {
      return <View style={styles.pageBackground}></View>;
    }
  }
}

export default CardDisplay;
