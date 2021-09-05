import React, { Component } from 'react';
import { View, Image, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Font from 'react-native-vector-icons/FontAwesome5'
import Ant from 'react-native-vector-icons/AntDesign'
import profileImage from '../images/avatar.jpg';
import moment from 'moment';
import { SearchBar } from 'react-native-elements'
import { Share } from 'react-native';

export default class BuddiesListScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [
                { id: '1', name: { "title": "Male", "first": "Alan", "last": "Walker" }, first: profileImage },
                { id: '2', name: { "title": "Male", "first": "Tom", "last": "Holland" }, first: profileImage },
                { id: '3', name: { "title": "Female", "first": "Billie", "last": "Elish" }, first: profileImage },
                { id: '4', name: { "title": "Male", "first": "John", "last": "Cena" }, first: profileImage },
            ],
        };
        this.arrayholder = [];
    }
    componentDidMount() {
        this.arrayholder = this.state.data
    }

    deleteUser(id) {
        const filteredData = this.state.data.filter(item => item.id !== id);
        this.setState({ data: filteredData });
        this.arrayholder = filteredData
    }

    delete(id) {
        Alert.alert(
            "Are you confirm to remove this user?",
            '',
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.deleteUser(id) }
            ]
        );
    };

    searchFilterFunction = text => {
        this.setState({
            value: text,
        });
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.name.title.toUpperCase()}   
          ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;

            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });

        this.setState({ data: newData });
    };

    share = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    render() {

        return (
            <View style={styles.container}>
                <SearchBar
                    placeholder='Search Here...'
                    platform='android'
                    containerStyle={{ backgroundColor: 'white' }}
                    lightTheme
                    round
                    onChangeText={text => this.searchFilterFunction(text)}
                    autoCorrect={false}
                    value={this.state.value}
                />
                {/* <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="always"
                    value={this.state.value}
                    onChangeText={text => this.searchFilterFunction(text)}
                    placeholder="Search"
                    style={{
                        borderRadius: 25,
                        borderColor: '#808080',
                        borderTopWidth: 1,
                        boderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderBottomWidth: 1,
                        backgroundColor: '#fff'
                    }}
                /> */}
                <FlatList
                    data={this.state.data}
                    keyExtractor={item => item.first}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('BuddiesProfileScreen')}>
                            <View style={styles.cardView}>
                                <View style={styles.proRow} >
                                    <View style={styles.proTitle}>
                                        <Image style={styles.proColumnName} source={item.first} />
                                    </View>
                                    <View style={{ marginLeft: 20, flex: 3 }}>
                                        <Text style={styles.title}>{`${item.name.first} ${item.name.last}`}</Text>
                                        <Text style={styles.date}>{`${item.name.title}`}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Font name='user-minus' size={20} color={'#808080'} onPress={() => this.delete(item.id)} />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
                <View style={{ flexDirection: 'column', alignItems: 'flex-end', margin: 40 }}>
                    <Ant size={40} name='pluscircle' style={{ color: '#8352F2' }} />
                </View>
                {/* <TouchableOpacity><Text onPress={this.share}>Share</Text></TouchableOpacity> */}
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    cardView: {
        marginVertical: 10,
        marginHorizontal: 20,
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
        alignItems: 'center'
    },
    proTitle: {
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 20,
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
        color: '#808080',
    },
});