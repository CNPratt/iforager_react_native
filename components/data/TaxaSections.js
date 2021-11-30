import { TaxaCard } from "../TaxaCardClass";
import { Text, View } from "react-native";
import React, { Component } from "react";

export const taxaSections = (nav) => [
  {
    title: "Mushrooms",
    content: (
      <View>
        <TaxaCard
          title="Genus Laetiporus"
          subtitle="Chicken of the Woods"
          uri={require("../../assets/images/taxa/main/cincinnatus.jpeg")}
          nav={nav}
          taxaName="laetiporus"
        />
        <TaxaCard
          title="Genus Cantharellus"
          subtitle="Chanterelles"
          uri={require("../../assets/images/taxa/main/goldenchanterelle.jpeg")}
          nav={nav}
          taxaName="cantharellus"
        />
        <TaxaCard
          title="Genus Morchella"
          subtitle="Morels I'd like to find"
          uri={require("../../assets/images/taxa/main/whitemorel.jpeg")}
          nav={nav}
          taxaName="morchella"
        />
        <TaxaCard
          title="Genus Pleurotus"
          subtitle="Oyster mushrooms"
          uri={require("../../assets/images/taxa/main/goldenoyster3.jpeg")}
          nav={nav}
          taxaName="pleurotus"
        />
        <TaxaCard
          title="Species Grifola Frondosa"
          subtitle="Maitake/Hen of the Woods"
          uri={require("../../assets/images/taxa/main/grifola.jpeg")}
          nav={nav}
          taxaName="frondosa"
        />
      </View>
    ),
  },
  {
    title: "Berries",
    content: (
      <View>
        <TaxaCard
          title="Genus Rubus"
          subtitle="Raspberries, blackberries, and more"
          uri={require("../../assets/images/taxa/main/blackraspberry.jpeg")}
          nav={nav}
          taxaName="rubus"
        />
        <TaxaCard
          title="Genus Fragaria"
          subtitle="Strawberries"
          uri={require("../../assets/images/taxa/main/wildstrawberry2.jpeg")}
          nav={nav}
          taxaName="fragaria"
        />
        <TaxaCard
          title="Genus Vaccinium"
          subtitle="Blueberries, cranberries, and more"
          uri={require("../../assets/images/taxa/main/lowbushblueberry.jpeg")}
          nav={nav}
          taxaName="vaccinium"
        />
        <TaxaCard
          title="Genus Ribes"
          subtitle="Currants and gooseberries"
          uri={require("../../assets/images/taxa/main/missourigooseberry.jpeg")}
          nav={nav}
          taxaName="ribes"
        />
        <TaxaCard
          title="Species Elaeagnus Umbellata"
          subtitle="Autumn olive"
          uri={require("../../assets/images/taxa/main/autumnolive.jpeg")}
          nav={nav}
          taxaName="umbellata"
        />
      </View>
    ),
  },
  {
    title: "Fruit",
    content: (
      <View>
        <TaxaCard
          title="Genus Asimina"
          subtitle="North American native pawpaws"
          uri={require("../../assets/images/taxa/main/commonpawpaw.jpeg")}
          nav={nav}
          taxaName="asimina"
        />
        <TaxaCard
          title="Genus Diospyros"
          subtitle="Persimmons"
          uri={require("../../assets/images/taxa/main/americanpersimmon.jpeg")}
          nav={nav}
          taxaName="diospyros"
        />
        <TaxaCard
          title="Genus Pyrus"
          subtitle="Pears of all varieties"
          uri={require("../../assets/images/taxa/main/commonpear.jpeg")}
          nav={nav}
          taxaName="pyrus"
        />
        <TaxaCard
          title="Genus Malus"
          subtitle="Apples of all varieties"
          uri={require("../../assets/images/taxa/main/malus.jpeg")}
          nav={nav}
          taxaName="malus"
        />
        <TaxaCard
          title="Genus Prunus"
          subtitle="Plums, cherries, and allies"
          uri={require("../../assets/images/taxa/main/birdcherry.jpeg")}
          nav={nav}
          taxaName="prunus"
        />
        <TaxaCard
          title="Genus Vitis"
          subtitle="Grapes of all varieties"
          uri={require("../../assets/images/taxa/main/riverbankgrape.jpeg")}
          nav={nav}
          taxaName="vitis"
        />
        <TaxaCard
          title="Genus Opuntia"
          subtitle="Prickly pear cactus fruit"
          uri={require("../../assets/images/taxa/main/beavertailprickleypear.jpeg")}
          nav={nav}
          taxaName="opuntia"
        />
        <TaxaCard
          title="Citrus"
          subtitle="Oranges, satsumas, and more"
          uri={require("../../assets/images/taxa/main/trifoliateorange.jpeg")}
          nav={nav}
          taxaName="citrus"
        />
      </View>
    ),
  },
  {
    title: "Alliums",
    content: (
      <View>
        <TaxaCard
          title="Genus Allium"
          subtitle="Onions, leeks, and garlic"
          uri={require("../../assets/images/taxa/main/ramps.jpeg")}
          nav={nav}
          taxaName="alliums"
        />
      </View>
    ),
  },
];
