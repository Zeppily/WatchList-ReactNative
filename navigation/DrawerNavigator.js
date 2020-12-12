import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../components/Login.js";
import Signup from "../components/Signup.js";
import Profile from "../components/Profile.js";
import Trending from "../components/Trending.js";

const Drawer = createDrawerNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Trending" component={Trending} />
        <Drawer.Screen name="Login" component={Login} options={{
                drawerLabel: () => null,
                title: null,
                drawerIcon: () => null
            }}/>
        <Drawer.Screen name="Signup" component={Signup} options={{
                drawerLabel: () => null,
                title: null,
                drawerIcon: () => null
            }}/>
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
