import React, {useEffect} from "react";
import Firebase from "../config/firebase";
import { useFocusEffect } from '@react-navigation/native';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    ImageBackground,
  } from "react-native";
  import {
    M_API_KEY,
  } from "react-native-dotenv";

export default function Trending({ navigation }) {

      // If no user logged in => Login page
  useFocusEffect(() => {
    const user = Firebase.auth().currentUser;
    if(!user){
        navigation.navigate("Login");
    }
},[]);

    useEffect(() => {
        //fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${M_API_KEY}`)
        //Flatlist with text under image and button to add to watchlist or onlongpress
    }, []);


    return (
        <View style={styles.container}>
            <Text>Trending Page</Text>
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
  