import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabScreen from './BottomTabScreen';

const Drawer = createDrawerNavigator();
export default class AppNavigation extends Component {
    render() {
        return (
            <BottomTabScreen/>
        );
    }
}

