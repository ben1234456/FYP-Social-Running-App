import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TextInput, Text, Alert, StyleSheet } from 'react-native';
import { Button } from 'native-base'
import Back from '../images/left-arrow.png';
import Eye from '../images/eye.png';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackActions } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

export default class LoginScreen extends Component {

    constructor(props) {

        super(props);

        this.state = {
            icEye: 'eye-off',
            email: "",
            password: "",
            showPassword: true,
            user: "",
            spinner: false,
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

        //using localhost on IOS and using 10.0.2.2 on Android
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';

        const IP = 'https://socialrunningapp.herokuapp.com';
        
        if (this.validation()) {

            this.setState({
                spinner: !this.state.spinner
            });

            const data = {
                email: this.state.email,
                password: this.state.password
            };

            fetch( IP +'/api/login', {
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

                    if (data.message == "success") {

                        if (data.user.email_verified_at) {
                            this.setState({
                                spinner: !this.state.spinner
                            });

                            //save JSON data to local storage
                            AsyncStorage.setItem('@userJson', JSON.stringify(data.user));
                            //navigate to home page
                            if (data.user.role == "user") {
                                this.props.navigation.dispatch(StackActions.replace('app'));
                            } else if (data.user.role == "admin") {
                                this.props.navigation.dispatch(StackActions.replace('adminapp'));
                            }
                        }

                        else {
                            this.setState({
                                spinner: !this.state.spinner
                            });

                            Alert.alert(
                                'Email Not Verified',
                                'Please verify your email',
                                [
                                    { text: "OK" },
                                ]
                            );


                        }

                    }

                    else {
                        this.setState({
                            spinner: !this.state.spinner
                        });

                        removeLastChar = data.message.slice(0, data.message.length - 1);

                        Alert.alert(
                            data.message,
                            ''
                            [
                            { text: "OK" }
                            ]
                        );
                    }




                })
                .catch((error) => {
                    console.error('Error:', error);
                });


        }

        //this.props.navigation.navigate('app')

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
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.heading}>Welcome Back.</Text>
                    <View style={styles.input}>
                        <TextInput
                            style={styles.email}
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
                    <Text style={styles.signin} onPress={() => this.props.navigation.navigate('resetPasswordScreen')}>
                        <Text style={styles.link}>Forgot Your Password? </Text>
                    </Text>
                </View>
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        padding: 40,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },

    heading: {
        fontSize: 30,
        fontWeight: '700',
        color: '#373737',
        lineHeight: 40,
        textAlign: 'center',
        alignItems: 'center'
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