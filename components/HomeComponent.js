import React, { Component } from "react";
import { Text, View, Platform } from "react-native";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Home",
  };

  render() {
    return (
      <ScrollView>
        <Card title="Quote of the Day API Tester">
          <Text>{this.props.screenProps.quote}</Text>
        </Card>
        <Card title="Welcome to iForager!">
          <Text style={{ marginBottom: 10 }}>
            This is a page built on the iNaturalist API to make it easier to
            find edible plants and mushrooms near you! You may click an image to
            be taken to the original observation in full detail.
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Please ensure that geolocation services are on for a seamless
            experience. Results may take a moment or two to display. If the
            results pages still seem to do nothing, you may have been
            temporarily denied because of call frequency. In this case, simply
            wait a minute or two and reload the page.
          </Text>
          <Text style={{ marginBottom: 10 }}>
            And as always, please forage with care! Though we do our best to
            include the most common and easily identifiable edible species, we
            cannot guaruntee the accuracy of the observations or the edibility
            of any foraged products that you might find. Additionally, people
            react to wild goods in different ways. Always do your own research.
            Additionally, we cannot guarantee that all observations are
            accessible to the public, and all local and regional foraging laws
            should be adhered to.
          </Text>

          <Text style={{ marginBottom: 10 }}>
            {this.props.screenProps.latlon[0]},{" "}
            {this.props.screenProps.latlon[1]}
          </Text>

          {/* <Text>{Platform.OS}</Text> */}
        </Card>
      </ScrollView>
    );
  }
}

export default Home;
