import React, { Component } from 'react';
import { View, Image, Text, ScrollView, StyleSheet } from 'react-native';
import Logo from '../images/logo.png';
import Event from '../images/event.png';
import Event2 from '../images/marathon.png';

export default class HomeScreen extends Component {
    render() {

        return (
            <View style={styles.container}>
                <View style={styles.contentContainer1}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.welcome}>Hi,</Text>
                        <Text style={styles.name}> Jun</Text>
                        <Image style={styles.image} source={Logo} />
                    </View>

                    <View style={styles.rowContainer}>
                        <Text style={styles.event}>Event</Text>
                        <Text style={styles.more}>{"View More >"}</Text>
                    </View>
                </View>

                <View style={styles.contentContainer2}>
                    <ScrollView style={styles.scrollview} horizontal={true}>
                        <View style={styles.cardView}>
                            <View style={styles.view1}>
                                <Image style={styles.image2} source={Event} />
                            </View>
                            <View style={styles.view2}>
                                <Text style={styles.title}>Virtual Half Marathon</Text>
                                <Text style={styles.venue}>Anywhere</Text>
                            </View>
                        </View>

                        <View style={styles.cardView}>
                            <View style={styles.view1}>
                                <Image style={styles.image2} source={Event2} />
                            </View>
                            <View style={styles.view2}>
                                <Text style={styles.title}>Spartan Virtual Marathon</Text>
                                <Text style={styles.venue}>Anywhere</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainer1: {
        padding: 20,
    },
    rowContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    contentContainer2: {
        marginTop: -30,
    },
    scrollview: {
        height: 226,
        marginTop: 20,
    },
    cardView: {
        height: 225,
        width: 250,
        marginLeft: 40,
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
    welcome: {
        fontSize: 35,
        fontWeight: 'bold',
    },
    name: {
        flex: 1,
        fontSize: 35,
        fontWeight: 'bold',
        color: '#8352F2',
    },
    image: {
        width: 60,
        height: 60
    },
    image2: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    view1: {
        flex: 2,
    },
    view2: {
        flex: 1,
        paddingLeft: 20
    },
    event: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 18,
    },
    more: {
        color: '#8352F2',
    },
    title: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    venue: {
        flex: 1,
        fontSize: 18,
        color: 'grey',
    }
});