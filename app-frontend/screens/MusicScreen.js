import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, List, TouchableOpacity } from 'react-native';
import { Button, ListItem } from 'native-base'
import { Actions } from 'react-native-router-flux';
//import { createAppContainer } from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';

export default class couponScreen extends Component {

    render() {
        return (
            <ScrollView style={styles.background}>
                <View style={styles.container}>
                    <View style={styles.coupon}>

                        <View style={styles.couponDate}>
                            <Text style={styles.eventDate}>Music Settings</Text>
                        </View>
                        <View style={styles.couponRow}>
                            <View style={styles.couponImg}>
                                <Icon name="ios-musical-notes" size={30} color={'#8352F2'} />
                            </View>
                            <View style={styles.couponInfo}>
                                <Text style={styles.eventTitle}>Change Default Player</Text>
                                <Text style={styles.eventDatail}>Choose your player</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export const styles = StyleSheet.create({

    background: {
        backgroundColor: 'white',
    },
    container: {
        
    },
    coupon: {
        marginTop: "5%",
        marginBottom: "5%",
        marginLeft: "10%",
        marginRight: "10%",
        justifyContent: "center",
        flex: 1,
    },
    couponDate: {
        marginTop: "5%",
        marginBottom: "5%",

    },
    couponRow: {
        flexDirection: "row",
        marginBottom: "5%"
    },
    couponImg: {
        padding: 10,
        width: '20%',
    },
    couponInfo: {
        textAlignVertical: "center",
        justifyContent: "center",

    },
    eventTitle: {
        fontWeight: "bold",
        fontSize: 17,
        color: '#373737',
    },
    eventDate: {
        color: "#808080",
    },
    image: {
        height: "100%",
        width: "100%",
        borderRadius: 10,
    },
});


