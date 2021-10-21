import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import TopTabNavigator from './TopTabNavigator';

export default class App extends Component {
    
    render() {
        return (
            <TopTabNavigator/>
        );
    }
}

const styles = StyleSheet.create({

});