import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import SplashScreen from './screens/SplashScreen';
import StartedScreen from './screens/StartedScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import AppNavigation from './screens/AppNavigation';
import AdminAppNavigation from './screens/AdminAppNavigation';
import eventDetails from "./screens/eventDetails";
import TopTabNavigator from "./screens/TopTabNavigator";
import couponScreen from "./screens/couponScreen";
import couponDetails from "./screens/couponDetails";
import submitRun from "./screens/submitRun";
import FreeRun from "./screens/FreeRunScreen";
import Progress from "./screens/ProgressScreen";
import Profile from "./screens/ProfileScreen";

import musicScreen from "./screens/MusicScreen";
import activitySetup from "./screens/ActivitySetup";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox, Image, StyleSheet, View, Alert,Text } from 'react-native';
import addRouteScreen from "./screens/addRouteScreen";
import editProfileScreen from "./screens/editProfileScreen";
import eventsScreen from "./screens/EventsScreen";
import upcomingEventsScreen from './screens/UpcomingEventsScreen';
import activityHistoryScreen from './screens/ActivityHistoryScreen';
import editEventScreen from './screens/editEvent';
import addEventScreen from './screens/addEvent';
import startFreeRunScreen from "./screens/startFreeRunScreen"
import AdminSavedRouteScreen from "./screens/AdminSavedRouteScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import AdminEditProfileScreen from "./screens/AdminEditProfileScreen";
import savedRouteScreen from "./screens/savedRouteScreen";
import adminEventDetailsScreen from "./screens/adminEventDetails";
import routeListScreen from './screens/routeListScreen';
import editRouteScreen from './screens/editRouteScreen';
import routeDetailsScreen from './screens/routeDetailsScreen';
import calendarScreen from "./screens/calendarScreen";
import ForumDetailsScreen from './screens/ForumDetailsScreen';
import calendarEventScreen from './screens/calendarEventScreen';
import Logo from './images/logo.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import addEventCalendarScreen from './screens/addEventCalendarScreen';
import editEventCalendarScreen from './screens/editEventCalendarScreen';
import BuddiesListScreen from './screens/BuddiesListScreen';
import BuddiesProfileScreen from './screens/BuddiesProfileScreen';
import resetPasswordScreen from './screens/resetPasswordScreen';
import addSearchUserScreen from './screens/addSearchUserScreen';
import CheckEmailScreen from './screens/CheckEmailScreen';

