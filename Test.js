import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Linking,
} from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNo: "",
      message: ""
    };
  }
  openWhatsApp = () => {
    let msg = this.state.message;
    let mobile = this.state.mobileNo;
    if (mobile) {
      if (msg) {
        let url =
          "whatsapp://send?text=" +
          this.state.message +
          "&phone=91" +
          this.state.mobileNo;
        Linking.openURL(url)
          .then(data => {
            console.log("WhatsApp Opened successfully " + data);
          })
          .catch(() => {
            alert("Make sure WhatsApp installed on your device");
          });
      } else {
        alert("Please enter message to send");
      }
    } else {
      alert("Please enter mobile no");
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{ textAlign: "center", fontSize: 20, paddingVertical: 30 }}
        >
          Open WhatsApp chat box from React-native App
        </Text>

        <TextInput
          value={this.state.message}
          onChangeText={message => this.setState({ message })}
          placeholder={"Enter message"}
          multiline={true}
          style={[styles.input, { height: 90 }]}
        />

        <TextInput
          value={this.state.mobileNo}
          onChangeText={mobileNo => this.setState({ mobileNo })}
          placeholder={"Enter Mobile"}
          style={styles.input}
          keyboardType={"numeric"}
        />
        <View style={{ marginTop: 20 }}>
          <Button onPress={this.openWhatsApp} title="Open WhatsApp message" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    backgroundColor: "#ffffff"
  },
  input: {
    width: 255,
    height: 44,
    padding: 10,
    margin: 10,
    backgroundColor: "#FFF",
    borderColor: "#000",
    borderRadius: 0.5,
    borderWidth: 0.5
  }
});