import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TextInput, Text, ScrollView, StyleSheet, Picker} from 'react-native';
import { Button } from 'native-base'
import Back from '../images/left-arrow.png';
import { Actions } from 'react-native-router-flux';
import Eye from '../images/eye.png';
import DatePicker from 'react-native-datepicker';

export default class SignUpScreen extends Component {
    constructor(props) {
        super(props);

        var today = new Date(),

        sampleDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        
        this.state = {  
            user_name: "",
            currentDate: sampleDate,
            gender: "",
            city: "",
            phone_number: "",
            dob: "",
            email: "",
            password: "",
        }

    }

    state = {
        genderSelected: '',
        citySelected: '',
    }

    // submit(){
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ title: 'React POST Request Example' })
    //     };
    //     fetch('http://192.168.0.192:8000/api/users')
    //         .then(response => response.json())
    //         .then(data => console.log(data));
    // }

    register = () => {

        fetch('http://192.168.0.192:8000/api/users', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user_name: this.state.user_name,
              phone_number: this.state.phone_number,
              email: this.state.email,
              password: this.state.password,
            })
        });  
        
        Actions.login();
        console.log(this.state.user_name);
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.contentContainer}>
                    <TouchableOpacity onPress={Actions.start}>
                        <Image style={styles.image} source={Back} />
                    </TouchableOpacity>

                    <View>
                        <Text style={styles.heading}>Create Account.</Text>
                        <View style={styles.input}>
                            <TextInput
                                placeholder = "Name"
                                onChangeText={(name) => this.setState({user_name:name})}
                                value = {this.state.user_name}
                            />
                        </View>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={this.state.genderSelected}
                                onValueChange={(itemValue) => this.setState({ genderSelected: itemValue })}>

                                <Picker.Item label="Select your gender" value="null" color="#999" />
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                            </Picker>
                        </View>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={this.state.citySelected}
                                onValueChange={(itemValue) => this.setState({ citySelected: itemValue })}>

                                <Picker.Item label="Select your city" value="null" color="#999" />
                                <Picker.Item label="Kuching" value="Kuching" />
                                <Picker.Item label="Miri" value="Miri" />
                            </Picker>
                        </View>
                        <View style={styles.input}>
                            <TextInput
                                placeholder="Phone number e.g. 012345678" 
                                keyboardType = 'numeric'
                                onChangeText={(number) => this.setState({phone_number:number})}
                                value = {this.state.phone_number}
                             />
                        </View>
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
                                onDateChange={(date) => { this.setState({ sampleDate: date }); }} />
                        </View>
                        <View style={styles.input}>
                            <TextInput 
                                placeholder="Email" 
                                onChangeText={(email_input) => this.setState({email:email_input})}
                                value = {this.state.email}
                            />
                        </View>
                        <View style={styles.input}>
                            <TextInput 
                                placeholder="Password" 
                                onChangeText={(password_input) => this.setState({password:password_input})}
                                value = {this.state.password}
                                secureTextEntry 
                            />
                            <Image style={styles.icon} source={Eye} />
                        </View>
                        <View style={styles.input}>
                            <TextInput placeholder="Confirm Password" secureTextEntry />
                            <Image style={styles.icon} source={Eye} />
                        </View>
                        <View>
                            <Button style={styles.submitBtn} onPress={this.register}>
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
        padding: 20,
        display: 'flex',
        flex: 1,
        backgroundColor: 'white',
    },

    contentContainer: {
        flex: 1,
        padding: 20,
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

    icon: {
        marginTop: -25,
        marginLeft: 230,
        width: 25,
        height: 25,
    }
});