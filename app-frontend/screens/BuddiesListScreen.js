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
import Logo from '../images/logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class BuddiesListScreen extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            userID:"",
            data: "",
            userList:"",
            searchWord:"",
            testing:0,
        };
        const getData = async () => {

            //using localhost on IOS and using 10.0.2.2 on Android
            const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';

            try {
                const userJson = await AsyncStorage.getItem('@userJson')
                if (userJson !== null) {
                    const user = JSON.parse(userJson);
                    this.setState({
                        userID: user.id,
                    });
                }

            } catch (e) {
                console.log(e);
            }
            fetch(baseUrl + '/api/buddy/buddyList/'+this.state.userID, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log('Successfully get buddylist data')
                console.log(data)
                this.setState({
                    userList: data
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            
            
        }
        
        getData();
        this.arrayholder = [];
    }
    componentDidMount() {
        this.arrayholder = this.state.data;

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
    renderItemComponent = (data) =>        
        <TouchableOpacity onPress={() => this.props.navigation.navigate('BuddiesProfileScreen', { 'userID': data.item.id ,"view":"false"})}>
            <View style={styles.cardView}>
                <View style={styles.proRow} >
                    <View style={styles.proTitle}>
                        <Image style={styles.proColumnName} source={Logo} />
                    </View>
                    <View style={{ marginLeft: 20, flex: 3 }}>
                        <Text style={styles.title}>{data.item.first_name}</Text>
                        <Text style={styles.date}>{data.item.gender}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Font name='user-minus' size={20} color={'#808080'} onPress={() => this.delete(item.id)} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
       
        
    
        
    search=(value)=>{
        console.log(this.state.userList.length);
        this.setState({searchWord:value});
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        //get 10 user
        fetch(baseUrl + '/api/buddy/buddyList/' + this.state.userID +"/"+ value, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Successfully get user list data')
            console.log(data)
            this.setState({
                userList: data
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
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
                    onChangeText={this.search}
                    autoCorrect={false}
                    value={this.state.searchWord}
                />
                {this.state.userList.length!=0
                ?
                <FlatList horizontal={false}
                    data={this.state.userList}
                    keyExtractor={item => item.id.toString()}
                    renderItem={item => this.renderItemComponent(item)}
                />  
                :
                <View style={styles.noBuddyView}>
                    <Text style={styles.noBuddyText}>No Buddy Found</Text>
                </View>
                }
                
                
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', margin: 40 }}>
                    <Icon onPress={() => this.props.navigation.navigate('BuddiesRequestList')} size={40} name='person-add' style={{ color: '#8352F2', flex:1 }} />
                    <Ant onPress={() => this.props.navigation.navigate('addSearchUserScreen')} size={40} name='pluscircle' style={{ color: '#8352F2' }} />
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
    noBuddyView:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        paddingTop:"10%",
    },
    noBuddyText:{
        fontSize:16,
    },
});