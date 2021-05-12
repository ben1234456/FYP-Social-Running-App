import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Font from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

export default class App extends Component {
    state = {
        categoryPosition: '',
        activitySelected: '',
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.columnContainer}>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={this.state.activitySelected}
                            onValueChange={(itemValue) => this.setState({ activitySelected: itemValue })}>
                            
                            <Picker.Item label="All" value="All" color="#999999" />
                            <Picker.Item label="Running" value="Running" color='#999999' />
                            <Picker.Item label="Cycling" value="Cycling" color='#999999' />
                            <Picker.Item label="Hiking" value="Hiking" color='#999999' />
                        </Picker>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.activityTitle}>Total Activities: </Text>
                    <Text style={styles.activityTotal}>6</Text>
                </View>
                <TouchableOpacity>
                    <View style={styles.rowContainer}>
                        <Icon name="run" style={styles.icon} size={30} color={'#8352F2'} />
                        <View style={styles.activityInfo}>
                            <Text style={styles.activityDistance}>3.55 / 5 km</Text>
                            <Text style={styles.activityDuration}>00:40:00</Text>
                        </View>
                        <Text style={styles.date}>2021-03-03</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.rowContainer}>
                        <Font name="bicycle" style={styles.icon} size={30} color={'#8352F2'} />
                        <View style={styles.activityInfo}>
                            <Text style={styles.activityDistance}>6.34 / 7 km</Text>
                            <Text style={styles.activityDuration}>01:00:00</Text>
                        </View>
                        <Text style={styles.date}>2021-02-02</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.rowContainer}>
                        <Icon name="hiking" style={styles.icon} size={30} color={'#8352F2'} />
                        <View style={styles.activityInfo}>
                            <Text style={styles.activityDistance}>5.67 / 6 km</Text>
                            <Text style={styles.activityDuration}>01:10:00</Text>
                        </View>
                        <Text style={styles.date}>2021-01-01</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.rowContainer}>
                        <Icon name="run" style={styles.icon} size={30} color={'#8352F2'} />
                        <View style={styles.activityInfo}>
                            <Text style={styles.activityDistance}>3.55 / 5 km</Text>
                            <Text style={styles.activityDuration}>00:40:00</Text>
                        </View>
                        <Text style={styles.date}>2020-12-12</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.rowContainer}>
                        <Font name="bicycle" style={styles.icon} size={30} color={'#8352F2'} />
                        <View style={styles.activityInfo}>
                            <Text style={styles.activityDistance}>6.34 / 7 km</Text>
                            <Text style={styles.activityDuration}>01:00:00</Text>
                        </View>
                        <Text style={styles.date}>2021-11-11</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.rowContainer}>
                        <Icon name="hiking" style={styles.icon} size={30} color={'#8352F2'} />
                        <View style={styles.activityInfo}>
                            <Text style={styles.activityDistance}>5.67 / 6 km</Text>
                            <Text style={styles.activityDuration}>01:10:00</Text>
                        </View>
                        <Text style={styles.date}>2021-10-10</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    columnContainer: {
        marginTop: 30,
        flexDirection: 'column',
        alignItems: 'center'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 30,
        paddingLeft: 40,
        paddingRight: 40,
    },
    activityTotal: {
        color: '#8352F2',
        fontSize: 16,
    },
    date: {
        color: '#999999',
    },
    icon: { 
        flex: 0, 
        marginRight: 30 
    },
    activityInfo: {
        flex: 1,
    },
    activityDistance: {
        color: '#373737',
    },
    activityDuration: {
        color: '#808080',
    },
    activityTitle: {
        flex: 0,
        fontSize: 16,
    },
    picker: {
        backgroundColor: 'white',
        borderRadius: 30,
        width: '35%',

        //ios
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,

        //android
        elevation: 5,
    },
});