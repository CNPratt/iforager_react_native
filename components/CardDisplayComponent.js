import React, { Component } from "react";
import { getFile } from "./GetFileFunctions";
import ObsCard from "./ObsCardComponent";
import { CardStack, CardFlatList } from "./CardStackComponent";
import { Text, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-elements";
import TestMap from "./TestMapComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../shared/Styles";

class CardDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      observations: [],
      selected: null,
      selectedMarker: null,
      errorMsg: null,
      loading: false,
    };
  }

  static navigationOptions = {
    title: "Cards",
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedMarker !== this.state.selectedMarker) {
    }
  }

  handleMarkerClick = (id) => {
    // console.log("handlemarkerclick");
    this.setState({
      selected: this.state.observations
        .filter((obs) => obs.trueID === id)
        .map((obs) => (
          <ObsCard
            id="selectedCard"
            style={{ borderColor: "#CFBF00" }}
            obsid={`s${obs.trueID}`}
            key={obs.trueID}
            observation={obs}
          />
        )),
      selectedMarker: id,
    });
  };

  getData() {
    this.setState({
      observations: [],
      selected: null,
      selectedMarker: null,
      loading: true,
    });

    getFile(this.props.latlon, this.props.type)
      // getFile([42, -83], "fruit")
      .then((value) => {
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
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.type !== prevProps.type ||
      this.props.latlon !== prevProps.latlon
    ) {
      this.getData();
    }

    // console.log(this.state.observations)
  }

  render() {
    //        console.log("carddisplay props",  this.props);
    //        console.log("carddisplay state",  this.state);

    // console.log(this.state.selectedMarker);

    if (this.state.errorMsg) {
      return <Text>{this.state.errorMsg}</Text>;
    }

    if (this.state.observations) {
      return (
        <View style={styles.pageBackground}>
          <TestMap
            latlon={this.props.latlon}
            observations={this.state.observations}
            handler={this.handleMarkerClick}
            selectedMarker={this.state.selectedMarker}
          />
          <View style={styles.cardstackContainer}>
            <CardFlatList
              observations={this.state.observations}
              handleMarkerClick={this.handleMarkerClick}
              selectedMarker={this.state.selectedMarker}
            />
          </View>
        </View>
      );
    } else {
      return <View style={styles.pageBackground}></View>;
    }
  }
}

export default CardDisplay;
