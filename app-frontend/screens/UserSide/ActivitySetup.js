import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, List, TouchableOpacity, Picker } from 'react-native';
import { Button, ListItem } from 'native-base'
import { Actions } from 'react-native-router-flux';
//import { createAppContainer } from "react-navigation";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ActivitySetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activitySelected: '',
            routeSelected: '',
            musicSelected: ''
        }

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        //setting default activity type to walking
        getActivityType = async () => {
            try {
                const value = await AsyncStorage.getItem('@activityType')
                if(value !== null) {
                    this.setState({
                        activitySelected : capitalizeFirstLetter(value)
                    });
                }
              } catch(e) {
                // error reading value
            }
            
        }

        getActivityType();
    }

    setActivityType = async (activityTypeInput) => {
       this.setState({
           activitySelected : activityTypeInput,
       })

        try {
            AsyncStorage.setItem('@activityType', activityTypeInput.toLowerCase())
          } catch (e) {
            // saving error
          }
        
    }

    render() {
        return (
            <ScrollView style={styles.background}>
                <View style={styles.container}>
                    <View style={styles.activityRow}>
                        <View style={styles.activityInfo}>
                            <Text style={styles.activityType}>Choose your Activity Type</Text>
                            <Picker
                                selectedValue={this.state.activitySelected}
                                backgroundColor={'white'}
                                onValueChange={(itemValue) => this.setActivityType(itemValue)}>

                                <Picker.Item label="Running" value="Running" color='#373737' />
                                <Picker.Item label="Walking" value="Walking" color='#373737' />
                                <Picker.Item label="Cycling" value="Cycling" color='#373737' />
                                <Picker.Item label="Hiking" value="Hiking" color='#373737' />
                            </Picker>
                        </View>
                        {/* <View style={styles.editIcon}>
                            <Icon name="mode-edit" size={20} color={'#8352F2'} />
                        </View> */}
                    </View>

                    <View style={styles.activityRow}>
                        <View style={styles.activityInfo}>
                            <Text style={styles.activityType}>Choose your Route</Text>
                            <Picker
                                selectedValue={this.state.routeSelected}
                                backgroundColor={'white'}
                                onValueChange={(itemValue) => this.setState({ routeSelected: itemValue })}>

                                <Picker.Item label="Route1" value="Route1" color='#373737' />
                                <Picker.Item label="Route2" value="Route2" color='#373737' />
                                <Picker.Item label="Route3" value="Route3" color='#373737' />
                                <Picker.Item label="Route4" value="Route4" color='#373737' />
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.activityRow}>
                        <View style={styles.activityInfo}>
                            <Text style={styles.activityType}>Choose a Music Player</Text>
                            <Picker
                                selectedValue={this.state.musicSelected}
                                backgroundColor={'white'}
                                onValueChange={(itemValue) => this.setState({ musicSelected: itemValue })}>

                                <Picker.Item label="Spotify" value="Spotify" color='#373737' />
                            </Picker>
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
    picker: {
        backgroundColor: 'white',
        flex: 1,
    },
});


