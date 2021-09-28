import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Picker, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Font from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id:"",   
            categoryPosition: '',
            categorySelected: '25 March - 01 April 2021',
            activityData:'',
            categoryPosition: '',
            activitySelected: '',
            activityData:'',
            activityNumber:0,
        };


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

            fetch( baseUrl + '/api/activity/all/users/' + this.state.user_id, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success');
                this.setState({
                    activityData:data,
                    activityNumber:data.length,
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }

        getData();
        
    }

    renderActivities = (data) => 
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
                    <Text style={styles.activityTotal}>{this.state.activityNumber}</Text>
                </View>

                {this.state.activityData.length!=0
                ?
                <View style={styles.scrollview}>
                    <FlatList 
                        data={this.state.activityData}
                        keyExtractor={item => item.id.toString()}
                        renderItem={item => this.renderActivities(item)}
                    /> 
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
    scrollview: {
        height: 240,
    },
    noEventView:{
        flex:1,
        paddingLeft:"10%",
        paddingRight:"10%",
        alignItems:"flex-start",
        justifyContent:"center",
        paddingTop:"10%",
    },

    noEventText:{
        fontSize:16,
    },
});