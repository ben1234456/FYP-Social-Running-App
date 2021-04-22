import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'native-base'
import Font from 'react-native-vector-icons/FontAwesome5';
import profileImage from '../images/avatar.jpg';

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer1}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.profile}>Profile</Text>
                        <Font style={styles.image} name="ticket-alt" size={25} color={'#8352F2'} />
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
                    <View style={styles.infoRow}>
                        <View style={styles.infoColumnTitle}>
                            <Text style={styles.profileTitle}>Name:</Text>
                        </View>
                        <View style={styles.infoColumnInfo}>
                            <Text style={styles.profileInfo}>Jun</Text>
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.infoColumnTitle}>
                            <Text style={styles.profileTitle}>Gender:</Text>
                        </View>
                        <View style={styles.infoColumnInfo}>
                            <Text style={styles.profileInfo}>Male</Text>
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.infoColumnTitle}>
                            <Text style={styles.profileTitle}>City:</Text>
                        </View>
                        <View style={styles.infoColumnInfo}>
                            <Text style={styles.profileInfo}>Kuching</Text>
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.infoColumnTitle}>
                            <Text style={styles.profileTitle}>Date of Birth:</Text>
                        </View>
                        <View style={styles.infoColumnInfo}>
                            <Text style={styles.profileInfo}>2000-07-15</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
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
        width: "80%",
        flex:1,
        borderRadius: 15,
        backgroundColor: 'white',
        margin:"10%",

        //ios
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,

        //android
        elevation: 5,
    },
});