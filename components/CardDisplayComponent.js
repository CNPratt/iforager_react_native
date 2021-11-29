import React, { Component } from "react";
import { getFile } from "./data/GetFileFunctions";
import { CardFlatList } from "./CardStackComponent";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-elements";
import TestMap from "./TestMapComponent";
import { styles } from "../shared/Styles";
import pageBG from "../assets/textures/fabric-dark.png";
import * as Animatable from "react-native-animatable";

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
    let speciesIndex = this.state.acronymArray.indexOf(this.state.sortSpecies);
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

  getData() {
    this.setState({
      observations: [],
      selectedMarker: null,
      loading: true,
      animateToMarker: null,
      acronymArray: ["all"],
      fullnameArray: ["all"],
      sortSpecies: "all",
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
      this.generateSpeciesList(this.state.observations);
    }

    if (prevProps.unfiltered !== this.props.unfiltered) {
      this.getData();
    }
  }

  render() {
    // if (this.state.observations.length) {
    //   console.log("state obs: " + this.state.observations.length);
    // }

    // console.log(this.state.acronymArray);

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
                />
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flex: 1,
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
                    <Text
                      style={{
                        ...styles.swipeBtnText,
                        margin: 10,
                        padding: 10,
                      }}
                    >
                      {this.state.sortBy}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                    }}
                    onPress={() => {
                      this.handleSpeciesSwitch();
                    }}
                  >
                    <Text
                      style={{
                        ...styles.swipeBtnText,
                        margin: 10,
                        padding: 10,
                      }}
                    >
                      {this.state.sortSpecies}
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
                    sortSpecies={this.state.sortSpecies}
                    acronymArray={this.state.acronymArray}
                    fullnameArray={this.state.fullnameArray}
                    sorted={this.speciesSortMethod()}
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

export default CardDisplay;
