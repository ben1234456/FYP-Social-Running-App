import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView,TouchableOpacity} from 'react-native';
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux';
import Event from '../../images/event.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { createAppContainer } from "react-navigation";
import { StackActions } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

export default class couponDetails extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id:"",
            name:"",
            event_id: props.route.params.event_id,   
            registration_id: props.route.params.registration_id,   
            event_name: "",
            event_start: "",
            event_end: "",     
            progress: "",
            register_at: "",
            spinner:false,
        };


    const getData = async () => {
        try {
            const userJson = await AsyncStorage.getItem('@userJson')
            if(userJson !== null) {
                const user = JSON.parse(userJson);
                this.setState({
                    name:user.first_name,
                });
            }

        } catch(e) {
            console.log(e);
        }
    }

    getData();
    
    }

    componentDidMount(){
        //get event details
        //using localhost on IOS and using 10.0.2.2 on Android
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        const IP = 'https://socialrunningapp.herokuapp.com';

        console.log(this.state.event_id)
        //change spinner to visible
        this.setState({spinner: true});
        fetch(IP + '/api/events/' + this.state.event_id, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Successfully get registered event data')
            this.setState({
                event_name: data.event_name,
                event_start: data.start,
                event_end: data.end,
            });
            //get registration details

            fetch(IP + '/api/userevents/' + this.state.registration_id, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log('Successfully get registration data')
                this.setState({
                    progress: data.status,
                    register_at: data.created_at,
                });
                //change spinner to invisible
                this.setState({spinner: false});
            })
            .catch((error) => {
                console.error('Error:', error);
                //change spinner to invisible
                this.setState({spinner: false});
            });
            
        })
        .catch((error) => {
            console.error('Error:', error);
            //change spinner to invisible
            this.setState({spinner: false});
        });

        
    }

    render() {
        return (
            <ScrollView style={styles.background}>
                <Spinner visible={this.state.spinner} textContent={'Loading...'}/>
                <View>
                    <View style={styles.top}>
                        <Image style={styles.image} source={Event} />
                    </View>
                    <View>
                        <Text style={styles.title}>{this.state.event_name}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.infoColumnTitle}>
                            <Text style={styles.eventTitle}>Date</Text>
                        </View>
                        <View style={styles.infoColumnInfo}>
                            <Text style={styles.eventInfo}>{this.state.event_start} - {this.state.event_end}</Text>
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.infoColumnTitle}>
                            <Text style={styles.eventTitle}>Registered at:</Text>
                        </View>
                        <View style={styles.infoColumnInfo}>
                            <Text style={styles.eventInfo}>{this.state.register_at.slice(0,10) + " " + this.state.register_at.slice(11,19)}</Text>
                        </View>
                    </View>
                    <View style={styles.spacing}/>
                    <View style={styles.infoRow}>
                        <View style={styles.infoColumnTitle}>
                            <Text style={styles.userTitle}>Name</Text>
                        </View>
                        <View style={styles.infoColumnInfo}>
                            <Text style={styles.userInfo}>{this.state.name}</Text>
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.infoColumnTitle}>
                            <Text style={styles.userTitle}>Progress</Text>
                        </View>
                        <View style={styles.infoColumnInfo}>
                            <Text style={styles.userInfo}>{this.state.progress}</Text>
                        </View>
                    </View>
                    
                    <View>
                        <Button block style={styles.stickyBtn} onPress={() => this.props.navigation.dispatch(StackActions.replace('run'))} >
                            <Text style={styles.btnText}>RUN</Text>
                        </Button>
                    </View>
                    {/* <View >
                        <Text style={styles.submit} onPress={() => this.props.navigation.navigate('submitRun')}>Submit your run</Text>
                    </View> */}
                </View>
            </ScrollView>
        );
    }
}

export const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
    },
    
    stickyBtn:{
        alignSelf:"center",
        borderRadius: 30,
        bottom:10,
        width:"40%",
        flex:1,
        marginTop:"10%",
        backgroundColor:'#8352F2'
    },
    btnText:{
        color:"#ffffff",
        fontWeight:"bold",
    },
    submit:{
        textDecorationLine:"underline",
        alignSelf:"center",
        marginBottom:"5%",
    },
    spacing:{
        marginTop:"5%"
    },
    image: {
        width: "100%",
        height: 277,
    },
    infoColumnTitle:{
        flex:1,
    },
    infoColumnInfo:{
        flex:2,
    },
    infoRow:{
        flexDirection:"row",
        marginLeft:"10%",
        marginRight:"10%",
        marginTop:"5%",
    },
    eventTitle:{
        textAlign:"left",
        fontSize:18,
        color:"#808080",
    },
    eventInfo:{
        textAlign:"right",
        fontSize:15,
    },
    userTitle:{
        textAlign:"left",
        fontSize:18,
        color:"#808080",
        fontWeight:"bold",
    },
    userInfo:{
        textAlign:"right",
        fontSize:15,
    },
    bottom: {
        flex: 1,
    },

    title: {
        fontSize: 20,
        lineHeight: 40,
        textAlign: 'center',
        color: '#373737',
        margin:"5%",
        fontWeight:"bold",
    },
    about:{
        flex:1,
        margin:"5%",
    },
    aboutHeading:{
        fontWeight:"bold",
        fontSize:20,
        color:"#4d535c",
    },
    aboutText:{
        fontSize:15,
        color:"#4d535c",
    },
});


