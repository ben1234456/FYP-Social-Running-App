import React, { Component } from 'react';
import { StyleSheet, Text, View,Image} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from "react-native-vector-icons/Ionicons";
import Logo from '../images/logo.png';

export default class addSearchUserScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName:"",
        };
    };
    search=()=>{
    };
    render(){
        return(
            <View style={styles.wholeContainer}>
                <View style={styles.infoContainer}>
                    <SearchBar
                        placeholder="Search"
                        onChangeText={(name) => this.setState({userName:name})}
                        value={this.state.userName}
                        inputStyle={{backgroundColor: 'white'}}
                        containerStyle={{backgroundColor: 'white', borderRadius: 20,borderWidth:1,borderColor:"grey",borderBottomColor:"grey",borderTopColor:"grey"}}
                        leftIconContainerStyle={{backgroundColor: 'white'}}
                        inputContainerStyle={{backgroundColor: 'white'}}
                        
                    />
                    <View style={styles.cardContainer}>
                        <View style={styles.imgContainer}>
                            {/* nid change to user profile pic */}
                            <Image style={styles.img} source={Logo} />
                        </View>
                        <View style={styles.userInfoContainer}>
                            <Text style={styles.userInfoTop}>
                                Johnathan
                            </Text>
                            <Text style={styles.userInfoBot}>
                                Male
                            </Text>
                        </View>
                        <View style={styles.iconContainer}>
                            <Icon name="person-add" size={20} color={"#8352F2"} />
                        </View>
                    </View>
                    <View style={styles.cardContainer}>
                        <View style={styles.imgContainer}>
                            {/* nid change to user profile pic */}
                            <Image style={styles.img} source={Logo} />
                        </View>
                        <View style={styles.userInfoContainer}>
                            <Text style={styles.userInfoTop}>
                                Johnny
                            </Text>
                            <Text style={styles.userInfoBot}>
                                Female
                            </Text>
                        </View>
                        <View style={styles.iconContainer}>
                            <Icon name="person-add" size={20} color={"#8352F2"} />
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
    },
    infoContainer:{
        flex:1,
        padding:"10%",
        paddingTop:"5%",
    },
    img:{
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
    imgContainer:{
        flex:1,
        marginRight:"5%",
    },
    cardContainer:{
        borderRadius:15,
        flexDirection:"row",
        marginTop:"5%",
        borderWidth:0.5,
        borderColor:"grey",
        padding:"5%",
        paddingTop:"10%",
        paddingBottom:"10%",
    },  
    iconContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    userInfoContainer:{
        flex:5,
        justifyContent:"center"
    },
    userInfoTop:{
        fontSize:18,
    },
    userInfoBot:{
        color:"grey",
    },
});