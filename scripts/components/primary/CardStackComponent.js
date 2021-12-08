import ObsCard from "../secondary/ObsCardComponent";
import { FlatList, View, ActivityIndicator } from "react-native";
import React, { Component } from "react";
import { styles } from "../../../shared/Styles";

// let lastVisibileIndex = 0;
const distMethod = (a, b) => (a.trueDistance > b.trueDistance ? 1 : -1);
const dateMethod = (a, b) => (a.createDate > b.createDate ? -1 : 1);
const speciesMethod = (a, b) => (a.species > b.species ? 1 : -1);

const sortMethod = (method) => {
  switch (method) {
    case "dist":
      return distMethod;
      break;
    case "date":
      return dateMethod;
      break;
    case "species":
      return speciesMethod;
      break;
    default:
      return distMethod;
  }
};

const renderItem = (props) => {
  let { item } = props;
  return item[0];
};

const keyExtractor = (item) => {
  return item[1].toString();
};

const getItemLayout = (data, index) => ({
  length: 116,
  offset: 116 * index,
  index,
});

export class CardFlatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardArray: [],
    };
  }

  scrollTo() {
    let sortedArray = this.props.observations.sort(
      sortMethod(this.props.sortBy)
    );
    this.flatlist.scrollToIndex({
      index: sortedArray.findIndex((element) => {
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
    let sortSpeciesArray = this.props.sorted;

    sortedArray = sortSpeciesArray.sort(sortMethod(this.props.sortBy));

    let cardStateArray = sortedArray.map((item) => {
      // console.log(item);
      return [
        <ObsCard
          click={this.props.handleMarkerClick}
          obsid={item.trueID}
          key={item.trueID}
          observation={item}
          selectedMarker={this.props.selectedMarker}
          navigation={this.props.navigation}
          addFavorite={() => this.props.addFavorite(item)}
          deleteFavorite={() => this.props.deleteFavorite(item)}
          // color={item.color}
        />,
        item.trueID,
      ];
    });

    if (this.props.loading) {
      return (
        <View style={{ ...styles.flatlist, flex: 1 }}>
          <ActivityIndicator color="#796d5b" size="large" style={{ flex: 1 }} />
        </View>
      );
    }
    return (
      <FlatList
        ref={(ref) => (this.flatlist = ref)}
        data={cardStateArray}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        style={styles.flatlist}
        ListFooterComponent={<View style={{ height: 15 }}></View>}
        getItemLayout={getItemLayout}
        maxToRenderPerBatch={4}
        // contentContainerStyle={{

        // }}
      />
    );
  }
}
