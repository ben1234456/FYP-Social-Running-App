import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TextInput, Text, ScrollView, StyleSheet, Alert, Picker} from 'react-native';
import { Button, Left } from 'native-base'

import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import addImage from '../images/addImage.png';
import * as ImagePicker from 'expo-image-picker';


export default class addEvent extends Component {
    constructor(props) {
        super(props);

        var today = new Date(),

        sampleDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        
        this.state = {  
            eventName: "",
            eventDate:"",
            regisDate:"",
            regisDueDate:"",
            regisFee:0,
            eventVenue:"",
            runSub:"",
            imageSource:addImage,
        }
    }
    chooseImage=async()=>{
        try{
          permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
        pickerResult = await ImagePicker.launchImageLibraryAsync();
          if (pickerResult.cancelled === true) {
            return;
          }
        if (pickerResult.uri !== null) {
          this.setState({ imageSource: {uri: pickerResult.uri }});
        }
        }
        catch(err){
          console.error(err);
        }
    }
    validation = () => {
        
        var empty=[];

        //check empty
        if (!(this.state.eventName)){
            empty.push("event name");
        }
        if (!(this.state.eventDate)){
            empty.push("event date");
        }
        if (!(this.state.regisDate)){
            empty.push("registration date");
        }
        if (!(this.state.regisDueDate)){
            empty.push("registration due date");
        }
        if (!(this.state.regisFee)){
            empty.push("registration fee");
        }
        if (!(this.state.eventVenue)){
            empty.push("event venue");
        }
        if (!(this.state.runSub)){
            empty.push("run submission");
        }

        if (empty.length != 0){
           
            console.log(empty[0]);

            var errormsg = "Your "; 
            var i;
            
            for (i = 0; i < empty.length; i++) {
                if (i == empty.length - 1){
                    errormsg += empty[i] + " ";
                }
                else{
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

        else{

            return true;
        }
    }

    create = () => {
        
        if (this.validation()){
            const data = {
                eventName: this.state.eventName,
                eventDate: this.state.eventDate,
                regisDate: this.state.regisDate,
                regisDueDate: this.state.regisDueDate,
                regisFee: this.state.regisFee,
                eventVenue: this.state.eventVenue,
                runSub: this.state.runSub,
            };
    
            
            fetch('http://192.168.0.192:8000/api/users', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
            // .then(response => response.json())
            // .then(data => {
            //     console.log('Success:',data);
            // })
            // .catch((error) => {
            //     console.error('Error:', error);
            // });  
            
        }

    }



    render() {
        return (
            
            <ScrollView style={styles.container}>
                <View style={(this.state.imageSource==addImage)?styles.selectPhotoTop:styles.selectedPhotoTop}>
                    <Text style={(this.state.imageSource==addImage)?styles.selectPhotoTopInfo:styles.selectedPhotoTopInfo}>Take / Choose a photo</Text>
                    <TouchableOpacity onPress={this.chooseImage} style={styles.cameraBack}>
                        <Image source={this.state.imageSource} style={(this.state.imageSource==addImage)?styles.camera:styles.selectedImage} />
                    </TouchableOpacity>
                    
                        
                </View>
                
                <View style={styles.contentContainer}>
                    
                    <View>
                        <View style={styles.input}>
                            <View style={styles.inputText}>
                            <TextInput
                                placeholder = "Title Name"
                                onChangeText={(name) => this.setState({eventName:name})}
                                value = {this.state.eventName}
                            />
                            </View>
                        </View>
                        
                        <View style={styles.infoRow}>
                            <View style={styles.infoColumnTitle}>
                                <Text style={styles.infoTitle}>Venue:</Text>
                            </View>
                            <View style={styles.infoColumnInfo}>
                                <View style={styles.inputWithTitle}>
                                    <View style={styles.inputText}>
                                        <TextInput
                                            placeholder = "Venue"
                                            onChangeText={(venue) => this.setState({eventVenue:venue})}
                                            value = {this.state.eventVenue}
                                        />
                                    </View>
                                </View>                         
                            </View>
                        </View>
                        <View style={styles.infoRow}>
                            <View style={styles.infoColumnTitle}>
                                <Text style={styles.infoTitle}>Price:</Text>
                            </View>
                            <View style={styles.infoColumnInfo}>
                                <View style={styles.inputWithTitle}>
                                    <View style={styles.inputText}>
                                        <TextInput 
                                            placeholder = "e.g. RMXXX"
                                            keyboardType = 'numeric'                                
                                            onChangeText={(fee) => this.setState({regisFee:fee})}
                                            value = {this.state.regisFee}
                                        />
                                    </View>
                                </View>                         
                            </View>
                        </View>
                        <View style={styles.infoRow}>
                            <View style={styles.infoColumnTitle}>
                                <Text style={styles.infoTitle}>Date:</Text>
                            </View>
                            <View style={styles.infoColumnInfo}>
                                <View style={styles.inputWithTitle}>
                                    <View style={styles.pickerLeftTitle}>
                                        <DatePicker style={styles.inputDateLeftTitle}
                                            placeholder="Date"
                                            date={this.state.sampleDate} 
                                            minDate={new Date()} 
                                            confirmBtnText="Confirm" 
                                            cancelBtnText="Cancel" 
                                            useNativeDriver='true' 
                                            format="YYYY-MM-DD" 
                                            customStyles={{
                                                dateIcon: { display: 'none' },
                                                dateInput: { borderWidth: 0 ,alignItems:"flex-start"},
                                            }} 
                                            onDateChange={(date) => { this.setState({ eventDate: date }) }} />
                                    </View>
                                </View>                         
                            </View>
                        </View>
                        <View style={styles.infoRow}>
                            <View style={styles.infoColumnTitle}>
                                <Text style={styles.infoTitleTwoRow}>Reward:</Text>
                            </View>
                            <View style={styles.infoColumnInfo}>
                                <View style={styles.sameRow}>
                                    <View>
                                        <TouchableOpacity onPress={this.selectFile}>
                                            <Text style={styles.choseFile}>Choose File</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={styles.fileStatus}>No file chosen</Text>
                                    </View>
                                </View>
                                <View style={styles.inputWithTitle}>
                                    <View style={styles.inputText}>
                                        <TextInput 
                                            placeholder = "Write the reward's name"
                                            onChangeText={(fee) => this.setState({regisFee:fee})}
                                            value = {this.state.regisFee}
                                        />
                                    </View>
                                </View>                         
                            </View>
                        </View>
                        <View>
                            <Text style={styles.botTitle}>ABOUT</Text>
                        </View>
                        <View style={styles.inputWithTitleTopBig}>
                            <View style={styles.inputText}>
                                <TextInput 
                                    placeholder = "Write your description here"
                                    onChangeText={(fee) => this.setState({regisFee:fee})}
                                    value = {this.state.regisFee}
                                />
                            </View>
                        </View>  
                        <View>
                            <Text style={styles.botTitle}>REGISTRATION START DATE</Text>
                        </View>
                        <View style={styles.pickerTitleTop}>
                            <DatePicker style={styles.inputDate}
                                placeholder="Choose registration date"
                                date={this.state.sampleDate} 
                                minDate={new Date()} 
                                confirmBtnText="Confirm" 
                                cancelBtnText="Cancel" 
                                useNativeDriver='true' 
                                format="YYYY-MM-DD" 
                                customStyles={{
                                    dateIcon: { display: 'none' },
                                    dateInput: { borderWidth: 0 ,alignItems:"flex-start"},
                                }} 
                                onDateChange={(date) => { this.setState({ regisDate: date }) }} />
                        </View>
                        
                        <View>
                            <Text style={styles.botTitle}>REGISTRATION END DATE</Text>
                        </View>
                        <View style={styles.pickerTitleTop}>
                            <DatePicker style={styles.inputDate}
                                placeholder="Choose registration due date"
                                date={this.state.sampleDate} 
                                minDate={new Date()} 
                                confirmBtnText="Confirm" 
                                cancelBtnText="Cancel" 
                                useNativeDriver='true' 
                                format="YYYY-MM-DD" 
                                customStyles={{
                                    dateIcon: { display: 'none' },
                                    dateInput: { borderWidth: 0 ,alignItems:"flex-start"},
                                }} 
                                onDateChange={(date) => { this.setState({ regisDueDate: date }) }} />
                        </View>
                        <View>
                            <Text style={styles.botTitle}>RUN SUBMISSION</Text>
                        </View>
                        <View style={styles.inputTitleTop}>
                            <View style={styles.inputText}>
                            <TextInput
                                placeholder = "Run Submission"
                                onChangeText={(sub) => this.setState({runSub:sub})}
                                value = {this.state.runSub}
                            />
                            </View>
                        </View>
                        <View>
                            <Button style={styles.submitBtn}  onPress={this.create}>
                                <Text style={styles.btnText}>POST</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        
    },

    contentContainer: {
        flex: 1,
        padding: 20,
        paddingTop:0,
        backgroundColor: 'white',
    },

    

    heading: {
        fontSize: 30,
        fontWeight: '700',
        lineHeight: 40,
        textAlign: 'center',
        marginTop: 35,
        marginBottom: 15,
        color: '#373737',
        
    },

    input: {
        backgroundColor: '#ECECEC',
        borderRadius: 15,
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
    },
    inputText: {
        marginLeft:"5%",
        flex:1,
    },
    inputDate:{
        width:"100%",
        marginLeft:"5%",
    },
    picker: {
        backgroundColor: '#ECECEC',
        borderRadius: 15,
        marginTop: 15,
        display: 'flex',
        paddingTop: 2,
        paddingBottom: 2,
    },

    submitBtn: {
        backgroundColor: '#8352F2',
        borderRadius: 30,
        display: 'flex',
        marginTop: 50,
        marginBottom: 45,
    },

    btnText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        flex: 1,
        padding: 20,
    },
    infoRow:{
        flexDirection:"row",
        marginTop:"10%",
        
    },
    infoColumnTitle:{
        flex:1,
    },
    infoTitle:{
        textAlign:"left",
        fontSize:16,
        flex:1,
        textAlignVertical:"center",
    },
    infoColumnInfo:{
        flex:3,
    },
    eventInfo:{
        textAlign:"right",
        fontSize:15,
        color:'#8352F2',
    },
    inputWithTitle: {
        backgroundColor: '#ECECEC',
        borderRadius: 15,
        padding: 10,
    },
    pickerLeftTitle: {
        backgroundColor: '#ECECEC',
        borderRadius: 15,
    },
    inputDateLeftTitle:{
        width:"100%",
        marginLeft:"5%",
    },
    infoTitleTwoRow:{
        textAlign:"left",
        fontSize:16,
        flex:1,
        textAlignVertical:"top",
    },
    sameRow:{
        flexDirection:"row",
        marginBottom:"5%",
    },
    choseFile:{
        flex:1,
        marginRight:"5%",
        backgroundColor:"#8352F2",
        textAlign:"center",
        color:"white",
    },
    fileStatus:{
        flex:1,
    },
    botTitle:{
        fontSize:20,
        flex:1,
        fontWeight:"bold",
    },
    inputWithTitleTopBig: {
        backgroundColor: '#ECECEC',
        borderRadius: 15,
        padding: 10,
        height:"18%",
        marginBottom:"5%",
    },
    inputTitleTop: {
        backgroundColor: '#ECECEC',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
    },
    pickerTitleTop: {
        backgroundColor: '#ECECEC',
        borderRadius: 15,
        display: 'flex',
        paddingTop: 2,
        paddingBottom: 2,
        marginBottom:"5%",
    },
    camera: {
    width:40,
    height:40,
    
    },
    selectedImage:{
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    
    },
    selectPhotoTop:{
        flex:1,
        borderWidth:1,
        marginTop:"5%",
        backgroundColor:"white",
        padding:"20%",
        alignItems:"center",
        
    },
    selectedPhotoTop:{
        flex:1,
        borderWidth:1,
        marginTop:"5%",
        backgroundColor:"white",
        alignItems:"center",
        
    },
    selectedPhotoTopInfo:{
        display:"none",
        
    },
});