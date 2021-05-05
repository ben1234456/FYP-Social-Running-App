import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TextInput, Text, Alert, StyleSheet } from 'react-native';
import { Button } from 'native-base'
import Back from '../images/left-arrow.png';
import Eye from '../images/eye.png';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LoginScreen extends Component {

    constructor(props) {
        
        super(props);  

        this.state = {  
            email: "",
            password: "",
        }

    }

    login = () => {

        // const data = {email: this.state.email,
        //     password: this.state.password};

        // fetch('http://192.168.0.192:8000/api/login', {
        //     method: 'POST',
        //     headers: {
        //       Accept: 'application/json',
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.status == "success"){
        //         AsyncStorage.setItem('@userid',String(data.userid));
        //         this.props.navigation.navigate('app');
        //     }

        //     else if (data.status =="fail"){
        //         Alert.alert(
        //             data.message,
        //             '',
        //             [
        //               { text: "Ok", onPress: () => console.log("OK Pressed") }
        //             ]
        //         );                
        //     }
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // });  
        
        this.props.navigation.navigate('app');
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('start')}>
                        <Image style={styles.image} source={Back} />
                    </TouchableOpacity>

                    <View>
                        <Text style={styles.heading}>Welcome Back.</Text>
                        <View style={styles.input}>
                            <TextInput 
                                placeholder="Email" 
                                autoFocus 
                                onChangeText={(email_input) => this.setState({email:email_input})}
                                value = {this.state.email}
                            />
                        </View>
                        <View style={styles.input}>
                            <TextInput 
                                placeholder="Password" 
                                secureTextEntry 
                                onChangeText={(password_input) => this.setState({password:password_input})}
                                value = {this.state.password}
                            />
                            <Image style={styles.icon} source={Eye} />
                        </View>
                        <View>
                            <Button style={styles.submitBtn}  onPress={this.login}>
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