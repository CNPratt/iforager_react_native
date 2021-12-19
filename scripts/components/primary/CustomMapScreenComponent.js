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
        add={() => this.addResultId(result.taxonId)}
        name={result.name}
        rank={result.rank}
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
          <ScrollView>
            <Animatable.View
              style={{ flex: 1 }}
              animation="fadeIn"
              useNativeDriver={true}
            >
              <ScrollView
                contentContainerStyle={{
                  flex: 1,
                }}
                bounces={false}
              >
                {/* <AccordionView sections={helpSection()} /> */}

                <View style={{ ...styles.flatlist, margin: 10 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      margin: 10,
                      color: "white",
                      textShadowColor: "black",
                      textShadowOffset: { width: -1, height: 1 },
                      textShadowRadius: 3,
                      fontSize: "24",
                    }}
                  >
                    Taxa Search
                  </Text>
                  <TextInput
                    style={styles.newMapNameInput}
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
                    onSubmitEditing={() => {
                      if (this.state.searchText !== "") {
                        taxaSearch(this.state.searchText).then((result) =>
                          this.setState({
                            searchResults: result,
                          })
                        );
                      }
                      this.searchInput.clear();
                    }}
                  />
                  <ScrollView style={{ maxHeight: 100, minHeight: 100 }}>
                    {searchElements}
                  </ScrollView>
                </View>
                <TextInput
                  style={styles.newMapNameInput}
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
                <TextInput
                  style={styles.newMapNameInput}
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
                <Button
                  title="Create map"
                  onPress={() => {
                    let newMap = {
                      title: this.state.newMapName,
                      ids: this.state.newMapIds,
                    };

                    let staticNameFilter =
                      idObject[
                        this.state.newMapName.split(" ").join("").toLowerCase()
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
                      });

                      this.idInput.clear();
                      this.nameInput.clear();
                    }
                  }}
                  color="#f8ecdb"
                />

                {mapCardArray}
              </ScrollView>
            </Animatable.View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

export default CustomMapScreen;
