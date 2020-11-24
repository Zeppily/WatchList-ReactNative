import React, {useEffect} from "react";
import Firebase from "./config/firebase";
import Navigator from "./navigation/DrawerNavigator.js";

export default function App() {

  // On app launch wipe previous session
useEffect(() => {
  Firebase.auth().signOut();
}, []);

  return <Navigator />;
}
