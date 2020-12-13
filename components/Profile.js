import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import Firebase from "../config/firebase";
import { useFocusEffect } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { Image } from 'react-native-elements';

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

  //test function
  const handletest = () => {
      console.log(Firebase.auth().currentUser);
  }

  return (
    <View style={styles.container}>
      <Image
  source={{ uri: "https://i.pravatar.cc/200" }}
  style={{ width: 200, height: 200 }}
/>
  <Text>Hello {email}</Text>
      <Button icon={<Icon name="arrow-left" size={15} color="black"/> } onPress={handleLogout} title="Sign out" />
      <Button onPress={handletest} title="Log user" />
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
});
