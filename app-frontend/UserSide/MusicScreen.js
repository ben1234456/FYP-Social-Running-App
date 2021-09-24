import React, { Component, isValidElement } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Button, ListItem } from 'native-base'
import { Actions } from 'react-native-router-flux';
//import { createAppContainer } from "react-navigation";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const url = "spotify:collection-songs"

const store = Platform.OS === 'android' ?
                    'https://play.google.com/store/apps/details?id=com.spotify.music'   :  'https://apps.apple.com/us/app/doorhub-driver/id324684580'

export default class MusicScreen extends Component {

    openMusic = async() => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        }
        else{
            var errormsg = "You do not have spotify"; 

            Alert.alert(
                errormsg,
                '',
                [
                    { text: "Download now", style: "default", onPress: () => Linking.openURL(store)},
                    { text: "Ok", style: 'cancel', onPress: () => console.log("OK Pressed") }
                ]
            );
        }
    }

    render() {
        return (
            <ScrollView style={styles.background}>
                <View style={styles.container}>
                    <View style={styles.music}>
                        <View style={styles.musicTitle}>
                            <Text style={styles.musicSetting}>Music Settings</Text>
                        </View>
                        <TouchableOpacity onPress={this.openMusic}>
                            <View style={styles.musicRow}>
                                <View style={styles.musicIcon}>
                                    <Icon name="spotify" size={30} color={'#8352F2'} />
                                </View>
                                <View style={styles.musicInfo}>
                                    <Text style={styles.musicTitle}>Open Music</Text>
                                    <Text style={styles.musicDetail}>Spotify</Text>
                                </View>
                                <Text></Text>
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


