import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, ScrollView, Text, View,FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class routeListScreen extends Component {
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
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            
        }
        getData();
    }
    renderItemComponent = (data) =>        
        <TouchableOpacity onPress={() => this.props.navigation.navigate('editRouteScreen', { 'id': data.item.id})}>
            <View style={styles.routeRow}>
                <View style={styles.routeTitle}>
                    <Text style={styles.routeColumnName}>{data.item.name}</Text>
                </View>
                <View style={styles.routeInfo}>
                    <Text style={styles.routeDistance}>{data.item.total_distance}km</Text>
                    <Text style={styles.routeDuration}>{data.item.hour}:{data.item.minute}:{data.item.second}</Text>
                </View>
            </View>
        </TouchableOpacity>
    render() {
        return (
            <ScrollView style={styles.container}>
                
                
                <View style={styles.listContainer}>
                    <View style={styles.view}>
                        <View style={styles.cardView}>
                            <FlatList horizontal={false}
                                data={this.state.loadedData}
                                keyExtractor={item => item.id.toString()}
                                renderItem={item => this.renderItemComponent(item)}
                            />  
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
        flex:1,
        padding:"5%",
    },
    routeTitle: {
        flex:7,
        justifyContent:"center",
    },
    routeInfo: {
        flex:3,
        justifyContent:"center",
        alignItems:"center",
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
    listContainer:{
        marginTop:"5%",
    },
});