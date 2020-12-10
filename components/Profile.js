import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Firebase from "../config/firebase";
import { useFocusEffect } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

export default function Profile({ navigation }) {
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
      }
  },[])

  //test function
  const handletest = () => {
      console.log(Firebase.auth().currentUser);
  }

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
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
