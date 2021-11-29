import React, { Component } from "react";
import { Text, View, Platform, Image, ImageBackground } from "react-native";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "../shared/Styles";
import cardBG from "../assets/textures/cloth-alike.png";
import pageBG from "../assets/textures/fabric-dark.png";
import * as Animatable from "react-native-animatable";

import { TaxaCard } from "./TaxaCardClass";

class TaxaDirectoryComponent extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Taxa Directory",
    headerTitleStyle: {
      textShadowColor: "black",
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 5,
    },
  };

  render() {
    return (
      <View style={styles.pageBackground}>
        <ImageBackground
          source={pageBG}
          resizeMode="repeat"
          style={{ height: "100%", width: "100%" }}
        >
          <ScrollView>
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
                  contentContainerStyle={{
                    ...styles.pageBackground,
                  }}
                  bounces={false}
                >
                  <ImageBackground
                    source={pageBG}
                    resizeMode="repeat"
                    style={{ flex: 1 }}
                  >
                    <Text style={styles.taxaHeader}>Mushrooms</Text>
                    <TaxaCard
                      title="Genus Laetiporus"
                      subtitle="Chicken of the Woods"
                      uri={require("../assets/images/taxa/main/cincinnatus.jpeg")}
                    />
                    <TaxaCard
                      title="Genus Cantharellus"
                      subtitle="Chanterelles"
                      uri={require("../assets/images/taxa/main/goldenchanterelle.jpeg")}
                    />
                    <TaxaCard
                      title="Genus Morchella"
                      subtitle="Morels I'd like to find"
                      uri={require("../assets/images/taxa/main/whitemorel.jpeg")}
                    />
                    <TaxaCard
                      title="Genus Pleurotus"
                      subtitle="Oyster mushrooms"
                      uri={require("../assets/images/taxa/main/goldenoyster3.jpeg")}
                    />
                    <TaxaCard
                      title="Species Grifola Frondosa"
                      subtitle="Maitake/Hen of the Woods"
                      uri={require("../assets/images/taxa/main/grifola.jpeg")}
                    />
                    <Text style={styles.taxaHeader}>Berries</Text>
                    <TaxaCard
                      title="Genus Rubus"
                      subtitle="Raspberries, blackberries, and more"
                      uri={require("../assets/images/taxa/main/blackraspberry.jpeg")}
                    />
                    <TaxaCard
                      title="Genus Fragaria"
                      subtitle="Strawberries"
                      uri={require("../assets/images/taxa/main/wildstrawberry2.jpeg")}
                    />
                    <TaxaCard
                      title="Genus Vaccinium"
                      subtitle="Blueberries, cranberries, and more"
                      uri={require("../assets/images/taxa/main/lowbushblueberry.jpeg")}
                    />
                    <TaxaCard
                      title="Genus Ribes"
                      subtitle="Currants and gooseberries"
                      uri={require("../assets/images/taxa/main/missourigooseberry.jpeg")}
                    />
                    <TaxaCard
                      title="Species Elaeagnus Umbellata"
                      subtitle="Autumn olive"
                      uri={require("../assets/images/taxa/main/autumnolive.jpeg")}
                    />

                    <Text style={styles.taxaHeader}>Fruit</Text>
                    <TaxaCard
                      title="Genus Asimina"
                      subtitle="North American native pawpaws"
                      uri={require("../assets/images/taxa/main/commonpawpaw.jpeg")}
                    />
                    <TaxaCard
                      title="Genus Diospyros"
                      subtitle="Persimmons"
                      uri={require("../assets/images/taxa/main/americanpersimmon.jpeg")}
                    />
                    <TaxaCard
                      title="Genus Pyrus"
                      subtitle="Pears of all varieties"
                      uri={require("../assets/images/taxa/main/commonpear.jpeg")}
                    />
                    <TaxaCard
                      title="Genus Malus"
                      subtitle="Apples of all varieties"
                      uri={require("../assets/images/taxa/main/malus.jpeg")}
                    />
                    <TaxaCard
                      title="Genus Prunus"
                      subtitle="Plums, cherries, and allies"
                      uri={require("../assets/images/taxa/main/birdcherry.jpeg")}
                    />
                    <TaxaCard
                      title="Genus Vitis"
                      subtitle="Grapes of all varieties"
                      uri={require("../assets/images/taxa/main/riverbankgrape.jpeg")}
                    />
                    <TaxaCard
                      title="Genus Opuntia"
                      subtitle="Prickly pear cactus fruit"
                      uri={require("../assets/images/taxa/main/beavertailprickleypear.jpeg")}
                    />
                    <TaxaCard
                      title="Citrus"
                      subtitle="Oranges, satsumas, and more"
                      uri={require("../assets/images/taxa/main/trifoliateorange.jpeg")}
                    />
                    <Text style={styles.taxaHeader}>Alliums</Text>
                    <TaxaCard
                      title="Genus Allium"
                      subtitle="Onions, leeks, and garlic"
                      uri={require("../assets/images/taxa/main/ramps.jpeg")}
                    />
                  </ImageBackground>
                </ScrollView>
              </ImageBackground>
            </Animatable.View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

export default TaxaDirectoryComponent;
