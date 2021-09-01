import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, Alert, Dimensions} from 'react-native';
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux';
import Event from '../images/event.png';
import Run from '../images/running.jpg';
//import { createAppContainer } from "react-navigation";

const window = Dimensions.get("window");

export default class adminEventDetails extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            // eventid: props.route.params.eventid,
            event_name:"",
            start_date:"",
            end_date:"",  
            registeration_start_date:"",   
            registeration_end_date:"",
            fee_5km:0,
            fee_10km:0,
            fee_21km:0,
            fee_42km:0,
        };

        // fetch('http://192.168.0.192:8000/api/events/' + this.state.eventid, {
        //         headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json'
        //         },
        //     })
        //     .then(response => response.json())
        //     .then(data => {
        //         this.setState({
        //             event_name: data.event_name,
        //             start_date: data.start,
        //             end_date: data.end,  
        //             registeration_start_date: data.registeration_start,   
        //             registeration_end_date: data.registeration_end,
        //             fee_5km: data.fee_5km,
        //             fee_10km: data.fee_10km,
        //             fee_21km: data.fee_21km,
        //             fee_42km: data.fee_42km,
        //         });
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
        
    }

    formatDateTime = (sDate,FormatType) => {
        var lDate = new Date(sDate)
    
        var month=new Array(12);
        month[0]="January";
        month[1]="February";
        month[2]="March";
        month[3]="April";
        month[4]="May";
        month[5]="June";
        month[6]="July";
        month[7]="August";
        month[8]="September";
        month[9]="October";
        month[10]="November";
        month[11]="December";
    
        var weekday=new Array(7);
        weekday[0]="Sunday";
        weekday[1]="Monday";
        weekday[2]="Tuesday";
        weekday[3]="Wednesday";
        weekday[4]="Thursday";
        weekday[5]="Friday";
        weekday[6]="Saturday";
    
        var hh = lDate.getHours() < 10 ? '0' + 
            lDate.getHours() : lDate.getHours();
        var mi = lDate.getMinutes() < 10 ? '0' + 
            lDate.getMinutes() : lDate.getMinutes();
        var ss = lDate.getSeconds() < 10 ? '0' + 
            lDate.getSeconds() : lDate.getSeconds();
    
        var d = lDate.getDate();
        var dd = d < 10 ? '0' + d : d;
        var yyyy = lDate.getFullYear();
        var mon = eval(lDate.getMonth()+1);
        var mm = (mon<10?'0'+mon:mon);
        var monthName=month[lDate.getMonth()];
        var weekdayName=weekday[lDate.getDay()];
    
        if(FormatType==1) {
           return mm+'/'+dd+'/'+yyyy+' '+hh+':'+mi;
        } else if(FormatType==2) {
           return weekdayName+', '+monthName+' '+ 
                dd +', ' + yyyy;
        } else if(FormatType==3) {
           return mm+'/'+dd+'/'+yyyy; 
        } else if(FormatType==4) {
           var dd1 = lDate.getDate();    
           return dd1+'-'+Left(monthName,3)+'-'+yyyy;    
        } else if(FormatType==5) {
            return mm+'/'+dd+'/'+yyyy+' '+hh+':'+mi+':'+ss;
        } else if(FormatType == 6) {
            return mon + '/' + d + '/' + yyyy + ' ' + 
                hh + ':' + mi + ':' + ss;
        } else if(FormatType == 7) {
            return  dd + '-' + monthName.substring(0,3) + 
                '-' + yyyy + ' ' + hh + ':' + mi + ':' + ss;
        }
    }

    // static getDerivedStateFromProps(props, state) {
        
    //     var start_Date = formatDateTime(state.start_date,1); 
    //     console.log(start_Date);

    
    //     return null;
    // }
    edit=()=>{
        this.props.navigation.navigate('editEventsScreen');
    };
    delete=()=>{};
    register = () =>{

        const data = {
            user_ID: String(this.state.user_ID),
        };

        fetch('http://192.168.0.192:8000/api/events', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
        })

        Alert.alert(
            'You have successfully signed-up for the event',
            '',
            [
              { text: "Ok", onPress: () => this.props.navigation.navigate('Coupon') }
            ]
        );   
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    
                    <View >
                        <View style={styles.top}>
                            <Image style={styles.image} source={Event} />           
                        </View>
                        <View>
                            <Text style={styles.title}>{this.state.event_name}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <View style={styles.infoColumnTitle}>
                                <Text style={styles.eventTitle}>Date</Text>
                            </View>
                            <View style={styles.infoColumnInfo}>
                                <Text style={styles.eventInfo}>{this.state.start_date} - {this.state.end_date} (GMT +8:00)</Text>
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
                                <Text style={styles.eventInfo}>RM{this.state.fee_5km} (5km)</Text>
                                <Text style={styles.eventInfo}>RM{this.state.fee_10km} (10km)</Text>
                                <Text style={styles.eventInfo}>RM{this.state.fee_21km} (21km)</Text>
                                <Text style={styles.eventInfo}>RM{this.state.fee_42km} (42km)</Text>
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
                                <Text style={styles.aboutText}>{this.state.start_date} (GMT +8:00)</Text>
                            </View>
                            <View style={styles.about}>
                                <Text style={styles.aboutHeading}>REGISTRATION END DATE</Text>
                                <Text style={styles.aboutText}>{this.state.end_date} (GMT +8:00)</Text>
                            </View>
                            <View style={styles.about}>
                                <Text style={styles.aboutHeading}>RUN SUBMISSION</Text>
                                <Text style={styles.aboutText}>Please kindly submit your result through this mobile application</Text>
                            </View>
                        </View>
                        
                    </View>

                </ScrollView>
                <View style={styles.btnContainer}>
                    <Button block style={styles.stickyBtn1} onPress={this.edit}>
                        <Text style={styles.btnText}>Edit</Text>
                    </Button>
                    <Button block style={styles.stickyBtn2} onPress={this.delete}>
                        <Text style={styles.btnText}>Delete</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    
    stickyBtn1:{
        flex:1,
        borderRadius: 30,
        margin:"1%",
        backgroundColor:'#8352F2',
    },
    stickyBtn2:{
        flex:1,
        borderRadius: 30,
        margin:"1%",
        backgroundColor:'#ff0000',
    },
    btnContainer:{
        flexDirection:"row",
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


