import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput,Picker} from 'react-native';
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux';
import Font from 'react-native-vector-icons/FontAwesome5';
import profileImage from '../images/avatar.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-datepicker';
import { RadioButton } from 'react-native-paper';

export default class AdminEditProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id:"",
            name:"",
            gender:"",  
            city:"",   
            dob:"",
            email:"",
            phoneNum:"",
            cityList:["Labuan","Malacca","Putrajaya","Perlis","Negeri Sembilan","Pahang"],
            checked:"Male",
        };
    

        const getData = async () => {
            try {
                const userJson = await AsyncStorage.getItem('@userJson')
                if(userJson !== null) {
                    const user = JSON.parse(userJson);
                    this.setState({
                        id:user.id,
                        name:user.first_name,
                        email:user.email,
                        gender:user.gender,
                        city:user.city,
                        dob:user.dob
                    });
                }
    
            } catch(e) {
                console.log(e);
            }
        }
    
        getData();

    }

    edit = async () =>{

        const ip = "192.168.0.192";

        const data = {
            name: this.state.name,
            dob: this.state. dob,
            city: this.state.city,
            email: this.state.email,
            gender: this.state.gender
        };

        const apilink = 'http://' + ip + ':8000/api/users/' + this.state.id ;
        console.log(apilink);
        fetch(apilink, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => { 
            console.log('Success:',data.user);
            AsyncStorage.setItem('@userJson',JSON.stringify(data.user));
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        this.props.navigation.push('app');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profilePic}>
                    <Image style={styles.profileImage} source={profileImage} />
                </View>
                
                <View style={styles.profileInfo}>
                    <View style={styles.infoRow}>
                        <View style={styles.infoTitle}>
                            <Text style={styles.info}>Name:</Text>
                        </View>
                        <View style={styles.infoData}>
                            <TextInput
                                placeholder = {this.state.name}
                                onChangeText={(name) => this.setState({name:name})}
                                value = {this.state.name}
                                style={styles.input}
                            />
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.infoTitle}>
                            <Text style={styles.info}>Gender:</Text>
                        </View>
                        <View style={styles.infoData}>
                            <RadioButton.Group onValueChange={(newGender) => this.setState({gender:newGender})} value={this.state.gender}>
                            <View style={styles.genderColumn}>
                                
                                <View style={styles.radioBtn}>
                                    <RadioButton  
                                        value="male"
                                        status={ this.state.gender == "male" ? 'checked' : 'unchecked' }
                                    />
                                    <Text>Male</Text>
                                </View>
                                <View style={styles.radioBtn}>
                                    <RadioButton  
                                        value="female" 
                                        status={ this.state.gender == "female" ? 'checked' : 'unchecked' }
                                    />
                                    <Text>Female</Text>
                                </View>
                                
                            </View>
                            </RadioButton.Group>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.infoTitle}>
                            <Text style={styles.info}>Email:</Text>
                        </View>
                        <View style={styles.infoData}>
                            <TextInput
                                placeholder = {this.state.email}
                                onChangeText={(email) => this.setState({email:email})}
                                value = {this.state.email}
                                style={styles.input}
                            />
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.infoTitle}>
                            <Text style={styles.info}>DOB:</Text>
                        </View>
                        <View style={styles.infoData}>
                            <View style={styles.input} >
                            
                                <DatePicker 
                                style={{width:"100%"}}
                                placeholder="Choose your date of birth"
                                date={this.state.dob} 
                                maxDate={new Date()} 
                                mode="date"
                                confirmBtnText="Confirm" 
                                cancelBtnText="Cancel" 
                                format="YYYY-MM-DD" 
                                customStyles={{
                                    dateIcon: { display: 'none' },
                                    dateInput: { borderWidth: 0,height:"100%",alignItems:'flex-start',justifyContent:"flex-start"},
                                    dateText:{fontSize:15},
                                }} 
                                onDateChange={(date) => { this.setState({ dob: date }) }} />
                                
                            </View>
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.infoTitle}>
                            <Text style={styles.info}>City:</Text>
                        </View>
                        <View style={styles.infoData}>
                            <Picker
                               selectedValue={this.state.city}
                               onValueChange={(itemValue) => this.setState({ city: itemValue })}>

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
                    </View>
                </View>
                <View style={styles.save}>
                    <Button block style={styles.saveBtn} onPress={this.edit}>
                        <Text style={styles.btnText}>SAVE</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection:"column",
    },
    profilePic: {
        flex:3,
        
        marginTop:"5%",   
        justifyContent: 'center',  
        alignItems: 'center',
    },
    profileImage:{
        width:"50%",
        height:"100%",
    },
    profileInfo:{
        textAlign:"right",
        fontSize:15,
        color:"#8100e3",
        paddingLeft:"10%",
        paddingRight:"10%",
        flex:6,
        marginTop:"5%",
    },
    infoRow:{
        flexDirection:"row",
        
    },
    infoTitle:{
        flex:3,
        margin:"1%",
        marginTop:"3%",
        marginBottom:"3%",
    },
    infoData:{
        flex:7,
        
        marginTop:"3%",
        marginBottom:"3%",
        paddingRight:"5%",
        
    },
    info:{
        fontSize:15,
        fontWeight:"bold",
    },
    save:{
        flex:2,
        justifyContent:"center",
    },
    saveBtn:{
        alignSelf:"center",
        borderRadius: 30,
        width:"auto",
        paddingLeft:"20%",
        paddingRight:"20%",
        backgroundColor:"#8100e3",
    },
    btnText:{
        color:"#ffffff",
    },
    input:{
        borderBottomWidth:1,
        flex:1,
        fontSize:15,
    },
    genderColumn:{
        flexDirection:"row",
    },
    radioBtn:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
        flex:1,
        
    }
});