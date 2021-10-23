import React,{ Component } from "react";
import { View,Text,StyleSheet,Image,TextInput,Picker,TouchableOpacity,Button,Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import PickerModal from 'react-native-picker-modal-view';
import TimePicker from "react-native-24h-timepicker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';

export default class editEventCalendarScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            eventName:"",
            //for display use
            eventTime:"0000",
            selectedHour:"0",
            selectedMin:"00",
            //converted to int
            convertedTime:"",
            //default value (empty option)
            remindTime:{"Name":"Add new notifications"},
            remindHour:1,
            remindDay:0,
            remindMinute:0,
            allDay:"ON",
            userID:"",
            id:props.route.params.id,
            // id:5,
            
            date:"",
            //remindtime will be data selected
            data:[{
                "Name": "15 minutes before",
                "Value": "15 minutes before",
            },
            {
                "Name": "30 minutes before",
                "Value": "30 minutes before", 
            },
            {
                "Name": "45 minutes before",
                "Value": "45 minutes before",
            },
            {
                "Name": "1 hours before",
                "Value": "1 hours before", 
            },
            {
                "Name": "2 hours before",
                "Value": "2 hours before", 
            },
            {
                "Name": "3 hours before",
                "Value": "3 hours before", 
            },
            {
                "Name": "4 hours before",
                "Value": "4 hours before", 
            },
            ],
        };

        const getData = async () => {
            //using localhost on IOS and using 10.0.2.2 on Android
            const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
            const IP = 'https://socialrunningapp.herokuapp.com';

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

            fetch(IP + '/api/calendar/'+this.state.id, {
                method:"GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log('Successfully get user calendar data')
                console.log(data)
                changeToTwoTimeDecimal=(time)=>{
                    if(time.length==1){
                        return "0"+time;
                    }
                    else{
                        return time;
                    }
                };
                const hourStart=changeToTwoTimeDecimal(parseInt(data.time/60).toString());
                const minStart=changeToTwoTimeDecimal((data.time%60).toString());
                this.setState({
                    loadedData: data,
                    eventName:data.title,
                    selectedHour:hourStart,
                    selectedMin:minStart,
                    eventTime:hourStart+minStart,
                    date:data.date,
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }

        getData();
    }

    toggle=()=>{
        if(this.state.allDay=="ON"){
            this.setState({ allDay: "OFF" });
        }
        if(this.state.allDay=="OFF"){
            this.setState({ allDay: "ON" });
        }
        const data = {
            userID: this.state.userID,
            time: this.state.eventTime,
            title: this.state.eventName,
            date: this.state.date,
        };
        console.log(data);
    };

    select=(selected)=>{
        this.setState({ remindTime: selected });
        return selected;
    };

    onClosed=()=>{
        console.log('back key pressed');
    };

    back=()=>{
        console.log('back key pressed');
    };

    testing=()=>{
        console.log(this.state.remindTime);
    };

    confirmDelete=()=>{
        Alert.alert(
            "Confirm delete",
            "The delete cannot be undone",
            [
                { text: "Ok", onPress: () => this.delete() },
                { text: "Cancel", style: "cancel"},
            ]
        );
    };

    delete=()=>{
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        const IP = 'https://socialrunningapp.herokuapp.com';

        fetch(IP + '/api/calendar/'+this.state.id, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                //success
                console.log(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        this.props.navigation.dispatch(StackActions.pop());

        this.props.navigation.dispatch(StackActions.replace('calendarScreen'));
    };
    save=()=>{
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        const IP = 'https://socialrunningapp.herokuapp.com';

        const convertedTime=(parseInt(this.state.selectedHour)*60)+parseInt(this.state.selectedMin);
        const data = {
            userID: this.state.userID,
            time: convertedTime,
            title: this.state.eventName,
            date: this.state.date,
        };
        
        fetch(IP + '/api/calendar/'+this.state.id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                //success
                console.log(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        this.props.navigation.dispatch(StackActions.pop());

        this.props.navigation.dispatch(StackActions.replace('calendarScreen'));
    }
    
    onCancel() {
        this.TimePicker.close();
    }
    
    onConfirm(hour, minute) {
        changeToTwoTimeDecimal=(time)=>{
            if(time.length==1){
                return "0"+time;
            }
            else{
                return time;
            }
        };
        const convertedTime=(parseInt(hour)*60)+parseInt(minute);
        const convertedHour=changeToTwoTimeDecimal(hour);
        this.setState({ 
            eventTime:convertedHour+minute,
            convertedTime:convertedTime,
            selectedHour:hour,
            selectedMin:minute,
        });
        this.TimePicker.close();
    }
    
    render(){
        return(
            
            <View style={styles.container}>
                {/* <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{this.state.date}</Text>
                </View> */}
                {/* first row */}
                <View style={styles.row}>
                    <View style={styles.iconContainer}>
                        <Icon onPress={this.testing} name={"calendar"} size={30} color={"grey"} />
                    </View>
                    <View style={styles.infoContainer}>
                        <TextInput
                            style={styles.infoText}
                            placeholder = "Event Name"
                            onChangeText={(name) => this.setState({eventName:name})}
                            value = {this.state.eventName}
                        />
                    </View>
                </View> 
                
                {/* third row */}
                <View style={styles.rowLast}>
                    <View style={styles.iconContainer}>
                        <Icon onPress={this.testing} name={"clock-outline"} size={30} color={"grey"} />
                    </View>

                    <View style={styles.infoRow}>

                        <View style={styles.infoRowContainer}>
                            <View style={styles.infoContainerLeft}>
                                <Text>
                                    {this.state.date}
                                </Text>
                            </View>
                            <View style={styles.infoContainerRight1}>
                                
                                <TouchableOpacity onPress={() => this.TimePicker.open()}>
                                    <Text>
                                        {this.state.eventTime}
                                    </Text>
                                </TouchableOpacity>
                                
                                
                            </View>
                        </View>
                    </View>
                    
                </View> 
                <View style={styles.botBtnContainer}>
                    <TouchableOpacity  onPress={this.save}>
                        <View style={styles.botBtn}>
                            <Text style={styles.btnText}>
                                Save
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={this.confirmDelete}>
                        <View style={styles.botBtn2}>
                            <Text style={styles.btnText2}>
                                Delete
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TimePicker
                    ref={ref => {
                        this.TimePicker = ref;
                    }}
                    onCancel={() => this.onCancel()}
                    selectedHour={this.state.selectedHour}
                    selectedMinute={this.state.selectedMin}
                    onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
                    />
            </View>
            
        );
    }
}
export const styles=StyleSheet.create({
    container:{
        backgroundColor:"white",
        flex:1,
        padding:"10%",
    },
    row:{
        flexDirection:"row",
        marginBottom:"5%",
    },
    iconContainer:{
        flex:1,
    },
    rowLast:{
        flexDirection:"row",
    },
    infoContainer:{
        flex:9,
        marginLeft:"5%",
        justifyContent:"center",
    },
    infoRow:{
        flex:9,
        marginLeft:"5%",
        justifyContent:"center",
        
    },
    infoContainerLeft:{
        justifyContent:"center",
        alignSelf:"center",
        flex:9,
    },
    infoContainerRight:{
        justifyContent:"center",
        flex:2,
    },
    infoContainerRight1:{
        justifyContent:"center",
        flex:2,
        alignItems:"center",
    },
    infoText:{
        fontSize:15,
        borderBottomWidth:1,
        marginRight:"20%",
    },
    toggle:{
        backgroundColor:"#8352F2",
        borderRadius:15,
        alignItems:"center",
        paddingTop:"1%",
        paddingBottom:"1%",
        borderColor:"#8352F2",
        borderWidth:1
    },
    toggled:{
        backgroundColor:"white",
        borderRadius:15,
        alignItems:"center",
        paddingTop:"1%",
        paddingBottom:"1%",
        borderColor:"#8352F2",
        borderWidth:1,
    },
    toggleText:{
        color:"white",
    },
    toggledText:{
        color:"#8352F2",
    },
    infoRowContainer:{
        flexDirection:"row",
        
    },
    botBtnContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"flex-end",
        flexDirection:"row",
    },
    botBtn:{
        alignItems:"center",

        backgroundColor:"#8352F2",

        borderRadius:30,

        padding:"10%",

        margin:"2.5%",

    },
    btnText:{
        color:"white",
        fontSize:16,
    },
    botBtn2:{

        alignItems:"center",

        backgroundColor:"white",

        borderColor: '#8352F2',

        borderWidth: 1,

        borderRadius:30,

        padding:"10%",

        margin:"2.5%",

    },

    btnText2:{

        color:"#8352F2",

        fontSize:16,

    },
    dateContainer:{
        justifyContent:"center",
        alignItems:"center",
        
        paddingBottom:"10%",
    },
    dateText:{
        fontSize:25,
        fontWeight:"bold",
    },
});