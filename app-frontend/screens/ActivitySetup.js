import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, List, TouchableOpacity } from 'react-native';
import { Button, ListItem } from 'native-base'
import { Actions } from 'react-native-router-flux';
//import { createAppContainer } from "react-navigation";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class ActivitySetup extends Component {

    render() {
        return (
            <ScrollView style={styles.background}>
                <View style={styles.container}>
                    <TouchableOpacity>
                        <View style={styles.activityRow}>
                            <View style={styles.activityInfo}>
                                <Text style={styles.activityType}>Activity Type</Text>
                                <Text style={styles.activityDetail}>Running</Text>
                            </View>
                            <View style={styles.editIcon}>
                                <Icon name="mode-edit" size={20} color={'#8352F2'} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.activityRow}>
                            <View style={styles.activityInfo}>
                                <Text style={styles.activityType}>Route</Text>
                                <Text style={styles.activityDetail}>Select your route</Text>
                            </View>
                            <View style={styles.editIcon}>
                                <Icon name="mode-edit" size={20} color={'#8352F2'} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.activityRow}>
                            <View style={styles.activityInfo}>
                                <Text style={styles.activityType}>Goal</Text>
                                <Text style={styles.activityDetail}>Select your training goal</Text>
                            </View>
                            <View style={styles.editIcon}>
                                <Icon name="mode-edit" size={20} color={'#8352F2'} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.activityRow}>
                            <View style={styles.activityInfo}>
                                <Text style={styles.activityType}>Music</Text>
                                <Text style={styles.activityDetail}>Select your music player</Text>
                            </View>
                            <View style={styles.editIcon}>
                                <Icon name="mode-edit" size={20} color={'#8352F2'} />
                            </View>
                        </View>
                    </TouchableOpacity>
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
        paddingTop: 20,
        paddingLeft: 40,
    },
    activityRow: {
        flexDirection: "row",
        marginBottom: "10%"
    },
    activityInfo: {
        textAlignVertical: "center",
        justifyContent: "center",
    },
    activityType: {
        color: "#808080",
        fontSize: 14,
    },
    eventDate: {
        color: "#808080",
    },
    image: {
        height: "100%",
        width: "100%",
        borderRadius: 10,
    },
    activityDetail: {
        fontSize: 18,
        color: '#373737',
    },
    editIcon: {
        margin: 10,
        position: 'absolute',
        right: 30,
    },
});


