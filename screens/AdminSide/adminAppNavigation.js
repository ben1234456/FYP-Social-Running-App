import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AdminBottomTabScreen from './adminBottomTabScreen';

const Drawer = createDrawerNavigator();
export default class AdminAppNavigation extends Component {
    render() {
        return (
            <AdminBottomTabScreen/>
        );
    }
}

