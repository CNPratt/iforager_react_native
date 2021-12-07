import React, { Component } from "react";
import { getFile } from ".././../utility/GetFileFunctions";
import { CardFlatList } from "./CardStackComponent";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-elements";
import TestMap from "./TestMapComponent";
import { styles } from "../../../shared/Styles";
import pageBG from "../../../assets/textures/fabric-dark.png";
import cardBG from "../../../assets/textures/cloth-alike.png";
import * as Animatable from "react-native-animatable";
import ErrorDisplay from "../secondary/ErrorDisplayComponent";

import { withNavigationFocus } from "react-navigation";

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
      acronymArray: ["all"],
      fullnameArray: ["all"],
      sortSpecies: "all",
      drawerOpen: false,
      lastGetProps: {
        latlon: [],
        type: "none",
        radius: "0",
        unfiltered: false,
      },
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
    console.log("sort switch");
    this.setState({
      sortBy: method,
    });
  }

  handleSpeciesSwitch() {
    console.log("species switch");

    if (
      this.state.acronymArray[
        this.state.acronymArray.indexOf(this.state.sortSpecies) + 1
      ]
    ) {
      this.setState({
        sortSpecies:
          this.state.acronymArray[
            this.state.acronymArray.indexOf(this.state.sortSpecies) + 1
          ],
      });
    } else {
      this.setState({
        sortSpecies: "all",
      });
    }
  }

  speciesSortMethod = () => {
    // let speciesIndex = this.state.acronymArray.indexOf(this.state.sortSpecies);
    if (this.state.sortSpecies !== "all") {
      let speciesIndex = this.state.acronymArray.indexOf(
        this.state.sortSpecies
      );

      let sortSpeciesArray = this.state.observations.filter(
        (element) => element.species === this.state.fullnameArray[speciesIndex]
      );

      return sortSpeciesArray;
    }
    return this.state.observations;
  };

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

  errorRefresh = () => {
    this.setState({
      errorMsg: null,
    });
    this.getData();
  };

  getData() {
    console.log("getting data..." + this.props.type);
    this.setState({
      observations: [],
      selectedMarker: null,
      loading: true,
      animateToMarker: null,
      acronymArray: ["all"],
      fullnameArray: ["all"],
      sortSpecies: "all",
      lastGetProps: {
        latlon: this.props.latlon,
        type: this.props.type,
        radius: this.props.radius,
        unfiltered: this.props.unfiltered,
      },
    });

    // console.log(this.props.type);

    getFile(
      this.props.latlon,
      this.props.type,
      this.props.unfiltered,
      this.props.radius
    )
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
            // <ScrollView>
            //   <Card title={error.name}>
            //     <Text style={{ marginBottom: 20 }}>{error.message}</Text>
            //     <Text>{error.stack}</Text>
            //   </Card>
            // </ScrollView>
            <ErrorDisplay
              name={error.name}
              message={error.message}
              stack={error.stack}
              refresh={this.errorRefresh}
            />
          ),
          loading: false,
        });

        console.log(error.stack, error.name, error);
      });
  }

  generateSpeciesList = (observations) => {
    let speciesAcronymArray = ["all"];
    let speciesFullnameArray = ["all"];

    this.state.observations.forEach((element) => {
      if (element.species) {
        let thisWordArray = element.species.split(" ");

        let thisAcronym = thisWordArray
          .map((word) => {
            return word[0].toLowerCase();
          })
          .join("");

        // console.log(thisAcronym);

        if (
          !speciesAcronymArray.includes(thisAcronym) ||
          !speciesFullnameArray.includes(element.species)
        ) {
          speciesAcronymArray.push(thisAcronym);
        }

        if (!speciesFullnameArray.includes(element.species)) {
          speciesFullnameArray.push(element.species);
        }
      }
    });

    // console.log(speciesAcronymArray);
    // console.log(speciesFullnameArray);

    this.setState({
      acronymArray: speciesAcronymArray,
      fullnameArray: speciesFullnameArray,
    });
  };

  componentDidMount() {
    // console.log("mounted");
    this.getData();

    const unsubscribe = this.props.navigation.addListener(
      "action",
      (action) => {
        // console.log(action.action.type);
        if (action.action.type === "Navigation/TOGGLE_DRAWER") {
          this.setState({
            drawerOpen: true,
          });
        } else if (action.action.type === "Navigation/CLOSE_DRAWER") {
          this.setState({
            drawerOpen: false,
          });
        }
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("updated");
    // console.log(prevState.selectedMarker, this.state.selectedMarker);
    if (
      (this.props.type !== this.state.lastGetProps.type ||
        this.props.latlon !== this.state.lastGetProps.latlon ||
        this.props.radius !== this.state.lastGetProps.radius ||
        this.props.unfiltered !== this.state.lastGetProps.unfiltered) &&
      !this.state.drawerOpen &&
      this.props.isFocused
    ) {
      this.getData();
    }

    if (prevState.observations !== this.state.observations) {
      this.generateSpeciesList(this.state.observations);
    }

    if (!this.props.isFocused && this.state.drawerOpen) {
      this.setState({
        drawerOpen: false,
      });
    }

    // if (prevProps.unfiltered !== this.props.unfiltered) {
    //   this.getData();
    // }
  }

  render() {
    // if (this.state.observations.length) {
    //   console.log("state obs: " + this.state.observations.length);
    // }
    // console.log(this.state.acronymArray);
    // console.log("display: " + this.props.type);
    // console.log(this.props.type, this.state.drawerOpen);
    // console.log(this.props.type, "focus: " + this.props.isFocused);

    // return <ErrorDisplay />;

    if (this.state.errorMsg) {
      return this.state.errorMsg;
    }

    if (this.state.observations) {
      return (
        <View style={styles.pageBackground}>
          <ImageBackground
            source={pageBG}
            resizeMode="repeat"
            style={{ height: "100%", width: "100%" }}
          >
            <Animatable.View
              style={styles.pageBackground}
              animation="fadeIn"
              useNativeDriver={true}
            >
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
                  sortSpecies={this.state.sortSpecies}
                  sorted={this.speciesSortMethod()}
                  radius={this.props.radius}
                />
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      margin: 10,
                      borderStyle: "solid",
                      borderColor: "#575046",
                      borderWidth: 3,
                      borderRadius: 15,
                      overflow: "hidden",
                    }}
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
                    <View style={{ flexGrow: 1, backgroundColor: "#AFA392" }}>
                      <ImageBackground
                        source={cardBG}
                        resizeMode="repeat"
                        style={{}}
                      >
                        <Text
                          style={{
                            ...styles.swipeBtnText,
                            // margin: 10,
                            padding: 10,
                            fontSize: 14,
                            fontWeight: "bold",
                            color: "white",
                            textShadowColor: "black",
                            textShadowOffset: { width: -1, height: 1 },
                            textShadowRadius: 3,
                            // backgroundColor: "#AFA392",
                            backgroundColor: "none",
                          }}
                        >
                          {"Sort: " + this.state.sortBy.toUpperCase()}
                        </Text>
                      </ImageBackground>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      margin: 10,
                      borderStyle: "solid",
                      borderColor: "#575046",
                      borderWidth: 3,
                      borderRadius: 15,
                      overflow: "hidden",
                    }}
                    onPress={() => {
                      this.handleSpeciesSwitch();
                    }}
                  >
                    <View style={{ flexGrow: 1, backgroundColor: "#AFA392" }}>
                      <ImageBackground
                        source={cardBG}
                        resizeMode="repeat"
                        style={{}}
                      >
                        <Text
                          style={{
                            ...styles.swipeBtnText,
                            // margin: 10,
                            padding: 10,
                            fontSize: 14,
                            fontWeight: "bold",
                            color: "white",
                            textShadowColor: "black",
                            textShadowOffset: { width: -1, height: 1 },
                            textShadowRadius: 3,
                            backgroundColor: "none",
                          }}
                        >
                          {"Species: " + this.state.sortSpecies.toUpperCase()}
                        </Text>
                      </ImageBackground>
                    </View>
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
                    sortSpecies={this.state.sortSpecies}
                    acronymArray={this.state.acronymArray}
                    fullnameArray={this.state.fullnameArray}
                    sorted={this.speciesSortMethod()}
                    navigation={this.props.navigation}
                  />
                </View>
              </ImageBackground>
            </Animatable.View>
          </ImageBackground>
        </View>
      );
    } else {
      return <View style={styles.pageBackground}></View>;
    }
  }
}

export default withNavigationFocus(CardDisplay);