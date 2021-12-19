import React, { Component } from "react";
import {
  View,
  ImageBackground,
  TextInput,
  Button,
  Image,
  Text,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "../../../shared/Styles";
import pageBG from "../../../assets/textures/fabric-dark.png";
import * as Animatable from "react-native-animatable";
import { CustomMapCard } from "../secondary/CustomMapCardClass";
import { idObject } from "../../data/IDObject";
import { AccordionView } from "../secondary/AccordionView";
import { taxaSearch } from ".././../utility/GetFileFunctions";
import SearchResult from "../secondary/SearchResultComponent";
import { Card, Icon } from "react-native-elements";

let idRegex = /^[-,0-9]+$/;

let helpSection = () => [
  {
    title: "Instructions",
    content: (
      <View style={{ flex: 1, padding: 20 }}>
        <Text
          style={{
            textAlign: "center",
            margin: 10,
            color: "white",
            textShadowColor: "black",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 3,
          }}
        >
          Go to iNaturalist.org, search for your desired taxa, and select the
          'About' button.
        </Text>
        <Image
          source={require("../../../assets/images/ui/searchExample.png")}
          style={{
            resizeMode: "center",
            alignSelf: "center",
            margin: 0,
            padding: 0,
            // backgroundColor: "white",
          }}
        />
        <Text
          style={{
            textAlign: "center",
            margin: 10,
            color: "white",
            textShadowColor: "black",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 3,
          }}
        >
          Once you are on the about page, the url will look similar to the one
          pictured below. The taxa ID number in this case is 119817.
        </Text>
        <Image
          source={require("../../../assets/images/ui/urlExample.png")}
          style={{
            resizeMode: "contain",
            alignSelf: "center",
            margin: 0,
            padding: 0,
          }}
        />
        <Text
          style={{
            textAlign: "center",
            margin: 10,
            color: "white",
            textShadowColor: "black",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 3,
          }}
        >
          To create a custom map, enter a unique name and a string of any number
          of IDs in this format: id1,id2,id3,id4
        </Text>
      </View>
    ),
  },
];

class CustomMapScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: "create",
      newMapName: "",
      newMapIds: "",
      searchText: "",
      searchResults: [],
    };
  }

  static navigationOptions = {
    title: "Custom Maps",
    headerTitleStyle: {
      textShadowColor: "black",
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 5,
    },
  };

  addResultId = (id) => {
    let idArray = this.state.newMapIds.split(",");

    // console.log(idArray);
    if (!idArray.includes(id.toString())) {
      console.log("add: " + id);
      if (this.state.newMapIds === "") {
        this.setState({
          newMapIds: id.toString(),
        });
      } else {
        this.setState({
          newMapIds: this.state.newMapIds + "," + id,
        });
      }
    }
  };

  removeResultId = (id) => {
    let idArray = this.state.newMapIds.split(",");

    console.log("id: " + id);
    if (idArray.includes(id.toString())) {
      console.log("remove: " + id);
      this.setState({
        newMapIds: idArray.filter((item) => item !== id.toString()).join(","),
      });
    }
  };

  modeSwitch = () => {
    if (this.state.mode === "create") {
      this.setState({
        mode: "mymaps",
      });
    } else if (this.state.mode === "mymaps") {
      this.setState({
        mode: "create",
      });
    }
  };

  render() {
    // console.log(this.state.newMapIds);
    let mapCardArray = [];
    this.props.customMapsArray.forEach((map) =>
      mapCardArray.push(
        <CustomMapCard
          title={map.title}
          ids={map.ids}
          nav={this.props.navigation}
          addCustomMap={this.props.addCustomMap}
          deleteCustomMap={this.props.deleteCustomMap}
        />
      )
    );

    let searchElements = this.state.searchResults.map((result) => (
      <SearchResult
        commonName={result.commonName}
        taxonId={result.taxonId}
        name={result.name}
        rank={result.rank}
        add={() => this.addResultId(result.taxonId)}
        newMapIds={this.state.newMapIds}
        remove={() => this.removeResultId(result.taxonId)}
      />
    ));

    return (
      <View style={styles.pageBackground}>
        <ImageBackground
          source={pageBG}
          resizeMode="repeat"
          style={{ height: "100%", width: "100%" }}
        >
          <Animatable.View
            style={{ flex: 1 }}
            animation="fadeIn"
            useNativeDriver={true}
          >
            {/* <AccordionView sections={helpSection()} /> */}

            <View
              style={{
                ...styles.flatlist,
                margin: 10,
                padding: 5,
                flex: 1,
              }}
            >
              <Icon
                name="help-circle"
                color="#575046"
                type="material-community"
                containerStyle={{
                  position: "absolute",
                  alignSelf: "flex-end",
                  marginTop: 7,
                  paddingRight: 20,
                }}
                size={24}
              />
              <Text
                style={{
                  textAlign: "start",
                  margin: 12,
                  marginBottom: 0,
                  color: "white",
                  textShadowColor: "black",
                  textShadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 3,
                  fontSize: "16",
                  // backgroundColor: "red",
                }}
              >
                New Map Name
              </Text>
              <TextInput
                style={{
                  ...styles.newMapNameInput,
                  marginTop: 0,
                  marginBottom: 0,
                }}
                ref={(input) => {
                  this.nameInput = input;
                }}
                placeholder="Custom Map Name"
                text={this.state.newMapName}
                onChangeText={(text) =>
                  this.setState({
                    newMapName: text,
                  })
                }
              />
              <Text
                style={{
                  textAlign: "start",
                  margin: 12,
                  marginBottom: 0,
                  color: "white",
                  textShadowColor: "black",
                  textShadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 3,
                  fontSize: "16",
                  // backgroundColor: "red",
                }}
              >
                New Map IDs
              </Text>
              <TextInput
                style={{
                  ...styles.newMapNameInput,
                  marginTop: 0,
                  marginBottom: 0,
                }}
                ref={(input) => {
                  this.idInput = input;
                }}
                placeholder="Custom Map Ids"
                defaultValue={this.state.newMapIds}
                onChangeText={(text) =>
                  this.setState({
                    newMapIds: text,
                  })
                }
              />

              <Text
                style={{
                  textAlign: "start",
                  margin: 12,
                  marginBottom: 0,
                  color: "white",
                  textShadowColor: "black",
                  textShadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 3,
                  fontSize: "16",
                  // backgroundColor: "red",
                }}
              >
                Taxa Search
              </Text>
              <TextInput
                style={{
                  ...styles.newMapNameInput,
                  marginTop: 0,
                  marginBottom: 6,
                }}
                ref={(input) => {
                  this.searchInput = input;
                }}
                placeholder="Enter search here"
                text={this.state.searchText}
                onChangeText={(text) =>
                  this.setState({
                    searchText: text,
                  })
                }
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <View
                  style={{
                    borderStyle: "solid",
                    borderColor: "#575046",
                    borderWidth: 1,
                    borderRadius: 5,
                    flex: 1,
                    margin: 5,
                  }}
                >
                  <Button
                    title="Create map"
                    onPress={() => {
                      let newMap = {
                        title: this.state.newMapName,
                        ids: this.state.newMapIds,
                      };

                      let staticNameFilter =
                        idObject[
                          this.state.newMapName
                            .split(" ")
                            .join("")
                            .toLowerCase()
                        ];

                      let customMapFilter = this.props.customMapsArray.filter(
                        (element) => element.title === this.state.newMapName
                      );

                      // console.log(customMapFilter);
                      if (
                        this.state.newMapName &&
                        idRegex.test(this.state.newMapIds) &&
                        !staticNameFilter &&
                        !customMapFilter.length
                      ) {
                        this.props.addCustomMap(newMap);
                        this.setState({
                          newMapName: "",
                          newMapIds: "",
                          mode: "mymaps",
                        });

                        this.idInput.clear();
                        this.nameInput.clear();
                      }
                    }}
                    color="#f8ecdb"
                  />
                </View>
                <View
                  style={{
                    borderStyle: "solid",
                    borderColor: "#575046",
                    borderWidth: 1,
                    borderRadius: 5,
                    flex: 1,
                    margin: 5,
                  }}
                >
                  <Button
                    title="Search"
                    onPress={() => {
                      if (this.state.searchText !== "") {
                        taxaSearch(this.state.searchText).then((result) =>
                          this.setState({
                            searchResults: result,
                            mode: "create",
                          })
                        );
                      }
                      // this.searchInput.clear();
                    }}
                    color="#f8ecdb"
                  />
                </View>
                <View
                  style={{
                    borderStyle: "solid",
                    borderColor: "#575046",
                    borderWidth: 1,
                    borderRadius: 5,
                    flex: 1,
                    margin: 5,
                  }}
                >
                  <Button
                    title={this.state.mode === "create" ? "My Maps" : "Results"}
                    onPress={() => {
                      this.modeSwitch();
                    }}
                    color="#f8ecdb"
                  />
                </View>
              </View>
            </View>
            {this.state.mode === "create" ? (
              <View
                style={{
                  ...styles.flatlist,
                  margin: 10,
                  padding: 5,
                  flex: 1,
                }}
              >
                <ScrollView style={{ flex: 1 }}>{searchElements}</ScrollView>
              </View>
            ) : (
              <View
                style={{
                  ...styles.flatlist,
                  margin: 10,
                  padding: 5,
                  flex: 1,
                }}
              >
                <ScrollView style={{ flex: 1 }}>{mapCardArray}</ScrollView>
              </View>
            )}
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }
}

export default CustomMapScreen;
