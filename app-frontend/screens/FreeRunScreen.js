import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
//import { request, PERMISSIONS } from 'react-native-permissions';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/Ionicons';
import Setting from 'react-native-vector-icons/SimpleLineIcons';

export default class FreeRunScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initialPosition: 0,
            mapRegion: null,
            locationResult: null,
            latitude: 0,
            longitude: 0,
        };
    }

    componentDidMount() {
        this.requestLocation();
    }

    requestLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                this.setState({
                    locationResult: 'Permission to access location was denied',
                });
            }
            else if (status === 'granted') {
                //this.locateCurrentPosition();
                let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
                this.setState({ initialPosition: JSON.stringify(location) });
                this.setState({ mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } });
            }
        }
        catch (err) {
            console.error(err);
        }
    };

    /*locateCurrentPosition = () => {
        Location._getCurrentWatchId(
            position => {
                console.log(JSON.stringify(position));

                let initialPosition = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.035,
                }

                this.state({initialPosition});
            },
            error => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000, distanceFilter: 0 }
        );
    }*/

    render() {

        return (
            <View style={styles.container}>
                <MapView style={styles.rowContainer}
                    provider={PROVIDER_GOOGLE}
                    ref={map => this._map = map}
                    style={{ flex: 1 }}
                    initialRegion={this.state.mapRegion}
                >
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