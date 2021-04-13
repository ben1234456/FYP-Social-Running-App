import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabScreen from './BottomTabScreen';

const Drawer = createDrawerNavigator();
export default class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen name="Home" component={BottomTabScreen} />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}

