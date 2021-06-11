import React, { Component } from "react";
import { Text, View, AppState } from "react-native";
import renderer from "react-test-renderer";
import * as ScreenOrientation from "expo-screen-orientation";
import { diffString, diff } from "json-diff";

export class DoubleOrientationChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oracleJSON: {},
      uiJSON: {},
    };
  }

  UNSAFE_componentWillMount() {
    // first step
    console.log("componentWillMount called.");
    AppState.addEventListener("change", this._handleWillMount());
  }

  componentDidMount() {
    // last step
    console.log("componentDidMount called.");

    AppState.removeEventListener("change", this._handleWillMount());
  }

  async _handleWillMount() {
    const guiTree = renderer.create(this.props.children).toJSON();
    await this.setState({ oracleJSON: guiTree });
    this.changeScreenOrientation();
  }
  _handleDidMount() {
    const guiTree = renderer.create(this.props.children).toJSON();
    this.setState({ uiJSON: guiTree });
  }

  changeScreenOrientation() {
    console.log("Set Double Orientation Change");

    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    );
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    this._handleDidMount();
    this.printChange();
  }

  printChange() {
    const diff = diffString(this.state.uiJSON, this.state.oracleJSON);
    if (diff) {
      console.log("The Diffrence");

      console.log(diff);
    } else console.log("No Diff");
  }
  render() {
    return <Text></Text>;
  }
}

export default DoubleOrientationChange;
