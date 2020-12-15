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
  TextInput,
} from "react-native";
import { Button } from "react-native-elements";
import { M_API_KEY } from "react-native-dotenv";
import { Entypo } from "@expo/vector-icons";

export default function Genre({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [userid, setUserid] = useState("");
  const [input, setInput] = useState("");
  const [id, setId] = useState([]);
  //const [id, setId] = useState([{id: '0',}]);
  const [genres, SetGenres] = useState([
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ]);

  // If no user logged in => Login page
  useFocusEffect(() => {
    const user = Firebase.auth().currentUser;
    if (!user) {
      navigation.navigate("Login");
    } else {
      setUserid(user.uid);
    }
  }, []);

  const getMovie = () => {
    setId(genres.filter(item => {
        if(item.name.toLocaleLowerCase() == input.toLocaleLowerCase()){
            return item;
        }
    }));
    if(id.length > 0 || id == undefined){
        fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${M_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id[0].id}`
          )
            .then((response) => response.json())
            .then((responseData) => setMovies(responseData.results))
            .catch((err) => console.log(err));
    }

  };

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
      Firebase.database().ref("watchlist/").push({
        title: item.title,
        description: item.overview,
        img: item.poster_path,
        user: userid,
      });
    } else {
      Firebase.database().ref("watchlist/").push({
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
        source={require("../assets/JPoster.png")}
        style={styles.image}
      >
        <TextInput
          style={styles.inputBox}
          value={input}
          onChangeText={(input) => setInput(input)}
          placeholder="Genre here"
          placeholderTextColor="#FFA611"
        />
        <Button
          buttonStyle={styles.button}
          icon={<Entypo name="magnifying-glass" size={18} color="white" />}
          title="  Search"
          onPress={getMovie}
        />
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
  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 19,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center",
    color: "#FFA611",
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
