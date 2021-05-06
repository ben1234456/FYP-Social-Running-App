import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux';
import Event from '../images/event.png';
import Run from '../images/running.jpg';
//import { createAppContainer } from "react-navigation";

const window = Dimensions.get("window");

export default class eventDetails extends Component {
       
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    
                    <View >
                        <View style={styles.top}>
                            <Image style={styles.image} source={Event} />           
                        </View>
                        <View>
                            <Text style={styles.title}>Virtual Half Marathon</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <View style={styles.infoColumnTitle}>
                                <Text style={styles.eventTitle}>Date</Text>
                            </View>
                            <View style={styles.infoColumnInfo}>
                                <Text style={styles.eventInfo}>7 July 2021 (Wednesday) | 12.00 am - 12 August 2021 (Thursday) | 11.59 pm (GMT +8:00)</Text>
                            </View>
                        </View>
                        <View style={styles.infoRow}>
                            <View style={styles.infoColumnTitle}>
                                <Text style={styles.eventTitle}>Venue</Text>
                            </View>
                            <View style={styles.infoColumnInfo}>
                                <Text style={styles.eventInfo}>Anywhere</Text>
                            </View>
                        </View>
                        <View style={styles.infoRow}>
                            <View style={styles.infoColumnTitle}>
                                <Text style={styles.eventTitle}>Price</Text>
                            </View>
                            <View style={styles.infoColumnInfo}>
                                <Text style={styles.eventInfo}>RM23.00 (5km)</Text>
                                <Text style={styles.eventInfo}>RM30.00 (10km)</Text>
                                <Text style={styles.eventInfo}>RM35.00 (21km)</Text>
                                <Text style={styles.eventInfo}>RM40.00 (42km)</Text>
                            </View>
                        </View>
                        <View style={styles.infoRow}>
                            <View style={styles.infoColumnTitle}>
                                <Text style={styles.eventTitle}>Reward</Text>
                            </View>
                            <View style={styles.infoColumnInfo}>
                                <Text style={styles.eventInfo}>Finished Medal</Text>
                            </View>
                        </View>
                        <View style={styles.about}>
                            
                            <View style={styles.about}>
                                <Text style={styles.aboutHeading}>About</Text>
                                <Text style={styles.aboutText}>Come join our Virtual Half Marathon!</Text>
                            </View>
                            <View style={styles.about}>
                                <Text style={styles.aboutText}>The entitlements would be mailed to your house:</Text>
                            </View>
                            <View style={styles.about}>
                                <Text style={styles.aboutText}>1.Finisher Medal</Text>
                                <Text style={styles.aboutText}>2.Dri-FIT Shirt</Text>
                                <Text style={styles.aboutText}>3.Finished Tee (42km only)</Text>
                            </View>
                            <View style={styles.about}>
                                <Text style={styles.aboutText}>Please be noted that the postage is within Malaysia only and entitlement will be posted from 12 August 2021.</Text>
                            </View>
                            <View style={styles.about}>    
                                <Text style={styles.aboutHeading}>REGISTRATION START DATE</Text>
                                <Text style={styles.aboutText}>7 July 2021 11.59pm (GMT +8:00)</Text>
                            </View>
                            <View style={styles.about}>
                                <Text style={styles.aboutHeading}>REGISTRATION END DATE</Text>
                                <Text style={styles.aboutText}>12 August 2021 11.59pm (GMT +8:00)</Text>
                            </View>
                            <View style={styles.about}>
                                <Text style={styles.aboutHeading}>RUN SUBMISSION</Text>
                                <Text style={styles.aboutText}>Please kindly submit your result through this mobile application</Text>
                            </View>
                        </View>
                        
                    </View>
                    <View style={styles.spacing}>

                    </View>
                </ScrollView>
                <Button block style={styles.stickyBtn}>
                    <Text style={styles.btnText}>Sign Up Now</Text>
                </Button>
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    spacing:{
        margin:"10%",
    },
    stickyBtn:{
        alignSelf:"center",
        borderRadius: 30,
        width:"40%",
        position:"absolute",
        bottom:15,
        backgroundColor:'#8352F2',
    },
    btnText:{
        color:"#ffffff",
    },
    image: {
        width: "100%",
        height: 277,
    },
    infoColumnTitle:{
        flex:1,
    },
    infoColumnInfo:{
        flex:2,
    },
    infoRow:{
        flexDirection:"row",
        margin:"10%",
    },
    eventTitle:{
        textAlign:"left",
        fontSize:20,
    },
    eventInfo:{
        textAlign:"right",
        fontSize:15,
        color:'#8352F2',
    },
    bottom: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        lineHeight: 40,
        textAlign: 'center',
        color: '#373737',
        margin:"5%",
        fontWeight:"bold",
    },
    about:{
        flex:1,
        margin:"5%",
    },
    aboutHeading:{
        fontWeight:"bold",
        fontSize:20,
        color:"#373737",
    },
    aboutText:{
        fontSize:15,
        color:"#373737",
    },
});


