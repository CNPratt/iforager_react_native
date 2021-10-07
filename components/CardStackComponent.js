import ObsCard from "./ObsCardComponent";
import { ListItem } from "react-native-elements";
import { FlatList } from "react-native";
import React, { Component } from "react";

// export function CardStack(props) {
//   let sortedArray = props.observations.sort((a, b) =>
//     a.trueDistance > b.trueDistance ? 1 : -1
//   );

//   return sortedArray.map((obs) => (
//     <ListItem>
//       <ObsCard
//         click={props.handleMarkerClick}
//         obsid={obs.trueID}
//         key={obs.trueID}
//         observation={obs}
//         selectedMarker={props.selectedMarker}
//       />
//     </ListItem>
//   ));
// }

const renderItem = (props) => {
  // console.log(props);
  let { item } = props;
  return (
    <ObsCard
      click={item.click}
      obsid={item.trueID}
      key={item.trueID}
      observation={item}
      selectedMarker={item.selectedMarker}
      color={item.color}
    />
  );
};

export function CardFlatList(props) {
  let sortedArray = props.observations.sort((a, b) =>
    a.trueDistance > b.trueDistance ? 1 : -1
  );

  let updatedArray = sortedArray.map((element) => {
    let thisColor;

    if (element.obsid === props.selectedMarker) {
      thisColor = "gray";
    } else {
      thisColor = "white";
    }

    let thisElement = {
      ...element,
      selectedMarker: props.selectedMarker,
      click: props.handleMarkerClick,
      color: thisColor,
    };
    return thisElement;
  });

  // console.log(selectedArray);

  return (
    <FlatList
      data={updatedArray}
      renderItem={renderItem}
      keyExtractor={(item) => item.trueID.toString()}
    />
  );
}
