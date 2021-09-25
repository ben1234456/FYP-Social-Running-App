import React, { Component } from 'react';
import { StyleSheet, Image,Text, View, TouchableOpacity,FlatList } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Dimensions } from 'react-native';
import Purple from '../../images/purple.png';
import Blue from '../../images/blue.png';
import Green from '../../images/green.png';
import Orange from '../../images/orange.png';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class editRouteScreen extends Component {

    constructor(props) {
        super(props);
        this.changeSelection = this.changeSelection.bind(this);
        this.state = {
            userID:"",
            loadedData:"",
            data:"",
            id:props.route.params.id,
            routeName:"",
            distance:"",
            errorMessage:"",
            latitude:0,
            longitude:0,
            totaldistance:0,
            hour:"00",
            minute:"00",
            second:"00",
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
            startingPoint:"Start Point",
            endingPoint:"End Point",
            checkPoint1:"First Checkpoint",
            checkPoint2:"Second CheckPoint",
            selection:0,

            
            //sign up and get api key https://developer.here.com/#
            api:"ysrvAnGD9v99umFWd_SWtpu7O68r1jzIrLiDNV9GLKw",
            //get key https://developers.google.com/maps/documentation/directions/get-api-key
            //get Google Maps Directions API https://console.cloud.google.com/apis/dashboard?project=social-running-app&folder=&organizationId=
            googleApi:"AIzaSyB15Wdjt0OdRs09MlU09gENop0nLYtjz_o",
        };
        const getData = async () => {
            //using localhost on IOS and using 10.0.2.2 on Android
            const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
            try {
                const userJson = await AsyncStorage.getItem('@userJson')
                if (userJson !== null) {
                    const user = JSON.parse(userJson);
                    this.setState({
                        userID: user.id,
                    });
                }

            } catch (e) {
                console.log(e);
            }
            fetch(baseUrl + '/api/route/routeList/details/'+this.state.id, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log('Successfully get user route data testing')
                console.log(data)
                changeToTwoTimeDecimal=(time)=>{
                    if(time.length==1){
                        return "0"+time;
                    }
                    else{
                        return time;
                    }
                };
                const convertedHour=changeToTwoTimeDecimal((data[0].hour).toString());
                const convertedMin=changeToTwoTimeDecimal((data[0].minute).toString());
                const convertedSec=changeToTwoTimeDecimal((data[0].second).toString());
                this.setState({
                    routeName: data[0].name,
                    eventName:data[0].title,
                    startMarker:{title:"Starting point",selected:true,coordinate:{latitude: parseFloat(data[0].start_lat),longitude: parseFloat(data[0].start_lng)}},
                    endMarker:{title:"Ending point",selected:true,coordinate:{latitude: parseFloat(data[0].end_lat),longitude: parseFloat(data[0].end_lng)}},
                    loadedData:data,
                    data:data[0],
                    hour:convertedHour,
                    minute:convertedMin,
                    second:convertedSec,
                });
                
                if(data[0].check1_lat!=null){
                    this.setState({
                        checkMarker1:{title:"Checkpoint 1",selected:true,coordinate:{latitude: parseFloat(data[0].check1_lat),longitude: parseFloat(data[0].check1_lng)}},
                    });
                }
                else{
                    this.setState({
                        checkMarker1:{title:"Checkpoint 1",selected:false,coordinate:{latitude: parseFloat(data[0].start_lat),longitude: parseFloat(data[0].start_lng)}},
                    });
                }
                if(data[0].check2_lat!=null){
                    this.setState({
                        checkMarker2:{title:"Checkpoint 2",selected:true,coordinate:{latitude: parseFloat(data[0].check2_lat),longitude: parseFloat(data[0].check2_lng)}},
                    });
                }
                else{
                    this.setState({
                        checkMarker2:{title:"Checkpoint 2",selected:false,coordinate:{latitude: parseFloat(data[0].start_lat),longitude: parseFloat(data[0].start_lng)}},
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }

        getData();
    }
    //animate to starting point
    getLocation=()=>{
        console.log(this.state.errorMessage);
        const currentLatitude=this.state.startMarker.coordinate.latitude;
        const currentLongitude=this.state.startMarker.coordinate.longitude;
        this.state.reference.current.animateToRegion({
        
            latitude:currentLatitude,
            longitude:currentLongitude,

            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          })
    };
    changeLocation=(point)=>{
        //get the latitude and longitude clicked
        let tempoLat=point.nativeEvent.coordinate.latitude || this.state.latitude;
        let tempoLong=point.nativeEvent.coordinate.longitude || this.state.longitude;
        this.setState({
            latitude: tempoLat,
            longitude: tempoLong,
        });
        console.log("new lat lng");
        console.log(tempoLat);
        console.log(tempoLong);
        //get the address of the latitude and longitude
        this.getAddressClick(tempoLat,tempoLong);
    };
    loadAddress=()=>{
        this.getAddress(this.state.startMarker.coordinate.latitude,this.state.startMarker.coordinate.longitude,0);
        
        if(this.state.data.check1_lat!=null){
            this.getAddress(this.state.checkMarker1.coordinate.latitude,this.state.checkMarker1.coordinate.longitude,1);
        }
        if(this.state.data.check2_lat!=null){
            this.getAddress(this.state.checkMarker2.coordinate.latitude,this.state.checkMarker2.coordinate.longitude,2);
        }
        this.getAddress(this.state.endMarker.coordinate.latitude,this.state.endMarker.coordinate.longitude,3);
    }
    showDirection=()=>{
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
    }
    getAddressClick(latitude, longitude) {
        return new Promise((resolve) => {
          const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${this.state.api}&mode=retrieveAddresses&prox=${latitude},${longitude}`
          fetch(url)
            .then(res => res.json())
            .then((resJson) => {
                if (resJson && resJson.Response && resJson.Response.View && resJson.Response.View[0] && resJson.Response.View[0].Result && resJson.Response.View[0].Result[0]) {
                    if(this.state.selection==0){
                        this.setState({ startingPoint: resJson.Response.View[0].Result[0].Location.Address.Label});
                        this.setState({ startMarker:{title:"Starting point",coordinate:{latitude: latitude,longitude: longitude},selected:true}});
                        
                    }
                    if(this.state.selection==1){
                        this.setState({ checkPoint1: resJson.Response.View[0].Result[0].Location.Address.Label});
                        this.setState({ checkMarker1:{title:"Checkpoint 1",coordinate:{latitude: latitude,longitude: longitude},selected:true}});
                    }
                    if(this.state.selection==2 && this.state.checkMarker1.selected==true){
                        this.setState({ checkPoint2: resJson.Response.View[0].Result[0].Location.Address.Label});
                        this.setState({ checkMarker2:{title:"Checkpoint 2",coordinate:{latitude: latitude,longitude: longitude},selected:true}});
                    }
                    if(this.state.selection==3){
                        this.setState({ endingPoint: resJson.Response.View[0].Result[0].Location.Address.Label});
                        this.setState({ endMarker:{title:"Ending point",coordinate:{latitude: latitude,longitude: longitude},selected:true}});
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
    //load address and route 
    //loading use
    getAddress(latitude, longitude,selection) {
        return new Promise((resolve) => {
          const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${this.state.api}&mode=retrieveAddresses&prox=${latitude},${longitude}`
          fetch(url)
            .then(res => res.json())
            .then((resJson) => {
                if (resJson && resJson.Response && resJson.Response.View && resJson.Response.View[0] && resJson.Response.View[0].Result && resJson.Response.View[0].Result[0]) {
                    if(selection==0){
                        this.setState({ startingPoint: resJson.Response.View[0].Result[0].Location.Address.Label});
                        this.setState({ startMarker:{title:"Starting point",coordinate:{latitude: latitude,longitude: longitude},selected:true}});
                    }
                    if(selection==1){
                        this.setState({ checkPoint1: resJson.Response.View[0].Result[0].Location.Address.Label});
                        this.setState({ checkMarker1:{title:"Checkpoint 1",coordinate:{latitude: latitude,longitude: longitude},selected:true}});
                    }
                    if(selection==2 && this.state.checkMarker1.selected==true){
                        this.setState({ checkPoint2: resJson.Response.View[0].Result[0].Location.Address.Label});
                        this.setState({ checkMarker2:{title:"Checkpoint 2",coordinate:{latitude: latitude,longitude: longitude},selected:true}});
                    }
                    if(selection==3){
                        this.setState({ endingPoint: resJson.Response.View[0].Result[0].Location.Address.Label});
                        this.setState({ endMarker:{title:"Ending point",coordinate:{latitude: latitude,longitude: longitude},selected:true}});
                    }
                    console.log("address");
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
        console.log("selection");
        console.log(this.state.selection);
        
    };
    componentDidMount(){
        this.showDirection();
    };
    checkSelected=(value,selected)=>{
        if(selected==false){
            return null;
        }
        else{
            return value;
        }
    }
    save=()=>{
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
           
        const data = {
            userID: this.state.userID,
            name:this.state.routeName,
            start_lat:this.state.startMarker.coordinate.latitude,
            start_lng:this.state.startMarker.coordinate.longitude,
            end_lat:this.state.endMarker.coordinate.latitude,
            end_lng:this.state.endMarker.coordinate.longitude,
            hour:this.state.hour,
            minute:this.state.minute,
            second:this.state.second,
            total_distance:this.state.distance,
            check1_lat:this.checkSelected(this.state.checkMarker1.coordinate.latitude,this.state.checkMarker1.selected),
            check1_lng:this.checkSelected(this.state.checkMarker1.coordinate.longitude,this.state.checkMarker1.selected),
            check2_lat:this.checkSelected(this.state.checkMarker2.coordinate.latitude,this.state.checkMarker2.selected),
            check2_lng:this.checkSelected(this.state.checkMarker2.coordinate.latitude,this.state.checkMarker2.selected),
        };
        
        fetch( baseUrl + '/api/route/'+this.state.id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                //success
                console.log(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    delete=()=>{
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        fetch(baseUrl + '/api/route/' + this.state.id, {
                method: 'DELETE',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
    
            })
            .then(response => response.json())
            .then(data => {
                console.log('Successfully delete buddy')
                console.log(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    render() {
        return (
                <View style={styles.container}>
                
                <View style={styles.topInfo}>
                    <View style={styles.row}>
                        <View style={styles.imgColumn}>
                            <Image style={styles.image} source={Blue} />
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
                            <Image style={styles.image} source={Green} />
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
                            <Image style={styles.image} source={Orange} />
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
                            <Image style={styles.image} source={Purple} />
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
                <MapView onPress={this.changeLocation.bind(this)} style={styles.map} ref={this.state.reference}>
                    <Marker coordinate={this.state.startMarker.coordinate}pinColor={"#0000FF"} title={this.state.startMarker.title}/>
                    <Marker coordinate={this.state.endMarker.coordinate}pinColor={"#800080"} title={this.state.endMarker.title}/>
                    <Marker coordinate={this.state.checkMarker1.coordinate} pinColor={"#008000"} title={this.state.checkMarker1.title}/>
                    <Marker coordinate={this.state.checkMarker2.coordinate} pinColor={"#ffcc00"} title={this.state.checkMarker2.title}/>
                    <MapViewDirections origin={this.state.startCoor} destination={this.state.endCoor} waypoints={this.state.checkPointArray} apikey={this.state.googleApi} 
                    onReady={result => {
                        this.loadAddress();
                        this.getLocation();
                        this.state.distance = result.distance
                        this.forceUpdate()
                    }}
                    />
                </MapView>
                <View style={styles.botInfo}>
                    <View style={styles.botTitleContainer}>
                        <View style={styles.routeInfo}>
                            <TextInput
                                placeholder = "Enter Route Name"
                                onChangeText={(name) => this.setState({routeName:name})}
                                value = {this.state.routeName}
                            />
                        </View>
                        <View style={styles.icon}>
                            <Icon name="mode-edit" size={20} color={'#8352F2'} onPress={this.delete}/>
                        </View>
                    </View>
                    
                    <View style={styles.routeInfoBot}>
                        <View style={styles.routeInfoBotDetail}>
                            <Text style={styles.routeInfoTextSmall}>Distance (km)</Text>
                            <Text style={styles.routeInfoTextBig}>{this.state.distance}</Text>
                        </View>
                        <View style={styles.routeInfoBotDetail}>
                            <Text style={styles.routeInfoTextSmall}>Duration</Text>
                            <View style={styles.timeContainer}>
                                <TextInput 
                                    style={styles.time}
                                    keyboardType={"numeric"} 
                                    value={this.state.hour} 
                                    onChangeText={(hour) => this.setState({hour})}
                                    maxLength={2} />
                                <Text style={styles.timeSpacing}>
                                    :
                                </Text>
                                <TextInput 
                                    style={styles.time}
                                    keyboardType={"numeric"} 
                                    value={this.state.minute} 
                                    onChangeText={(minute) => this.setState({minute})} 
                                    maxLength={2}/>
                                <Text style={styles.timeSpacing}>
                                    :
                                </Text>
                                <TextInput 
                                    style={styles.time}
                                    keyboardType={"numeric"} 
                                    value={this.state.second} 
                                    onChangeText={(second) => this.setState({second})}
                                    maxLength={2} />
                            </View>
                        </View>
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
        flex:2,
        justifyContent:"center",
        width:"100%",
        paddingLeft:"10%",
        paddingTop:"5%",
        paddingBottom:"5%",
        backgroundColor:"#ffffff",
    },
    routeInfo:{
        flex:1,

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
    routeInfoBot:{
        flexDirection:"row",
        flex:1,
        marginTop:"5%",
    },
    routeInfoBotDetail:{
        flex:1,

    },
    routeInfoTextSmall:{

    },
    routeInfoTextBig:{
        fontSize:20,
        fontWeight:"bold",
    },
    botTitleContainer:{
        flexDirection:"row",
    },
    icon:{
        flex:1,
    },
    timeContainer:{
        flexDirection:"row",
    },
    timeSpacing:{
        textAlignVertical:"center",
        fontSize:20.,
        fontWeight:"bold",
    },
    time:{
        fontSize:20,
        fontWeight:"bold",
        textAlignVertical:"bottom",
    },
    wholeContainer:{
        flex:1,
        backgroundColor:"white",
    },
});