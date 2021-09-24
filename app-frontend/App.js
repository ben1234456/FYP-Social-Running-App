import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import SplashScreen from './UserSide/SplashScreen';
import StartedScreen from './UserSide/StartedScreen';
import LoginScreen from './UserSide/LoginScreen';
import SignUpScreen from './UserSide/SignUpScreen';
import AppNavigation from './UserSide/AppNavigation';
import AdminAppNavigation from './UserSide/AdminAppNavigation';
import eventDetails from "./UserSide/eventDetails";
import TopTabNavigator from "./UserSide/TopTabNavigator";
import couponScreen from "./UserSide/couponScreen";
import couponDetails from "./UserSide/couponDetails";
import submitRun from "./UserSide/submitRun";
import FreeRun from "./UserSide/FreeRunScreen";
import Progress from "./UserSide/ProgressScreen";
import Profile from "./UserSide/ProfileScreen";
import ForumScreen from "./UserSide/ForumScreen";

import musicScreen from "./UserSide/MusicScreen";
import activitySetup from "./UserSide/ActivitySetup";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox, Image, StyleSheet, View, Alert, Text } from 'react-native';
import addRouteScreen from "./UserSide/addRouteScreen";
import editProfileScreen from "./UserSide/editProfileScreen";
import eventsScreen from "./UserSide/EventsScreen";
import upcomingEventsScreen from './UserSide/UpcomingEventsScreen';
import activityHistoryScreen from './UserSide/ActivityHistoryScreen';
import editEventScreen from './UserSide/editEvent';
import addEventScreen from './UserSide/addEvent';
import startFreeRunScreen from "./UserSide/startFreeRunScreen"
import AdminSavedRouteScreen from "./UserSide/AdminSavedRouteScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/Ionicons";
import AdminEditProfileScreen from "./UserSide/AdminEditProfileScreen";
import savedRouteScreen from "./UserSide/savedRouteScreen";
import adminEventDetailsScreen from "./UserSide/adminEventDetails";
import routeListScreen from './UserSide/routeListScreen';
import editRouteScreen from './UserSide/editRouteScreen';
import routeDetailsScreen from './UserSide/routeDetailsScreen';
import calendarScreen from "./UserSide/calendarScreen";
import ForumDetailsScreen from './UserSide/ForumDetailsScreen';
import calendarEventScreen from './UserSide/calendarEventScreen';
import Logo from './images/logo.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import addEventCalendarScreen from './UserSide/addEventCalendarScreen';
import editEventCalendarScreen from './UserSide/editEventCalendarScreen';
import BuddiesListScreen from './UserSide/BuddiesListScreen';
import BuddiesProfileScreen from './UserSide/BuddiesProfileScreen';
import resetPasswordScreen from './UserSide/resetPasswordScreen';
import addSearchUserScreen from './UserSide/addSearchUserScreen';
import VerificationScreen from './UserSide/VerificationScreen';
import CreateNewPasswordScreen from './UserSide/CreateNewPasswordScreen';
import buddyRequestDetailScreen from './UserSide/buddyRequestDetailScreen';
import BuddiesRequestList from './UserSide/BuddiesRequestList';

const Stack = createStackNavigator();

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            own: true,
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
                            <View style={styles.addRouteHeaderContainer}>
                                <Text style={styles.addRouteHeaderText}>SAVE</Text>
                            </View>   
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
                            title: 'Route',
                            headerRight: () => (
                                <View style={styles.imageContainer} >
                                    {this.state.own == true
                                        ? <Icon name={"edit"} style={styles.icon} size={30} color={"grey"} />
                                        : <Text style={styles.headerText}>Save</Text>
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
                        name="forumScreen"
                        component={ForumScreen}
                        initial={false} options={{ headerShown: false }}
                        options={{ headerTitleAlign: 'center', title: 'Forum' }}

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
                                    { }
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
                        name="VerificationScreen"
                        component={VerificationScreen}
                        initial={false}
                        options={{ headerTitleAlign: 'center', title: 'Verification' }}
                    />
                    <Stack.Screen
                        name="CreateNewPasswordScreen"
                        component={CreateNewPasswordScreen}
                        initial={false}
                        options={{ headerTitleAlign: 'center', title: 'Reset Password' }}
                    />
                    <Stack.Screen
                        name="buddyRequestDetailScreen"
                        component={buddyRequestDetailScreen}
                        initial={false}
                        options={{ headerTitleAlign: 'center', title: 'Buddy Request' }}
                    />
                    <Stack.Screen
                        name="BuddiesRequestList"
                        component={BuddiesRequestList}
                        initial={false}
                        options={{ headerTitleAlign: 'center', title: 'Buddies Request' }}
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
    headerText: {
        fontSize: 15,
    },
    addRouteHeaderContainer:{
        justifyContent:"center",
        alignItems:"center",
        marginRight:15,
    },
    addRouteHeaderText:{
        fontSize:15,
    },
});
