import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import FreeRunScreen from './freeRunScreen';
import TrainingRouteScreen from './trainingRouteScreen'

const Tab = createMaterialTopTabNavigator();

export default class TopTabNavigator extends Component {
    render() {
        return (
            <Tab.Navigator
                initialRouteName="Activity"
                tabBarOptions={{
                    activeTintColor: '#8352F2',
                    inactiveTintColor: '#AEAEAE',
                    labelStyle: { fontSize: 12, },
                    style: { paddingTop: 50, },
                }}>
                <Tab.Screen name='FreeRun' component={FreeRunScreen} options={{ tabBarLabel: 'Free Run', }}/>
                <Tab.Screen name='TrainingRoutes' component={TrainingRouteScreen} options={{ tabBarLabel: 'Training Routes' }}/>
            </Tab.Navigator>
        );
    }
};


