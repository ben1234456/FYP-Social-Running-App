import React, { Component } from 'react';
import { View, Image, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Logo from '../../images/logo.png';
import Event from '../../images/event.png';
import UpcomingEvent from '../../images/family_marathon.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class HomeScreen extends Component {

    constructor(props) {
        super(props);

        var today = new Date()
        var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
        var day = today.getDay()
        var day = weekdays[day]

        this.state = {
            id: "",
            user_id: "",
            name: "",
            eventdata: "",
            currenDate: date,
            currentDay: day
        };


        const getData = async () => {

            //using localhost on IOS and using 10.0.2.2 on Android
            const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';

            try {
                const userJson = await AsyncStorage.getItem('@userJson')
                if (userJson !== null) {
                    const user = JSON.parse(userJson);
                    this.setState({
                        name: user.first_name,
                        user_id: user.id,
                    });
                }

            } catch (e) {
                console.log(e);
            }

            //get event details
            fetch(baseUrl + '/api/events/exclusive/' + this.state.user_id, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log('Successfully get event data')
                console.log(data)
                this.setState({
                    eventdata: data
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            
        }

        getData();

    }

    componentDidUpdate() {
        const getData = async () => {
            try {
                const userJson = await AsyncStorage.getItem('@userJson')
                if (userJson !== null) {
                    const user = JSON.parse(userJson);
                    this.setState({
                        name: user.first_name,
                    });
                }

            } catch (e) {
                console.log(e);
            }
        }

        getData();
    };

    renderItemComponent = (data) =>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('eventDetails', { 'eventid': data.item.id })}>
            <View style={styles.cardView}>
                <View style={styles.view1}>
                    <Image style={styles.image2} source={Event} />
                </View>
                <View style={styles.view2}>
                    <Text style={styles.title}>{data.item.event_name}</Text>
                    <Text style={styles.venue}>Anywhere</Text>
                </View>
            </View>
        </TouchableOpacity>



    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.contentContainer1}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.welcome}>Hi,</Text>
                        <Text style={styles.name}> {this.state.name}</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Activity')}>
                            <Image style={styles.image} source={Logo} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('calendarScreen')}>
                        <View style={styles.rowContainer}>
                            <Text style={{ color: '#8352F2', fontSize: 18, fontWeight: 'bold' }}>{this.state.currenDate},</Text>
                            <Text style={{ color: '#8352F2', marginLeft: 10, fontSize: 18, fontWeight: 'bold' }}>{this.state.currentDay}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.rowContainer}>
                        <Text style={styles.event}>Events</Text>
                        <Text onPress={() => this.props.navigation.navigate('eventsScreen', { 'user_id': this.state.user_id })} style={styles.more}>{"View More >"}</Text>
                    </View>
                </View>

                <View style={styles.scrollview}>
                    <FlatList horizontal={true}
                        data={this.state.eventdata}
                        keyExtractor={item => item.id.toString()}
                        renderItem={item => this.renderItemComponent(item)}
                    />  
                </View>
                
                <View style={styles.contentContainer1}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.event}>Coming Soon</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('upcomingEventsScreen')}>
                            <Text style={styles.more}>{"View More >"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <ScrollView style={styles.scrollview} horizontal={true}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('eventDetails', { 'user_id': this.state.user_id })}>
                            <View style={styles.cardView}>
                                <View style={styles.view1}>
                                    <Image style={styles.image2} source={UpcomingEvent} />
                                </View>
                                <View style={styles.view2}>
                                    <Text style={styles.title}>Family Virtual Run</Text>
                                    <Text style={styles.venue}>Anywhere</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </ScrollView>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainer1: {
        marginTop: 30,
        padding: 20,
    },
    rowContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    scrollview: {
        height: 240,
    },
    cardView: {
        height: 210,
        width: 250,
        marginLeft: 40,
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
    welcome: {
        fontSize: 35,
        fontWeight: 'bold',
    },
    name: {
        flex: 1,
        fontSize: 35,
        fontWeight: 'bold',
        color: '#8352F2',
    },
    image: {
        width: 60,
        height: 60
    },
    image2: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    view1: {
        flex: 2,
    },
    view2: {
        flex: 1,
        paddingLeft: 20
    },
    event: {
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
    venue: {
        flex: 1,
        fontSize: 18,
        color: 'grey',
    }
});