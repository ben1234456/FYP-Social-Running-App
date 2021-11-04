import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, ScrollView, Text, View ,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

export default class TrainingRouteScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID:"",
            loadedAdminData:"",
            loadedData:"",
            spinner:false,
        };
        const getData = async () => {
            //using localhost on IOS and using 10.0.2.2 on Android
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
            fetch(IP + '/api/admin/route/routeList', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log('Successfully get admin route list data')
                console.log(data)
                this.setState({
                    loadedAdminData: data
                });
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
            })
            .catch((error) => {
                console.error('Error:', error);
                //change spinner to invisible
                this.setState({spinner: false});
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
                </View>
            </View>
        </TouchableOpacity>

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
                console.log('Successfully get admin route list data')
                console.log(data)
                this.setState({
                    loadedAdminData: data
                });
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
            })
            .catch((error) => {
                console.error('Error:', error);
                //change spinner to invisible
                this.setState({spinner: false});
            });
            
            //Put your Data loading function here instead of my this.loadData()
          });
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <Spinner visible={this.state.spinner} textContent={'Loading...'}/>
                <View style={styles.titleContainer}>
                    <Text style={styles.routes}>Free Routes Available</Text>
                </View>

                <View style={styles.view}>
                    {this.state.loadedAdminData.length!=0
                    ?
                    <View style={styles.cardView}>
                        <FlatList horizontal={false}
                            data={this.state.loadedAdminData}
                            keyExtractor={item => item.id.toString()}
                            renderItem={item => this.renderItemComponent(item)}
                        /> 
                    </View>
                    :
                    <View style={styles.noData}>
                        <Text style={styles.noDataText}>No routes avaliable now</Text>
                    </View>
                    }
                    
                </View>

                <View style={styles.titleContainer}>
                    <View style={styles.routesContainer}>
                        <Text style={styles.routes}>My Routes</Text>
                    </View>
                    <View style={styles.moreContainer}>
                        <Text style={styles.more} onPress={() => this.props.navigation.navigate('addRouteScreen')}>{"Add new route"}</Text>
                    </View>
                </View>
                
                <View>
                    <View style={styles.view}>
                        {this.state.loadedData.length
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
                            <Text style={styles.noDataText}>No routes avaliable now</Text>
                        </View>
                        }
                        
                        
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex:1,
        padding:"5%",
    },
    
    routesContainer:{
        alignItems:"flex-start",
        flex:1,
    },
    moreContainer:{
        alignItems:"flex-end",
        flex:1,
    },
    titleContainer:{
        flexDirection:"row",
    },
    routes: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    more: {
        color: '#8352F2',
    },
    view:{
        marginRight:"2%",
        marginLeft:"2%",
    },
    cardView: {
        marginTop:"5%",
        marginBottom:"5%",
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
    routeDistance: {
        color: '#373737',
    },
    routeDuration: {
        color: '#808080',
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
    // title: {
    //     marginTop: 10,
    //     fontSize: 18,
    //     fontWeight: 'bold',
    // },
    // routeRow: {
    //     flexDirection: "row",
    //     flex:1,
    //     padding:"5%",
    // },
    // 
    // 
    // routeOption: {
    //     margin: 20,
    //     position: 'absolute',
    //     right: 5,
    // },
    
    // routeAdd: {
    //     color: '#8352F2',
    // },
    // listContainer:{
    //     marginTop:"5%",
    // },
});