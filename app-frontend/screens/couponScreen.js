import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList} from 'react-native';
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
            user_id: props.route.params.user_id,   
            event_data:"",
        };

        //using localhost on IOS and using 10.0.2.2 on Android
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';

        fetch(baseUrl + '/api/events/users/' + this.state.user_id, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Successfully get registered event data')
            console.log(data)
            this.setState({
                event_data:data
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    }

    renderItemComponent = (data) =>
        
    <View style={styles.coupon}>
        <View style={styles.couponDate}>
            <Text style={styles.eventDate}>{data.item.start_date} until {data.item.end_date}</Text>
        </View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('couponDetails')}>
            <View style={styles.couponRow}  onPress={() => this.props.navigation.navigate('couponDetails')}>
                <View style={styles.couponImg}>
                    <Image style={styles.image} source={Event} />
                </View>
                <View style={styles.couponInfo}>
                    <Text style={styles.eventTitle}>{data.item.event_name} </Text>
                    <Text style={styles.eventDatail}>Progress: {data.item.distance_ran}km / {data.item.distance}km</Text>
                </View>
            </View>
        </TouchableOpacity>
    </View>


    render() {
        return (
            <ScrollView style={styles.background}>
                <View style={styles.container}>

                <FlatList 
                    data={this.state.event_data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={item => this.renderItemComponent(item)}
                /> 

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
        fontWeight:"bold",
        fontSize:16,
        color:"#808080",
    },
    image: {
        height:"100%",
        width:"100%",
        borderRadius:10,
    },
});


