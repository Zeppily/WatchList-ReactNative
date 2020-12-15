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
import { Entypo } from "@expo/vector-icons";

export default function Watchlist({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [userid, setUserid] = useState("");


  const getMovies = () => {
    if (movies.length < 1 || movies == undefined) {
      Firebase.database()
        .ref("watchlist/")
        .on("value", (snapshot) => {
          const data = snapshot.val();
          const prods = Object.values(data);
          const test = Object.keys(data);
            // Combining the key and the object
          var items = test.map((key, index) => {
            return {
              key: key,
              img: prods[index].img,
              title:  prods[index].title,
              description:  prods[index].description,
              user:  prods[index].user
            }
        });
        var result = items.filter(movie => movie.user === userid);
        setMovies(result);
        });
    }
  };

  // If no user logged in => Login page
  // Switching user without restarting app
  useFocusEffect(() => {
    const user = Firebase.auth().currentUser;
    if (!user) {
      navigation.navigate("Login");
    } else {      
      if(userid != user.uid){
          setMovies([]);
      }
      setUserid(user.uid);
      getMovies();
    }
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

  const RemoveWatchlist = (item) => {
    let key = Firebase.database().ref("watchlist/" + item).remove();
    setMovies([]);
    getMovies();
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
                  uri: `https://image.tmdb.org/t/p/w300${item.img}`,
                }}
                style={{ width: 300, height: 450 }}
              />
              <Text style={styles.description}>{item.description}</Text>
              <Button
                buttonStyle={styles.button}
                icon={<Entypo name="trash" size={18} color="white" />}
                title="  Remove from watch list"
                onPress={() => RemoveWatchlist(item.key)}
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
    width: 250,
  },
});
