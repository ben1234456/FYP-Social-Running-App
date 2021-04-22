import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TextInput, Text, StyleSheet } from 'react-native';
import { Button } from 'native-base'
import Back from '../images/left-arrow.png';
import Eye from '../images/eye.png';
import { Actions } from 'react-native-router-flux';

export default class LoginScreen extends Component {

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <TouchableOpacity onPress={Actions.start}>
                        <Image style={styles.image} source={Back} />
                    </TouchableOpacity>

                    <View>
                        <Text style={styles.heading}>Welcome Back.</Text>
                        <View style={styles.input}>
                            <TextInput placeholder="Email" autoFocus />
                        </View>
                        <View style={styles.input}>
                            <TextInput placeholder="Password" secureTextEntry />
                            <Image style={styles.icon} source={Eye} />
                        </View>
                        <View>
                            <Button style={styles.submitBtn} onPress={Actions.app}>
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
        padding: 20,
        display: 'flex',
        flex: 1,
        backgroundColor: 'white',
    },

    contentContainer: {
        flex: 1,
        padding: 20,
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
        marginLeft: 160,
        width: 25,
        height: 25,
    }
});