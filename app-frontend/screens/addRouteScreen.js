import React, { Component } from 'react';
import { StyleSheet, Image,Text, View, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Dimensions } from 'react-native';
import Event from '../images/event.png';
import MapViewDirections from 'react-native-maps-directions';

export default class addRouteScreen extends Component {

    constructor(props) {
        super(props);
        this.changeSelection = this.changeSelection.bind(this);
        this.state = {
            errorMessage:"",
            latitude:0,
            longitude:0,
            defaultMarker:{
                title:"You are here",
                coordinates:{
                latitude:0,
                longitude:0,
                }
            },
            startMarker:{
                title:"Starting point",
                coordinate:{
                    latitude:0,
                    longitude:0,
                },
                selected:false,
                
            },
        
            endMarker:{
                title:"Ending point",
                coordinate:{
                    latitude:0,
                    longitude:0,
                },
                selected:false,
                
            },
            checkMarker1:{
                title:"Checkpoint 1",
                coordinate:{
                    latitude:0,
                    longitude:0,
                },    
                selected:false,
            },         
            checkMarker2:{
                title:"Checkpoint 1",
                coordinate:{
                    latitude:0,
                    longitude:0,
                },    
                selected:false,
            }, 
            checkPointArray:[],
            startCoor:{
                latitude:0,
                longitude:0,
            },
            endCoor:{
                latitude:0,
                longitude:0,
            },
        
            
            reference:React.createRef(),
            startingPoint:"startPoint",
            endingPoint:"endPoint",
            checkPoint1:"firstCheckPoint",
            checkPoint2:"secondCheckPoint",
            selection:0,

            
            //sign up and get api key https://developer.here.com/#
            api:"",
            //get key https://developers.google.com/maps/documentation/directions/get-api-key
            //get Google Maps Directions API https://console.cloud.google.com/apis/dashboard?project=social-running-app&folder=&organizationId=
            googleApi:"",
        };
    }
    //get user permission and current location
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
        const currentLatitude=currentLocation.coords.latitude;
        const currentLongitude=currentLocation.coords.longitude;
        

