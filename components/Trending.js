import React, { useState, useEffect } from "react";
import Firebase from "../config/firebase";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  FlatList,
  Image,
  StatusBar
} from "react-native";
import { M_API_KEY } from "react-native-dotenv";

export default function Trending({ navigation }) {
  const [movies, setMovies] = useState([]);
  // If no user logged in => Login page
  useFocusEffect(() => {
    const user = Firebase.auth().currentUser;
    if (!user) {
      navigation.navigate("Login");
    }
  }, []);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${M_API_KEY}`)
      .then((response) => response.json())
      .then((responseData) => setMovies(responseData.results))
      .catch((err) => console.log(err));
  }, []);

  const listSeparator = () => {
    return (
      <View
        style={{
          marginTop: "3%",
          width: "80%",
          backgroundColor: "#fffff",
          marginLeft: "10%",
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={{ width: 300, height: 300 }}
            />
            <Text>{item.overview}</Text>
          </View>
        )}
        ItemSeparatorComponent={listSeparator}
        data={movies}
      />
      <StatusBar style="auto" />
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
  flatlist: {},
});
