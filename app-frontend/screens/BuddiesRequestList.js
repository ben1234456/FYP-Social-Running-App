import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { Button } from 'native-base'
import profileImage from '../images/avatar.jpg';

export default class BuddiesRequestList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [
                { id: '1', name: { "gender": "Male", "first": "Alan", "last": "Walker" }, first: profileImage },
                { id: '2', name: { "gender": "Male", "first": "Tom", "last": "Holland" }, first: profileImage },
                { id: '3', name: { "gender": "Female", "first": "Billie", "last": "Elish" }, first: profileImage },
                { id: '4', name: { "gender": "Male", "first": "John", "last": "Cena" }, first: profileImage }
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.request}>
                    <Text>Buddies Request: </Text>
                    <Text style={styles.requestNo}>4</Text>
                </View>
                <FlatList
                    data={this.state.data}
                    keyExtractor={item => item.first}
                    renderItem={({ item }) => (

                        <TouchableOpacity>
                            <View style={styles.cardView}>
                                <View style={styles.proRow}>
                                    <View style={styles.proTitle}>
                                        <Image style={styles.proColumnName} source={item.first} />
                                    </View>
                                    <View style={{ marginLeft: 20, flex: 3 }}>
                                        <Text style={styles.title}>{`${item.name.first} ${item.name.last}`}</Text>
                                        <Text style={styles.date}>{`${item.name.gender}`}</Text>
                                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                            <Button style={styles.acceptBtn}>
                                                <Text style={styles.btnText}>ACCEPT</Text>
                                            </Button>
                                            <Button style={styles.deleteBtn} onPress={() => this.delete(item.id)}>
                                                <Text style={styles.btnText2}>DELETE</Text>
                                            </Button>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
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
    acceptBtn: {
        backgroundColor: '#8352F2',
        borderRadius: 10,
        height: 25,
    },
    btnText: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        padding: 10,
    },
    deleteBtn: {
        marginLeft: 15,
        backgroundColor: '#ECECEC',
        borderRadius: 10,
        height: 25,
    },
    btnText2: {
        fontSize: 14,
        color: '#373737',
        textAlign: 'center',
        padding: 10,
    },
    request: {
        flexDirection: 'row', 
        marginVertical: 10,
        marginHorizontal: 20,
    },
    requestNo: {
        color: '#8352F2'
    }
});