        this.state.reference.current.animateToRegion({
        
            latitude:currentLatitude,
            longitude:currentLongitude,

            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          })
        //set all marker to user current location
        this.setState({ defaultMarker:{coordinates:{latitude: currentLocation.coords.latitude,longitude: currentLocation.coords.longitude}}});
        this.setState({ startMarker:{coordinate:{latitude: currentLocation.coords.latitude,longitude: currentLocation.coords.longitude}}});
        this.setState({ endMarker:{coordinate:{latitude: currentLocation.coords.latitude,longitude: currentLocation.coords.longitude}}});
        this.setState({ checkMarker1:{coordinate:{latitude: currentLocation.coords.latitude,longitude: currentLocation.coords.longitude}}});
        this.setState({ checkMarker2:{coordinate:{latitude: currentLocation.coords.latitude,longitude: currentLocation.coords.longitude}}});
        this.setState({ startCoor:{latitude: currentLocation.coords.latitude,longitude: currentLocation.coords.longitude}});
        this.setState({ endCoor:{latitude: currentLocation.coords.latitude,longitude: currentLocation.coords.longitude}});
    };
    
    changeLocation=(point)=>{
        //get the latitude and longitude clicked
        let tempoLat=point.nativeEvent.coordinate.latitude || this.state.latitude;
        let tempoLong=point.nativeEvent.coordinate.longitude || this.state.longitude;
        this.setState({
            latitude: tempoLat,
            longitude: tempoLong,
          });
        //get the address of the latitude and longitude
        this.getAddress(tempoLat,tempoLong);
    };
    getAddress(latitude, longitude) {
        return new Promise((resolve) => {
          const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${this.state.api}&mode=retrieveAddresses&prox=${latitude},${longitude}`
          fetch(url)
            .then(res => res.json())
            .then((resJson) => {
                if (resJson && resJson.Response && resJson.Response.View && resJson.Response.View[0] && resJson.Response.View[0].Result && resJson.Response.View[0].Result[0]) {
                    if(this.state.selection==0){
                        this.setState({ startingPoint: resJson.Response.View[0].Result[0].Location.Address.Label});
                        this.setState({ startMarker:{coordinate:{latitude: latitude,longitude: longitude},selected:true}});
                        
                    }
                    if(this.state.selection==1){
                        this.setState({ checkPoint1: resJson.Response.View[0].Result[0].Location.Address.Label});
                        this.setState({ checkMarker1:{coordinate:{latitude: latitude,longitude: longitude},selected:true}});
                    }
                    if(this.state.selection==2 && this.state.checkMarker1.selected==true){
                        this.setState({ checkPoint2: resJson.Response.View[0].Result[0].Location.Address.Label});
                        this.setState({ checkMarker2:{coordinate:{latitude: latitude,longitude: longitude},selected:true}});
                    }
                    if(this.state.selection==3){
                        this.setState({ endingPoint: resJson.Response.View[0].Result[0].Location.Address.Label});
                        this.setState({ endMarker:{coordinate:{latitude: latitude,longitude: longitude},selected:true}});
                    }
                    console.log(resJson.Response.View[0].Result[0].Location.Address.Label)
                }
                //show the direction if start and end point was chosen
        
                if(this.state.startMarker.selected==true && this.state.endMarker.selected==true){
                    this.setState({ startCoor:{latitude: this.state.startMarker.coordinate.latitude,longitude: this.state.startMarker.coordinate.longitude}});
                    this.setState({ endCoor:{latitude: this.state.endMarker.coordinate.latitude,longitude: this.state.endMarker.coordinate.longitude}});
                    //add checkpoint if selected
                    if(this.state.checkMarker1.selected==true){
                        //set first checkpoint
                        let tempoArray=[{
                            latitude: this.state.checkMarker1.coordinate.latitude,
                            longitude: this.state.checkMarker1.coordinate.longitude,
                          }]
                        //set second checkpoint if selected
                        if(this.state.checkMarker2.selected==true){
                            tempoArray.push({
                                latitude: this.state.checkMarker2.coordinate.latitude,
                                longitude: this.state.checkMarker2.coordinate.longitude,
                              })
                        }
                        this.setState({checkPointArray:tempoArray});
                    }
                }
                
                resolve();
                
            })
            .catch((e) => {
              console.log(e)
              resolve()
            })
        })
    };
      
    changeSelection=(newSelection)=>{
        this.setState({ selection: newSelection});
        
    };
    componentDidMount(){
        this.getLocation();
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topInfo}>
                    <View style={styles.row}>
                        <View style={styles.imgColumn}>
                            <Image style={styles.image} source={Event} />
                        </View>
                        <View style={styles.infoColumn}>
                            <TouchableOpacity onPress={() => this.changeSelection(0)} >
                                <View style={styles.info} >
                                    <Text style={styles.infoText}>{this.state.startingPoint}</Text>
                                </View>
                            </TouchableOpacity>
                        </View> 
                    </View>
                    <View style={styles.row}>
                        <View style={styles.imgColumn}>
                            <Image style={styles.image} source={Event} />
                        </View>
                        <View style={styles.infoColumn}>
                            <TouchableOpacity onPress={() => this.changeSelection(1)}>
                                <View style={styles.info} >
                                    <Text style={styles.infoText}>{this.state.checkPoint1}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.imgColumn}>
                            <Image style={styles.image} source={Event} />
                        </View>
                        <View style={styles.infoColumn}>
                            <TouchableOpacity onPress={() => this.changeSelection(2)}>
                                <View style={styles.info} >
                                    <Text style={styles.infoText}>{this.state.checkPoint2}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.imgColumn}>
                            <Image style={styles.image} source={Event} />
                        </View>
                        <View style={styles.infoColumn}>
                            <TouchableOpacity onPress={() => this.changeSelection(3)}>
                                <View style={styles.info} >
                                    <Text style={styles.infoText}>{this.state.endingPoint}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <MapView onPress={this.changeLocation.bind(this)} style={styles.map} ref={this.state.reference} >
                    <Marker coordinate={this.state.startMarker.coordinate} pinColor={"#00ff26"} title={this.state.startMarker.title}/>
                    <Marker coordinate={this.state.endMarker.coordinate} pinColor={"#00ff26"} title={this.state.endMarker.title}/>
                    <Marker coordinate={this.state.checkMarker1.coordinate} pinColor={"#00ff26"} title={this.state.checkMarker1.title}/>
                    <Marker coordinate={this.state.checkMarker2.coordinate} pinColor={"#00ff26"} title={this.state.checkMarker2.title}/>
                    <MapViewDirections origin={this.state.startCoor} destination={this.state.endCoor} waypoints={this.state.checkPointArray} apikey={this.state.googleApi}/>
                    <Marker coordinate={this.state.defaultMarker.coordinates} title={this.state.defaultMarker.title} />
                </MapView>
                <View style={styles.botInfo}>
                    <View style={styles.routeInfo}>
                        <Text>40 min to Ending Point</Text>
                    </View>
                    <View style={styles.routeInfo}>
                        <Text>3.55 km</Text>
                    </View>
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
    topInfo:{
        flex:3,
        borderWidth:1,
        paddingLeft:"5%",
        paddingRight:"5%",
        paddingTop:"1%",
        paddingBottom:"1%",
        width:"100%",
        marginTop:"5%",
        backgroundColor: '#8352F2',
        justifyContent:"center",
        
    },
    info:{
        borderRadius:5,
        borderWidth:1,
        padding:"1%",
        backgroundColor: '#ffffff',
    },
    map: {
        flex:6,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    botInfo:{
        flex:0.5,
        justifyContent:"center",
        width:"100%",
        paddingLeft:"10%",
        paddingTop:"5%",
        paddingBottom:"5%",
        backgroundColor:"#ffffff",
    },
    routeInfo:{
        marginTop:"1%",
        marginBottom:"1%",
    },
    image: {
        width: "40%",
        height: "40%",
    },
    row:{
        flexDirection:"row",
        height:"20%",
        marginTop:"1%",
        marginBottom:"1%",
    },
    imgColumn:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    infoColumn:{
        flex:9,
        paddingRight:"5%",
        justifyContent:"center",
    },
    infoText:{
        fontSize:12,
    },
});