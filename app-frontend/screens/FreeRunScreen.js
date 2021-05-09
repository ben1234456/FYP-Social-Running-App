import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Button } from 'native-base';
import MapView, { PROVIDER_GOOGLE, AnimatedRegion, Marker, Polyline } from 'react-native-maps';
//import Geolocation from 'react-native-geolocation-service';
//import { request, PERMISSIONS } from 'react-native-permissions';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/Ionicons';
import Setting from 'react-native-vector-icons/SimpleLineIcons';
import { Dimensions } from 'react-native';
import haversine from "haversine";
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';


export default class FreeRunScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage:"",
            prevLat: 0,
            prevLng: 0,
            curnLat: 0,
            curnLng: 0,
            startLat: 0,
            startLng: 0,
            endLat: 0,
            latitude: 0,
            longitude: 0,
            tracking:false,
            distanceTravelled: 0,
            routeCoordinates: [],
            reference:React.createRef(),

            //stopwatch
            stopwatchStart: false,
            stopwatchReset: false,
            runtime:"",

            //calculate time
            startsec:"",
            startminute:"",
            starthour:"",
            endsec:"",
            endminute:"",
            endhour:"",
            startTimestamp:"",
            endTimestamp:"",

            //button state
            button: "Start",
        };

        this.toggleStopwatch = this.toggleStopwatch.bind(this);
        this.resetStopwatch = this.resetStopwatch.bind(this);

    }


    toggleStopwatch() {
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
    }
    
    resetStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: true});
    }

    getLocation=async()=>{
        
        const permissionStatus=await Location.requestForegroundPermissionsAsync();
        
        if(permissionStatus.status!=="granted"){
            this.setState({ errorMessage: "Permission to access location was denied"});
            return;
        }
        //permissionStatus=await Location.requestBackgroundPermissionsAsync();
        
        let currentLocation=await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High });
        console.log(this.state.errorMessage);
        console.log(currentLocation);
        this.setState({ latitude: currentLocation.coords.latitude});
        this.setState({ longitude: currentLocation.coords.longitude});
        const currentLatitude=currentLocation.coords.latitude;
        const currentLongitude=currentLocation.coords.longitude;

        this.setState({prevLat:currentLatitude});
        this.setState({prevLng:currentLongitude});

        this.state.reference.current.animateToRegion({
        
            latitude:currentLatitude,
            longitude:currentLongitude,

            startLat:currentLatitude,
            startLng:currentLongitude,

            latitudeDelta: 0.005,
            longitudeDelta: 0.005,

        })
    };
    
    componentDidMount(){
        this.getLocation();
    }


    tracking = () => {

        this.toggleStopwatch();

        if (this.state.tracking == false){

            const currentDate = new Date();
            const timestamp = currentDate.getTime();

            this.setState({
                tracking:true,
                startTimestamp:timestamp,
            });
            
        }

        else{

            const currentDate = new Date();
            const timestamp = currentDate.getTime();

            this.setState({
                tracking:false,
                endTimestamp:timestamp,
            });

            const data = {start_lat: String(this.state.startLat), 
                start_lng: String(this.state.startLng),
                end_lat: String(this.state.latitude),
                end_lng: String(this.state.longitude),
                total_distance: String(this.state.distanceTravelled),             
            };

            fetch('http://192.168.0.192:8000/api/activity', {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log("Success");
            })
            // .catch((error) => {
            //     console.error('Error:', error);
            // }); 
            
        }

    }

    change = (geolocation) => {
        // console.log(geolocation.latitude);

        if(this.state.tracking == true){
            this.state.reference.current.animateToRegion({
        
                latitude: geolocation.latitude,
                longitude: geolocation.longitude,
    
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            })
    
            var previousgeo = {latitude:this.state.prevLat, longitude:this.state.prevLng};
            var currentgeo = {latitude:geolocation.latitude, longitude:geolocation.longitude};
    
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
                prevLat:geolocation.latitude,
                prevLng:geolocation.longitude,
                routeCoordinates: vrc.concat([newCoordinate]),
            });
    
            // console.log(this.state.routeCoordinates);
    
            if (geolocation.latitude != 0 || this.state.prevLat != 0){
                this.setState({distanceTravelled: totaldistance + totalnewdistance});
            }
        }

    }

    render() {

        return (
            <View style={styles.container}>
                <MapView style={styles.map} 
                    ref={this.state.reference} 
                    provider={ PROVIDER_GOOGLE } 
                    showsUserLocation
                    followUserLocation
                    onUserLocationChange = {
                        (geolocation)=>this.change(geolocation.nativeEvent.coordinate)
                    }
                >
                    <Polyline coordinates={this.state.routeCoordinates} strokeWidth={3} strokeColor={"#add8e6"} />
                    
                    {/* <Marker coordinate={{latitude: this.state.latitude, longitude: this.state.longitude}} /> */}
                </MapView>

                <View>

                    <Text>
                        {parseFloat(this.state.distanceTravelled).toFixed(2)} km
                    </Text>

                    {/* <Stopwatch laps start={this.state.stopwatchStart}
                        getTime={this.getFormattedTime} 
                    /> */}

                </View>   


                <View style={styles.contentContainer}>
                    <TouchableOpacity style={styles.music} onPress={() => this.props.navigation.navigate('Music')}>
                        <Icon name="ios-musical-notes" size={30} color={'#8352F2'} />
                    </TouchableOpacity>
                    <Button block style={styles.stickyBtn} onPress={this.tracking}>
                        <Text style={styles.btnText}>{!this.state.tracking ? "Start" : "Stop"}</Text>
                    </Button>
                    <TouchableOpacity style={styles.settingBtn} onPress={() => this.props.navigation.navigate('Activity Setup')}>
                        <Setting name="settings" size={30} color={'#8352F2'} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    rowContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentContainer: {
        padding: 40,
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 5,
        left: 60,
        right: 60,
    },
    music: {
        backgroundColor: 'white',
        borderRadius: 30,
        position: 'absolute',
        right: 220,
        bottom: 41,
        padding: 6,

        //ios
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,

        //android
        elevation: 5,
    },
    stickyBtn: {
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#8352F2',

        //ios
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,

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

        //ios
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,

        //android
        elevation: 5,
    },
});