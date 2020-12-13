import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  Alert
} from "react-native";
import Firebase from "../config/firebase.js";
import { useFocusEffect } from '@react-navigation/native';
import { Entypo } from "@expo/vector-icons";
import { Button } from "react-native-elements";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => navigation.navigate("Profile"))
      .catch((error) => Alert.alert("An Error Occured", error.code));
  };

    // If user is logged in => Profile page
    useFocusEffect(() => {
        const user = Firebase.auth().currentUser;
        if(user){
            navigation.navigate("Profile");
        } 
    },[])


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/gravity.jpg")}
        style={styles.image}
      >
      <TextInput
        style={styles.inputBox}
        value={email}
        onChangeText={(email) => setEmail(email)}
        placeholder="email"
        placeholderTextColor="#FFA611"
      />
      <TextInput
        style={styles.inputBox}
        value={password}
        onChangeText={(password) => setPassword(password)}
        placeholder="password"
        placeholderTextColor="#FFA611"
        secureTextEntry={true}
      />
      <Button buttonStyle={styles.button}
        title="  Sign up"
        onPress={handleSignUp}
        icon={<Entypo name="add-user" size={18} color="white" />}
      />
      <Button
        title="  Go Back"
        buttonStyle={styles.button_alt}
        onPress={() => navigation.navigate("Login")}
        icon={<Entypo name="back" size={18} color="white" />}
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
    color: "#ff0000",
  },
  button: {
    marginTop: 30,
    marginBottom: 10,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#FFA611",
    borderColor: "#FFA611",
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
