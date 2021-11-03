import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, FlatList,Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Dimensions } from 'react-native';
import Purple from '../../images/purple.png';
import Blue from '../../images/blue.png';
import Green from '../../images/green.png';
import Orange from '../../images/orange.png';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';

export default class editRouteScreen extends Component {

    constructor(props) {
        super(props);
        this.changeSelection = this.changeSelection.bind(this);
        this.state = {
            userID: "",
            loadedData: "",
            data: "",
            id:props.route.params.id,
            routeName: "",
            distance: "",
            errorMessage: "",
            latitude: 0,
            longitude: 0,
            totaldistance: 0,
            ownerId: "",
            start: null,
            end: null,
            check1: null,
            check2: null,
            def: null,

            checkPointArray: [],

            reference: React.createRef(),
            startingPoint: "Start Point",
            endingPoint: "End Point",
            checkPoint1: "First Checkpoint",
            checkPoint2: "Second CheckPoint",
            selection: 0,


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
                if (userJson !== null) {
                    const user = JSON.parse(userJson);
                    this.setState({
                        userID: user.id,
                    });
                }

            } catch (e) {
                console.log(e);
            }
            fetch(IP + '/api/route/routeList/details/' + this.state.id, {
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


            })
            .catch((error) => {
                console.error('Error:', error);
            });
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

    changeLocation = (point) => {
        //get the latitude and longitude clicked
        let tempoLat = point.nativeEvent.coordinate.latitude || this.state.latitude;
        let tempoLong = point.nativeEvent.coordinate.longitude || this.state.longitude;
        //get the address of the latitude and longitude
        this.getAddressClick(tempoLat, tempoLong);
    };

    loadAddress = () => {
        this.getAddress(this.state.start.coordinate.latitude, this.state.start.coordinate.longitude, 0);

        if (this.state.check1 != null) {
            this.getAddress(this.state.check1.coordinate.latitude, this.state.check1.coordinate.longitude, 1);
        }
        if (this.state.check2 != null) {
            this.getAddress(this.state.check2.coordinate.latitude, this.state.check2.coordinate.longitude, 2);
        }
        this.getAddress(this.state.end.coordinate.latitude, this.state.end.coordinate.longitude, 3);
    }

    getAddressClick(latitude, longitude) {
        return new Promise((resolve) => {
            const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${this.state.api}&mode=retrieveAddresses&prox=${latitude},${longitude}`
            fetch(url)
                .then(res => res.json())
                .then((resJson) => {
                    if (resJson && resJson.Response && resJson.Response.View && resJson.Response.View[0] && resJson.Response.View[0].Result && resJson.Response.View[0].Result[0]) {
                        if (this.state.selection == 0) {
                            this.setState({ startingPoint: resJson.Response.View[0].Result[0].Location.Address.Label });
                            this.setState({
                                start: { title: "Starting point", coordinate: { latitude: latitude, longitude: longitude }, selected: true },
                            });
                        }
                        if (this.state.selection == 1) {
                            this.setState({ checkPoint1: resJson.Response.View[0].Result[0].Location.Address.Label });
                            this.setState({
                                check1: { title: "Checkpoint 1", coordinate: { latitude: latitude, longitude: longitude }, selected: true },

                            });
                        }
                        if (this.state.selection == 2 && this.state.check1 != null) {
                            this.setState({ checkPoint2: resJson.Response.View[0].Result[0].Location.Address.Label });
                            this.setState({
                                check2: { title: "Checkpoint 2", coordinate: { latitude: latitude, longitude: longitude }, selected: true },
                            });
                        }
                        if (this.state.selection == 3) {
                            this.setState({ endingPoint: resJson.Response.View[0].Result[0].Location.Address.Label });
                            this.setState({
                                end: { title: "Ending point", coordinate: { latitude: latitude, longitude: longitude }, selected: true },
                            });
                        }
                        console.log(resJson.Response.View[0].Result[0].Location.Address.Label)
                    }
                    //add checkpoint to route between start and end
                    if (this.state.start != null && this.state.end != null) {
                        //add checkpoint if selected
                        if (this.state.check1 != null) {
                            //set first checkpoint
                            let tempoArray = [{
                                latitude: this.state.check1.coordinate.latitude,
                                longitude: this.state.check1.coordinate.longitude,
                            }]
                            console.log("tempoArray");
                            console.log(tempoArray);
                            //set second checkpoint if selected
                            if (this.state.check2 != null) {
                                tempoArray.push({
                                    latitude: this.state.check2.coordinate.latitude,
                                    longitude: this.state.check2.coordinate.longitude,
                                })
                            }
                            console.log("tempoArray");
                            console.log(tempoArray);
                            this.setState({ checkPointArray: tempoArray });
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
    getAddress(latitude, longitude, selection) {
        return new Promise((resolve) => {
            const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${this.state.api}&mode=retrieveAddresses&prox=${latitude},${longitude}`
            fetch(url)
                .then(res => res.json())
                .then((resJson) => {
                    if (resJson && resJson.Response && resJson.Response.View && resJson.Response.View[0] && resJson.Response.View[0].Result && resJson.Response.View[0].Result[0]) {
                        if (selection == 0) {
                            this.setState({ startingPoint: resJson.Response.View[0].Result[0].Location.Address.Label });
                            this.setState({
                                start: { title: "Starting point", coordinate: { latitude: latitude, longitude: longitude }, selected: true },

                            });
                        }
                        if (selection == 1) {
                            this.setState({ checkPoint1: resJson.Response.View[0].Result[0].Location.Address.Label });
                            this.setState({
                                check1: { title: "Checkpoint 1", coordinate: { latitude: latitude, longitude: longitude }, selected: true },

                            });
                        }
                        if (selection == 2 && this.state.check1 != null) {
                            console.log("getcheck2add")

                            this.setState({ checkPoint2: resJson.Response.View[0].Result[0].Location.Address.Label });
                            this.setState({
                                check2: { title: "Checkpoint 2", coordinate: { latitude: latitude, longitude: longitude }, selected: true },

                            });
                        }
                        if (selection == 3) {
                            this.setState({ endingPoint: resJson.Response.View[0].Result[0].Location.Address.Label });
                            this.setState({
                                end: { title: "Ending point", coordinate: { latitude: latitude, longitude: longitude }, selected: true },

                            });
                        }
                        console.log(resJson.Response.View[0].Result[0].Location.Address.Label)
                    }
                    //show the direction if start and end point was chosen

                    if (this.state.start != null && this.state.end != null) {
                        //add checkpoint if selected
                        if (this.state.check1 != null) {
                            //set first checkpoint
                            let tempoArray = [{
                                latitude: this.state.check1.coordinate.latitude,
                                longitude: this.state.check1.coordinate.longitude,
                            }]
                            console.log("tempoArray");
                            console.log(tempoArray);
                            //set second checkpoint if selected
                            if (this.state.check2 != null) {
                                tempoArray.push({
                                    latitude: this.state.check2.coordinate.latitude,
                                    longitude: this.state.check2.coordinate.longitude,
                                })
                            }
                            console.log("tempoArray");
                            console.log(tempoArray);
                            this.setState({ checkPointArray: tempoArray });
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



    changeSelection = (newSelection) => {
        this.setState({ selection: newSelection });
        console.log("selection");
        console.log(this.state.selection);

    };

    checkSelected=(value,type)=>{
        if(value!=null){
            if(type=="long"){
                return value.coordinate.longitude
            }
            else{
                return value.coordinate.latitude
            }
        }
        else{
            return null;
        }
    }
    save = () => {
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        const IP = 'https://socialrunningapp.herokuapp.com';

        
        //validation for empty or unable to get route
        if(this.state.routeName.length!=0){
            if(this.state.start!=null || this.state.end!=null){
                if(this.state.distance!=null && this.state.distance.length!=0){
                    const data = {
                        userID: this.state.userID,
                        name: this.state.routeName,
                        start_lat: this.state.start.coordinate.latitude,
                        start_lng: this.state.start.coordinate.longitude,
                        end_lat: this.state.end.coordinate.latitude,
                        end_lng: this.state.end.coordinate.longitude,
                        total_distance: this.state.distance,
                        check1_lat:this.checkSelected(this.state.check1,"lat"),
                        check1_lng:this.checkSelected(this.state.check1,"long"),
                        check2_lat:this.checkSelected(this.state.check2,"lat"),
                        check2_lng:this.checkSelected(this.state.check2,"long"),
                    };
                    console.log(data);
                    fetch(IP + '/api/route/' + this.state.id, {
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
                    this.props.navigation.dispatch(StackActions.pop());
                }
                else{
                    Alert.alert(
                        "Unable to get route for point selected. Please select other point for route",
                        '',
                        [
                            { text: "Ok", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                }
            }
            else{
                Alert.alert(
                    "Please select a starting and ending point for the route",
                    '',
                    [
                        { text: "Ok", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
        }
        else{
            Alert.alert(
                "Please enter a name for the route",
                '',
                [
                    { text: "Ok", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
        

    };
    add = () => {
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        const IP = 'https://socialrunningapp.herokuapp.com';
        //validation for empty or unable to get route
        if(this.state.routeName.length!=0){
            if(this.state.start!=null || this.state.end!=null){
                if(this.state.distance!=null && this.state.distance.length!=0){
                    const data = {
                        userID: this.state.userID,
                        name: this.state.routeName,
                        start_lat: this.state.start.coordinate.latitude,
                        start_lng: this.state.start.coordinate.longitude,
                        end_lat: this.state.end.coordinate.latitude,
                        end_lng: this.state.end.coordinate.longitude,
                        total_distance: this.state.distance,
                        check1_lat:this.checkSelected(this.state.check1,"lat"),
                        check1_lng:this.checkSelected(this.state.check1,"long"),
                        check2_lat:this.checkSelected(this.state.check2,"lat"),
                        check2_lng:this.checkSelected(this.state.check2,"long"),
                    };
                    fetch(IP + '/api/route', {
                        method: 'POST',
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
                    this.props.navigation.dispatch(StackActions.pop());
                }
                else{
                    Alert.alert(
                        "Unable to get route for point selected. Please select other point for route",
                        '',
                        [
                            { text: "Ok", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                }
            }
            else{
                Alert.alert(
                    "Please select a starting and ending point for the route",
                    '',
                    [
                        { text: "Ok", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
        }
        else{
            Alert.alert(
                "Please enter a name for the route",
                '',
                [
                    { text: "Ok", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
        

    };

    delete = () => {
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        const IP = 'https://socialrunningapp.herokuapp.com';
        
        fetch(IP + '/api/route/' + this.state.id, {
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
            this.props.navigation.dispatch(StackActions.pop());

    };

    componentDidMount() {


    }
    
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
                <MapView onPress={this.changeLocation.bind(this)} style={styles.map} ref={this.state.reference} >
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
                    {this.state.start && this.state.end &&
                        <MapViewDirections origin={this.state.start.coordinate} destination={this.state.end.coordinate} waypoints={this.state.checkPointArray} apikey={this.state.googleApi}
                            onReady={result => {
                                this.state.distance = result.distance;
                                this.getLocation();
                                this.forceUpdate();
                            }}
                            onStart={() => {
                                this.loadAddress();
                                this.forceUpdate();

                            }}
                        />
                    }
                </MapView>
                <View style={styles.botInfo}>
                    <View style={styles.routeInfoBot}>
                        <View style={styles.routeInfoBotDetail}>
                            <Text style={styles.routeInfoTextSmall}>Route name</Text>
                            <View style={styles.timeContainer}>
                                {this.state.ownerId == this.state.userID
                                    ?
                                    <TextInput
                                        placeholder="Enter Route Name"
                                        onChangeText={(name) => this.setState({ routeName: name })}
                                        value={this.state.routeName}
                                        style={{ borderBottomWidth: 1 }}
                                    />
                                    :
                                    <Text>{this.state.routeName}</Text>
                                }

                            </View>
                        </View>
                        <View style={styles.routeInfoBotDetail}>
                            <Text style={styles.routeInfoTextSmall}>Distance (km)</Text>
                            <Text style={styles.routeInfoTextBig}>{this.state.distance}</Text>
                        </View>
                        {this.state.ownerId == this.state.userID
                        ?
                        <View style={{ justifyContent: 'center' ,alignItems:"center",flex:1}}>
                            <Icon style={{}} name="delete" size={30} color={'#808080'} onPress={this.delete} />
                        </View>
                        :
                        <View></View>
                        }
                        <View style={{ justifyContent: 'center',alignItems:"center",flex:1 }}>
                        {this.state.ownerId == this.state.userID
                        ?
                        <Icon2 name="save-sharp" style={{   }} size={30} color={'#8352F2'} onPress={this.save} />
                        :
                        <Icon2 name="save-sharp" style={{ }} size={30} color={'#8352F2'} onPress={this.add} />
                    }
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
    topInfo: {
        flex: 3,
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingTop: "1%",
        paddingBottom: "1%",
        width: "100%",
        backgroundColor: '#8352F2',
        justifyContent: "center",

    },
    info: {
        borderRadius: 5,
        padding: "1%",
        backgroundColor: '#ffffff',
    },
    map: {
        flex: 6,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    botInfo: {
        flex: 2,
        justifyContent: "center",
        width: "100%",
        paddingLeft: "10%",
        paddingTop: "5%",
        paddingBottom: "5%",
        backgroundColor: "#ffffff",
    },
    routeInfo: {
        flex: 1,
    },
    image: {
        width: "40%",
        height: "40%",
    },
    row: {
        flexDirection: "row",
        height: "20%",
        marginTop: "1%",
        marginBottom: "1%",
    },
    imgColumn: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    infoColumn: {
        flex: 9,
        paddingRight: "5%",
        justifyContent: "center",
    },
    infoText: {
        fontSize: 12,
        color:"#808080",

    },
    routeInfoBot: {
        flexDirection: "row",
    },
    routeInfoBotDetail: {
        flex: 3,
    },
    routeInfoTextSmall: {

    },
    routeInfoTextBig: {
        fontSize: 20,
        fontWeight: "bold",
    },
    botTitleContainer: {
        flexDirection: "row",
    },
    icon: {
        flex: 1,
    },
    timeContainer: {
        flexDirection: "row",
    },
    timeSpacing: {
        textAlignVertical: "center",
        fontSize: 20.,
        fontWeight: "bold",
    },
    time: {
        fontSize: 20,
        fontWeight: "bold",
        textAlignVertical: "bottom",
    },
    wholeContainer: {
        flex: 1,
        backgroundColor: "white",
    },
});