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
                });
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
            this.setState({
                comments:data,
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
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
        if (this.state.showLike) {
            newState = {
                like: 'heart',
                noLike: this.state.noLike + 1,
                showLike: false,
            }
        } else {
            newState = {
                like: 'heart-o',
                noLike: this.state.noLike - 1,
                showLike: true,
            }
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
            <View style={styles.proTitle}>
                <Image style={styles.proColumnName} source={profileImage} />
            </View>
            <View style={{ marginTop: 20, marginLeft: 20, flex: 2 }}>
                <Text style={styles.title}>{data.item.name}</Text>
                {/* <Text style={styles.proDetails}>{this.state.name}</Text> */}
                <Text style={styles.date}>{data.item.comment}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{color:'#AEAEAE', fontSize: 14}}>{data.item.datetime}</Text>
            </View>
        </View>

    render() {
        return (
            <ScrollView style={styles.container}>

                <View style={styles.proRow}>
                    <View style={styles.proTitle}>
                        <Image style={styles.proColumnName} source={profileImage} />
                    </View>
                    <View style={styles.proTitle}>
                        <Text style={styles.title}>{this.state.name}</Text>
                        {/* <Text style={styles.proDetails}>{this.state.name}</Text> */}
                        <Text style={styles.date}>{this.state.datetime}</Text>
                    </View>
                </View>

                <View style={styles.proTitle}>
                    <Text style={styles.title}>{this.state.title}</Text>
                    <Text style={styles.description}>{this.state.description}</Text>
                </View>
                <View style={styles.proRow}>
                    <View style={styles.proTitle}>
                        <Font size={25} name={this.state.like} color='#FF4141' onPress={this.changeLike} />
                    </View>
                    <View style={styles.icon}>
                        <Text>{this.state.noLike}</Text>
                    </View>
                    <View style={styles.proTitle}>
                        <Icon2 size={25} name='comment-outline' color='#808080' />
                    </View>
                    <View style={styles.icon}>
                        <Text>{this.state.noComment}</Text>
                    </View>
                </View>

                <View style={styles.proTitle}>
                    <View style={styles.proRow}>
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

                <View style={styles.proRow}>
                    <FlatList 
                        data={this.state.comments}
                        keyExtractor={item => item.id.toString()}
                        renderItem={item => this.renderItemComponent(item)}
                    />  
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
    },
    proTitle: {
        marginLeft: 20,
        marginTop: 20,
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
        color: '#373737'
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
        marginRight: 20,
        marginBottom: 20,
        padding: 5,
        flex: 5,
    },
    inactive: {
        color: '#808080',
    },
    text: {
        color: '#8352F2',
        marginBottom: 20,
        flex: 1
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
});