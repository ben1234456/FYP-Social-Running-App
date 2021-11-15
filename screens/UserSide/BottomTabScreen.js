import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import Font from 'react-native-vector-icons/FontAwesome5';
import Ion from 'react-native-vector-icons/Ionicons'
import HomeScreen from './homeScreen';
import ActivityScreen from './activityScreen';
import ProgressScreen from './progressScreen';
import ProfileScreen from './profileScreen';
import ForumScreen from './forumScreen';
import { Animated } from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: '#8352F2',
      style: {
        paddingTop: 10,
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Font name="home" color={color} size={size} />
        ),
      }}
    />

    <Tab.Screen
      name="Forum"
      component={ForumScreen}
      options={{
        tabBarLabel: 'Forum',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="forum" color={color} size={size} />
        ),
      }}
    />

    <Tab.Screen
      name="Activity"
      component={ActivityScreen}
      options={{
        tabBarLabel: 'Activity',
        tabBarIcon: ({ color, size }) => (
          <Icon name="activity" color={color} size={size} />
        ),
      }}
    />

    <Tab.Screen
      name="Progress"
      component={ProgressScreen}
      options={{
        tabBarLabel: 'Progress',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="history" color={color} size={size} />
        ),
      }}
    />

    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Ion name="ios-person" color={color} size={size} />
        ),
      }}
    />

  </Tab.Navigator>
);

export default BottomTabScreen;