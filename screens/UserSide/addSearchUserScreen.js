import React, { Component } from 'react';
import { StyleSheet, Text, View,Image, FlatList,TouchableOpacity} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from "react-native-vector-icons/Ionicons";
import Logo from '../../images/logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

export default class addSearchUserScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName:"",
            userID:"",
            userList:"",
            searchWord:"",
            spinner:false,
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
            //change spinner to visible
            this.setState({spinner: true});
            //get 10 user
            fetch(IP + '/api/users/list/' + this.state.userID, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log('Successfully get user list data')
                console.log(data)
                this.setState({
                    userList: data
                });
                //change spinner to invisible
                this.setState({spinner: false});
            })
            .catch((error) => {
                console.error('Error:', error);
                //change spinner to invisible
                this.setState({spinner: false});
            });

            
        }

        getData();
    };
    renderItemComponent = (data) =>
    <TouchableOpacity onPress={() => this.props.navigation.navigate('BuddiesProfileScreen', { 'userID': data.item.id ,"view":"true"})}>
        <View style={styles.cardContainer}>
            <View style={styles.imgContainer}>
                {/* nid change to user profile pic */}
                <Image style={styles.img} source={Logo} />
            </View>
            <View style={styles.userInfoContainer}>
                <Text style={styles.userInfoTop}>
                    {data.item.first_name}
                </Text>
                <Text style={styles.userInfoBot}>
                    {data.item.gender}
                </Text>
            </View>
            <View style={styles.iconContainer}>
                <Icon name="person-add" size={20} color={"#8352F2"} />
            </View>
        </View>
    </TouchableOpacity>
    
    search=(value)=>{

        this.setState({searchWord:value});
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        const IP = 'https://socialrunningapp.herokuapp.com';

        //get 10 user
        fetch(IP + '/api/users/list/' + this.state.userID +"/"+ value, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Successfully get user list data')
            console.log(data)
            this.setState({
                userList: data
            });

        })
        .catch((error) => {
            console.error('Error:', error);

        });
    };

    render(){
        return(
            <View style={styles.wholeContainer}>
                <Spinner visible={this.state.spinner} textContent={'Loading...'}/>
                <View style={styles.infoContainer}>
                    <SearchBar
                        placeholder="Search"
                        onChangeText={this.search}
                        value={this.state.searchWord}
                        inputStyle={{backgroundColor: 'white'}}
                        containerStyle={{backgroundColor: 'white', borderRadius: 20,borderWidth:1,borderColor:"grey",borderBottomColor:"grey",borderTopColor:"grey"}}
                        leftIconContainerStyle={{backgroundColor: 'white'}}
                        inputContainerStyle={{backgroundColor: 'white'}}
                        
                    />
                    {this.state.userList.length!=0
                    ?
                    <FlatList horizontal={false}
                        data={this.state.userList}
                        keyExtractor={item => item.id.toString()}
                        renderItem={item => this.renderItemComponent(item)}
                    /> 
                    :
                    <View style={styles.noUserView}>
                        <Text style={styles.noUserText}>No User Found</Text>
                    </View>
                    }
                         
                    
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
    cardInner:{
        flexDirection:"column",
    },
    noUserView:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        paddingTop:"10%",
    },
    noUserText:{
        fontSize:16,
    },
});