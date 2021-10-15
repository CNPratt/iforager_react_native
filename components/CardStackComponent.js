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

export class CardFlatList extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.selectedMarker !== this.props.selectedMarker) {
  //     let sortedArray = this.props.observations.sort((a, b) =>
  //       a.trueDistance > b.trueDistance ? 1 : -1
  //     );
  //     this.flatlist.scrollToIndex({
  //       index: sortedArray.findIndex((element) => {
  //         // console.log(
  //         //   "scrollto: " +
  //         //     this.props.selectedMarker +
  //         //     " elementID: " +
  //         //     element.trueID
  //         // );
  //         return element.trueID === this.props.selectedMarker;
  //       }),
  //     });
  //   }
  // }

  // const onViewableItemsChanged = ({ viewableItems }) => {
  //   console.log(viewableItems[0].index);
  //   console.log(this.flatlist);
  //   this.flatlist.scrollToIndex({ index: viewableItems[0].index });
  // };
  // const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);

  // console.log(selectedArray);

  render() {
    const distMethod = (a, b) => (a.trueDistance > b.trueDistance ? 1 : -1);
    const dateMethod = (a, b) => (a.createDate > b.createDate ? -1 : 1);

    let sortMethod = (method) => {
      switch (method) {
        case "dist":
          return distMethod;
          break;
        case "date":
          return dateMethod;
          break;
        default:
          return distMethod;
      }
    };

    let sortedArray = this.props.observations.sort(
      sortMethod(this.props.sortBy)
    );

    let updatedArray = sortedArray.map((element) => {
      let thisElement = {
        ...element,
        selectedMarker: this.props.selectedMarker,
        click: this.props.handleMarkerClick,
      };

      return thisElement;
    });

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
}
