import React,{ Component } from "react";
import { View,Text,StyleSheet,Image,TextInput,Picker,TouchableOpacity,Button, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import PickerModal from 'react-native-picker-modal-view';
import TimePicker from "react-native-24h-timepicker";
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class addEventCalendarScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            eventName:"",
            eventTime:"0000",
            selectedHour:"0",
            selectedMin:"00",
            convertedTime:"0",
            //default value (empty option)
            remindTime:{"Name":"Add new notifications"},
            remindHour:1,
            remindDay:0,
            remindMinute:0,
            allDay:"ON",
            userID:"",
            date:props.route.params.date,
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

        }

        getData();
    }

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

    validation = () =>{
        var empty = [];

        if (!(this.state.eventName)) {
            empty.push("title");
        }

        if (empty.length != 0) {

            console.log(empty[0]);

            var errormsg = "Your ";
            var i;

            for (i = 0; i < empty.length; i++) {
                if (i == empty.length - 1) {
                    errormsg += empty[i] + " ";
                }
                else {
                    errormsg += empty[i] + ", ";
                }
            }

            errormsg += "cannot be emtpy";

            Alert.alert(
                errormsg,
                '',
                [
                    { text: "Ok", onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        }

        else {

            return true;
        }
    }

    save=()=>{

        if (this.validation()){
            const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
            const IP = 'https://socialrunningapp.herokuapp.com';

            const data = {
                userID: this.state.userID,
                time: this.state.convertedTime,
                title: this.state.eventName,
                date: this.state.date,
            };
            
            fetch( IP + '/api/calendar', {
                method: 'POST',
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


            this.props.navigation.dispatch(StackActions.replace('calendarScreen'));
        }
        
        

        
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
                            <View style={styles.infoContainerRight}>
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
        height:"40%",
    },
    infoContainer:{
        flex:9,
        marginLeft:"5%",
        justifyContent:"center",
    },
    infoRow:{
        flex:9,
        marginLeft:"5%",
        
    },
    infoContainerLeft:{
        justifyContent:"center",
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
        marginBottom:"5%"
    },
    botBtnContainer:{
        justifyContent:"flex-end",
        flex:1,
    },
    botBtn:{
        alignItems:"center",
        backgroundColor:"#8352F2",
        borderRadius:30,
        padding:"5%",
    },
    btnText:{
        color:"white",
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