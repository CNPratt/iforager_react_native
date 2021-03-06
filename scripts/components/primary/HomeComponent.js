import React, { Component } from "react";
import { Text, View, ImageBackground, Button } from "react-native";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "../../../shared/Styles";
import cardBG from "../../../assets/textures/cloth-alike.png";
import pageBG from "../../../assets/textures/fabric-dark.png";
import * as Animatable from "react-native-animatable";
import * as Location from "expo-location";
import { idObject } from "../../data/IDObject";
import * as Linking from "expo-linking";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "",
    };
  }

  static navigationOptions = {
    title: "Home",
    headerTitleStyle: {
      textShadowColor: "black",
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 5,
    },
  };

  componentDidUpdate(prevProps) {
    let combinedArray = [];
    let combinedIds = "";

    for (const property in idObject) {
      theseIds = idObject[property].ids.split(",");

      if (theseIds)
        theseIds.forEach((id) =>
          !combinedArray.includes(id) ? combinedArray.push(id) : null
        );
    }

    this.props.screenProps.customMapsArray.forEach((obs) => {
      let idArray = obs.ids.split(",");

      idArray.forEach((element) =>
        !combinedArray.includes(element) ? combinedArray.push(element) : null
      );
    });

    combinedIds = combinedArray.join(",");

    // console.log(combinedIds);

    if (prevProps.screenProps.latlon !== this.props.screenProps.latlon)
      Location.reverseGeocodeAsync({
        latitude: this.props.screenProps.latlon[0],
        longitude: this.props.screenProps.latlon[1],
      })
        .then((value) => {
          this.setState({
            location: `${value[0].street}, ${value[0].city}, ${value[0].region}`,
          });
          // console.log(value);
        })
        .catch((e) => console.log(e));
  }

  render() {
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
              <ScrollView
              // contentContainerStyle={{
              //   ...styles.pageBackground,
              // }}
              // bounces={false}
              >
                {/* <ImageBackground
                  source={pageBG}
                  resizeMode="repeat"
                  style={{ flex: 1 }}
                > */}
                <Card
                  containerStyle={{
                    // flex: 1,
                    borderStyle: "solid",
                    borderWidth: 3,
                    padding: 0,
                    margin: 10,
                    borderRadius: 25,
                    backgroundColor: "#f8ecdb",
                    borderColor: "#575046",
                    overflow: "hidden",
                  }}
                >
                  <ImageBackground
                    source={cardBG}
                    resizeMode="repeat"
                    style={{}}
                  >
                    <View
                      style={{
                        minWidth: "100%",
                        maxWidth: "100%",
                      }}
                    >
                      <Text
                        style={{
                          marginBottom: 10,
                          fontWeight: "bold",
                          fontSize: 24,
                          textAlign: "center",
                          marginVertical: 10,
                          color: "white",
                          textShadowColor: "black",
                          textShadowOffset: { width: -1, height: 1 },
                          textShadowRadius: 3,
                        }}
                      >
                        Welcome to iForager!
                      </Text>
                      <Text style={styles.homeCardText}>
                        This is an app built using the iNaturalist API to make
                        it easier to find and learn about about edible plants
                        and mushrooms near you! You may click an image to select
                        an observation and click again to center the map. You
                        can similarly select by clicking on a map marker, and
                        clicking a selected marker will both center the map and
                        scroll to the selected observation. Swipe a card left or
                        right for more options.
                      </Text>
                      {/* <Text style={styles.homeCardText}>
                          Please ensure that geolocation services are on for a
                          seamless experience. Results may take a moment or two
                          to display. */}
                      {/* If the results pages still seem to do
                          nothing, you may have been temporarily denied because
                          of call frequency. In this case, simply wait a minute
                          or two and reload the page. */}
                      {/* </Text> */}
                      <Text style={styles.homeCardText}>
                        And as always, please forage with care! Though we do our
                        best to include the most common and easily identifiable
                        species, we cannot guarantee the accuracy of the
                        observations or the edibility of any foraged products
                        that you might find. Additionally, people react to wild
                        goods in different ways. Always do your own research and
                        never eat anything you can't independently verify
                        yourself. Additionally, we cannot guarantee that all
                        observations are accessible to the public, and all local
                        and regional foraging laws should be adhered to.
                      </Text>
                      <Text style={styles.homeCardText}>
                        Questions, comments, or feedback? Get in touch at
                      </Text>
                      <Button
                        onPress={() =>
                          Linking.openURL("mailto:iforagerapp@gmail.com")
                        }
                        title="iforagerapp@gmail.com"
                        color="#575046"
                      />

                      {/* <Text style={styles.homeCardText}>
                          {this.props.screenProps.latlon[0]},{" "}
                          {this.props.screenProps.latlon[1]}
                        </Text> */}
                      <Text style={styles.homeCardText}>
                        {this.state.location}
                      </Text>
                    </View>
                  </ImageBackground>
                  {/* <Text>{Platform.OS}</Text> */}
                </Card>
              </ScrollView>
            </ImageBackground>
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }
}

export default Home;
