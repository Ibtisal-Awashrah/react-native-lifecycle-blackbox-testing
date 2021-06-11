import React from "react";
import { Text, View, AppState, StyleSheet } from "react-native";
import BackgroundForground from "./components/BackgroundForground";
import DoubleOrientationChange from "./components/DoubleOrientationChange";
import ChangingCSS from "./testingcomponents/ChangingCSS";
import DOCTest from "./testingcomponents/DOCTest";

export default function App() {
  return (
    <View style={styles.container}>
      <ChangingCSS />
      <BackgroundForground>
        <ChangingCSS
          // key={
          //   (getKey = () => {
          //     return Math.random();
          //   })
          // }
        />
      </BackgroundForground>
    </View>
  );
}

// getKey() {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
