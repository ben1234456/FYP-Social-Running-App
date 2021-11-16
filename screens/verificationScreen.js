import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Alert, Linking, Platform } from 'react-native';
import { Button } from 'native-base'
import Logo from '../images/logo.png';
import Icon from 'react-native-vector-icons/Foundation';
//import * as IntentLauncher from 'expo-intent-launcher';

export default class VerificationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
        };
    };

    verify = () => {
        if (!this.state.code) {
            Alert.alert('Your comment cannot be empty!')
        }
        else {
            this.props.navigation.navigate('CreateNewPasswordScreen')
        }
    }

    render() {
        return (
            <View style={styles.wholeContainer}>
                <View style={{ marginTop: "70%" }}>
                    <View>
                        <View style={styles.topInfo}>
                            <Icon style={{ backgroundColor: '#ECECEC', borderRadius: 15, padding: '5%', color: '#8352F2' }} name='mail' size={80} />
                            <Text style={styles.bigTitle} >
                                Verification
                            </Text>
                            <Text style={styles.smallTextUnderTitle} >
                                We have sent you the One Time Verification Code via email
                            </Text>
                        </View>
                    </View>
                    <View>
                        <TextInput
                            style={styles.verifyInput}
                            placeholder="Enter the verification code here"
                            keyboardType='numeric'
                            onChangeText={(verifyInput) => this.setState({ code: verifyInput })}
                            value={this.state.code}
                        />
                        <TouchableOpacity onPress={this.verify}>
                            <View style={styles.botSend}>
                                <Text style={styles.verify}>VERIFY</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: '50%' }}>
                    <Text style={{ textAlign: 'center', color: '#808080' }}>Did not receive the verification code?</Text>
                    <Text style={{ textAlign: 'center', color: '#8352F2' }}>Resend again</Text>
                </View>
            </View >
        );
    }
}
export const styles = StyleSheet.create({
    wholeContainer: {
        flex: 1,
        backgroundColor: "white",
        padding: "10%",
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
        marginTop: "15%",
        marginBottom: "2%",
    },
    smallTextUnderTitle: {
        textAlign: "center",
        color: "grey",
    },
    submitBtn: {
        backgroundColor: '#8352F2',
        borderRadius: 30,
        display: 'flex',
        marginTop: '20%',
    },
    btnText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        flex: 1,
        padding: 20,
    },
    verifyInput: {
        backgroundColor: '#ECECEC',
        borderRadius: 15,
        padding: "5%",
        marginTop: "5%",
    },
    botSend: {
        backgroundColor: '#8352F2',
        borderRadius: 30,
        marginTop: "5%",
        alignItems: "center",
        padding: "5%",
    },
    verify: {
        color: "white",
    },
});
