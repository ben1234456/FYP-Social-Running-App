import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux';
import Font from 'react-native-vector-icons/FontAwesome5';
import profileImage from '../images/avatar.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id:"",
            name:"",
            gender:"",  
            city:"",   
            dob:"",
        };

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@userid')
            if(value !== null) {
                this.setState({ id: value });
                const url = "http://192.168.0.192:8000/api/users/";
                const fetchlink = url + this.state.id;
                fetch(fetchlink)
                    .then(response => response.json())
                    .then(data => {
                        this.setState({name:data.first_name});
                        this.setState({gender:data.gender});
                        this.setState({city:data.city});
                        this.setState({dob:data.dob});
                    });   
            }

        } catch(e) {
            console.log(e);
        }
    }

    getData();
    
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer1}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.profile}>Profile</Text>
                        <TouchableOpacity  onPress={() => this.props.navigation.navigate('Coupon')}>
                            <Font style={styles.image} name="ticket-alt" size={25} color={'#8352F2'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.rowContainer2}>
                    <Image style={styles.proImage} source={profileImage} />
                </View>
                <View style={styles.rowContainer2}>
                    <Button block style={styles.editProfile}>
                        <Text style={styles.btnText}>Edit Profile</Text>
                    </Button>
                </View>
                <View style={styles.cardView}>
                    <View style={styles.proRow}>
                        <View style={styles.proTitle}>
                            <Text style={styles.proColumnName}>Name:</Text>
                        </View>
                        <View style={styles.proInfo}>
                            <Text style={styles.proDetails}>{this.state.name}</Text>
                        </View>
                    </View>

                    <View style={styles.proRow}>
                        <View style={styles.proTitle}>
                            <Text style={styles.proColumnName}>Gender:</Text>
                        </View>

                        <View style={styles.proInfo}>
                            <Text style={styles.proDetails}>{this.state.gender}</Text>
                        </View>
                    </View>

                    <View style={styles.proRow}>
                        <View style={styles.proTitle}>
                            <Text style={styles.proColumnName}>State:</Text>
                        </View>

                        <View style={styles.proInfo}>
                            <Text style={styles.proDetails}>{this.state.city}</Text>
                        </View>
                    </View>

                    <View style={styles.proRow}>
                        <View style={styles.proTitle}>
                            <Text style={styles.proColumnName}>Date of Birth:</Text>
                        </View>

                        <View style={styles.proInfo}>
                            <Text style={styles.proDetails}>{this.state.dob}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    infoColumnTitle:{
        flex:2,
    },
    infoColumnInfo:{
        flex:1,
    },
    infoRow:{
        flexDirection:"row",
        marginLeft:"10%",
        marginRight:"10%",
        marginTop:"5%",
        marginBottom:"5%",
    },
    profileTitle:{
        textAlign:"left",
        fontSize:15,
        fontWeight:"bold",
    },
    profileInfo:{
        textAlign:"right",
        fontSize:15,
        color:"#8100e3",
    },
    contentContainer1: {
        padding: 20,
        marginTop: 30,
    },

    rowContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },

    rowContainer2: {
        flex: 0,
        flexDirection: 'row',   
        justifyContent: 'center',  
        alignItems: 'center',
    },

    profile: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 25,
        flex: 1,
    },

    proImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },

    editProfile: {
        display: 'flex',
        backgroundColor: '#8352F2',
        borderRadius: 30,
        marginTop: 50,
    },

    btnText: {
        fontSize: 16,
        color: 'white',
        padding: 20,
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
    }
});