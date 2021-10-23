import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Button } from 'native-base'
import { Actions, Reducer } from 'react-native-router-flux';
import Font from 'react-native-vector-icons/FontAwesome5';
import profileImage from '../../images/avatar.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackActions } from '@react-navigation/native';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: "",
            name: "",
            gender: "",
            city: "",
            dob: "",
        };
       
    }

    logout = async () => {

        var msg = "Are you sure you want to log out?";

        Alert.alert(
            msg,
            '',
            [
                { text: "Logout Now", style: "default", onPress: () =>  this.props.navigation.dispatch(StackActions.replace('login'))},
                { text: "Cancel", style: 'cancel', onPress: () => console.log("Cancel Pressed") }
            ],
            {cancelable: false},
        );

    }

    componentDidMount(){
        //get data from async storage
        const getData = async () => {
            try {
                const userJson = await AsyncStorage.getItem('@userJson')
                
                if(userJson !== null) {
                    const user = JSON.parse(userJson);

                    //change to upper case
                    var gender = user.gender;
                    var genderText = gender[0].toUpperCase() + gender.substring(1);
                    
                    //update state
                    this.setState({
                        user_id:user.id,
                        name:user.first_name,
                        email:user.email,
                        gender:genderText,
                        city:user.city,
                        dob:user.dob
                    });  

                    console.log(this.state.name);
                }
    
            } catch(e) {
                console.log(e);
            }
        }
    
        getData();

        this.focusListener = this.props.navigation.addListener('focus', () => {

            const IP = 'https://socialrunningapp.herokuapp.com';

            //get forum posts' details
            fetch(IP + '/api/users/' + this.state.user_id, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                JSON.stringify(data);
                console.log(data);
                //change to upper case
                var gender = data[0].gender;
                var genderText = gender[0].toUpperCase() + gender.substring(1);

                this.setState({
                    user_id: data[0].id,
                    name: data[0].first_name,
                    email: data[0].email,
                    gender: genderText,
                    city: data[0].city,
                    dob: data[0].dob
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        });

    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.contentContainer1}>
                    <View style={styles.rowContainer}>
                        <Icon style={styles.image} name="logout" size={25} color={'#8352F2'} onPress={this.logout} />
                        <Text style={styles.profile}>Profile</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Coupon', { 'user_id': this.state.user_id })}>
                            <Font style={styles.image} name="ticket-alt" size={25} color={'#8352F2'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.rowContainer2}>
                    <Image style={styles.proImage} source={profileImage} />
                </View>
                <View style={styles.rowContainer2}>
                    <Button block style={styles.editProfile} onPress={() => this.props.navigation.navigate('editProfileScreen')}>
                        <Text style={styles.btnText}>Edit Profile</Text>
                    </Button>

                    <Button block style={styles.changePassword} onPress={() => this.props.navigation.navigate('ChangePasswordScreen')}>
                        <Text style={styles.btnText}>Change password</Text>
                    </Button>

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
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    infoColumnTitle: {
        flex: 2,
    },
    infoColumnInfo: {
        flex: 1,
    },
    infoRow: {
        flexDirection: "row",
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: "5%",
        marginBottom: "5%",
    },
    profileTitle: {
        textAlign: "left",
        fontSize: 15,
        fontWeight: "bold",
    },
    profileInfo: {
        textAlign: "right",
        fontSize: 15,
        color: "#8100e3",
    },
    contentContainer1: {
        padding: 20,
        marginTop: 30,
    },

    rowContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },

    rowContainer2: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    profile: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },

    proImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },

    editProfile: {
        flex:1,
        backgroundColor: '#8352F2',
        borderRadius: 30,
        marginTop: 50,
        marginLeft: 40,
    },

    changePassword: {
        flex: 1,
        backgroundColor: '#FF0000',
        borderRadius: 30,
        marginTop: 50,
        marginLeft:10,
        marginRight: 40,
    },

    btnText: {
        fontSize: 16,
        color: 'white',
        padding: 20,
        textAlign: 'center',
    },
    cardView: {
        margin: 40,
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
    }
});