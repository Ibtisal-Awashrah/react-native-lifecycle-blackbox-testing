import React, { Component } from "react";
import { Text, StyleSheet, AppState } from "react-native";

export class ChangingCSS extends Component {
  state = { randomColor: null, appState: AppState.currentState };

  getRandomColor = () => {
    return (
      "rgb(" +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      ")"
    );
  };
  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  UNSAFE_componentWillUnmount() {
    this.setState({ randomColor: this.getRandomColor() });
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
      this.setState({ randomColor: this.getRandomColor() });
    }
    this.setState({ appState: nextAppState });
  };
  generateRandomColor = () => {
    this.setState({ randomColor: this.getRandomColor() });
  };

  render() {
    return (
      <Text style={[{ backgroundColor: this.state.randomColor }, styles.color, styles.margin]}>
        Color Code: {this.state.randomColor}
      </Text>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    backgroundColor: "#ffffff",
  },
  input: {
    width: 255,
    height: 44,
    padding: 10,
    margin: 10,
    backgroundColor: "#FFF",
    borderColor: "#000",
    borderRadius: 0.5,
    borderWidth: 0.5,
  },
});
export default ChangingCSS;
