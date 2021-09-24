import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert ,FlatList} from 'react-native';
import profileImage from '../images/avatar.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class buddyRequestDetailScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //selected user id
            buddyID: props.route.params.userID,
            userID:"",
            user:"",
            id: "",
            name: "",
            gender: "",
            city: "",
            dob: "",
        };

        //get data from async storage
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
            fetch(baseUrl + '/api/users/' + this.state.buddyID, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log('Successfully get user data')
                console.log(data)
                this.setState({
                    user: data
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            fetch(baseUrl + '/api/buddyrequest/' + this.state.buddyID +'/'+this.state.userID, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log('Successfully get buddy req id')
                console.log(data)
                this.setState({
                    id: data.id
                });
                
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }

        getData();
        
    }
    decline=()=>{
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        console.log("testing"+this.state.id);
        fetch(baseUrl + '/api/buddyrequest/list/' + this.state.id, {
                method:"DELETE",
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
    
            })
            .then(response => response.json())
            .then(data => {
                console.log('Successfully delete buddy request')
                console.log(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            this.props.navigation.navigate('BuddiesRequestList');
                
                

    }
    accept=() =>{
        //using localhost on IOS and using 10.0.2.2 on Android
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';

        
        const data = {
            userID:this.state.userID,
            buddyID:this.state.buddyID,
        };

        fetch( baseUrl + '/api/buddy', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(response =>  response.json())
        
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });  
        this.decline();
        
        
    }
    renderItemComponent = (data) =>
        
    <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Image style={styles.proImage} source={profileImage} />
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <View style={styles.followerRow}>
                        <View style={styles.followPosition}>
                            <Text style={styles.noOfFollower}>0</Text>
                            <Text style={styles.follow}>FOLLOWERS</Text>
                        </View>
                        <View style={styles.followPosition}>
                            <Text style={styles.noOfFollower}>0</Text>
                            <Text style={styles.follow}>FOLLOWING</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.cardView}>
                    <View style={styles.proRow}>
                        <View style={styles.proTitle}>
                            <Text style={styles.proColumnName}>Name:</Text>
                        </View>
                        <View style={styles.proInfo}>
                            <Text style={styles.proDetails}>{data.item.first_name}</Text>
                        </View>
                    </View>

                    <View style={styles.proRow}>
                        <View style={styles.proTitle}>
                            <Text style={styles.proColumnName}>Gender:</Text>
                        </View>

                        <View style={styles.proInfo}>
                            <Text style={styles.proDetails}>{data.item.gender}</Text>
                        </View>
                    </View>

                    <View style={styles.proRow}>
                        <View style={styles.proTitle}>
                            <Text style={styles.proColumnName}>State:</Text>
                        </View>

                        <View style={styles.proInfo}>
                            <Text style={styles.proDetails}>{data.item.city}</Text>
                        </View>
                    </View>

                    <View style={styles.proRow}>
                        <View style={styles.proTitle}>
                            <Text style={styles.proColumnName}>Date of Birth:</Text>
                        </View>

                        <View style={styles.proInfo}>
                            <Text style={styles.proDetails}>{data.item.dob}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity onPress={this.accept}>
                        <View style={styles.btn} >
                            <Text style={styles.btnText}>Accept</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.decline}>
                        <View style={styles.btn} >
                            <Text style={styles.btnText}>Decline</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
    render() {
        return (
            <View style={styles.wholeContainer}> 

            
            <FlatList horizontal={false}
                data={this.state.user}
                keyExtractor={item => item.id.toString()}
                renderItem={item => this.renderItemComponent(item)}
            />  
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    rowContainer: {
        flex: 0,
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    proImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },

    cardView: {
        margin: 50,
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
    },
    proTitle: {
        flex: 1,
        marginVertical: 15,
        marginHorizontal: 20,
    },
    proInfo: {
        marginVertical: 15,
        marginHorizontal: 20
    },
    proColumnName: {
        fontWeight: 'bold',
        color: '#373737',
    },
    proDetails: {
        color: '#8352F2',
    },
    follow: {
        color: '#8352F2',
        textAlign: 'center'
    },
    followerRow: {
        flexDirection: "row",
        marginTop: 20,
    },
    followPosition: {
        flex: 1,
    },
    noOfFollower: { 
        textAlign: 'center' 
    },
    btnContainer:{
        flex:1,
        padding:"5%",
        
        flexDirection:"row",
        justifyContent:"center",
    },
    btn:{
        borderRadius:30,
        alignItems:"center",
        padding:"5%",
        flex:1,
        marginRight:"2.5%",
        marginLeft:"2.5%",
        paddingRight:"12.5%",
        paddingLeft:"12.5%",
        backgroundColor: '#8352F2',
    },
    btnText:{
        fontSize:16,
        color: 'white',
        textAlign: 'center',
    },
    wholeContainer:{
        flex:1,
        backgroundColor:"white",
    },
});