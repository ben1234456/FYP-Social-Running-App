import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Picker, TouchableOpacity, FlatList, LogBox, YellowBox, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Progress from '../../images/progress.png';
import { ProgressBar } from 'react-native-paper'
import { Divider } from 'react-native-elements'

YellowBox.ignoreWarnings([""]);

export default class AdminReportScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                { no: 1, state: 'Sarawak', participant: 0 },
                { no: 2, state: 'Pahang', participant: 0 },
                { no: 3, state: 'Sabah', participant: 0 },
                { no: 4, state: 'Terengganu', participant: 0 },
                { no: 5, state: 'Kelantan', participant: 0 },
                { no: 6, state: 'Perak', participant: 0 },
                { no: 7, state: 'Selangor', participant: 0 },
                { no: 8, state: 'Perlis', participant: 0 },
                { no: 9, state: 'Johor', participant: 0 },
                { no: 10, state: 'Kedah', participant: 0 },
                { no: 11, state: 'Kuala Lumpur', participant: 0 },
                { no: 12, state: 'Negeri Sembilan', participant: 0 },
                { no: 13, state: 'Labuan', participant: 0 },
                { no: 14, state: 'Purtajaya', participant: 0 },
                { no: 15, state: 'Malacca', participant: 0 },
                { no: 16, state: 'Penang', participant: 0 },
            ],
            runningType: [
                { type: 'Running', icon: 'run', percent: 0.28 },
                { type: 'Walking', icon: 'walk', percent: 0.53 },
                { type: 'Cycling', icon: 'bicycle', percent: 0.12 },
                { type: 'Hiking', icon: 'hiking', percent: 0.76 },
            ],
            eventData:"",
            refresh:true,
        };


        const getData = async () => {
            try {
                const userJson = await AsyncStorage.getItem('@userJson')
                if (userJson !== null) {
                    const user = JSON.parse(userJson);
                    this.setState({
                        user_id: user.id,
                    });
                }

            } catch (e) {
                console.log(e);
            }
            
        };
        getData();
        
        

    }

    componentDidMount(){
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        const IP = 'https://socialrunningapp.herokuapp.com';

        fetch(IP + '/api/event/joined', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Successfully get event data')
            console.log(data)
            this.setState({
                eventData: data
            });
            for (let cityList of data) {
                for (let city of this.state.data) {
                    if(cityList.toLowerCase()==city.state.toLowerCase()){
                        city.participant+=1;
                        this.setState({ 
                            refresh: !this.state.refresh
                        })
                    }
                }
            }
            
        })
        .catch((error) => {
            console.error('Error:', error);
        });
            
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.activityContainer}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.statis}>Statistics</Text>
                    </View>
                    <Image style={styles.image} source={Progress} />
                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>Number of Participants Based on States</Text>
                    </View>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={item => item.first}
                        extraData={this.state.refresh}
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
                    <View style={styles.rowContainer}>
                        <Text style={{ flex: 1 }}></Text>
                        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('AdminParticipantScreen')}>
                            <Text style={{ color: '#8352F2' }}>View All</Text>
                        </TouchableOpacity> */}
                    </View>
                    {/* <Divider style={styles.divider} />

                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>Completion Rate</Text>
                    </View>
                    <FlatList
                        data={this.state.runningType}
                        keyExtractor={item => item.first}
                        renderItem={({ item }) => (
                            <View>
                                <View style={styles.rowContainer}>
                                    <Text style={{ fontSize: 18, color: '#808080' }}>{item.type} </Text>
                                    <Icon style={{ flex: 1, color: '#8352F2' }} size={25} name={item.icon} color='#808080' />
                                    <Text style={{ fontSize: 20, color: '#000' }}> {parseFloat((item.percent * 100).toFixed(3))} %</Text>
                                </View>
                                <View style={styles.contentContainer2}>
                                    <ProgressBar progress={item.percent} color='#8352F2' style={{ height: 10, borderRadius: 10, }} />
                                </View>
                            </View>
                        )}
                    /> */}
                </View>
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
        paddingBottom: 40
    },
    activityContainer: {
        marginTop: 30,
    },
    image: {
        width: Dimensions.get('window').width,
        height: 200,
        alignSelf: 'center',
        resizeMode: 'cover',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 20
    },
    statis: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#373737',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8352F2',
    },
    progressBar: {
        height: 20,
        flexDirection: "row",
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5
    },
    divider: {
        backgroundColor: '#373737',
    },
});