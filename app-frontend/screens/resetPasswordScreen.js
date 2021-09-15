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
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';

        if (!this.state.email) {
            Alert.alert('Your email cannot be empty')
        }
        else {

            const data = {
                email: String(this.state.email)   
            };

            fetch(baseUrl + '/api/password/forgot-password', {
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
                
            Alert.alert(
                'The password reset email has been sent!',
                '',
                [
                    { text: "Ok", onPress: () => this.props.navigation.navigate('CheckEmailScreen') }
                ]
            );
        }
    }

    render() {
        return (
            <View style={styles.wholeContainer}>
                <View style={styles.topInfoContainer}>
                    <View style={styles.topInfo}>
                        <Image style={styles.img} source={Logo} />
                        <Text style={styles.bigTitle} >
                            Forget Password?
                        </Text>
                        <Text style={styles.smallTextUnderTitle} >
                            Enter your email address to reset your password.
                        </Text>
                    </View>
                </View>
                <View style={styles.botInfoContainer}>
                    <View style={styles.botInfo}>
                        <Text style={styles.botTitle}>
                            Email address
                        </Text>
                        <TextInput
                            style={styles.emailInput}
                            placeholder="Email"
                            keyboardType='email-address'
                            onChangeText={(emailInput) => this.setState({ email: emailInput })}
                            value={this.state.email}
                        />
                        <TouchableOpacity onPress={this.sendEmail}>
                            <View style={styles.botSend}>
                                <Text style={styles.sendText}>SEND INSTRUCTIONS</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
export const styles = StyleSheet.create({
    wholeContainer: {
        flex: 1,
        backgroundColor: "white",
        padding: "10%",
    },
    botInfoContainer: {
        flex: 2,
    },
    topInfoContainer: {
        flex: 1,

    },
    img: {
        width: '30%',
        height: undefined,
        aspectRatio: 1,
    },
    topInfo: {
        flex: 1,
        padding: "5%",
        alignItems: "center",
        justifyContent: "flex-end",
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