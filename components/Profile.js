import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, } from "react-native";
import Firebase from "../config/firebase";
import { useFocusEffect } from '@react-navigation/native';
import { Image } from 'react-native-elements';
import { Button } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";

export default function Profile({ navigation }) {
  const [email, setEmail] = useState("");

  // Logout user
  const handleLogout = () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // If no user logged in => Login page
  useFocusEffect(() => {
      const user = Firebase.auth().currentUser;
      if(!user){
          navigation.navigate("Login");
      }else {
        setEmail(user.email);
      }
  },[])

  return (
    <View style={styles.container}>
      <Image
  source={{ uri: "https://i.pravatar.cc/200" }}
  style={{ width: 200, height: 200 }}
/>
  <Text style={styles.Text}>Hello {email}</Text>
  <Button buttonStyle={styles.button}
        title="  Sign Out"
        onPress={handleLogout}
        icon={<Entypo name="back" size={18} color="white" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  Text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    color: "#fff",
  },
  button: {
    marginTop: 30,
    marginBottom: 15,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#F6820D",
    borderColor: "#F6820D",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
});
