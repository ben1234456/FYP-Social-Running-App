import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Alert, Linking, Platform } from 'react-native';
import { Button } from 'native-base'
import Logo from '../images/logo.png';
import Icon from 'react-native-vector-icons/Foundation';
//import * as IntentLauncher from 'expo-intent-launcher';

export default class CheckEmailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        };
    };
    
    openMail() {
        //var Mailer = require('NativeModules').RNMail;
        if (Platform.OS === 'ios') {
            Linking.canOpenURL('message:0')
                .then(supported => {
                    if (!supported) {
                        console.log('Cant handle url')
                    } else {
                        return Linking.openURL('message:0')
                            .catch(this.handleOpenMailClientErrors)
                    }
                })
                .catch(this.handleOpenMailClientErrors)
        } else if (Platform.OS === 'android') {
            // const activityAction = 'android.intent.action.MAIN'; // Intent.ACTION_MAIN
            // const intentParams: IntentLauncher.IntentLauncherParams = {
            //     flags: 268435456, // Intent.FLAG_ACTIVITY_NEW_TASK
            //     category: 'android.intent.category.APP_EMAIL' // Intent.CATEGORY_APP_EMAIL
            // };

            // IntentLauncher.startActivityAsync(activityAction, intentParams)
            //     .catch(this.handleOpenMailClientErrors);
            Linking.openURL('mailto:support@example.com')
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
                                Check your email
                            </Text>
                            <Text style={styles.smallTextUnderTitle} >
                                Password reset email has been sent!
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Button style={styles.submitBtn} onPress={this.openMail}>
                            <Text style={styles.btnText}>OPEN MAIL APP</Text>
                        </Button>

                        <Text style={{ textAlign: 'center', color: '#8352F2', marginTop: '10%' }} onPress={() => this.props.navigation.navigate('login')}>Skip, I'll confirm later</Text>
                    </View>
                </View>
                <View style={{marginTop: '50%'}}>
                    <Text style={{ textAlign: 'center', color: '#808080' }}>Did not receive the email?</Text>
                    <Text style={{ textAlign: 'center', color: '#8352F2' }} onPress={() => this.props.navigation.navigate('resetPasswordScreen')}>Try another email address</Text>
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
});