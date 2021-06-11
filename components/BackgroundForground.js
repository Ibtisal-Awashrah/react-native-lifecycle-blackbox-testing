import React, { Component } from "react";
import { Text, BackHandler, Linking, AppState } from "react-native";
import renderer from "react-test-renderer";
import { diffString, diff } from "json-diff";

export class BackgroundForground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      isChange: false,
      oracleJSON: {},
      uiJSON: {},
    };
  }
  setBackgoundAction() {
    BackHandler.exitApp();
  }

  setForgroundAction() {
    Linking.openURL("exp://192.168.10.106:19000");
  }
  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.addEventListener("change", this._handleAppStateChange);
    this.printChange();
  }

  _handleAppStateChange = (nextAppState) => {
    if (AppState.currentState.match(/active/)) {
      const tree1 = renderer.create(this.props.children).toJSON();
      this.setState({ oracleJSON: tree1 });
    }
    if (this.state.appState.match(/active/) && !this.state.isChange) {
      console.log("Application is in the background");

      this.setBackgoundAction();
      this.setState({ appState: nextAppState });
    }
    if (
      this.state.appState.match(/inactive|background/) &&
      !this.state.isChange
    ) {
      this.setForgroundAction();
      const tree2 = renderer.create(this.props.children).toJSON();
      this.setState({ uiJSON: tree2 });

      this.setState({ isChange: true });
      console.log(diffString(tree2, this.state.oracleJSON));
      console.log("App has come to the foreground!");
    }
  };
  printChange() {
    console.log(diffString({}, this.state.oracleJSON));
  }

  render() {
    return <Text> </Text>;
  }
}

export default BackgroundForground;
