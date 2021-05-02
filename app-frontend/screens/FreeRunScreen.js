import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';



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
        this.setState({ latitude: currentLocation.coords.longitude});
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
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <MapView style={styles.map} ref={this.state.reference} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
    
});