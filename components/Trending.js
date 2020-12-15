import React, { useState, useEffect } from "react";
import Firebase from "../config/firebase";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  FlatList,
  Image,
  StatusBar,
} from "react-native";
import { Button } from "react-native-elements";
import { M_API_KEY } from "react-native-dotenv";
import { Entypo } from "@expo/vector-icons";

export default function Trending({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [userid, setUserid] = useState("");

  // If no user logged in => Login page
  useFocusEffect(() => {
    const user = Firebase.auth().currentUser;
    if (!user) {
      navigation.navigate("Login");
    } else {
      setUserid(user.uid);
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
          marginTop: 5,
        }}
      />
    );
  };

  const addWatchlist = (item) => {
    if (item.hasOwnProperty("title")) {
      Firebase.database()
        .ref("watchlist/")
        .push({
          title: item.title,
          description: item.overview,
          img: item.poster_path,
          user: userid,
        });
    } else {
      Firebase.database()
        .ref("watchlist/")
        .push({
          title: item.name,
          description: item.overview,
          img: item.poster_path,
          user: userid,
        });
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/ARposter.png")}
        style={styles.image}
      >
        <FlatList
          keyExtractor={(item, index) => item.title}
          renderItem={({ item }) => (
            <View style={styles.flatlist}>
              <Text style={styles.title}>
                {item.title} {item.name}
              </Text>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w300${item.poster_path}`,
                }}
                style={{ width: 300, height: 450 }}
              />
              <Text style={styles.description}>{item.overview}</Text>
              <Button
                buttonStyle={styles.button}
                icon={<Entypo name="heart-outlined" size={18} color="white" />}
                title="  Save to watch list"
                onPress={() => addWatchlist(item)}
              />
            </View>
          )}
          ItemSeparatorComponent={listSeparator}
          data={movies}
        />
        <StatusBar style="auto" />
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
  flatlist: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    borderRadius: 10,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  title: {
    margin: 10,
    fontSize: 24,
    color: "#FFA611",
  },
  description: {
    margin: 15,
    color: "#fff",
  },
  button: {
    marginTop: 0,
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
