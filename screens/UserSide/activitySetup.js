import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, List, TouchableOpacity, Picker } from 'react-native';
import { Button, ListItem } from 'native-base'
import { Actions } from 'react-native-router-flux';
//import { createAppContainer } from "react-navigation";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

export default class ActivitySetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activitySelected: '',
            routeSelected: '',
            musicSelected: '',
            userID:"",
            loadedData:"",
            spinner:false,

        }

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        //setting default activity type to walking
        getActivityType = async () => {

            try {
                const value = await AsyncStorage.getItem('@activityType')
                if (value !== null) {
                    this.setState({
                        activitySelected: capitalizeFirstLetter(value)
                    });
                }
            } catch (e) {
                // error reading value
            }

            try {
                const userJson = await AsyncStorage.getItem('@userJson')
                if (userJson !== null) {
                    const user = JSON.parse(userJson);
                    this.setState({
                        userID: user.id,
                    });
                }

            } catch (e) {
                console.log(e);
            }

            const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
            const IP = 'https://socialrunningapp.herokuapp.com';
            //change spinner to visible
            this.setState({spinner: true});
            fetch(IP + '/api/route/routeList/'+this.state.userID, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log('Successfully get user route list data')
                console.log(data)
                this.setState({
                    loadedData: data
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

        getActivityType();
    }

    setActivityType = async (activityTypeInput) => {
        this.setState({
            activitySelected: activityTypeInput,
        })

        try {
            AsyncStorage.setItem('@activityType', activityTypeInput.toLowerCase())
        } catch (e) {
            // saving error
        }

        console.log(activityTypeInput)

    }

    setRoute = async (routeInput) => {
        this.setState({ routeSelected: routeInput })

        try {
            AsyncStorage.setItem('@route', String(routeInput))
            console.log("save")
        } catch (e) {
            // saving error
            console.log("cannot")
        }

        const routeID = await AsyncStorage.getItem('@route')

    }

    pickerList(){
        if(this.state.loadedData.length!=0){
            return this.state.loadedData.map((route) => 
                <Picker.Item label={route.name} value={route.id} color='#373737' />
            )
        }
        else{
            return (
                <Picker.Item label="No Route Avaliable" value="No Route Avaliable" color='#373737' />
            )
        }
        
    
    }
    
    render() {
        return (
            <ScrollView style={styles.background}>
                <Spinner visible={this.state.spinner} textContent={'Loading...'}/>

                <View style={styles.container}>
                    <View style={styles.activityRow}>
                        <View style={styles.activityInfo}>
                            <Text style={styles.activityType}>Choose your Activity Type</Text>
                            <View style={styles.picker}>
                                <Picker
                                    selectedValue={this.state.activitySelected}
                                    onValueChange={(itemValue) => this.setActivityType(itemValue)}>

                                    <Picker.Item label="Running" value="Running" color='#373737' />
                                    <Picker.Item label="Walking" value="Walking" color='#373737' />
                                    <Picker.Item label="Cycling" value="Cycling" color='#373737' />
                                    <Picker.Item label="Hiking" value="Hiking" color='#373737' />
                                </Picker>
                            </View>
                        </View>
                        {/* <View style={styles.editIcon}>
                            <Icon name="mode-edit" size={20} color={'#8352F2'} />
                        </View> */}
                    </View>

                    <View style={styles.activityRow}>
                        <View style={styles.activityInfo}>
                            <Text style={styles.activityType}>Choose your Route</Text>
                            <View style={styles.picker}>
                                <Picker
                                    selectedValue={this.state.routeSelected}
                                    onValueChange={(itemValue) => this.setRoute(itemValue)}>
                                    {this.pickerList()}
                                </Picker>
                            </View>
                        </View>
                    </View>

                    <View style={styles.activityRow}>
                        <View style={styles.activityInfo}>
                            <Text style={styles.activityType}>Choose a Music Player</Text>
                            <View style={styles.picker}>
                                <Picker
                                    selectedValue={this.state.musicSelected}
                                    onValueChange={(itemValue) => this.setState({ musicSelected: itemValue })}>

                                    <Picker.Item label="Spotify" value="Spotify" color='#373737' />
                                </Picker>
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
        backgroundColor: '#ECECEC',
        borderRadius: 15,
        marginTop: 15,
    },
});


