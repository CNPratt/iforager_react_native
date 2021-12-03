import React, { Component } from "react";
import {
  Text,
  View,
  Platform,
  Image,
  ImageBackground,
  TextInput,
  Button,
} from "react-native";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "../shared/Styles";
import cardBG from "../assets/textures/cloth-alike.png";
import pageBG from "../assets/textures/fabric-dark.png";
import * as Animatable from "react-native-animatable";

import { TaxaCard } from "./TaxaCardClass";
import { taxaSections } from "./data/TaxaSections";
import { CustomMapCard } from "./CustomMapCardClass";
import { idObject } from "./data/IDObject";

let idRegex = /^[-,0-9]+$/;

class CustomMapScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newMapName: "",
      newMapIds: "",
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

  render() {
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
                  text={this.state.newMapIds}
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

                    console.log(customMapFilter);
                    if (
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
