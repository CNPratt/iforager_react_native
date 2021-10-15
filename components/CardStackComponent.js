import ObsCard from "./ObsCardComponent";
import { ListItem } from "react-native-elements";
import { FlatList, View } from "react-native";
import React, { Component, useRef } from "react";
import { styles } from "../shared/Styles";

let lastVisibileIndex = 0;

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
  // const onViewableItemsChanged = ({ viewableItems }) => {
  //   console.log(viewableItems[0].index);
  //   console.log(this.flatlist);
  //   this.flatlist.scrollToIndex({ index: viewableItems[0].index });
  // };
  // const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);

  let sortedArray = props.observations.sort((a, b) =>
    a.trueDistance > b.trueDistance ? 1 : -1
  );

  let updatedArray = sortedArray.map((element) => {
    let thisElement = {
      ...element,
      selectedMarker: props.selectedMarker,
      click: props.handleMarkerClick,
    };
    return thisElement;
  });

  // console.log(selectedArray);

  return (
    <FlatList
      ref={(ref) => (this.flatlist = ref)}
      data={updatedArray}
      renderItem={renderItem}
      keyExtractor={(item) => item.trueID.toString()}
      // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      style={styles.flatlist}
      ListFooterComponent={<View style={{ height: 15 }}></View>}
    />
  );
}
