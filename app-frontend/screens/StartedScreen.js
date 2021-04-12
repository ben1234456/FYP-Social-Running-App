import React, { Component } from 'react';
import { View, Image, Text, StyleSheet} from 'react-native';
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux';
import Run from '../images/running.jpg';
//import { createAppContainer } from "react-navigation";
//import  { createStackNavigator }  from 'react-navigation';

export default class StartedScene extends Component {
       
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Image style={styles.image} source={Run} />
                </View>
                <View style={styles.bottom}>
                    <Text style={styles.heading}>Let's get started!</Text>
                    <Text style={styles.subHeading}>Enjoy.</Text>
                    <Button block style={styles.submitBtn} onPress={Actions.register}>
                        <Text style={styles.btnText}>SIGN UP</Text>
                    </Button>
                    <Text style={styles.signin}>
                        <Text style={styles.link}>Already have an account? </Text>
                        <Text style={styles.signinText} onPress={Actions.login}>SIGN IN</Text>
                    </Text>
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
    },

    image: {
        alignSelf: 'center',
        width: 390,
        height: 277,
    },

    top: {
        flex: 1,
    },

    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    heading: {
        fontSize: 30,
        lineHeight: 40,
        textAlign: 'center',
        color: '#373737',
    },

    subHeading: {
        fontSize: 18,
        lineHeight: 40,
        textAlign: 'center',
        color: 'grey',
    },

    submitBtn: {
        backgroundColor: '#8352F2',
        borderRadius: 30,
        marginTop: 60,
    },

    btnText: {
        fontSize: 16,
        color: 'white',
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
    },

    signinText: {
        color: '#8352F2',
        fontSize: 14,
    }
});


