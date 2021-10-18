import ObsCard from "./ObsCardComponent";
import { ListItem } from "react-native-elements";
import { FlatList, View } from "react-native";
import React, { Component, useRef } from "react";
import { styles } from "../shared/Styles";

let lastVisibileIndex = 0;
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

const renderItem = (props) => {
  // console.log(props);
  let { item } = props;
  return item[0];
};

export class CardFlatList extends Component {
  constructor(props) {
    super(props);
  }

  scrollTo() {
    let sortedArray = this.props.observations.sort(
      sortMethod(this.props.sortBy)
    );
    this.flatlist.scrollToIndex({
      index: sortedArray.findIndex((element) => {
        // console.log(
        //   "scrollto: " +
        //     this.props.selectedMarker +
        //     " elementID: " +
        //     element.trueID
        // );
        return element.trueID === this.props.selectedMarker;
      }),
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.scrollToCard) {
      this.scrollTo();
      this.props.scrollFulfilled();
    }
  }

  render() {
    let sortedArray = this.props.observations.sort(
      sortMethod(this.props.sortBy)
    );

    let cardStateArray = sortedArray.map((item) => {
      return [
        <ObsCard
          click={this.props.handleMarkerClick}
          obsid={item.trueID}
          key={item.trueID}
          observation={item}
          selectedMarker={this.props.selectedMarker}
          // color={item.color}
        />,
        item.trueID,
      ];
    });

    return (
      <FlatList
        ref={(ref) => (this.flatlist = ref)}
        data={cardStateArray}
        renderItem={renderItem}
        keyExtractor={(item) => {
          // console.log(item[1]);
          return item[1].toString();
        }}
        // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        style={styles.flatlist}
        ListFooterComponent={<View style={{ height: 15 }}></View>}
        getItemLayout={(data, index) => ({
          length: 106,
          offset: 106 * index,
          index,
        })}
      />
    );
  }
}
