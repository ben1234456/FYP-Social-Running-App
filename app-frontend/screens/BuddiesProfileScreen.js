import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import profileImage from '../images/avatar.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class BuddiesProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            gender: "",
            city: "",
            dob: "",
        };

        //get data from async storage
        const getData = async () => {
            try {
                const userJson = await AsyncStorage.getItem('@userJson')

                if (userJson !== null) {
                    const user = JSON.parse(userJson);

                    //change to upper case
                    var gender = user.gender;
                    var genderText = gender[0].toUpperCase() + gender.substring(1);

                    //update state
                    this.setState({
                        name: user.first_name,
                        email: user.email,
                        gender: genderText,
                        city: user.city,
                        dob: user.dob
                    });
                }

            } catch (e) {
                console.log(e);
            }
        }

        getData();

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Image style={styles.proImage} source={profileImage} />
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <View style={styles.followerRow}>
                        <View style={styles.followPosition}>
                            <Text style={styles.noOfFollower}>0</Text>
                            <Text style={styles.follow}>FOLLOWERS</Text>
                        </View>
                        <View style={styles.followPosition}>
                            <Text style={styles.noOfFollower}>0</Text>
                            <Text style={styles.follow}>FOLLOWING</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.cardView}>
                    <View style={styles.proRow}>
                        <View style={styles.proTitle}>
                            <Text style={styles.proColumnName}>Name:</Text>
                        </View>
                        <View style={styles.proInfo}>
                            <Text style={styles.proDetails}>{this.state.name}</Text>
                        </View>
                    </View>

                    <View style={styles.proRow}>
                        <View style={styles.proTitle}>
                            <Text style={styles.proColumnName}>Gender:</Text>
                        </View>

                        <View style={styles.proInfo}>
                            <Text style={styles.proDetails}>{this.state.gender}</Text>
                        </View>
                    </View>

                    <View style={styles.proRow}>
                        <View style={styles.proTitle}>
                            <Text style={styles.proColumnName}>State:</Text>
                        </View>

                        <View style={styles.proInfo}>
                            <Text style={styles.proDetails}>{this.state.city}</Text>
                        </View>
                    </View>

                    <View style={styles.proRow}>
                        <View style={styles.proTitle}>
                            <Text style={styles.proColumnName}>Date of Birth:</Text>
                        </View>

                        <View style={styles.proInfo}>
                            <Text style={styles.proDetails}>{this.state.dob}</Text>
                        </View>
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
    }
});