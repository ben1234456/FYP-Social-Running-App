import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TextInput, Text, ScrollView, StyleSheet, Alert, FlatList, Picker} from 'react-native';
import { Button, Left } from 'native-base'

import DatePicker from 'react-native-datepicker';
import addImage from '../../images/addImage.png';
import * as ImagePicker from 'expo-image-picker';
import { StackActions } from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'


export default class editEvent extends Component {
    constructor(props) {
        super(props);

        var today = new Date(),

        sampleDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        
        this.state = {  
            event_id: props.route.params.eventid,
            eventName: props.route.params.event_name,
            regisDate: props.route.params.registration_start,
            regisDueDate: props.route.params.registration_end,
            startDate: props.route.params.start_date,
            endDate: props.route.params.end_date,
            description: props.route.params.description,
            imageSource: addImage,
            eventDistance: [],
            textInput : [],
            feeArray: [],
            distanceArray : [],
            height:0,
        }

        //using localhost on IOS and using 10.0.2.2 on Android
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        const IP = 'https://socialrunningapp.herokuapp.com';

        //get event distances
        fetch(IP + '/api/events/'  + this.state.event_id + '/distance', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Successfully get event distances + fee')
            this.setState({
                eventDistance: data
            });
            console.log(this.state.eventDistance)
        })
        .catch((error) => {
            console.error('Error:', error);
        });

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
        if (!(this.state.regisDate)){
            empty.push("registration date");
        }
        if (!(this.state.regisDueDate)){
            empty.push("registration due date");
        }
        if (!(this.state.startDate)){
            empty.push("start date");
        }
        if (!(this.state.endDate)){
            empty.push("end date");
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
    addTextInput = (index) => {
        let textInput = this.state.textInput;
        textInput.push(
            <View>
                
                <View style={styles.distanceContainer}>
                    <View style={styles.addRowTextContainer}>
                        <Text style={styles.botTitle}>Distance (KM)</Text>
                    </View>
                    <View style={styles.addRowIconContainer}>
                        <TouchableOpacity onPress={() => this.removeTextInput(index)}>
                            <Icon2 size={25} name="delete" color='#808080' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.inputTitleTop}>

                    <View style={styles.inputText}>
                        <TextInput
                            placeholder="e.g. 5"
                            keyboardType='numeric'
                            onChangeText={(text) => this.addValues(text, index)}
                        />
                    </View>
                </View>
                <View style={styles.titleHeading}>
                    <Text style={styles.botTitle}>Fee (RM)</Text>
                </View>
                <View style={styles.inputTitleTop}>
                    <View style={styles.inputText}>
                        <TextInput
                            placeholder="e.g. RMXXX"
                            keyboardType='numeric'
                            onChangeText={(text) => this.addFee(text, index)}
                        />
                    </View>
                </View>
            </View>
        );
        this.setState({ textInput });
    }

    //function to remove TextInput dynamically
    removeTextInput = (index) => {
        let textInput = this.state.textInput;
        let distanceArray = this.state.distanceArray;
        let feeArray = this.state.feeArray;
        textInput.splice(index,1);
        distanceArray.splice(index,1);
        feeArray.splice(index,1);
        this.setState({ textInput,distanceArray,feeArray });
    }

    //function to add text from TextInputs into single array
    addFee = (text, index) => {
        let dataArray = this.state.feeArray;
        let checkBool = false;
        if (dataArray.length !== 0){
        dataArray.forEach(element => {
            if (element.index === index ){
            element.text = text;
            checkBool = true;
            }
        });
        }
        if (checkBool){
        this.setState({
            feeArray: dataArray
        });
    }
    else {
        dataArray.push({'text':text,'index':index});
        this.setState({
            feeArray: dataArray
        });
    }
    }

    //function to add text from TextInputs into single array
    addValues = (text, index) => {
        let dataArray = this.state.distanceArray;
        let checkBool = false;
        if (dataArray.length !== 0){
        dataArray.forEach(element => {
            if (element.index === index ){
            element.text = text;
            checkBool = true;
            }
        });
        }
        if (checkBool){
        this.setState({
        distanceArray: dataArray
        });
    }
    else {
        dataArray.push({'text':text,'index':index});
        this.setState({
        distanceArray: dataArray
        });
    }
    }

