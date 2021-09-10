import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TextInput, Text, Alert, StyleSheet } from 'react-native';
import { Button } from 'native-base'
import Back from '../images/left-arrow.png';
import Eye from '../images/eye.png';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';


export default class LoginScreen extends Component {

    constructor(props) {

        super(props);

        this.state = {
            icEye: 'eye-off',
            email: "",
            password: "",
            showPassword: true
        }

    }

    validation = () => {

        var empty = [];

        if (!(this.state.email)) {
            empty.push("email");
        }

        if (!(this.state.password)) {
            empty.push("password");
        }

        if (empty.length != 0) {

            console.log(empty[0]);

            var errormsg = "Your ";
            var i;

            for (i = 0; i < empty.length; i++) {
                if (i == empty.length - 1) {
                    errormsg += empty[i] + " ";
                }
                else {
                    errormsg += empty[i] + ", ";
                }
            }

            errormsg += "cannot be emtpy";

            Alert.alert(
                errormsg,
                '',
                [
                    { text: "Ok", onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        }

        else {

            return true;
        }
    }

    login = () => {

        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        
        if (this.validation()) {
            const data = {
                email: this.state.email,
                password: this.state.password
            };

            fetch( baseUrl +'/api/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    //success
                    if (data.status == "success") {
                        //save JSON data to local storage
                        AsyncStorage.setItem('@userJson', JSON.stringify(data.user));
                        //navigate to home page
                        if (data.role == "user"){
                            this.props.navigation.navigate('app');
                        }else if (data.role == "admin"){
                            this.props.navigation.navigate('adminapp');
                        }
                        
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

            //this.props.navigation.navigate('adminapp');
        }

        // this.props.navigation.navigate('app');

    }

    changePasswordType = () => {
        let newState;
        if (this.state.showPassword) {
            newState = {
                icEye: 'eye',
                showPassword: false,
                password: this.state.password
            }
        } else {
            newState = {
                icEye: 'eye-off',
                showPassword: true,
                password: this.state.password
            }
        }
        // set new state value
        this.setState(newState)
    };

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <View>
                        <Text style={styles.heading}>Welcome Back.</Text>
                        <View style={styles.input}>
                            <TextInput
                                placeholder="Email"
                                autoFocus
                                onChangeText={(email_input) => this.setState({ email: email_input })}
                                value={this.state.email}
                            />
                        </View>
                        <View style={styles.input}>
                            <TextInput style={styles.inputRow}
                                placeholder="Password"
                                secureTextEntry={this.state.showPassword}
                                onChangeText={(password_input) => this.setState({ password: password_input })}
                                value={this.state.password}
                            />
                            <Icon style={styles.icon} name={this.state.icEye} size={25} onPress={this.changePasswordType} />
                        </View>
                        <View>
                            <Button style={styles.submitBtn} onPress={this.login}>
                                <Text style={styles.btnText}>SIGN IN</Text>
                            </Button>
                        </View>
                        <Text style={styles.signin}>
                            <Text style={styles.link}>Forgot Your Password? </Text>
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        padding: 40,
        display: 'flex',
        flex: 1,
        backgroundColor: 'white',
        paddingTop:0,
    },

    contentContainer: {
        flex: 1,
        
    },

    image: {
        marginTop: 15,
        marginRight: 15,
        width: 30,
        height: 30,
    },

    heading: {
        fontSize: 30,
        fontWeight: '700',
        color: '#373737',
        lineHeight: 40,
        textAlign: 'center',
        marginTop: 130,
    },

    input: {
        backgroundColor: '#ECECEC',
        borderRadius: 15,
        marginTop: 30,
        display: 'flex',
        padding: 15,
        flexDirection: 'row',
    },

    submitBtn: {
        backgroundColor: '#8352F2',
        borderRadius: 30,
        display: 'flex',
        marginTop: 50,
    },

    btnText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        flex: 1,
        padding: 20,
    },

    signin: {
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 90,
    },

    link: {
        color: 'grey',
        fontSize: 14,
        textDecorationLine: 'underline',
    },

    icon: {
        flex: 0,
        width: 25,
        height: 25,
    },

    inputRow: {
        flex: 1,
    }
});