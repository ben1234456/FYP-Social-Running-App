import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, FlatList } from 'react-native';
import profileImage from '../../images/avatar.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

export default class buddyRequestDetailScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //selected user id
            buddyID: props.route.params.userID,
            userID: "",
            user: "",
            id: "",
            name: "",
            gender: "",
            city: "",
            dob: "",
            spinner: false,
        };

        //get data from async storage
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
            this.setState({ spinner: true });
            fetch(IP + '/api/users/' + this.state.buddyID, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Successfully get user data')
                    console.log(data)
                    this.setState({
                        user: data
                    });
                    fetch(IP + '/api/buddyrequest/' + this.state.buddyID + '/' + this.state.userID, {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Successfully get buddy req id')
                            console.log(data)
                            this.setState({
                                id: data.id
                            });
                            //change spinner to invisible
                            this.setState({ spinner: false });
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                            //change spinner to invisible
                            this.setState({ spinner: false });
                        });
                })
                .catch((error) => {
                    console.error('Error:', error);
                    //change spinner to invisible
                    this.setState({ spinner: false });
                });


        }

        getData();

    }

    decline = () => {
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        const IP = 'https://socialrunningapp.herokuapp.com';
        //change spinner to visible
        this.setState({ spinner: true });
        fetch(IP + '/api/buddyrequest/list/' + this.state.id, {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

        })
            .then(response => response.json())
            .then(data => {
                console.log('Successfully delete buddy request')
                console.log(data)
                //change spinner to invisible
                this.setState({ spinner: false });
            })
            .catch((error) => {
                console.error('Error:', error);
                //change spinner to invisible
                this.setState({ spinner: false });
            });
        this.props.navigation.dispatch(StackActions.pop());
        this.props.navigation.dispatch(StackActions.pop());
        this.props.navigation.dispatch(StackActions.replace('BuddiesListScreen'))
        // this.props.navigation.dispatch(StackActions.replace('BuddiesRequestList'))

    }

    accept = () => {
        //using localhost on IOS and using 10.0.2.2 on Android
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        const IP = 'https://socialrunningapp.herokuapp.com';

        const data = {
            userID: this.state.userID,
            buddyID: this.state.buddyID,
        };
        //change spinner to visible
        this.setState({ spinner: true });
        fetch(IP + '/api/buddy', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())

            .then(data => {
                console.log(data);
                //change spinner to invisible
                this.setState({ spinner: false });
            })
            .catch((error) => {
                console.error('Error:', error);
                //change spinner to invisible
                this.setState({ spinner: false });
            });
        this.decline();

    }



    render() {
        return (
            <View style={styles.wholeContainer}>

                <Spinner visible={this.state.spinner} textContent={'Loading...'} />
                <View style={styles.container}>
                    <View style={styles.rowContainer}>
                        <Image style={styles.proImage} source={profileImage} />
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                    </View>
                    <View style={styles.cardView}>
                        <View style={styles.proRow}>
                            <View style={styles.proTitle}>
                                <Text style={styles.proColumnName}>Name:</Text>
                            </View>
                            <View style={styles.proInfo}>
                                <Text style={styles.proDetails}>{this.state.user.first_name}</Text>
                            </View>
                        </View>

                        <View style={styles.proRow}>
                            <View style={styles.proTitle}>
                                <Text style={styles.proColumnName}>Gender:</Text>
                            </View>

                            <View style={styles.proInfo}>
                                <Text style={styles.proDetails}>{this.state.user.gender}</Text>
                            </View>
                        </View>

                        <View style={styles.proRow}>
                            <View style={styles.proTitle}>
                                <Text style={styles.proColumnName}>State:</Text>
                            </View>

                            <View style={styles.proInfo}>
                                <Text style={styles.proDetails}>{this.state.user.city}</Text>
                            </View>
                        </View>

                        <View style={styles.proRow}>
                            <View style={styles.proTitle}>
                                <Text style={styles.proColumnName}>Date of Birth:</Text>
                            </View>

                            <View style={styles.proInfo}>
                                <Text style={styles.proDetails}>{this.state.user.dob}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={this.accept}>
                            <View style={styles.btn} >
                                <Text style={styles.btnText}>Accept</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.decline}>
                            <View style={styles.btn2} >
                                <Text style={styles.btnText2}>Decline</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    rowContainer: {
        flex: 0,
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    proImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },

    cardView: {
        margin: 50,
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
    proRow: {
        flexDirection: "row",
    },
    proTitle: {
        flex: 1,
        marginVertical: 15,
        marginHorizontal: 20,
    },
    proInfo: {
        marginVertical: 15,
        marginHorizontal: 20
    },
    proColumnName: {
        fontWeight: 'bold',
        color: '#373737',
    },
    proDetails: {
        color: '#8352F2',
    },
    follow: {
        color: '#8352F2',
        textAlign: 'center'
    },
    followerRow: {
        flexDirection: "row",
        marginTop: 20,
    },
    followPosition: {
        flex: 1,
    },
    noOfFollower: {
        textAlign: 'center'
    },
    btnContainer: {
        flex: 1,
        padding: "5%",

        flexDirection: "row",
        justifyContent: "center",
    },
    btn: {
        borderRadius: 30,
        padding: "5%",
        flex: 1,
        marginRight: "2.5%",
        marginLeft: "2.5%",
        paddingRight: "12.5%",
        paddingLeft: "12.5%",
        backgroundColor: '#8352F2',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn2: {
        borderRadius: 30,
        padding: "5%",
        flex: 1,
        marginRight: "2.5%",
        marginLeft: "2.5%",
        paddingRight: "12.5%",
        paddingLeft: "12.5%",
        backgroundColor: 'white',
        borderColor: '#8352F2',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
    btnText2: {
        fontSize: 16,
        color: '#8352F2',
        textAlign: 'center',
    },
    wholeContainer: {
        flex: 1,
        backgroundColor: "white",
    },
});