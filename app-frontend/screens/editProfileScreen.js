import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput,Picker} from 'react-native';
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux';
import Font from 'react-native-vector-icons/FontAwesome5';
import profileImage from '../images/avatar.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-datepicker';
import { RadioButton } from 'react-native-paper';

export default class editProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id:"",
            name:"Jun",
            gender:"Male",  
            city:"Kuching",   
            dob:"2000-07-15",
            email:"12345678@gmail.com",
            phoneNum:"012345678",
            cityList:["Kuching1","Kuching2","Kuching","Kuching3","Kuching4"],
            checked:"Male"
        };
    

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@userid')
            if(value !== null) {
                this.setState({ id: value });
                const url = "http://192.168.0.192:8000/api/users/";
                const fetchlink = url + this.state.id;
                fetch(fetchlink)
                    .then(response => response.json())
                    .then(data => {
                        this.setState({name:data.first_name});
                        this.setState({gender:data.gender});
                        this.setState({city:data.city});
                        this.setState({dob:data.dob});
                    });   
            }

        } catch(e) {
            console.log(e);
        }
    };
    
    getData();
    }
    changeGender=(newGender)=>{
        this.setState({checked:newGender});
    };
    formatPickerList=()=>{
        console.log(this.state.cityList.indexOf("Kuching"));
        let defaultIndex=this.state.cityList.indexOf(this.state.city);
        let tempoArray=[];
        tempoArray.push(this.state.cityList[defaultIndex]);
        for(let i=0;i<this.state.cityList.length;i++){
            if(i!=defaultIndex){
                tempoArray.push(this.state.cityList[i]);
            }
        }
    };
    componentDidMount(){
        this.formatPickerList();    
    };
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
                                        <RadioButton  value="Male" />
                                        <Text >Male</Text>
                                    </View>
                                    <View style={styles.radioBtn}>
                                        <RadioButton  value="Female" />
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
                            <Text style={styles.info}>Phone No.</Text>
                        </View>
                        <View style={styles.infoData}>
                            <TextInput
                                placeholder = {this.state.phoneNum}
                                onChangeText={(phoneNum) => this.setState({phoneNum:phoneNum})}
                                value = {this.state.phoneNum}
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
                                onValueChange={
                                    (itemValue) => this.setState({ city: itemValue })
                                    }>{
                                        this.state.cityList.map( (e)=>{
                                         return <Picker.Item label={e} value={e} />
                                        })
                                       }
                            </Picker>
                        </View>
                    </View>
                </View>
                <View style={styles.save}>
                    <Button block style={styles.saveBtn}>
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