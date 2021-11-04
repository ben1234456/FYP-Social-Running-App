import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux';
import Event from '../../images/event.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { createAppContainer } from "react-navigation";
import Spinner from 'react-native-loading-spinner-overlay';

export default class couponScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            user_id: props.route.params.user_id,   
            event_data:"",
            spinner:false,
        };

        //using localhost on IOS and using 10.0.2.2 on Android
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        const IP = 'https://socialrunningapp.herokuapp.com';
        //change spinner to visible
        this.setState({spinner: true});
        fetch(IP + '/api/events/users/' + this.state.user_id, {
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
            //change spinner to invisible
            this.setState({spinner: false});
        })
        .catch((error) => {
            console.error('Error:', error);
            //change spinner to invisible
            this.setState({spinner: false});
        });

    }

    renderItemComponent = (data) =>
        
    <View style={styles.coupon}>
        <View style={styles.couponDate}>
            <Text style={styles.eventDate}>{data.item.start_date} until {data.item.end_date}</Text>
        </View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('couponDetails',{event_id: data.item.event_id,registration_id: data.item.id})}>
            <View style={styles.couponRow}  onPress={() => this.props.navigation.navigate('couponDetails',{event_id: data.item.event_id,registration_id: data.item.id})}>
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
                <Spinner visible={this.state.spinner} textContent={'Loading...'}/>
                <View style={styles.container}>

                {this.state.event_data.length!=0
                ?
                <View style={styles.scrollview}>
                    <FlatList 
                    data={this.state.event_data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={item => this.renderItemComponent(item)}
                    /> 
                </View>
                :
                <View style={styles.noEventView}>
                    <Text style={styles.noEventText}>Oh! Seems like you did not registered any event!</Text>
                </View>
                }

                 

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
    noEventView:{
        flex:1,
        paddingLeft:"10%",
        paddingRight:"10%",
        alignItems:"flex-start",
        justifyContent:"center",
    },

    noEventText:{
        fontSize:16,
    },
});


