import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import SplashScreen from './screens/SplashScreen';
import StartedScreen from './screens/StartedScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import AppNavigation from './screens/AppNavigation';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Scene key='root'>
                    <Scene key='splash' component={SplashScreen} initial={true} headerShown={false}></Scene>
                    <Scene key="start" component={StartedScreen} headerShown={false}></Scene>
                    <Scene key="login" component={LoginScreen} headerShown={false}></Scene>
                    <Scene key="register" component={SignUpScreen} headerShown={false}></Scene>
                    <Scene key="home" component={HomeScreen} headerShown={false}></Scene>
                    <Scene key="app" component={AppNavigation} headerShown={false}></Scene>
                </Scene>               
            </Router>
        );
    }   
}

