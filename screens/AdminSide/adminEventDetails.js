import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, Alert, Dimensions, FlatList } from 'react-native';
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux';
import Event from '../../images/event.png';
//import { createAppContainer } from "react-navigation";
import { StackActions } from '@react-navigation/native';

const window = Dimensions.get("window");

export default class adminEventDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventid: props.route.params.eventid,
            event_name: "",
            start_date: "",
            end_date: "",
            registration_start_date: "",
            registration_end_date: "",
            description: "",
            event_distance: "",
            
        };

        //using localhost on IOS and using 10.0.2.2 on Android
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        const IP = 'https://socialrunningapp.herokuapp.com';

        //get events' details
        fetch(IP + '/api/events/' + this.state.eventid, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    event_name: data.event_name,
                    start_date: data.start,
                    end_date: data.end,
                    registration_start_date: data.registration_start,
                    registration_end_date: data.registration_end,

                    description: data.description
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        //get event distances
        fetch(IP + '/api/events/' + this.state.eventid + '/distance', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Successfully get event distances + fee')
                this.setState({
                    event_distance: data
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    formatDateTime = (sDate, FormatType) => {
        var lDate = new Date(sDate)

        var month = new Array(12);
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";

        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        var hh = lDate.getHours() < 10 ? '0' +
            lDate.getHours() : lDate.getHours();
        var mi = lDate.getMinutes() < 10 ? '0' +
            lDate.getMinutes() : lDate.getMinutes();
        var ss = lDate.getSeconds() < 10 ? '0' +
            lDate.getSeconds() : lDate.getSeconds();

        var d = lDate.getDate();
        var dd = d < 10 ? '0' + d : d;
        var yyyy = lDate.getFullYear();
        var mon = eval(lDate.getMonth() + 1);
        var mm = (mon < 10 ? '0' + mon : mon);
        var monthName = month[lDate.getMonth()];
        var weekdayName = weekday[lDate.getDay()];

        if (FormatType == 1) {
            return mm + '/' + dd + '/' + yyyy + ' ' + hh + ':' + mi;
        } else if (FormatType == 2) {
            return weekdayName + ', ' + monthName + ' ' +
                dd + ', ' + yyyy;
        } else if (FormatType == 3) {
            return mm + '/' + dd + '/' + yyyy;
        } else if (FormatType == 4) {
            var dd1 = lDate.getDate();
            return dd1 + '-' + Left(monthName, 3) + '-' + yyyy;
        } else if (FormatType == 5) {
            return mm + '/' + dd + '/' + yyyy + ' ' + hh + ':' + mi + ':' + ss;
        } else if (FormatType == 6) {
            return mon + '/' + d + '/' + yyyy + ' ' +
                hh + ':' + mi + ':' + ss;
        } else if (FormatType == 7) {
            return dd + '-' + monthName.substring(0, 3) +
                '-' + yyyy + ' ' + hh + ':' + mi + ':' + ss;
        }
    }

    renderDistance = (data) =>
        <Text style={styles.eventInfo}>RM{data.item.fee} ({data.item.distance}km)</Text>

    edit = () => {

        this.props.navigation.dispatch(StackActions.replace('editEventsScreen', {
            'eventid': this.state.eventid,
            'event_name': this.state.event_name,
            "start_date": this.state.start_date,
            "end_date": this.state.end_date,
            "registration_start": this.state.registration_start_date,
            "registration_end": this.state.registration_end_date,
            "description": this.state.description,

        }));
    };

    delete_event = () => {

        //using localhost on IOS and using 10.0.2.2 on Android
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        const IP = 'https://socialrunningapp.herokuapp.com';

        fetch( IP + '/api/events/' + this.state.eventid, {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //success
            if (data.status == "success") {
                //Alert the user
                Alert.alert(
                    data.message,
                    '',
                    [
                        { text: "Ok", onPress: () => this.props.navigation.dispatch(StackActions.replace('adminEventDetailsScreen', {'eventid': this.state.event_id })) }
                    ]
                );
            }

            //fail 
            else if (data.status == "fail") {
                //alert fail message
                Alert.alert(
                    data.message,
                    '',
                    [
                        { text: "Ok", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    }

    delete = () => {
        
        Alert.alert(
            "Delete event",
            "Are you sure you want to delete this event?",
            [
              {
                text: "No",
              },
              { text: "Yes", onPress: () => this.delete_event()}
            ]
          );
    };

    // register = () =>{

    //     const data = {
    //         user_ID: String(this.state.user_ID),
    //     };

    //     fetch('http://192.168.0.192:8000/api/events', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(data),
    //     })

    //     Alert.alert(
    //         'You have successfully signed-up for the event',
    //         '',
    //         [
    //           { text: "Ok", onPress: () => this.props.navigation.navigate('Coupon') }
    //         ]
    //     );   
    // }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View >
                        <View style={styles.top}>
                            <Image style={styles.image} source={Event} />
                        </View>
                        <View>
                            <Text style={styles.title}>{this.state.event_name}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <View style={styles.infoColumnTitle}>
                                <Text style={styles.eventTitle}>Date</Text>
                            </View>
                            <View style={styles.infoColumnInfo}>
                                <Text style={styles.eventInfo}>{this.state.start_date} - {this.state.end_date} (GMT +8:00)</Text>
                            </View>
                        </View>
                        <View style={styles.infoRow}>
                            <View style={styles.infoColumnTitle}>
                                <Text style={styles.eventTitle}>Venue</Text>
                            </View>
                            <View style={styles.infoColumnInfo}>
                                <Text style={styles.eventInfo}>Anywhere</Text>
                            </View>
                        </View>
                        <View style={styles.infoRow}>
                            <View style={styles.infoColumnTitle}>
                                <Text style={styles.eventTitle}>Price</Text>
                            </View>
                            <View style={styles.infoColumnInfo}>
                                <FlatList
                                    data={this.state.event_distance}
                                    keyExtractor={item => item.id.toString()}
                                    renderItem={item => this.renderDistance(item)}
                                />
                            </View>
                        </View>
                        <View style={styles.infoRow}>
                            <View style={styles.infoColumnTitle}>
                                <Text style={styles.eventTitle}>Reward</Text>
                            </View>
                            <View style={styles.infoColumnInfo}>
                                <Text style={styles.eventInfo}>Finished Medal</Text>
                            </View>
                        </View>
                        <View >

                            <View style={styles.about}>
                                <Text style={styles.aboutHeading}>About</Text>
                                <Text style={styles.aboutText}>{this.state.description}</Text>
                            </View>

                            <View style={styles.about}>
                                <Text style={styles.aboutHeading}>REGISTRATION START DATE</Text>
                                <Text style={styles.aboutText}>{this.state.registration_start_date} (GMT +8:00)</Text>
                            </View>
                            <View style={styles.about}>
                                <Text style={styles.aboutHeading}>REGISTRATION END DATE</Text>
                                <Text style={styles.aboutText}>{this.state.registration_end_date} (GMT +8:00)</Text>
                            </View>
                            <View style={styles.about}>
                                <Text style={styles.aboutHeading}>RUN SUBMISSION</Text>
                                <Text style={styles.aboutText}>Please kindly submit your result through this mobile application</Text>
                            </View>
                            
                        </View>

                    </View>
                    <View style={styles.spacing}>

                    </View>
                </ScrollView>
                <View style={styles.btnContainer}>
                    <Button block style={styles.stickyBtn1} onPress={this.edit}>
                        <Text style={styles.btnText}>Edit</Text>
                    </Button>
                    <Button block style={styles.stickyBtn2} onPress={this.delete}>
                        <Text style={styles.btnText}>Delete</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },


    stickyBtn1: {
        flex: 1,
        borderRadius: 30,
        margin: "1%",
        backgroundColor: '#8352F2',
    },
    stickyBtn2: {
        flex: 1,
        borderRadius: 30,
        margin: "1%",
        backgroundColor: '#ff0000',
    },
    btnContainer: {
        flexDirection: "row",
    },
    btnText: {
        color: "#ffffff",
    },
    image: {
        width: "100%",
        height: 277,
    },
    infoColumnTitle: {
        flex: 1,
    },
    infoColumnInfo: {
        flex: 2,
    },
    infoRow: {
        flexDirection: "row",
        margin: "5%",
    },
    eventTitle: {
        textAlign: "left",
        fontSize: 20,
    },
    eventInfo: {
        textAlign: "right",
        fontSize: 15,
        color: '#8352F2',
    },
    bottom: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        lineHeight: 40,
        textAlign: 'center',
        color: '#373737',
        margin: "5%",
        fontWeight: "bold",
    },
    about: {
        flex: 1,
        margin: "5%",
    },
    aboutHeading: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#373737",
    },
    aboutText: {
        fontSize: 15,
        color: "#373737",
    },
});


