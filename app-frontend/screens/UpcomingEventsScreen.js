import React, { Component } from 'react';
import { View, Image, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Logo from '../images/logo.png';
import Event from '../images/event.png';
import Event2 from '../images/marathon.png';
import UpcomingEvent from '../images/family_marathon.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class UpcomingEventsScreen extends Component {

    render() {
        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity style={styles.rowContainer} onPress={() => this.props.navigation.navigate('eventDetails')}>
                    <View style={styles.cardView}>
                        <View style={styles.view1}>
                            <Image style={styles.image} source={UpcomingEvent} />
                        </View>
                        <View style={styles.view2}>
                            <Text style={styles.title}>Family Virtual Run</Text>
                            <Text style={styles.venue}>Anywhere</Text>
                        </View>
                    </View>
                </TouchableOpacity>
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