import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, List, TouchableOpacity } from 'react-native';
import { Button, ListItem } from 'native-base'
import { Actions } from 'react-native-router-flux';
//import { createAppContainer } from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';

export default class MusicScreen extends Component {

    render() {
        return (
            <ScrollView style={styles.background}>
                <View style={styles.container}>
                    <View style={styles.music}>
                        <View style={styles.musicTitle}>
                            <Text style={styles.musicSetting}>Music Settings</Text>
                        </View>
                        <TouchableOpacity>
                            <View style={styles.musicRow}>
                                <View style={styles.musicIcon}>
                                    <Icon name="ios-musical-notes" size={30} color={'#8352F2'} />
                                </View>
                                <View style={styles.musicInfo}>
                                    <Text style={styles.musicTitle}>Change Default Player</Text>
                                    <Text style={styles.musicDetail}>Choose your player</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
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
    music: {
        marginTop: "5%",
        marginBottom: "5%",
        marginLeft: "10%",
        marginRight: "10%",
        justifyContent: "center",
        flex: 1,
    },
    musicSetting: {
        marginTop: "5%",
        marginBottom: "5%",
    },
    musicRow: {
        flexDirection: "row",
        marginBottom: "5%"
    },
    musicIcon: {
        padding: 10,
        width: '20%',
    },
    musicInfo: {
        textAlignVertical: "center",
        justifyContent: "center",
    },
    musicTitle: {
        fontWeight: "bold",
        fontSize: 17,
        color: '#373737',
    },
    musicSetting: {
        color: "#808080",
    },
    image: {
        height: "100%",
        width: "100%",
        borderRadius: 10,
    },
});


