import React, { useState } from "react";
import { View, TextInput, StyleSheet, ImageBackground } from "react-native";
import Firebase from "../config/firebase";
import { Button } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigation.navigate("Profile"))
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/JPoster.png")}
        style={styles.image}
      >
        <TextInput
          style={styles.inputBox}
          value={email}
          onChangeText={(email) => setEmail(email)}
          placeholder="Email"
          placeholderTextColor="#FFF"
        />
        <TextInput
          style={styles.inputBox}
          value={password}
          onChangeText={(password) => setPassword(password)}
          placeholder="Password"
          placeholderTextColor="#FFF"
          secureTextEntry={true}
        />
        <Button
          buttonStyle={styles.button}
          icon={<Entypo name="user" size={18} color="white" />}
          title="  Login"
          onPress={handleLogin}
        />
        <Button
          buttonStyle={styles.button_alt}
          icon={<Entypo name="add-user" size={18} color="white" />}
          title="  Sign up"
          onPress={() => navigation.navigate("Signup")}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 19,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center",
    color: "#ffffff",
  },
  button: {
    marginTop: 30,
    marginBottom: 10,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#F6820D",
    borderColor: "#F6820D",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonSignup: {
    fontSize: 12,
  },
  button_alt: {
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#0394fc",
    borderColor: "#0394fc",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
});
