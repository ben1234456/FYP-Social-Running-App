import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Alert, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class CreateNewPasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            confirmPassword: "",
            icEye: 'eye-off',
            showPassword: true
        };
    };

    createPassword = () => {
        var empty = [];


        if (!(this.state.password) || !(this.state.confirmPassword)) {
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

            errormsg += "cannot be empty";

            Alert.alert(
                errormsg,
                '',
                [
                    { text: "Ok", onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        }

        else if (this.state.password != this.state.confirmPassword) {
            Alert.alert(
                "Both passwords must be the same",
                '',
                [
                    { text: "Ok", onPress: () => console.log("OK Pressed") }
                ]
            );

            return false;
        }

        else {
            Alert.alert(
                'Password successfully changed!',
                ''
                [
                { text: "Ok", onPress: () => console.log("OK Pressed") }
                ]
            );
            this.props.navigation.navigate('login')
            return true;
        }
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
                        <Text style={styles.heading}>Create new password</Text>
                        <Text style={styles.smallTextUnderTitle}>Your password must be different with the previous password</Text>
                        <View style={styles.input}>
                            <TextInput style={styles.inputRow}
                                placeholder="Password"
                                secureTextEntry={this.state.showPassword}
                                onChangeText={(password_input) => this.setState({ password: password_input })}
                                value={this.state.password}
                            />
                            <Icon style={styles.icon} name={this.state.icEye} size={25} onPress={this.changePasswordType} />
                        </View>
                        <View style={styles.input}>
                            <TextInput style={styles.inputRow}
                                placeholder="Confirm Password"
                                secureTextEntry={this.state.showPassword}
                                onChangeText={(password_input) => this.setState({ confirmPassword: password_input })}
                                value={this.state.confirmPassword}
                            />
                            <Icon style={styles.icon} name={this.state.icEye} size={25} onPress={this.changePasswordType} />
                        </View>
                        <View>
                            <TouchableOpacity onPress={this.createPassword}>
                                <View style={styles.botSend}>
                                    <Text style={styles.sendText}>RESET PASSWORD</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
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
        paddingTop: 0,
    },
    contentContainer: {
        flex: 1,
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
    icon: {
        flex: 0,
        width: 25,
        height: 25,
    },
    inputRow: {
        flex: 1,
    },
    smallTextUnderTitle: {
        textAlign: "center",
        color: "#808080",
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
