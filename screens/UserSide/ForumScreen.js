import React, { Component } from 'react';
import { View, Image, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert, FlatList, Modal, Animated, Easing } from 'react-native';
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Font from 'react-native-vector-icons/FontAwesome'
import Ant from 'react-native-vector-icons/AntDesign'
import profileImage from '../../images/avatar.jpg';
import Ion from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment, { max, relativeTimeThreshold } from 'moment';
import { Divider } from 'react-native-elements'
import { StackActions } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

export default class ForumScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currenDate: new Date().toLocaleString(),
            viewSection: false,
            id: "",
            name: "",
            eventdata: "",
            heart: false,
            like: 'heart-o',
            showLike: true,
            date: "",
            noLike: "",
            // data: [
            //     { id: '1', name: "User 1", img: profileImage, date: 'Sep 1, 2021', like: 'heart-o', noLike: 1, title: 'Title here', description: 'This is the description that users write', comment: 0, comments: '', edit: '', delete: '', status: false },
            //     { id: '2', name: "User 2", img: profileImage, date: 'Sep 1, 2021', like: 'heart-o', noLike: 2, title: 'Title here', description: 'This is the description that users write', comment: 0, comments: '', edit: '', delete: '', status: false },
            //     { id: '3', name: "User 3", img: profileImage, date: 'Sep 1, 2021', like: 'heart-o', noLike: 5, title: 'Title here', description: 'This is the description that users write', comment: 0, comments: '', edit: '', delete: '', status: false },
            //     { id: '4', name: "User 4", img: profileImage, date: 'Sep 1, 2021', like: 'heart-o', noLike: 10, title: 'Title here', description: 'This is the description that users write', comment: 0, comments: '', edit: '', delete: '', status: false },
            // ],
            isVisible: false,
            commentHolder: '',
            titleHolder: '',
            descriptionHolder: '',
            fadeAnim: new Animated.Value(0),
            posts: '',
            user_id: '',
            spinner:false,
        }

        const getData = async () => {
            try {
                const userJson = await AsyncStorage.getItem('@userJson')
                if (userJson !== null) {
                    const user = JSON.parse(userJson);
                    this.setState({
                        user_id: user.id,
                    });
                }

            } catch (e) {
                console.log(e);
            }
            //using localhost on IOS and using 10.0.2.2 on Android
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        const IP = 'https://socialrunningapp.herokuapp.com';
        if(this.state.user_id.length!=0 && this.state.user_id!=null){
            //change spinner to visible
            this.setState({spinner: true});
            //get forum posts' details
            fetch(IP + '/api/forumposts/list/'+this.state.user_id, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log('Successfully get forum list')
                console.log(data)
                this.setState({
                    posts: data
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
        
        }

        getData();

        this.arrayholder = [];
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

    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
        
        
        this.focusListener = this.props.navigation.addListener('focus', () => {
        //using localhost on IOS and using 10.0.2.2 on Android
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost';
        const IP = 'https://socialrunningapp.herokuapp.com';
        if(this.state.user_id.length!=0 && this.state.user_id!=null){
            //change spinner to visible
            this.setState({spinner: true});
            //get forum posts' details
            fetch(IP + '/api/forumposts/list/'+this.state.user_id, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log('Successfully get forum posts list')
                console.log(data)
                this.setState({
                    posts: data
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
        

        });
          
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick() {
        this.setState({
            currenDate: new Date().toLocaleString()
        });
    }

    send(id) {
        // const filteredData = this.state.data.filter(item => item.id !== id);
        // this.setState({ data: filteredData });
        // this.arrayholder = filteredData
        if (this.state.commentHolder) {
            const index = [this.state.data.findIndex(comment => comment.id === id)];
            this.state.data[index].comment += 1
            this.state.data[index].comments = this.state.data[index].comments + this.state.commentHolder + '\n'
        }
        else {
            Alert.alert('Your comment cannot be empty!')
        }
    }

    // renderBottomComponent() {
    //     if (this.state.commentHolder) {
    //         return (
    //             <Text>sd</Text>
    //         )
    //     }
    // }

    //Create Post
    createPost = () => {
        var empty = [];

        if (!(this.state.titleHolder && this.state.descriptionHolder)) {
            empty.push("title and description");
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
            const IP = 'https://socialrunningapp.herokuapp.com';

            const data = {
                user_id: this.state.user_id,
                title: this.state.titleHolder,
                description: this.state.descriptionHolder,
            };
            //change spinner to visible
            this.setState({spinner: true});
            //get forum posts' details
            fetch(IP + '/api/forumposts', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                if (data.status == "success") {
                    console.log("Succesfully saved post");
                }
                this.setState({
                    title: '',
                    description: '',
                    isVisible: !this.state.isVisible,
                })
    
                //get forum posts' details
                fetch(IP + '/api/forumposts', {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Successfully get forum posts')
                    console.log(data)
                    this.setState({
                        posts: data
                    });
                    //change spinner to invisible
                    this.setState({spinner: false});
                })
                .catch((error) => {
                    console.error('Error:', error);
                    //change spinner to invisible
                    this.setState({spinner: false});
                });
                
    
                this.props.navigation.dispatch(StackActions.replace('forumScreen'));
            })
            .catch((error) => {
                console.error('Error:', error);
                //change spinner to invisible
                this.setState({spinner: false});
            });

            
        }
    }

    //Delete Post
    deletePost(id) {
        const filteredData = this.state.data.filter(item => item.id !== id);
        this.setState({ data: filteredData });
        this.arrayholder = filteredData
    }

    delete(id) {
        Alert.alert(
            "Are you confirm to remove this post?",
            '',
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.deletePost(id) }
            ]
        );
    };

    updateLike(id) {
        const index = [this.state.data.findIndex(like => like.id === id)];
        //const index = this.state.data.map(function (x) { return x.id; }).indexOf(id);

        if (this.state.data[index].like == 'heart') {
            this.state.data[index].noLike -= 1;
            this.state.data[index].like = 'heart-o'
        }
        else {
            this.state.data[index].noLike += 1;
            this.state.data[index].like = 'heart'
        }

        console.log(this.state.data[index].noLike);
    }

    render() {
        return (
            <View style={styles.container}>
                <Spinner visible={this.state.spinner} textContent={'Loading...'}/>
                <View style={styles.contentContainer1}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.event}>Discussion Forum</Text>
                    </View>
                </View>
                {this.state.posts.length != 0
                    ?
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ForumDetailsScreen', { 'postid': item.id })}>
                                <View style={styles.cardView}>
                                    <View style={styles.proRow}>

                                        <View style={styles.profilePicContainer}>
                                            <Image style={styles.proColumnName} source={profileImage} />
                                        </View>

                                        <View style={styles.profileInfoContainer}>
                                            <Text style={styles.title}>{item.name}</Text>
                                            {/* <Text style={styles.proDetails}>{this.state.name}</Text> */}
                                            <Text style={styles.date}>{item.datetime}</Text>
                                        </View>
                                        
                                    </View>

                                    <View style={styles.proTitle}>
                                        <Text style={styles.title}>{item.title}</Text>
                                        <Text style={styles.description}>{item.description}</Text>
                                    </View>

                                    <View style={styles.proRow}>

                                        <View style={styles.botIcon}>
                                            {item.liked
                                            ?
                                            <Font size={25} name={"heart"} onPress={() => this.updateLike(item.id)} color='#FF4141' />
                                            :
                                            <Font size={25} name={"heart-o"} onPress={() => this.updateLike(item.id)} color='#FF4141' />

                                            }
                                            <View style={styles.iconInfoContainer}>
                                                <Text>{item.noLike}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.botIcon}>
                                            <Icon2 size={25} name='comment-outline' color='#808080' />
                                            <View style={styles.iconInfoContainer}>
                                                <Text>{item.comments}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    :
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noData}>No post avaliable. Post one now!</Text>
                    </View>
                }

                <View style={{ flexDirection: 'row', margin: 40 }}>
                    <Modal
                        animationType={"slide"}
                        transparent={false}
                        visible={this.state.isVisible}
                        onRequestClose={() => { console.log("Modal has been closed.") }}>
                        {/*All views of Modal*/}
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', backgroundColor: '#8352F2' }} >
                                <Ion style={{ flex: 1 }} size={45} color='white' name='ios-close-outline' onPress={() => {
                                    this.setState({ isVisible: !this.state.isVisible })
                                }} />
                                <Text style={{ flex: 1, fontSize: 18, marginTop: 10, color: 'white', marginRight: 15 }}>Create Post</Text>
                                <TouchableOpacity onPress={this.createPost}>
                                    <View style={{ borderRadius: 10, backgroundColor: 'white', marginTop: 5, marginRight: 5, }}>
                                        <Text style={{ color: '#8352F2', alignItems: 'center', padding: 10 }}>
                                            POST
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>


                            <View style={{ flexDirection: 'row' }}>
                                <Icon style={{ margin: 20 }} size={25} color='#8352F2' name='title' />
                                <View style={styles.input}>
                                    <TextInput
                                        style={{ padding: 10 }}
                                        placeholder="Title"
                                        multiline={true}
                                        onChangeText={data => this.setState({ titleHolder: data })}
                                        underlineColorAndroid='transparent'
                                    />
                                </View>
                            </View>
                            <Divider style={styles.divider} />
                            <View style={{ flexDirection: 'row' }}>
                                <Icon style={{ margin: 20 }} size={25} color='#8352F2' name='description' />
                                <View style={styles.input2}>
                                    <TextInput
                                        style={{ padding: 10 }}
                                        placeholder="Write your post here..."
                                        multiline={true}
                                        onChangeText={data => this.setState({ descriptionHolder: data })}
                                        underlineColorAndroid='transparent'
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>
                   
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'flex-end',marginBottom:"5%",marginRight:"5%"  }}>
                    <Ant size={40} name='pluscircle' style={{ color: '#8352F2' }} onPress={() => { this.setState({ isVisible: true }) }} />
                </View>
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding:"5%",
        paddingTop:"10%",
    },
    contentContainer1: {
        paddingTop:"5%",
        paddingBottom:"5%",
    },
    rowContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    event: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 18,
    },
    cardView: {

        borderRadius: 15,
        backgroundColor: 'white',
        padding: "5%",
        margin: "1%",
        //ios
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,

        //android
        elevation: 5,
    },
    noData:{
        color:"#808080",
    },
    proRow: {
        flexDirection: "row",
        alignItems: 'center',
        padding: "2.5%",
    },

    profilePicContainer: {
        flex: 2,

    },
    profileInfoContainer: {
        flex: 7,
        paddingLeft: "2.5%",
    },
    iconInfoContainer: {
        marginLeft: "2.5%",
    },
    botIcon: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    iconContainer: {
        flex: 1,
        padding: "2.5%",
        justifyContent: "center",
        alignItems: "center",
    },
    proTitle: {
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "2.5%",
        paddingTop:"5%",
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
    input: {
        backgroundColor: '#ECECEC',
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        padding: 2,
        flex: 1,
    },
    input2: {
        backgroundColor: '#ECECEC',
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        padding: 2,
        height: 200,
        flex: 1,
    },
    inactive: {
        color: '#808080',
    },
    text: {
        color: '#8352F2',
        marginBottom: 20,
        flex: 1
    },
    noDataContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    divider: {
        backgroundColor: '#373737',
    },
});