import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, ScrollView, Text, View,FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

export default class AdminSavedRouteScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userID:"",
            loadedData:"",
            spinner:false,
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
            //change spinner to visible
            this.setState({spinner: true});

            fetch(IP + '/api/admin/route/routeList', {
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
        getData();
    }

    componentDidMount(){
        this.focusListener = this.props.navigation.addListener('focus', () => {
            const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
            const IP = 'https://socialrunningapp.herokuapp.com';
            //change spinner to visible
            this.setState({spinner: true});
            fetch(IP + '/api/admin/route/routeList', {
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
          });
    }

    renderItemComponent = (data) =>        
    
        <TouchableOpacity onPress={() => this.props.navigation.navigate('editRouteScreen', { 'id': data.item.id})}>
            <View style={styles.routeRow}>
                <View style={styles.routeTitle}>
                    <Text style={styles.routeColumnName}>{data.item.name}</Text>
                </View>
                <View style={styles.routeInfo}>
                    <Text style={styles.routeDistance}>{data.item.total_distance}km</Text>
                </View>
            </View>
        </TouchableOpacity>
        
    render() {
        return (
            <ScrollView style={styles.container}>
                <Spinner visible={this.state.spinner} textContent={'Loading...'}/>
                <View style={styles.rowContainer}>
                    <Text style={styles.routes}>My Routes</Text>
                    <Text style={styles.more} onPress={() => this.props.navigation.navigate('addRouteScreen')}>{"Add new route"}</Text>
                </View>
                
                <View style={styles.listContainer}>
                    {this.state.loadedData.length!=0
                    ?
                    <View style={styles.cardView}>
                        <FlatList horizontal={false}
                            data={this.state.loadedData}
                            keyExtractor={item => item.id.toString()}
                            renderItem={item => this.renderItemComponent(item)}
                        /> 
                    </View>
                    :
                    <View style={styles.noData}>
                        <Text style={styles.noDataText}>No routes available now</Text>
                    </View>
                    }
                    
                    
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
        margin: "5%",
    },
    noData:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:"5%",
    },
    noDataText:{
        color:"#808080",
    },
    view: {
        height: 240,
    },
    cardView: {
        height: 'auto',
        marginLeft: "5%",
        marginRight: "5%",
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
        marginBottom: "5%",
    },
});
