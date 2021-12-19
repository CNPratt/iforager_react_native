import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../../../shared/Styles";

class SearchResult extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let idArray = this.props.newMapIds.split(",");
    return (
      <View style={{ flex: 1, flexDirection: "row", margin: 10 }}>
        <View
          style={{
            flex: 2,
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{ ...styles.cardHeader, margin: 5, flex: 2, fontSize: 14 }}
            numberOfLines={1}
          >
            {/* {this.props.commonName ? this.props.commonName : this.props.name} */}
            {this.props.rank[0].toUpperCase() +
              ": " +
              (this.props.commonName ? this.props.commonName : this.props.name)}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={
              idArray.includes(this.props.taxonId.toString())
                ? this.props.remove
                : this.props.add
            }
          >
            <Text
              style={{
                ...styles.cardHeader,
                padding: 5,
                flex: 2,
                fontSize: 14,
                borderStyle: "solid",
                borderWidth: "3",
                borderColor: "#8dc08d",
                borderRadius: 15,
              }}
            >
              {idArray.includes(this.props.taxonId.toString()) ? "REM" : "ADD"}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              ...styles.cardHeader,
              margin: 5,
              fontSize: 14,
            }}
          >
            {this.props.taxonId}
          </Text>
        </View>
      </View>
    );
  }
}

export default SearchResult;
