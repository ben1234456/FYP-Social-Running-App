import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Picker, TouchableOpacity, FlatList, LogBox, YellowBox, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AdminParticipantScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                { no: 1, state: 'Sarawak', participant: 2000 },
                { no: 2, state: 'Pahang', participant: 1820 },
                { no: 3, state: 'Sabah', participant: 1050 },
                { no: 4, state: 'Terengganu', participant: 600 },
                { no: 5, state: 'Kelantan', participant: 587 },
                { no: 6, state: 'Perak', participant: 540 },
                { no: 7, state: 'Selangor', participant: 453 },
                { no: 8, state: 'Perlis', participant: 356 },
                { no: 9, state: 'Johor', participant: 329 },
                { no: 10, state: 'Kedah', participant: 291 },
                { no: 11, state: 'Kuala Lumpur', participant: 231 },
                { no: 12, state: 'Negeri Sembilan', participant: 124 },
                { no: 13, state: 'Labuan', participant: 91 },
                { no: 14, state: 'Putrajaya', participant: 74 },
                { no: 15, state: 'Malacca', participant: 21 },
                { no: 16, state: 'Penang', participant: 0 },
            ],
        };
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Number of Participants Based on States</Text>
                </View>
                <FlatList
                    data={this.state.data}
                    keyExtractor={item => item.first}
                    renderItem={({ item }) => (
                        <View>
                            <View style={styles.rowContainer}>
                                <Text style={{ fontSize: 18, color: '#808080' }}>{item.no}. </Text>
                                <Text style={{ flex: 1, fontSize: 18, color: '#373737' }}>{item.state}</Text>
                                <Text style={{ fontSize: 18, color: '#808080' }}>{item.participant}</Text>
                            </View>
                        </View>
                    )}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainer: {
        padding: 40,
    },
    contentContainer2: {
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 20
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8352F2',
    },
});