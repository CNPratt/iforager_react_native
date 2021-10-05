import ObsCard from "./ObsCardComponent";
import { ListItem } from "react-native-elements";
import { FlatList } from "react-native";
import React, { Component } from "react";

export function CardStack(props) {
  let sortedArray = props.observations.sort((a, b) =>
    a.trueDistance > b.trueDistance ? 1 : -1
  );

  return sortedArray.map((obs) => (
    <ListItem>
      <ObsCard
        click={props.handleMarkerClick}
        obsid={obs.trueID}
        key={obs.trueID}
        observation={obs}
        // selectedId={props.selectedMarker}
      />
    </ListItem>
  ));
}

const renderItem = ({ item }) => {
  return (
    <ObsCard
      click={item.handleMarkerClick}
      obsid={item.trueID}
      key={item.trueID}
      observation={item}
      // selectedId={props.selectedMarker}
    />
  );
};

export function CardFlatList(props) {
  let sortedArray = props.observations.sort((a, b) =>
    a.trueDistance > b.trueDistance ? 1 : -1
  );

  return (
    <FlatList
      data={sortedArray}
      renderItem={renderItem}
      keyExtractor={(item) => item.trueID.toString()}
    />
  );
}