const Stack = createStackNavigator();

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            own:true,
        };
    }
    confirmDelete = () => {
        return Alert.alert(
            "Do you want to delete this reminder?",
            "The action cannot be undone",
            [
                {
                    text: "Yes",
                    onPress: () => {

                    },
                },
                {
                    text: "No",
                },
            ]
        );
    };

    render() {
        LogBox.ignoreAllLogs = true;
        return (
            /*<Router>
                <Scene key='root'>
                    <Scene key='splash' component={SplashScreen} initial={true} headerShown={false}></Scene>
                    <Scene key="start" component={StartedScreen} headerShown={false}></Scene>
                    <Scene key="login" component={LoginScreen} headerShown={false}></Scene>
                    <Scene key="register" component={SignUpScreen} headerShown={false}></Scene>

                    <Scene key="app" component={AppNavigation}  initial={false} headerShown={false}></Scene>
                    <Scene key="eventDetails" component={eventDetails} headerShown={false}></Scene>
                    <Scene key="coupon" component={couponScreen}  initial={false} headerShown={false}></Scene>
                    <Scene key="top" component={TopTabNavigator} headerShown={false}></Scene>
                    <Scene key="couponDetails" component={couponDetails} initial={false} headerShown={false}></Scene>
                    <Scene key="submitRun" component={submitRun} initial={false} headerShown={false}></Scene>
                    <Scene key="addRouteScreen" component={addRouteScreen} initial={false} headerShown={false}></Scene>
                    <Scene key="Music" component={musicScreen} initial={false} titleStyle={{ alignSelf: 'center' }}></Scene>
                </Scene>               
            </Router>*/
            <NavigationContainer>

                <Stack.Navigator>
                    <Stack.Screen
                        name="splash"
                        component={SplashScreen}
                        initial={true}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="start"
                        component={StartedScreen}
                        initial={false}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="login"
                        component={LoginScreen}
                        initial={false}
                        options={{
                            headerTitleAlign: 'center',
                            title: 'Sign In'
                        }}
                    />
                    <Stack.Screen
                        name="register"
                        component={SignUpScreen}
                        initial={false}
                        options={{
                            headerTitleAlign: 'center',
                            title: 'Sign Up'
                        }}
                    />
                    <Stack.Screen
                        name="app"
                        component={AppNavigation}
                        initial={false}
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen
                        name="adminapp"
                        component={AdminAppNavigation}
                        initial={false}
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen
                        name="profile"
                        component={Profile}
                        initial={false}
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen
                        name="run"
                        component={FreeRun}
                        initial={false} options={{ headerShown: false }}
                    />

                    <Stack.Screen
                        name="progress"
                        component={Progress}
                        initial={false} options={{ headerShown: false }}
                    />

                    <Stack.Screen
                        name="eventDetails"
                        component={eventDetails}
                        initial={false} options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Coupon"
                        component={couponScreen}
                        initial={false}
                        options={{ headerTitleAlign: 'center', title: 'Registered Events' }}
                    />
                    <Stack.Screen
                        name="top"
                        component={TopTabNavigator}
                        initial={false} options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="couponDetails"
                        component={couponDetails}
                        initial={false} options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="submitRun"
                        component={submitRun}
                        initial={false} options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Music"
                        component={musicScreen}
                        initial={false}
                        options={{ headerTitleAlign: 'center' }}
                    />
                    <Stack.Screen
                        name="Activity Setup"
                        component={activitySetup}
                        initial={false}
                        options={{ headerTitleAlign: 'center' }}
                    />
                    <Stack.Screen
                        name="addRouteScreen"
                        component={addRouteScreen}
                        initial={false}
                        options={{
                            headerTitleAlign: 'center', title: 'Add Route', headerRight: () =>
                                <Icon name="save-sharp" style={{ marginRight: 10 }} size={30} color={'#8352F2'} />
                        }}
                    />
                    <Stack.Screen
                        name="editProfileScreen"
                        component={editProfileScreen}
                        initial={false}
                        options={{ headerTitleAlign: 'center', title: 'Edit Profile' }}
                    />
                    <Stack.Screen
                        name="eventsScreen"
                        component={eventsScreen}
                        initial={false}
                        options={{ headerTitleAlign: 'center', title: 'Featured Events' }}
                    />
                    <Stack.Screen
                        name="upcomingEventsScreen"
                        component={upcomingEventsScreen}
                        initial={false}
                        options={{ headerTitleAlign: 'center', title: 'Upcoming Events' }}
                    />
                    <Stack.Screen
                        name="activityHistoryScreen"
                        component={activityHistoryScreen}
                        initial={false}
                        options={{ headerTitleAlign: 'center', title: 'History' }}
                    />
                    <Stack.Screen
                        name="addEventsScreen"
                        component={addEventScreen}
                        initial={false} options={{ headerShown: false }}
                        initial={false}
                        options={{ headerTitleAlign: 'center', title: 'Add Event' }}
                    />
                    <Stack.Screen
                        name="startFreeRunScreen"
                        component={startFreeRunScreen}
                        initial={true}
                        options={{ headerTitleAlign: 'center', title: 'Tracking' }}
                    />
                    <Stack.Screen
                        name="AdminSavedRouteScreen"
                        component={AdminSavedRouteScreen}
                        initial={false}
                        options={{
                            headerTitleAlign: 'center', title: 'Saved Routes'
                        }}
                    />
                    <Stack.Screen
                        name="AdminEditProfileScreen"
                        component={AdminEditProfileScreen}
                        initial={false}
                        options={{ headerTitleAlign: 'center', title: 'Edit Profile' }}
                    />
                    <Stack.Screen
                        name="editEventsScreen"
                        component={editEventScreen}
                        initial={false} options={{ headerShown: false }}
                        options={{ headerTitleAlign: 'center', title: 'Edit Event' }}
                    />
                    <Stack.Screen
                        name="savedRouteScreen"
                        component={savedRouteScreen}
                        initial={false} options={{ headerShown: false }}
                        options={{ headerTitleAlign: 'center', title: 'Saved Routes' }}
                    />
                    <Stack.Screen
                        name="adminEventDetailsScreen"
                        component={adminEventDetailsScreen}
                        initial={false} options={{ headerShown: false }}
                        options={{ headerTitleAlign: 'center', title: 'Virtual run event' }}
                    />
                    <Stack.Screen
                        name="routeListScreen"
                        component={routeListScreen}
                        initial={false} options={{ headerShown: false }}
                        options={{ headerTitleAlign: 'center', title: 'Routes' }}
                    />
                    <Stack.Screen
                        name="editRouteScreen"
                        component={editRouteScreen}
                        initial={false} options={{ headerShown: false }}
                        options={{ headerTitleAlign: 'center', title: 'Routes' }}
                    />
                    <Stack.Screen
                        name="routeDetailsScreen"
                        component={routeDetailsScreen}
                        initial={false} options={{ headerShown: false }}
                        options={{ 
                            headerTitleAlign: 'center', 
                            title: 'Route' ,
                            headerRight: () => (
                                <View style={styles.imageContainer} >
                                    {this.state.own==true
                                    ?<Icon name={"edit"} style={styles.icon} size={30} color={"grey"} />
                                    :<Text style={styles.headerText}>Save</Text>
                                    }
                                    <TouchableOpacity onPress={this.confirmDelete}>
                                        <Icon name={"delete"} style={styles.icon} size={30} color={"grey"} />
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                    <Stack.Screen
                        name="calendarScreen"
                        component={calendarScreen}
                        initial={false}
                        options={{ headerTitleAlign: 'center', title: 'Calendar' }}
                    />
                    <Stack.Screen
                        name="ForumDetailsScreen"
                        component={ForumDetailsScreen}
                        initial={false} options={{ headerShown: false }}
                        options={{ headerTitleAlign: 'center', title: 'Forum View' }}

                    />
                    <Stack.Screen
                        name="calendarEventScreen"
                        component={calendarEventScreen}
                        initial={false}
                        options={{
                            headerTitleAlign: 'center',
                            title: 'Event',

                            headerRight: () => (
                                <View style={styles.imageContainer} >
                                    {}
                                    <Icon name={"edit"} style={styles.icon} size={30} color={"grey"} />
                                    <TouchableOpacity onPress={this.confirmDelete}>
                                        <Icon name={"delete"} style={styles.icon} size={30} color={"grey"} />
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />

                    <Stack.Screen
                        name="addEventCalendarScreen"
                        component={addEventCalendarScreen}
                        initial={false}
                        options={{ headerTitleAlign: 'center', title: 'Create Events' }}
                    />
                    <Stack.Screen
                        name="editEventCalendarScreen"
                        component={editEventCalendarScreen}
                        initial={false}
                        options={{ headerTitleAlign: 'center', title: 'Edit Events' }}
                    />
                    <Stack.Screen
                        name="BuddiesListScreen"
                        component={BuddiesListScreen}
                        initial={false}
                        options={{ headerTitleAlign: 'center', title: 'Buddies List' }}
                    />
                     <Stack.Screen
                        name="BuddiesProfileScreen"
                        component={BuddiesProfileScreen}
                        initial={false}
                        options={{ headerTitleAlign: 'center', title: 'Buddy Profile' }}
                    />
                    <Stack.Screen
                        name="resetPasswordScreen"
                        component={resetPasswordScreen}
                        initial={false}
                        options={{ headerTitleAlign: 'center', title: 'Reset Password' }}
                    />
                    <Stack.Screen
                        name="addSearchUserScreen"
                        component={addSearchUserScreen}
                        initial={false}
                        options={{ headerTitleAlign: 'center', title: 'Add Buddies' }}
                    /> 
                    <Stack.Screen
                        name="CheckEmailScreen"
                        component={CheckEmailScreen}
                        initial={false}
                        screenOptions={{
                            headerShown: false
                          }}
                        //options={{ headerTitleAlign: 'center', title: 'Add Buddies' }}
                    /> 
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
export const styles = StyleSheet.create({
    icon: {

        marginLeft: 15,
    },
    imageContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginRight: 25,
    },
    headerText:{
        fontSize:15,
    },
});
