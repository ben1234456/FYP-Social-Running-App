import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import SplashScreen from './screens/SplashScreen';
import StartedScreen from './screens/StartedScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import AppNavigation from './screens/UserSide/AppNavigation';
import AdminAppNavigation from './screens/AdminSide/AdminAppNavigation';
import eventDetails from "./screens/UserSide/eventDetails";
import TopTabNavigator from "./screens/UserSide/TopTabNavigator";
import couponScreen from "./screens/UserSide/couponScreen";
import couponDetails from "./screens/UserSide/couponDetails";
import submitRun from "./screens/UserSide/submitRun";
import FreeRun from "./screens/UserSide/FreeRunScreen";
import Progress from "./screens/UserSide/ProgressScreen";
import Profile from "./screens/UserSide/ProfileScreen";
import ForumScreen from "./screens/UserSide/ForumScreen";

import musicScreen from "./screens/UserSide/MusicScreen";
import activitySetup from "./screens/UserSide/ActivitySetup";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox, Image, StyleSheet, View, Alert, Text } from 'react-native';
import addRouteScreen from "./screens/AdminSide/addRouteScreen";
import editProfileScreen from "./screens/UserSide/editProfileScreen";
import eventsScreen from "./screens/UserSide/EventsScreen";
import upcomingEventsScreen from './screens/UserSide/UpcomingEventsScreen';
import activityHistoryScreen from './screens/UserSide/ActivityHistoryScreen';
import editEventScreen from './screens/AdminSide/editEvent';
import addEventScreen from './screens/AdminSide/addEvent';
import startFreeRunScreen from "./screens/UserSide/startFreeRunScreen"
import AdminSavedRouteScreen from "./screens/AdminSide/AdminSavedRouteScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/Ionicons";
import AdminEditProfileScreen from "./screens/AdminSide/AdminEditProfileScreen";
import savedRouteScreen from "./screens/UserSide/savedRouteScreen";
import adminEventDetailsScreen from "./screens/AdminSide/adminEventDetails";
import routeListScreen from './screens/UserSide/routeListScreen';
import editRouteScreen from './screens/AdminSide/editRouteScreen';
import routeDetailsScreen from './screens/UserSide/routeDetailsScreen';
import calendarScreen from "./screens/UserSide/calendarScreen";
import ForumDetailsScreen from './screens/UserSide/ForumDetailsScreen';
import calendarEventScreen from './screens/UserSide/calendarEventScreen';
import Logo from './images/logo.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import addEventCalendarScreen from './screens/UserSide/addEventCalendarScreen';
import editEventCalendarScreen from './screens/UserSide/editEventCalendarScreen';
import BuddiesListScreen from './screens/UserSide/BuddiesListScreen';
import BuddiesProfileScreen from './screens/UserSide/BuddiesProfileScreen';
import resetPasswordScreen from './screens/resetPasswordScreen';
import addSearchUserScreen from './screens/UserSide/addSearchUserScreen';
import VerificationScreen from './screens/VerificationScreen';
import CreateNewPasswordScreen from './screens/CreateNewPasswordScreen';
import buddyRequestDetailScreen from './screens/UserSide/buddyRequestDetailScreen';
import BuddiesRequestList from './screens/UserSide/BuddiesRequestList';

import adminEventsScreen from "./screens/AdminSide/adminEventsScreen";
import adminUpcomingEventsScreen from "./screens/AdminSide/adminUpcomingEventsScreen";
import userUpcomingEventScreen from "./screens/UserSide/upcomingEventScreen"
import ChangePasswordScreen from './screens/UserSide/ChangePasswordScreen';


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
                        name="adminUpcomingEventsScreen"
                        component={adminUpcomingEventsScreen}
                        initial={false}
                        options={{ headerTitleAlign: 'center', title: 'Upcoming Events' }}
                    />

                    <Stack.Screen
                        name="BuddiesRequestList"
                        component={BuddiesRequestList}
                        initial={false}
                        options={{ headerTitleAlign: 'center', title: 'Buddies Request' }}
                    />

                    <Stack.Screen
                        name="adminEventsScreen"
                        component={adminEventsScreen}
                        initial={false}
                        options={{ headerTitleAlign: 'center', title: 'All Events' }}
                    />

                    <Stack.Screen
                        name="userUpcomingEventScreen"
                        component={userUpcomingEventScreen}
                        initial={false}
                        options={{ headerTitleAlign: 'center', title: 'All Events' }}
                    />

                    <Stack.Screen
                        name="ChangePasswordScreen"
                        component={ChangePasswordScreen}
                        initial={false}
                        options={{ headerTitleAlign: 'center', title: 'Change Password' }}
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
    addRouteHeaderContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    addRouteHeaderText: {
        fontSize: 15,
    },
});
