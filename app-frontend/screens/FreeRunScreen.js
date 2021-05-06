import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import MapView, { PROVIDER_GOOGLE, AnimatedRegion, Marker, Polyline } from 'react-native-maps';
//import Geolocation from 'react-native-geolocation-service';
//import { request, PERMISSIONS } from 'react-native-permissions';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/Ionicons';
import Setting from 'react-native-vector-icons/SimpleLineIcons';
import { Dimensions } from 'react-native';
import haversine from "haversine";

export default class FreeRunScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          errorMessage:"",
          prevLat: 0,
          prevLng: 0,
          curnLat: 0,
          curnLng: 0,
          latitude:0,
          longitude:0,
          distanceTravelled: 0,
          routeCoordinates: [],
          reference:React.createRef(),
        };
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

            latitudeDelta: 0.005,
            longitudeDelta: 0.005,

        })
    };
    
    componentDidMount(){
        this.getLocation();
    }

    changeloc = () => {
        
        this.state.reference.current.animateToRegion({
        
            latitude:37.78825,
            longitude:-122.4324,

            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
    }

    change = (geolocation) => {
        // console.log(geolocation.latitude);
    
        this.state.reference.current.animateToRegion({
        
            latitude: geolocation.latitude,
            longitude: geolocation.longitude,

            latitudeDelta: 0.0622,
            longitudeDelta: 0.0421,
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

        console.log(this.state.routeCoordinates);

        if (geolocation.latitude != 0 || this.state.prevLat != 0){
            this.setState({distanceTravelled: totaldistance + totalnewdistance});
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
                    <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
                    
                    {/* <Marker coordinate={{latitude: this.state.latitude, longitude: this.state.longitude}} /> */}
                </MapView>

                <View>
                    <TouchableOpacity>
                        <Text>
                            {parseFloat(this.state.distanceTravelled).toFixed(2)} km
                        </Text>
                    </TouchableOpacity>
                </View>   


                <View style={styles.contentContainer}>
                    <TouchableOpacity style={styles.music} onPress={() => this.props.navigation.navigate('Music')}>
                        <Icon name="ios-musical-notes" size={30} color={'#8352F2'} />
                    </TouchableOpacity>
                    <Button block style={styles.stickyBtn} onPress={this.changeloc}>
                        <Text style={styles.btnText}>START RUNNING</Text>
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