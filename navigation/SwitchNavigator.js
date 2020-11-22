import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login from '../components/Login.js';
import Signup from '../components/Signup.js';
import Profile from '../components/Profile.js';

const SwitchNavigator = createSwitchNavigator(
    {
        Login: {
            screen: Login
        },
        Signup: {
            screen: Signup
        },
        Profile: {
            screen: Profile
        }
    },
    {
        initialRouteName: 'Login'
    }
)

const AppContainer = createAppContainer(SwitchNavigator)

export default function Navigator(){
    return (
        <AppContainer/>
    );
}