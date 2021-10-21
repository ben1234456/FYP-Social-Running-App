import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AdminSavedRouteScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID:"",
            loadedData:"",
        };
        const getData = async () => {
            //using localhost on IOS and using 10.0.2.2 on Android
            const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
            const IP = 'https://socialrunningapp.herokuapp.com';

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
            fetch(IP + '/api/calendar/calendarList/'+this.state.userID, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log('Successfully get user calendar data')
                console.log(data)
                this.setState({
                    loadedData: data
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            
        }

        getData();
        //date format for data
        console.log(new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate());
        
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                
                <View style={styles.rowContainer}>
                    <Text style={styles.routes}>My Routes</Text>
                    <Text style={styles.more} onPress={() => this.props.navigation.navigate('addRouteScreen')}>{"Add new route"}</Text>
                </View>
                
                <View>
                    <View style={styles.view}>
                        <View style={styles.cardView}>

                            <View style={styles.routeRow}>
                                <View style={styles.routeTitle}>
                                    <Text style={styles.routeColumnName}>Route1</Text>
                                </View>
                                <View style={styles.routeInfo}>
                                    <Text style={styles.routeDistance}>3.55km</Text>
                                    <Text style={styles.routeDuration}>00:40:00</Text>
                                </View>
                                <View style={styles.routeOption}>
                                    <Icon name="mode-edit" size={20} color={'#808080'} />
                                </View>
                            </View>
                            <View style={styles.routeRow}>
                                <View style={styles.routeTitle}>
                                    <Text style={styles.routeColumnName}>Route2</Text>
                                </View>
                                <View style={styles.routeInfo}>
                                    <Text style={styles.routeDistance}>3.55km</Text>
                                    <Text style={styles.routeDuration}>00:40:00</Text>
                                </View>
                                <View style={styles.routeOption}>
                                    <Icon name="mode-edit" size={20} color={'#808080'} />
                                </View>
                            </View>
                            <View style={styles.routeRow}>
                                <View style={styles.routeTitle}>
                                    <Text style={styles.routeColumnName}>Route3</Text>
                                </View>
                                <View style={styles.routeInfo}>
                                    <Text style={styles.routeDistance}>3.55km</Text>
                                    <Text style={styles.routeDuration}>00:40:00</Text>
                                </View>
                                <View style={styles.routeOption}>
                                    <Icon name="mode-edit" size={20} color={'#808080'} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    rowContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 30,
    },
    view: {
        height: 240,
    },
    cardView: {
        height: 'auto',
        marginLeft: 30,
        marginRight: 30,
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
    routes: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 18,
    },
    more: {
        color: '#8352F2',
    },
    title: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    routeRow: {
        flexDirection: "row",
    },
    routeTitle: {
        marginVertical: 20,
        marginHorizontal: 20,
    },
    routeInfo: {
        marginVertical: 15,
        marginHorizontal: 20,
        position: 'absolute',
        right: 70,
    },
    routeOption: {
        margin: 20,
        position: 'absolute',
        right: 5,
    },
    routeDistance: {
        color: '#373737',
    },
    routeDuration: {
        color: '#808080',
    },
    routeAdd: {
        color: '#8352F2',
    },
});