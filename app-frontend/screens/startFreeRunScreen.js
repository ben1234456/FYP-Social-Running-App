import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {  } from 'react-native-maps';
import { Dimensions } from 'react-native';
import { Button } from 'native-base'
import moment from 'moment';


export default class startFreeRunScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date:new Date(),
            hour:"00",
            minute:"00",
            second:"00",
            hourCount:0,
            minuteCount:0,
            secondCount:0,
            stopwatch:false,
            startPause:"START",
            
        };
    }
    
    startTimer=()=>{
        if(this.state.stopwatch==true){
            var currentTime=moment(new Date());
            var date=moment(this.state.date);
            const diff = currentTime.diff(date);
            const diffDuration = moment.duration(diff);
            var hour=this.state.hourCount+diffDuration.hours()
            var minute=this.state.minuteCount+diffDuration.minutes()
            var second=this.state.secondCount+diffDuration.seconds()
            this.setState({ hour: "0"+hour});
            this.setState({ minute: "0"+minute});
            this.setState({ second: "0"+second});
        }
    };
    toggle=()=>{
        if(this.state.stopwatch==true){
            this.setState({ stopwatch: false});
            this.setState({ startPause: "START"});
            var currentTime=moment(new Date());
            var date=moment(this.state.date);
            const diff = currentTime.diff(date);
            const diffDuration = moment.duration(diff);
            var hour=this.state.hourCount+diffDuration.hours()
            var minute=this.state.minuteCount+diffDuration.minutes()
            var second=this.state.secondCount+diffDuration.seconds()
            this.setState({ hourCount: hour});
            this.setState({ minuteCount: minute});
            this.setState({ secondCount: second});
        }
        else{
            this.setState({ stopwatch: true});
            this.setState({ date: new Date()});
            
            
            this.setState({ startPause: "PAUSE"});
        }
    };
    componentWillUnmount() {
        clearInterval(this.interval);
    };
    componentDidMount(){
        this.interval = setInterval(() => this.startTimer(), 1000);
    };

    render() {
        return (
            <View style={styles.container}>
                <MapView  style={styles.map}>
                   
                </MapView>
                <View style={styles.botInfo}>
                    <View style={styles.infoRow}>
                        <View style={styles.info}>
                            <Text style={styles.infoTitle}>Distance (km)</Text>
                            <Text style={styles.infoWord}>03.50</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.infoTitle}>Duration</Text>
                            <Text style={styles.infoWord}>{this.state.hour}:{this.state.minute}:{this.state.second}</Text>
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.info}>
                            <Text style={styles.infoTitle}>Avg. Speed (km/hr)</Text>
                            <Text style={styles.infoWord}>8.48</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.infoTitle}>Calories (cal)</Text>
                            <Text style={styles.infoWord}>40.54</Text>
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.info}>
                            <Button block style={styles.btn1} onPress={this.toggle}>
                                <Text style={styles.btnText1}>{this.state.startPause}</Text>
                            </Button>
                        </View>
                        <View style={styles.info}>
                            <Button block style={styles.btn2}>
                                <Text style={styles.btnText2}>STOP</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        );
        };
        }
        
        const styles = StyleSheet.create({
        container: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
        },
        
        map: {
        flex:6,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        },
        botInfo:{
        flex:4,
        justifyContent:"center",
        width:"100%",
        paddingLeft:"10%",
        paddingRight:"10%",
        paddingTop:"5%",
        paddingBottom:"5%",
        backgroundColor:"#ffffff",
        },
        infoRow:{
        flexDirection:"row",
        marginTop:"5%",
        marginBottom:"5%",
        },  
        info:{
        flex:1,
        },
        infoWord:{
        fontWeight:"bold",
        fontSize:20,
        },
        btn1:{
        borderWidth:1,
        borderRadius:30,
        marginLeft:"20%",
        marginRight:"10%",
        backgroundColor:"#ffffff",
        borderColor:"#8100e3",
        },
        btn2:{
        borderWidth:1,
        borderColor:"#8100e3",
        borderRadius:30,
        marginRight:"20%",
        marginLeft:"10%",
        backgroundColor:"#8100e3",
        },
        btnText1:{
        fontSize:15,
        color:"#8100e3",
        },
        btnText2:{
        fontSize:15,
        color:"#ffffff",
        },
        });