    edit = () => {
        
        //using localhost on IOS and using 10.0.2.2 on Android
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        const IP = 'https://socialrunningapp.herokuapp.com';

        if (this.validation()){
            const data = {
                event_name: this.state.eventName,
                description: this.state.description,
                start: this.state.startDate,
                end: this.state.endDate,
                regisDate: this.state.regisDate,
                regisDueDate: this.state.regisDueDate,
            
            };

            const distanceFeeData = {
                distanceFee : this.state.eventDistance,
            }

            //get event details
            fetch(IP + '/api/eventdistances/update', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(distanceFeeData),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    
            
            fetch(IP + '/api/events/' + this.state.event_id, {
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
                if (data.status == "success") {
                    //Alert the user
                    Alert.alert(
                        data.message,
                        '',
                        [
                            { text: "Ok", onPress: () => this.props.navigation.dispatch(StackActions.replace('adminEventDetailsScreen', { 'eventid': this.state.event_id }))}
                        ]
                    );
                }

                //fail 
                else if (data.status == "fail") {
                    //alert fail message
                    Alert.alert(
                        data.message,
                        '',
                        [
                            { text: "Ok", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });  
            
        }

    }

    editDistance = (distanceInput, object) =>{
        
        //source: https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate
        // 1. Make a shallow copy of the items
        let items = [...this.state.eventDistance];
        // 2. Make a shallow copy of the item you want to mutate
        let item = {...items[object.index]};
        // 3. Replace the property you're intested in
        item.distance = distanceInput;
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        items[object.index] = item;
        // 5. Set the state to our new copy
        this.setState({
            eventDistance:items,
        });

    }

    editFee = (feeInput, object) =>{
        
        //source: https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate
        // 1. Make a shallow copy of the items
        let items = [...this.state.eventDistance];
        // 2. Make a shallow copy of the item you want to mutate
        let item = {...items[object.index]};
        // 3. Replace the property you're intested in
        item.fee= feeInput;
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        items[object.index] = item;
        // 5. Set the state to our new copy
        this.setState({
            eventDistance:items,
        });

    }

    renderItemComponent = (data) =>
    
    <View>
        <View>
                
                <View style={styles.distanceContainer}>
                    <View style={styles.addRowTextContainer}>
                        <Text style={styles.botTitle}>Distance (KM)</Text>
                    </View>
                    <View style={styles.addRowIconContainer}>
                        <TouchableOpacity onPress={() => this.removeTextInput(index)}>
                            <Icon2 size={25} name="delete" color='#808080' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.inputTitleTop}>

                    <View style={styles.inputText}>
                        <TextInput
                            placeholder="e.g. 5"
                            keyboardType='numeric'
                            onChangeText={(text) => this.addValues(text, index)}
                            value = {data.item.distance}
                        />
                    </View>
                </View>
                <View style={styles.titleHeading}>
                    <Text style={styles.botTitle}>Fee (RM)</Text>
                </View>
                <View style={styles.inputTitleTop}>
                    <View style={styles.inputText}>
                        <TextInput
                            placeholder="e.g. RMXXX"
                            keyboardType='numeric'
                            onChangeText={(text) => this.addFee(text, index)}
                            value = {data.item.fee}
                        />
                    </View>
                </View>
            </View>
        
    </View>


    render() {
        return (
            
            <ScrollView style={styles.container}>
                    <View>

                    <View style={styles.titleHeading}>
                            <Text style={styles.botTitle}>Event Name</Text>
                        </View>

                        <View style={styles.inputTitleTop}>
                            <View style={styles.inputText}>
                                <TextInput
                                    placeholder = "Event Name"
                                    onChangeText={(name) => this.setState({eventName:name})}
                                    value = {this.state.eventName}
                                />
                            </View>
                        </View>

                        <View style={styles.titleHeading}>
                            <Text style={styles.botTitle}>Description</Text>
                        </View>
                        <View style={styles.inputTitleTop}>
                            <View style={styles.inputText}>
                                <TextInput
                                    placeholder="Write your description here"
                                    onChangeText={(des) => this.setState({ description: des})}
                                    value={this.state.description}
                                    onContentSizeChange={(desc)=>this.setState({height:desc.nativeEvent.contentSize.height})}
                                    style={{height:Math.max(35,this.state.height)}}
                                    multiline
                                />
                            </View>
                        </View> 

                        <View style={styles.titleHeading}>
                            <Text style={styles.botTitle}>Distances and Fees</Text>
                        
                        </View>

                        <FlatList 
                            data={this.state.eventDistance}
                            renderItem={item => this.renderItemComponent(item)}
                            keyExtractor={(item) => item.toString()}
                        />

                        
                        {this.state.textInput.map((value) => {
                        return value
                        })}
                        
                        <View>
                            <Button style={styles.addRow} title='Add' onPress={() => this.addTextInput(this.state.textInput.length)}>
                                <Text style={{ color: 'white', fontSize: 14 }}>Add row</Text>
                            </Button>     
                        </View>
                        
                        <View style={styles.titleHeading}>
                            <Text style={styles.botTitle}>Registration Start Date</Text>
                        </View>
                        <View style={styles.inputTitleTop}>
                            <DatePicker style={styles.inputDate}
                                placeholder="Choose registration date"
                                date={this.state.regisDate} 
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
                        
                        <View style={styles.titleHeading}>
                            <Text style={styles.botTitle}>Registration End Date</Text>
                        </View>
                        <View style={styles.inputTitleTop}>
                            <DatePicker style={styles.inputDate}
                                placeholder="Choose registration due date"
                                date={this.state.regisDueDate} 
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

                        <View style={styles.titleHeading}>
                            <Text style={styles.botTitle}>Event Start Date</Text>
                        </View>
                        <View style={styles.inputTitleTop}>
                            <DatePicker style={styles.inputDate}
                                placeholder="Choose event start date"
                                date={this.state.startDate} 
                                minDate={new Date()} 
                                confirmBtnText="Confirm" 
                                cancelBtnText="Cancel" 
                                useNativeDriver='true' 
                                format="YYYY-MM-DD" 
                                customStyles={{
                                    dateIcon: { display: 'none' },
                                    dateInput: { borderWidth: 0 ,alignItems:"flex-start"},
                                }} 
                                onDateChange={(date) => { this.setState({ startDate: date }) }} />
                        </View>

                        <View style={styles.titleHeading}>
                            <Text style={styles.botTitle}>Event End Date</Text>
                        </View>
                        <View style={styles.inputTitleTop}>
                            <DatePicker style={styles.inputDate}
                                placeholder="Choose registration due date"
                                date={this.state.endDate} 
                                minDate={new Date()} 
                                confirmBtnText="Confirm" 
                                cancelBtnText="Cancel" 
                                useNativeDriver='true' 
                                format="YYYY-MM-DD" 
                                customStyles={{
                                    dateIcon: { display: 'none' },
                                    dateInput: { borderWidth: 0 ,alignItems:"flex-start"},
                                }} 
                                onDateChange={(date) => { this.setState({ endDate: date }) }} />
                        </View>
                        
                        <View>
                            <Text style={styles.botTitle}></Text>
                            <Button style={styles.submitBtn} onPress={this.edit}>
                                <Text style={styles.btnText}>Edit</Text>
                            </Button>   
                        </View>
                    </View>
                
            </ScrollView>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        padding: 30,
        flex: 1,
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
        marginBottom:"10%",
        

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
        marginTop:"5%",
        
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
        fontSize:15,
        flex:1,
        marginTop:10,
        fontWeight:"bold",
    },
    titleHeading:{
        padding:"2%",
    },
    inputTitleTop: {
        backgroundColor: '#ECECEC',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        padding:"2%",
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
    addRow: {
        backgroundColor: '#8352F2',
        flex: 1,
        padding: 20,
        marginTop:"2.5%",
        marginBottom:"2.5%",
    },
    addRowTextContainer:{
        flex:9,
        
    },
    addRowIconContainer:{
        flex:1,
        alignContent:"center",
    },
    distanceContainer:{
        flexDirection:"row",
        padding:"2%",
    },
});