import React, { Component } from 'react';
import { View, Image, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Font from 'react-native-vector-icons/FontAwesome'
import Ant from 'react-native-vector-icons/AntDesign'
import profileImage from '../../images/avatar.jpg';
import moment from 'moment';


export default class ForumDetailsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: "",
            id: "",
            post_id: props.route.params.postid,
            //post_id: 1,
            name: "",
            title: "",
            description: "",
            noLike: "",
            like: 'heart-o',
            showLike: true,
            showComment: true,
            noComment: "",
            datetime: "",
            comments: "",
            postUserId:"",
            likeID:"",
            editing:false,
        }

        //get data from async storage
        const getData = async () => {
            try {
                const userJson = await AsyncStorage.getItem('@userJson')
                
                if(userJson !== null) {
                    const user = JSON.parse(userJson);

                    this.setState({
                        user_id: user.id,
                    });  
                }
    
            } catch(e) {
                console.log(e);
            }
            const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
            fetch(baseUrl + "/api/post/list/like/"+this.state.user_id+"/"+this.state.post_id, {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log("Succesfully get like id")
                console.log(data)
                if(data.length!=0){
                    this.setState({
                        showLike:false,
                        like: 'heart',
                    });
                }
                else{
                    this.setState({
                        showLike:true,
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    
        getData();

        //using localhost on IOS and using 10.0.2.2 on Android
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';

        //get post details
        fetch(baseUrl + '/api/forumposts/' + this.state.post_id, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    title: data.title,
                    description: data.description,
                    name: data.name,
                    datetime: data.datetime,
                    noLike: data.noLike,
                    noComment: data.comments,
                    postUserId:data.user_id,
                });
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        //get comments
        fetch(baseUrl + '/api/forumposts/' + this.state.post_id + '/comments', {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log("Succesfully get comments")
            console.log(data)
            this.setState({
                comments:data,
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    edit=()=>{
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        if(this.state.editing){
            this.setState({
                editing:false,
            });
            const data = {
                user_id: this.state.user_id,
                title: this.state.title,
                description: this.state.description,
            };

            fetch(baseUrl + '/api/post/list/edit/'+1, {
                method: 'PUT',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log("Succesfully update post")
                console.log(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        else{
            this.setState({
                editing:true,
            });
        }
        
    }
    componentDidMount() {

        //using localhost on IOS and using 10.0.2.2 on Android
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';

        //get comments
        fetch(baseUrl + '/api/forumposts/' + this.state.post_id + '/comments', {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log("Succesfully get comments")
            console.log(data)
            this.setState({
                comments:data,
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    
    
    changeLike = () => {
        let newState;
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        if (this.state.showLike) {
            newState = {
                like: 'heart',
                noLike: this.state.noLike + 1,
                showLike: false,
            }
            //store like
            const data = {
                user_id: this.state.user_id,
                post_id: this.state.post_id,
            };

            fetch(baseUrl + '/api/postlikes', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log("Succesfully save like")
                console.log(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } else {
            newState = {
                like: 'heart-o',
                noLike: this.state.noLike - 1,
                showLike: true,
            }
            fetch(baseUrl + "/api/post/list/like/"+this.state.user_id+"/"+this.state.post_id, {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log("Succesfully get like id")
                console.log(data.id)
                fetch(baseUrl + "/api/post/list/like/"+data.id, {
                    method:"DELETE",
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json'
                    },
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Succesfully delete like")
                    console.log(data)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        
        // set new state value
        this.setState(newState)
    };

    validation = () => {

        var empty = [];

        if (!(this.state.comment)) {
            empty.push("comment");
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

            errormsg += "cannot be empty";

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

            //using localhost on IOS and using 10.0.2.2 on Android
            const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';

            const data = {
                user_id: this.state.user_id,
                post_id: this.state.post_id,
                comment: this.state.comment
            };

            fetch(baseUrl + '/api/postcomments', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:',data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            this.setState({
                comment:'',
            })

            //get comments
            fetch(baseUrl + '/api/forumposts/' + this.state.post_id + '/comments', {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log("Succesfully get comments")
                this.setState({
                    comments:data,
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }

    renderItemComponent = (data) =>
        <View style={styles.proRow}>
            <View style={styles.commentProfileContainer}>
                <Image style={styles.proColumnName} source={profileImage} />
            </View>
            <View style={{ flex: 2 }}>
                <Text style={styles.title}>{data.item.name}</Text>
                {/* <Text style={styles.proDetails}>{this.state.name}</Text> */}
                <Text style={styles.date}>{data.item.comment}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{color:'#AEAEAE', fontSize: 14}}>{data.item.datetime}</Text>
            </View>
        </View>
    confirmDelete=() =>{
        Alert.alert(
            "Are you confirm to remove this post?",
            '',
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.deletePost() }
            ]
        );
    };
    deletePost=()=>{
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        fetch(baseUrl + "/api/post/list/user/"+this.state.post_id, {
            method:"DELETE",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log("Succesfully delete post")
            console.log(data)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    
    render() {
        return (
            <ScrollView style={styles.container}>

                <View style={styles.proRow}>
                    <View style={styles.profilePicContainer}>
                        <Image style={styles.proColumnName} source={profileImage} />
                    </View>
                    <View style={styles.profileInfoContainer}>
                        
                        <Text style={styles.title}>{this.state.name}</Text>
                        <Text style={styles.date}>{this.state.datetime}</Text>
                    </View>
                    <View>
                        {this.state.editing
                        ?
                        <View style={styles.wholeIconContainer}>
                        <TouchableOpacity onPress={() => this.edit()}>
                            <View style={styles.iconContainer}>
                                <Icon size={25} name={"done"} color='#808080' />
                            </View>
                        </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.wholeIconContainer}>
                            <TouchableOpacity onPress={() => this.edit()}>
                                <View style={styles.iconContainer}>
                                    <Icon size={25} name={"edit"} color='#808080' />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.confirmDelete()}>
                                <View style={styles.iconContainer}>
                                    <Icon2 size={25} name={"delete"} color='#808080' />
                                </View>
                            </TouchableOpacity>  
                        </View>
                        }
                        
                    </View>         
                </View>
                <View style={styles.proTitle}>
                    {this.state.editing
                    ?
                    <View style={{flexDirection:'row'}}>
                        <TextInput
                            style={styles.titleInput}
                            placeholder="Title"
                            onChangeText={(title) => this.setState({ title: title })}
                            value={this.state.title}
                        />    
                    </View>
                    :
                    <View>
                        <Text style={styles.title}>{this.state.title}</Text>

                    </View>
                    }
                    {this.state.editing
                    ?
                    <View style={{flexDirection:'row'}}>
                        <TextInput
                            style={styles.titleInput}
                            placeholder="Title"
                            onChangeText={(desc) => this.setState({ description: desc })}
                            value={this.state.description}
                        />    
                    </View>
                    :
                    <View>
                        <Text style={styles.description}>{this.state.description}</Text>
                    </View>
                    }
                </View>
                <View style={styles.proRow}>
                    <View style={styles.botIcon}>
                        <Font size={25} name={this.state.like} onPress={() => this.changeLike()} color='#FF4141' />
                        <View style={styles.iconInfoContainer}>
                            <Text>{this.state.noLike}</Text>
                        </View>
                    </View>
                    <View style={styles.botIcon}>
                        <Icon2 size={25} name='comment-outline' color='#808080' />
                        <View style={styles.iconInfoContainer}>
                            <Text>{this.state.noComment}</Text>
                        </View>
                    </View>
                </View>


                <View style={styles.proTitle}>
                    <View style={{flexDirection:"row"}}>
                        <TextInput style={styles.input}
                            placeholder="Write a comment"
                            onChangeText={(comment_input) => this.setState({ comment: comment_input })}
                            value={this.state.comment}
                        />
                        <Icon2 size={25} onPress={this.validation} name='send' style={[styles.text, !this.state.comment ? styles.inactive : []]} />
                    </View>
                </View>

                <View style={styles.proTitle}>
                    <Text style={styles.comment}>Comments</Text>
                </View>

                <View>
                    {this.state.comments.length!=0
                    ?
                    <FlatList 
                        data={this.state.comments}
                        keyExtractor={item => item.id.toString()}
                        renderItem={item => this.renderItemComponent(item)}
                    />  
                    :
                    <View style={styles.proRow}>
                        <Text style={styles.noCommentText}>No comment avaliable. Be the first one to comment!</Text>
                    </View>
                    }
                    
                </View>
                
                            
            </ScrollView>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    event: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 18,
    },
    cardView: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 45,
        marginRight: 45,
        borderRadius: 15,
        backgroundColor: 'white',

        //ios
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,

        //android
        elevation: 5,
    },
    proRow: {
        flexDirection: "row",
        alignItems: 'center',
        padding:"2.5%",
    },
    profilePicContainer:{
        flex:2,
        
    },
    profileInfoContainer:{
        flex:7,
        marginLeft:"2.5%",
    },
    iconInfoContainer:{
        marginLeft:"2.5%",
    },
    botIcon:{
        flex:1,
        alignItems:"center",
        justifyContent:"flex-start",
        flexDirection: "row",
    },
    
    proInfo: {
        margin: 20
    },
    proColumnName: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    title: {
        fontSize: 18,
        color: '#373737',
    },
    date: {
        fontSize: 14,
        color: '#808080'
    },
    description: {
        fontSize: 16,
        color: '#808080'
    },
    icon: {
        marginLeft: 10,
        marginRight: 50,
        marginTop: 20,
    },
    input: {
        backgroundColor: '#ECECEC',
        borderRadius: 15,
        padding:"2.5%",
        flex: 5,
    },
    inactive: {
        color: '#808080',
    },
    text: {
        color: '#8352F2',
        alignItems:"center",
        flex: 1,
        padding:"2.5%",
    },
    comment: {
        color: '#AEAEAE',
        fontSize: 18,
    },
    time: {
        flex: 1,
        marginLeft: 20,
        marginTop: 20,
    },
    iconContainer:{
        padding:"2.5%",
    },
    wholeIconContainer:{
        flexDirection:"row",
        flex:3,
        justifyContent:"space-evenly",
        alignItems:"center",
    },
    commentProfileContainer:{
        alignItems:"flex-start",
        justifyContent:"center",
        padding:"2.5%",
        paddingLeft:0,
    },
    noCommentText: {
        color: '#AEAEAE',  
    },
    titleInput:{
        borderBottomWidth:1,
        fontSize: 18,
        color: '#373737',
        flex:1,
    },
    proTitle: {
        alignItems:"flex-start",
        justifyContent:"center",
        padding:"2.5%",
    },
});