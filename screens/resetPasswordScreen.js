import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Alert } from 'react-native';
import Logo from '../images/logo.png';

export default class resetPasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            isVisible: false,
        };
    };

    sendEmail = () => {
        //using localhost on IOS and using 10.0.2.2 on Android
        const baseUrl = Platform.OS === 'android' ? 'http://192.168.0.145:8000' : 'http://localhost';
        const IP = 'https://socialrunningapp.herokuapp.com';

        if (!this.state.email) {
            Alert.alert('Your email cannot be empty')
        }
        else {

            console.log(this.state.email);

            const data = {
                email: this.state.email
            };

            fetch(IP + '/api/forgot-password', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            this.props.navigation.navigate('VerificationScreen')
        }
    }

    render() {
        return (
            <View style={styles.wholeContainer}>
                <Image style={styles.img} source={Logo} />
                <Text style={styles.bigTitle} >
                    Forget Password?
                </Text>
                <Text style={styles.smallTextUnderTitle} >
                    Enter your email address to reset your password.
                </Text>
                <View style={styles.botInfo}>
                    <TextInput
                        style={styles.emailInput}
                        placeholder="Email"
                        keyboardType='email-address'
                        onChangeText={(emailInput) => this.setState({ email: emailInput })}
                        value={this.state.email}
                    />
                    <TouchableOpacity onPress={this.sendEmail}>
                        <View style={styles.botSend}>
                            <Text style={styles.sendText}>SEND EMAIL</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export const styles = StyleSheet.create({
    wholeContainer: {
        flex: 1,
        backgroundColor: "white",
        padding: "5%",
    },
    img: {
        marginTop: "20%",
        width: '30%',
        height: undefined,
        aspectRatio: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    bigTitle: {
        fontWeight: "bold",
        fontSize: 25,
        textAlign: "center",
        marginBottom: "2%",
    },
    smallTextUnderTitle: {
        textAlign: "center",
        color: "grey",

    },
    botInfo: {
        flex: 1,
    },
    emailInput: {
        backgroundColor: '#ECECEC',
        borderRadius: 15,
        padding: "5%",
        marginTop: "5%",
    },
    botTitle: {
        color: "grey",
        marginTop: "10%"
    },
    botSend: {
        backgroundColor: '#8352F2',
        borderRadius: 30,
        marginTop: "5%",
        alignItems: "center",
        padding: "5%",
    },
    sendText: {
        color: "white",
    },
});