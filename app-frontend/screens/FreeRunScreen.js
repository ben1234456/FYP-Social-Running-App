import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
//import { request, PERMISSIONS } from 'react-native-permissions';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/Ionicons';
import Setting from 'react-native-vector-icons/SimpleLineIcons';
import { Dimensions } from 'react-native';

export default class FreeRunScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          errorMessage:"",
          latitude:0,
          longitude:0,
          reference:React.createRef(),
        };
    }
    getLocation=async()=>{
        
        permissionStatus=await Location.requestForegroundPermissionsAsync();
        
        if(permissionStatus.status!=="granted"){
            this.setState({ errorMessage: "Permission to access location was denied"});
            return;
        }
        permissionStatus=await Location.requestBackgroundPermissionsAsync();
        if(permissionStatus.status!=="granted"){
            this.setState({ errorMessage: "Permission to access location was denied"});
            return;
        }
        currentLocation=await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High });
        console.log(this.state.errorMessage);
        this.setState({ latitude: currentLocation.coords.latitude});
        this.setState({ longitude: currentLocation.coords.longitude});
        const currentLatitude=currentLocation.coords.latitude;
        const currentLongitude=currentLocation.coords.longitude;
        

        this.state.reference.current.animateToRegion({
        
            latitude:currentLatitude,
            longitude:currentLongitude,

            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          })
    };
    
    componentDidMount(){
        this.getLocation();
    }

    render() {

        return (
            <View style={styles.container}>
                <MapView style={styles.map} ref={this.state.reference} >
                    <Marker coordinate={{latitude: this.state.latitude, longitude: this.state.longitude}} />
                </MapView>
                <View style={styles.contentContainer}>
                    <TouchableOpacity style={styles.music}>
                        <Icon name="ios-musical-notes" size={30} color={'#8352F2'} />
                    </TouchableOpacity>
                    <Button block style={styles.stickyBtn}>
                        <Text style={styles.btnText}>START RUNNING</Text>
                    </Button>
                    <TouchableOpacity style={styles.settingBtn}>
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
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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