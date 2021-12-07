import React, { Component } from "react";
import Accordion from "react-native-collapsible/Accordion";
import { Text, View } from "react-native";
import { styles } from "../../../shared/Styles";

export class AccordionView extends Component {
  state = {
    activeSections: [],
  };

  _renderSectionTitle = (section) => {
    return <View>{/* <Text>{section.content}</Text> */}</View>;
  };

  _renderHeader = (section) => {
    return (
      <View>
        <Text style={styles.taxaHeader}>{section.title}</Text>
      </View>
    );
  };

  _renderContent = (section) => {
    return (
      <View>
        <Text>{section.content}</Text>
      </View>
    );
  };

  _updateSections = (activeSections) => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <Accordion
        sections={this.props.sections}
        activeSections={this.state.activeSections}
        renderSectionTitle={this._renderSectionTitle}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
      />
    );
  }
}
