import React, { Component } from 'react';
import { View, Image, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import Event from '../../images/event.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class EventsScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            eventdata: "",
        };

        //using localhost on IOS and using 10.0.2.2 on Android
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        const IP = 'https://socialrunningapp.herokuapp.com';

        //get event details
        fetch(IP + '/api/events', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Successfully get event data')
            // console.log(data)
            this.setState({
                eventdata: data
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        
    }

    renderItemComponent = (data) =>
        
        <TouchableOpacity style={styles.rowContainer} onPress={() =>  this.props.navigation.navigate('adminEventDetailsScreen', { 'eventid': data.item.id })}>
            <View style={styles.cardView}>
                <View style={styles.view1}>
                    <Image style={styles.image} source={Event} />
                </View>
                <View style={styles.view2}>
                    <Text style={styles.title}>{data.item.event_name}</Text>
                    <Text style={styles.venue}>Anywhere</Text>
                </View>
            </View>
        </TouchableOpacity>

    render() {
        return (
            <ScrollView style={styles.container}>

                <FlatList 
                    data={this.state.eventdata}
                    keyExtractor={item => item.id.toString()}
                    renderItem={item => this.renderItemComponent(item)}
                />  
                
            </ScrollView >
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height,
        backgroundColor: 'white',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardView: {
        marginTop: 30,
        marginBottom: 10,
        height: 210,
        width: 250,
        borderRadius: 15,
        backgroundColor: 'white',

        //ios
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,

        //android
        elevation: 5,
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    view1: {
        flex: 2,
    },
    view2: {
        flex: 1,
        paddingLeft: 20
    },
    title: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    venue: {
        flex: 1,
        fontSize: 18,
        color: 'grey',
    }
});