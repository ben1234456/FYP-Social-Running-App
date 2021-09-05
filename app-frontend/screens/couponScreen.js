import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux';
import Event from '../images/event.png';
import Event2 from '../images/marathon.png';
import Run from '../images/running.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { createAppContainer } from "react-navigation";

export default class couponScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            user_id:"",   
            
        };


        const getData = async () => {
            try {
                const userJson = await AsyncStorage.getItem('@userJson')
                if(userJson !== null) {
                    const user = JSON.parse(userJson);
                    this.setState({
                        user_id:user.id,
                    });
                }

            } catch(e) {
                console.log(e);
            }

            fetch('http://192.168.0.192:8000/api/events/users/' + this.state.user_id, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success')
                this.setState({
                    activityData:data
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }

        getData();
        
    }

    render() {
        return (
            <ScrollView style={styles.background}>
                <View style={styles.container}>
                    <View style={styles.coupon}>
                            <View style={styles.couponDate}>
                                <Text style={styles.eventDate}>7 July - 12 August 2021</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('couponDetails')}>
                                <View style={styles.couponRow}  onPress={() => this.props.navigation.navigate('couponDetails')}>
                                    <View style={styles.couponImg}>
                                        <Image style={styles.image} source={Event} />
                                    </View>
                                    <View style={styles.couponInfo}>
                                        <Text style={styles.eventTitle}>Virtual Half Marathon</Text>
                                        <Text style={styles.eventDatail}>Progress: 2.75 /5km</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                    </View>
                    <View style={styles.coupon}>
                        
                            <View style={styles.couponDate}>
                                <Text style={styles.eventDate}>19 May - 25 June 2021</Text>
                            </View>
                            <View style={styles.couponRow}>
                                <View style={styles.couponImg}>
                                    <Image style={styles.image} source={Event2} />
                                </View>
                                <View style={styles.couponInfo}>
                                    <Text style={styles.eventTitle}>Spartan Virtual Marathon</Text>
                                    <Text style={styles.eventDatail}>Progress: 13.34 /21km</Text>
                                </View>
                            </View>
                        
                    </View>
                    
                </View>
            </ScrollView>
        );
    }
}

export const styles = StyleSheet.create({
    
    background:{
        backgroundColor: 'white',
    },
    container:{
        marginTop:"10%",
    },
    coupon:{
        marginTop:"5%",
        marginBottom:"5%",
        marginLeft:"10%",
        marginRight:"10%",
        justifyContent:"center",
        flex:1,
    },
    couponDate:{
        marginTop:"5%",
        marginBottom:"5%",
    },
    couponRow:{
        flexDirection:"row",
        marginBottom:"5%"
    },
    couponImg:{
        flex:2,
        marginRight:"5%",
        height:"100%",
    },
    couponInfo:{
        flex:3,
        textAlignVertical:"center",
        justifyContent:"center",
        height:"100%",
    },
    eventDetail:{
        color: "#373737",
    },
    eventTitle:{
        fontWeight:"bold",
        fontSize:18,
        color: "#373737",
    },
    eventDate:{
        color:"#808080",
    },
    image: {
        height:"100%",
        width:"100%",
        borderRadius:10,
    },
});


