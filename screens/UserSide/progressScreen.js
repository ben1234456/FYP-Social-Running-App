import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Picker, TouchableOpacity, FlatList, LogBox,YellowBox } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Font from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

YellowBox.ignoreWarnings([""]);

export default class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            user_id:"",   
            categoryPosition: '',
            categorySelected: '25 March - 01 April 2021',
            activityData:'',
            spinner:false,
            totalDuration: ' ',
            totalDistance: ' ',
            averagePace: 0,
        };
      
    }

    componentDidMount(){
        const getData = async () => {

            try {
                const userJson = await AsyncStorage.getItem('@userJson')
                if(userJson !== null) {
                    const user = JSON.parse(userJson);
                    this.setState({
                        user_id:user.id,
                    });
                }
            } catch(e) {
                console.log(e);
            }

        //using localhost on IOS and using 10.0.2.2 on Android
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        const IP = 'https://socialrunningapp.herokuapp.com';

        //change spinner to visible
        this.setState({spinner: true});
        fetch(IP + '/api/activity/users/' + this.state.user_id, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Successfully get activity data')
            console.log(data)
            this.setState({
                activityData:data
            });
            //change spinner to invisible
            this.setState({spinner: false});
        })
        .catch((error) => {
            console.error('Error:', error);
            //change spinner to invisible
            this.setState({spinner: false});
        });

        //get summary 
        fetch(IP + '/api/activities/all/' + this.state.user_id, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                totalDistance: data.total_distance,
                totalDuration: data.total_duration,
                averagePace: data.average_pace
            });
            //change spinner to invisible
            this.setState({spinner: false});
        })
        .catch((error) => {
            console.error('Error:', error);
            //change spinner to invisible
            this.setState({spinner: false});
        });

        }

        getData();

        this.focusListener = this.props.navigation.addListener('focus', () => {
            getData();
            //Put your Data loading function here instead of my this.loadData()
        });
    }

    renderActivities = (data) => 
    <TouchableOpacity>
        <View style={styles.rowContainer}>
            <Icon name={ (data.item.activity_type == "walking") ? "walk" : 
                (data.item.activity_type == "running") ? "run" :
                (data.item.activity_type == "hiking") ? "hiking" : 
                (data.item.activity_type == "cycling") ? "bicycle" : ""
                }  
                style={styles.icon} size={30} color={'#8352F2'} />
            <View style={styles.activityInfo}>
                <Text style={styles.activityDistance}>{data.item.total_distance} km</Text>
                <Text style={styles.activityDuration}>{data.item.total_duration}</Text>
            </View>
            <Text style={styles.date}>{(data.item.created_at).slice(0,10)}</Text>
        </View>
    </TouchableOpacity>

    render() {
        const screenWidth = 330;
        const data = {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [
                {
                    data: [6.75, 8.45, 10.3, 16.2, 9.63, 5.5],
                    color: (opacity = 1) => `rgba(131, 82, 242, ${opacity})`, // optional
                    strokeWidth: 2 // optional
                }
            ],
            legend: ["Distance (km)"] // optional
        };
        const chartConfig = {
            backgroundGradientFrom: "#FFFFFF",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#FFFFFF",
            color: (opacity = 1) => `rgba(55, 55, 55, ${opacity})`,
            barPercentage: 0.5,
        };
        return (
            
            <ScrollView style={styles.container}>
                    <Spinner visible={this.state.spinner} textContent={'Loading...'}/>
                    <View style={styles.rowContainer}>
                        <Text style={styles.activityTitle}>Recent Activities </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('activityHistoryScreen')}>
                            <Text style={styles.more}>{'View More >'}</Text>
                        </TouchableOpacity>
                    </View>

                    {this.state.activityData.length!=0
                    ?
                    <View style={styles.dataContainer}>
                        <FlatList 
                        data={this.state.activityData}
                        keyExtractor={item => item.id.toString()}
                        renderItem={item => this.renderActivities(item)}
                        /> 
                        
                        <Text>Summary</Text> 
                        <Text>Total Distance: {this.state.totalDistance} KM</Text>
                        <Text>Total Duration: {this.state.totalDuration}</Text>
                        <Text>Average pace: {this.state.averagePace}</Text>
                    </View>
                    :
                    <View style={styles.noEventView}>
                        <Text style={styles.noEventText}>Looks like you don't have any activities here! Try to track yourself in the "Activity" tab</Text>
                    </View>
                    }
                    
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding:"5%",
        paddingTop:"15%",
    },
    contentContainer: {
        padding: 40,
    },
    dataContainer:{
        marginTop:"5%",
    },
    contentContainer2: {
        paddingLeft: 40,
        paddingTop: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:"5%",
    },
    rowContainer2: {
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowContainer3: {
        paddingTop: 20,
    },
    more: {
        color: '#8352F2',
        fontSize: 16,
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
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#373737',
    },
    statis: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#373737',
    },
    picker: {
        backgroundColor: 'white',
        borderRadius: 30,
        flex: 1,

        //ios
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,

        //android
        elevation: 5,
    },
    categoryDisplay: {
        color: '#8352F2',
    },
    distance: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#8352F2',
    },
    sections: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#8352F2',
        marginTop: 30,
    },
    disValue: {
        color: '#373737',
        fontSize: 25,
        fontWeight: 'bold',
    },
    chart: {
        marginLeft: 20,
    },
    divider: {
        backgroundColor: 'black',
        marginTop: 60,
    },
    date: {
        color: '#999999',
    },
    noEventText:{
        flex:1,
        color:"#808080",
        marginTop:"5%",
    },
    noEventView:{
        padding:"5%",
    }
});
