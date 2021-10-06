import React, { Component } from "react";
import { getFile } from "./GetFileFunctions";
import ObsCard from "./ObsCardComponent";
import { CardStack, CardFlatList } from "./CardStackComponent";
import { Text, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-elements";
import TestMap from "./TestMapComponent";

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

    // console.log(this.state.loading);

    if (this.state.errorMsg) {
      return (
        //   <TitleDisplay
        //     typeName={this.props.type}
        //     error={this.state.errorMsg}
        //   />
        <Text>{this.state.errorMsg}</Text>
      );
    }

    if (this.state.observations) {
      return (
        <View>
          {/* <TitleDisplay
            typeName={this.props.type}
            loading={this.state.loading}
          /> */}

          {/* <SimpleMap
            latlon={this.props.latlon}
            observations={this.state.observations}
            selected={this.state.selected}
            handler={this.handleMarkerClick}
            selectedMarker={this.state.selectedMarker}
            transKey={this.props.location.pathname}
          /> */}

          {/* <MainMap
            latlon={this.props.latlon}
            observations={this.state.observations}
            selected={this.state.selected}
            handler={this.handleMarkerClick}
            selectedMarker={this.state.selectedMarker}
            transKey={this.props.location.pathname}
          /> */}

          {/* <LocationForm relay={this.props.relay} /> */}

          {/* <div className="col" id="cardCol"> */}
          {/* <Stagger in> */}
          {/* {this.state.observations
                  .sort((a, b) => (a.trueDistance > b.trueDistance ? 1 : -1))
                  .map((obs) => (
                    <ObsCard
                      click={this.handleMarkerClick}
                      obsid={obs.trueID}
                      key={obs.trueID}
                      observation={obs}
                      selectedId={this.state.selectedMarker}
                    />
                  ))} */}
          <TestMap latlon={this.props.latlon} />
          <CardFlatList
            observations={this.state.observations}
            handleMarkerClick={this.handleMarkerClick}
            selectedMarker={this.state.selectedMarker}
          />
          {/* </Stagger> */}
          {/* </div> */}
        </View>
      );
    } else {
      return <View></View>;
    }
  }
}

export default CardDisplay;
