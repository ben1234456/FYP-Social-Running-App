import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View,Image, TextInput} from 'react-native';
import Logo from '../images/logo.png';


export default class resetPasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
        };
    };
    render(){
        return(
            <View style={styles.wholeContainer}>
                <View style={styles.topInfoContainer}>
                    <View style={styles.topInfo}>
                        <Image style={styles.img} source={Logo} />
                        <Text style={styles.bigTitle} >
                            Forget Password?
                        </Text>
                        <Text style={styles.smallTextUnderTitle} >
                            Enter your email address to reset your password.
                        </Text>
                    </View>
                </View>
                <View style={styles.botInfoContainer}>
                    <View style={styles.botInfo}>
                        <Text style={styles.botTitle}>
                            Email address
                        </Text>
                        <TextInput 
                                style={styles.emailInput}
                                placeholder="Email" 
                                keyboardType = 'email-address'                                
                                onChangeText={(emailInput) => this.setState({email:emailInput})}
                                value = {this.state.email}
                            />
                        <View style={styles.botSend}>
                            <TouchableOpacity>
                                <Text style={styles.sendText}>SEND INSTRUCTIONS</Text>
                            </TouchableOpacity>
                            
                        </View>
                            
                    </View>
                </View>
            </View>
        );
    }
}
export const styles = StyleSheet.create({
    wholeContainer:{
        flex:1,
        backgroundColor:"white",
        padding:"10%",
    },
    botInfoContainer:{
        flex:2,
    },
    topInfoContainer:{
        flex:1,
        
    },
    img:{
        width: '30%',
        height: undefined,
        aspectRatio: 1,
    },
    topInfo:{
        flex:1,
        padding:"5%",
        alignItems:"center",
        justifyContent:"flex-end",
    },
    bigTitle:{
        fontWeight:"bold",
        fontSize:25,
        textAlign:"center",
        marginBottom:"2%",
    },
    smallTextUnderTitle:{
        textAlign:"center",
        color:"grey",

    },
    botInfo:{
        flex:1,
    },
    emailInput:{
        backgroundColor: '#ECECEC',
        borderRadius: 15,
        padding:"5%",
        marginTop:"5%",
    },
    botTitle:{
        color:"grey",
    },
    botSend: {
        backgroundColor: '#8352F2',
        borderRadius: 30,
        marginTop:"5%",
        alignItems:"center",
        padding:"5%",
    },
    sendText:{
        color:"white",
    },
});