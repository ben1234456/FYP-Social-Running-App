import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TextInput, Text, ScrollView, StyleSheet, Alert, Picker} from 'react-native';
import { Button } from 'native-base'
import Back from '../images/left-arrow.png';
import Eye from '../images/eye.png';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackActions } from '@react-navigation/native';

export default class SignUpScreen extends Component {
    constructor(props) {
        super(props);

        var today = new Date(),

        sampleDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        
        this.state = {  
            name: "",
            currentDate: sampleDate,
            gender: "",
            user_state: "",
            // phone_number: "",
            dob: "",
            email: "",
            password: "",
            password_confirmation: "",
            icEye: 'eye-off',
            showPassword: true,
            token: '',
        }
    }

    validation = () => {
        
        var empty=[];

        //check empty
        if (!(this.state.name)){
            empty.push("name");
        }

        if (!(this.state.gender)){
            empty.push("gender");
        }
        
        if (!(this.state.user_state)){
            empty.push("city");
        }

        if (!(this.state.sampleDate)){
            empty.push("date of birth");
        }

        if (!(this.state.email)){
            empty.push("email");
        }

        if (!(this.state.password) || !(this.state.password_confirmation)){
            empty.push("password");
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

        // else if (!this.emailvalidation()){
        //     Alert.alert(
        //         "Please enter an valid email address",
        //         '',
        //         [
        //           { text: "Ok", onPress: () => console.log("OK Pressed") }
        //         ]
        //     );

        //     return false;
        // }

        else if (this.state.password != this.state.password_confirmation ){
            Alert.alert(
                "Both passwords must be the same",
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

    register = () => {

        //using localhost on IOS and using 10.0.2.2 on Android
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';

        var ip = 'http://192.168.0.192:8000';

        if (this.validation()){

        
            var errorMsg = "";


            const data = {
                name: this.state.name,
                dob: this.state.sampleDate,
                city: this.state.user_state,
                email: this.state.email,
                gender: this.state.gender,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation
            };
    
            
            fetch(ip +'/api/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                if (data.message == "The given data was invalid."){

                    if (data.errors.name){
                        for (let x = 0; x < data.errors.name.length; x++){
                            errorMsg += data.errors.name[x] + "\n";
                        }
                    }
         
                    if (data.errors.email != ""){
                        for (let x = 0; x < data.errors.email.length; x++){
                            errorMsg += data.errors.email[x] + "\n";
                        }
                    }

                    if (data.errors.password){
                        for (let x = 0; x < data.errors.password.length; x++){
                            errorMsg += data.errors.password[x] + "\n";
                        }
                    }
                    
                    Alert.alert(
                        errorMsg,
                        ''
                        [
                            { text: "Ok" }
                        ]
                    );
                }

                else if (data.message == "success"){

                    Alert.alert(
                        'Account Succesfully Registered! Please verify your account by using the email entered just now',
                        ''
                        [
                            { text: "Ok", onPress: () => this.props.navigation.dispatch(StackActions.replace('login'))}
                        ]
                    );
                    
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });  
        }
            
    }

    changePasswordType = () => {
        let newState;
        if (this.state.showPassword) {
            newState = {
                icEye: 'eye',
                showPassword: false,
                password: this.state.password
            }
        } else {
            newState = {
                icEye: 'eye-off',
                showPassword: true,
                password: this.state.password
            }
        }
        // set new state value
        this.setState(newState)
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.contentContainer}>
                    <View>
                        <Text style={styles.heading}>Create Account</Text>
                        <View >
                            <TextInput
                                placeholder = "Name"
                                onChangeText={(name) => this.setState({name:name})}
                                value = {this.state.name}
                                style={styles.input}
                            />
                        </View>
                        
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={this.state.gender}
                                onValueChange={
                                    (itemValue) => this.setState({ gender: itemValue })
                                }>
           
                                {/* ()=>{console.log(this.state.genderSelected);} */}
                                

                                <Picker.Item label="Select your gender" value="null" color="#999" />
                                <Picker.Item label="Male" value="male" />
                                <Picker.Item label="Female" value="female" />
                            </Picker>
                        </View>

                        <View style={styles.picker}>
                            <Picker
                                selectedValue={this.state.user_state}
                                onValueChange={(itemValue) => this.setState({ user_state: itemValue })}>

                                <Picker.Item label="Select your state" value="null" color="#999" />
                                <Picker.Item label="Labuan" value="Labuan" />
                                <Picker.Item label="Malacca" value="Malacca" />
                                <Picker.Item label="Putrajaya" value="Putrajaya" />
                                <Picker.Item label="Perlis" value="Perlis" />
                                <Picker.Item label="Negeri Sembilan" value="Negeri Sembilan" />
                                <Picker.Item label="Pahang" value="Pahang" />
                                <Picker.Item label="Terrengganu" value="Terrengganu" />
                                <Picker.Item label="Johor" value="Johor" />
                                <Picker.Item label="Kuala Lumpur" value="Kuala Lumpur" />
                                <Picker.Item label="Penang" value="Penang" />
                                <Picker.Item label="Sabah" value="Sabah" />
                                <Picker.Item label="Kelantan" value="Kelantan" />
                                <Picker.Item label="Selangor" value="Selangor" />
                                <Picker.Item label="Perak" value="Perak" />
                                <Picker.Item label="Kedah" value="Kedah" />
                                <Picker.Item label="Sarawak" value="Sarawak" />
                            </Picker>
                        </View>

                        {/* <View style={styles.input}>
                            <TextInput
                                placeholder="Phone number e.g. 012345678" 
                                keyboardType = 'numeric'
                                onChangeText={(number) => this.setState({phone_number:number})}
                                value = {this.state.phone_number}
                             />
                        </View> */}

                        <View style={styles.picker}>
                            <DatePicker style={styles.selectDate} 
                                placeholder="Choose your date of birth"
                                date={this.state.sampleDate} 
                                maxDate={new Date()} 
                                confirmBtnText="Confirm" 
                                cancelBtnText="Cancel" 
                                useNativeDriver='true' 
                                format="YYYY-MM-DD" 
                                customStyles={{
                                    dateIcon: { display: 'none' },
                                    dateInput: { borderWidth: 0 },
                                }} 
                                onDateChange={(date) => { this.setState({ sampleDate: date }) }} />
                        </View>

                        <View >
                            <TextInput 
                                style={styles.input}
                                placeholder="Email" 
                                keyboardType = 'email-address'                                
                                onChangeText={(email_input) => this.setState({email:email_input})}
                                value = {this.state.email}
                            />
                        </View>

                        <View style={styles.inputPass}>
                            <TextInput style={styles.inputRow}
                                placeholder="Password" 
                                onChangeText={(password_input) => this.setState({password:password_input})}
                                value = {this.state.password}
                                secureTextEntry = {this.state.showPassword}
                            />
                            <Icon style={styles.icon} name={this.state.icEye} size={25} onPress={this.changePasswordType}/>
                        </View>
                        <View style={styles.inputPass}>
                            <TextInput style={styles.inputRow}
                                placeholder="Confirm Password" 
                                secureTextEntry = {this.state.showPassword}
                                onChangeText={(password_input) => this.setState({password_confirmation:password_input})}
                                value = {this.state.password_confirmation}
                            />
                            <Icon style={styles.icon} name={this.state.icEye} size={25} onPress={this.changePasswordType}/>
                        </View>
                        <View>
                            <Button style={styles.submitBtn}  onPress={this.register}>
                                <Text style={styles.btnText}>SIGN UP</Text>
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
        padding: 30,
        display: 'flex',
        flex: 1,
        paddingTop:0,
        backgroundColor: 'white',
    },

    contentContainer: {
        flex: 1,
        paddingTop:0,
    },

    image: {
        marginTop: 15,
        marginRight: 15,
        width: 30,
        height: 30,
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
    inputPass: {
        backgroundColor: '#ECECEC',
        borderRadius: 15,
        
        marginTop: 15,
        flexDirection: 'row',
    },
    icon: {
        flex: 1,
        padding: 10,
    },
    picker: {
        backgroundColor: '#ECECEC',
        borderRadius: 15,
        marginTop: 15,
        display: 'flex',
        paddingTop: 2,
        paddingBottom: 2,
    },
    selectDate: {
        width: 270,
        paddingTop: 2.5,
        paddingBottom: 2.5,
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

    

    inputRow: {
        flex: 9,
        padding: 10,
    }
});