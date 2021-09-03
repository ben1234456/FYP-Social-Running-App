import React, { Component } from 'react';
import { View, Image, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Font from 'react-native-vector-icons/FontAwesome'
import Ant from 'react-native-vector-icons/AntDesign'
import profileImage from '../images/avatar.jpg';
import moment from 'moment';

export default class ForumDetailsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            eventdata: "",
            noLike: 5,
            like: 'heart-o',
            showLike: true,
            showComment: true,
            comment: "",
            date: "",
        }
    }

    changeLike = () => {
        let newState;
        if (this.state.showLike) {
            newState = {
                like: 'heart',
                noLike: this.state.noLike + 1,
                showLike: false,
            }
        } else {
            newState = {
                like: 'heart-o',
                noLike: this.state.noLike - 1,
                showLike: true,
            }
        }
        // set new state value
        this.setState(newState)
    };

    validation = () => {

        var empty = [];

        if (!(this.state.comment)) {
            empty.push("comment");
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

        else {

            return true;
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>

                <View style={styles.proRow}>
                    <View style={styles.proTitle}>
                        <Image style={styles.proColumnName} source={profileImage} />
                    </View>
                    <View style={styles.proTitle}>
                        <Text style={styles.title}>John</Text>
                        {/* <Text style={styles.proDetails}>{this.state.name}</Text> */}
                        <Text style={styles.date}>Sep 1, 2021</Text>
                    </View>
                </View>

                <View style={styles.proTitle}>
                    <Text style={styles.title}>Title is here.</Text>
                    <Text style={styles.description}>This is the description that the users want to write.</Text>
                </View>
                <View style={styles.proRow}>
                    <View style={styles.proTitle}>
                        <Font size={25} name={this.state.like} color='#FF4141' onPress={this.changeLike} />
                    </View>
                    <View style={styles.icon}>
                        <Text>{this.state.noLike}</Text>
                    </View>
                    <View style={styles.proTitle}>
                        <Icon2 size={25} name='comment-outline' color='#808080' />
                    </View>
                    <View style={styles.icon}>
                        <Text>2</Text>
                    </View>
                </View>

                <View style={styles.proTitle}>
                    <View style={styles.proRow}>
                        <TextInput style={styles.input}
                            placeholder="Write a comment"
                            onChangeText={(comment_input) => this.setState({ comment: comment_input })}
                            value={this.state.comment}
                        />
                        <Icon2 size={25} onPress={this.validation} name='send' style={[styles.text, !this.state.comment ? styles.inactive : []]} />
                    </View>
                </View>

                <View style={styles.proTitle}>
                    <Text style={styles.comment}>Comments</Text>
                </View>

                <View style={styles.proRow}>
                    <View style={styles.proTitle}>
                        <Image style={styles.proColumnName} source={profileImage} />
                    </View>
                    <View style={{ marginTop: 20, marginLeft: 20, flex: 2 }}>
                        <Text style={styles.title}>Gordon</Text>
                        {/* <Text style={styles.proDetails}>{this.state.name}</Text> */}
                        <Text style={styles.date}>Cool</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{color:'#AEAEAE', fontSize: 14}}>1 hour ago</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    event: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 18,
    },
    cardView: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 45,
        marginRight: 45,
        borderRadius: 15,
        backgroundColor: 'white',

        //ios
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,

        //android
        elevation: 5,
    },
    proRow: {
        flexDirection: "row",
        alignItems: 'center',
    },
    proTitle: {
        marginLeft: 20,
        marginTop: 20,
    },
    proInfo: {
        margin: 20
    },
    proColumnName: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    title: {
        fontSize: 18,
        color: '#373737'
    },
    date: {
        fontSize: 14,
        color: '#808080'
    },
    description: {
        fontSize: 16,
        color: '#808080'
    },
    icon: {
        marginLeft: 10,
        marginRight: 50,
        marginTop: 20,
    },
    input: {
        backgroundColor: '#ECECEC',
        borderRadius: 15,
        marginRight: 20,
        marginBottom: 20,
        padding: 5,
        flex: 5,
    },
    inactive: {
        color: '#808080',
    },
    text: {
        color: '#8352F2',
        marginBottom: 20,
        flex: 1
    },
    comment: {
        color: '#AEAEAE',
        fontSize: 18,
    },
    time: {
        flex: 1,
        marginLeft: 20,
        marginTop: 20,
    },
});