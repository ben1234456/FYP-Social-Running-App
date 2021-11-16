import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Button } from 'native-base';
import MapView, { PROVIDER_GOOGLE, AnimatedRegion, Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
//import Geolocation from 'react-native-geolocation-service';
//import { request, PERMISSIONS } from 'react-native-permissions';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/Ionicons';
import Setting from 'react-native-vector-icons/SimpleLineIcons';
import { Dimensions } from 'react-native';
import haversine from "haversine";
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class FreeRunScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: "",
            prevLat: 0,
            prevLng: 0,
            curnLat: 0,
            curnLng: 0,
            startLat: 0,
            startLng: 0,
            endLat: 0,
            latitude: 0,
            longitude: 0,
            tracking: false,
            distanceTravelled: 0,
            routeCoordinates: [],
            reference: React.createRef(),
            showInfo: 'none',
            route_ID: '',
            date:new Date(),

            latitude: 0,
            longitude: 0,
            totaldistance: 0,
            ownerId: "",
            start: null,
            end: null,
            check1: null,
            check2: null,
            def: null,
            spinner:false,
            checkPointArray: [],

            reference: React.createRef(),
            startingPoint: "Start Point",
            endingPoint: "End Point",
            checkPoint1: "First Checkpoint",
            checkPoint2: "Second CheckPoint",
            selection: 0,
            
            //button state
            button: "Start",

            //sign up and get api key https://developer.here.com/#
            api: "ysrvAnGD9v99umFWd_SWtpu7O68r1jzIrLiDNV9GLKw",
            //get key https://developers.google.com/maps/documentation/directions/get-api-key
            //get Google Maps Directions API https://console.cloud.google.com/apis/dashboard?project=social-running-app&folder=&organizationId=
            googleApi: "AIzaSyB15Wdjt0OdRs09MlU09gENop0nLYtjz_o",
        };

        const getData = async () => {
            //using localhost on IOS and using 10.0.2.2 on Android
            const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
            const IP = 'https://socialrunningapp.herokuapp.com';
            try {
                const userJson = await AsyncStorage.getItem('@userJson')
                const routeID = await AsyncStorage.getItem('@route')
                if (userJson !== null) {
                    const user = JSON.parse(userJson);
                    this.setState({
                        userID: user.id,
                    });
                }

                console.log(routeID);

                if(routeID != ''){
                    //change spinner to visible
                    this.setState({
                        spinner: true, 
                        route_ID: routeID
                    });
                    console.log('fetch');
                    fetch(IP + '/api/route/routeList/details/' + this.state.route_ID, {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Successfully get user route data testing')
                        console.log(data)

                        this.setState({
                            routeName: data[0].name,
                            eventName: data[0].title,
                            ownerId: data[0].userID,

                            start: { title: "Starting point", selected: true, coordinate: { latitude: parseFloat(data[0].start_lat), longitude: parseFloat(data[0].start_lng) } },
                            end: { title: "Ending point", selected: true, coordinate: { latitude: parseFloat(data[0].end_lat), longitude: parseFloat(data[0].end_lng) } },
                            loadedData: data,
                            data: data[0],

                        });

                        if (data[0].check1_lat != null) {
                            this.setState({
                                check1: { title: "Checkpoint 1", selected: true, coordinate: { latitude: parseFloat(data[0].check1_lat), longitude: parseFloat(data[0].check1_lng) } },
                            });
                        }

                        if (data[0].check2_lat != null) {
                            this.setState({
                                check2: { title: "Checkpoint 2", selected: true, coordinate: { latitude: parseFloat(data[0].check2_lat), longitude: parseFloat(data[0].check2_lng) } },

                            });
                        }
                        //change spinner to invisible
                        this.setState({spinner: false});

                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        //change spinner to invisible
                        this.setState({spinner: false});
                    })
                        }

                    } catch (e) {
                        console.log(e);
                    }
            ;
        }

        getData();
    

    }

    //animate to starting point
    getLocation = async () => {
        const permissionStatus = await Location.requestForegroundPermissionsAsync();

        if (permissionStatus.status !== "granted") {
            this.setState({ errorMessage: "Permission to access location was denied" });
            return;
        }

        // permissionStatus=await Location.requestBackgroundPermissionsAsync();

        if (permissionStatus.status !== "granted") {
            this.setState({ errorMessage: "Permission to access location was denied" });
            return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        console.log(this.state.errorMessage);
        this.state.reference.current.animateToRegion({

            latitude: this.state.start.coordinate.latitude,
            longitude: this.state.start.coordinate.longitude,

            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        })
        this.setState({
            def: { title: "You are here", coordinate: { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude } },
        });
    };

    startRun = async () => {
       
        try {
          const activityType = await AsyncStorage.getItem('@activityType')
          if(activityType != null) {
            this.props.navigation.navigate('startFreeRunScreen',{'lat':this.state.startLat, 'lng':this.state.startLng, 'activityType':activityType})
          }

          else{
            try {
                AsyncStorage.setItem('@activityType', 'walking')
                this.props.navigation.navigate('startFreeRunScreen',{'lat':this.state.startLat, 'lng':this.state.startLng, 'activityType':activityType})
              } catch (e) {
                // saving error
            }
          }
        } catch(e) {
          // error reading value
        }
    } 

    

    componentDidMount() {
        this.getLocation();
    }

    change = (geolocation) => {
        // console.log(geolocation.latitude);

        if (this.state.tracking == true) {
            this.state.reference.current.animateToRegion({

                latitude: geolocation.latitude,
                longitude: geolocation.longitude,

                latitudeDelta: 0.0005,
                longitudeDelta: 0.0005,
            })

            var previousgeo = { latitude: this.state.prevLat, longitude: this.state.prevLng };
            var currentgeo = { latitude: geolocation.latitude, longitude: geolocation.longitude };

            var totaldistance = this.state.distanceTravelled;
            var totalnewdistance = (haversine(previousgeo, currentgeo));

            var latitude = geolocation.latitude;
            var longitude = geolocation.longitude;
            var vrc = this.state.routeCoordinates;

            var newCoordinate = {
                latitude,
                longitude
            };

            this.setState({
                prevLat: geolocation.latitude,
                prevLng: geolocation.longitude,
                routeCoordinates: vrc.concat([newCoordinate]),
            });

            // console.log(this.state.routeCoordinates);

            if (geolocation.latitude != 0 || this.state.prevLat != 0) {
                this.setState({ distanceTravelled: totaldistance + totalnewdistance });
            }
        }

    }

    render() {

        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                    ref={this.state.reference}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation
                    followUserLocation
                    onUserLocationChange={
                        (geolocation) => this.change(geolocation.nativeEvent.coordinate)
                    }
                >
                    {this.state.def &&
                        <Marker coordinate={this.state.def.coordinate} title={this.state.def.title} />
                    }
                    {this.state.start &&
                        <Marker coordinate={this.state.start.coordinate} pinColor={"#0000FF"} title={this.state.start.title} />
                    }
                    {this.state.check1 &&
                        <Marker coordinate={this.state.check1.coordinate} pinColor={"#008000"} title={this.state.check1.title} />
                    }
                    {this.state.check2 &&
                        <Marker coordinate={this.state.check2.coordinate} pinColor={"#ffcc00"} title={this.state.check2.title} />
                    }
                    {this.state.end &&
                        <Marker coordinate={this.state.end.coordinate} pinColor={"#800080"} title={this.state.end.title} />
                    }

                    {this.state.route_ID != ' ' ?
                    <View>
                        {this.state.start && this.state.end &&
                        <MapViewDirections strokeWidth={3} strokeColor="red" origin={this.state.start.coordinate} destination={this.state.end.coordinate} waypoints={this.state.checkPointArray} apikey={this.state.googleApi}
                            onReady={result => {
                                this.getLocation();
                                this.forceUpdate();
                            }}
                            onStart={() => {
                                this.forceUpdate();

                            }}
                        />
                    } 
                    </View>
                    :
                    <View></View>
                    }
                      
                </MapView>

                <View style={styles.columnContainer}>
 
                    <View style={styles.contentContainer}>
                        <TouchableOpacity style={styles.icon} onPress={() => this.props.navigation.navigate('Music')}>
                            <Icon name="ios-musical-notes" size={30} color={'#8352F2'} />
                        </TouchableOpacity>
                        <Button block style={styles.stickyBtn} onPress={this.startRun}>
                            <Text style={styles.btnText}>{!this.state.tracking ? "Start" : "Stop"}</Text>
                        </Button>
                        <TouchableOpacity style={styles.icon} onPress={() => this.props.navigation.navigate('Activity Setup')}>
                            <Setting name="settings" size={30} color={'#8352F2'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    columnContainer: {
        flex: 0,
        flexDirection: 'column',
        alignItems: 'center'
    },
    contentContainer: {
        padding: 40,
        backgroundColor: 'transparent',
        flex: 0,
        flexDirection: 'row',
    },
    icon: {
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 6,
        // flex: 1,


        //ios
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,

        //android
        elevation: 5,
    },
    stickyBtn: {
        borderRadius: 30,
        backgroundColor: '#8352F2',
        flex: 1,
        width: "auto",
        marginLeft: 30,
        marginRight: 30,

        //ios
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        flex: 1,

        //android
        elevation: 5,
    },
    btnText: {
        color: "#ffffff",
    },
    settingBtn: {
        backgroundColor: 'white',
        borderRadius: 30,
        position: 'absolute',
        left: 220,
        bottom: 41,
        padding: 6,
        flex: 1,

        //ios
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,

        //android
        elevation: 5,
    },
});