import React, { Component } from 'react';
import { View, Image, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert, FlatList, Modal, Animated, Easing } from 'react-native';
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Font from 'react-native-vector-icons/FontAwesome'
import Ant from 'react-native-vector-icons/AntDesign'
import profileImage from '../images/avatar.jpg';
import Ion from 'react-native-vector-icons/Ionicons';
import moment, { max, relativeTimeThreshold } from 'moment';

export default class ForumScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currenDate: new Date().toLocaleString(),
            viewSection: false,
            id: "",
            name: "",
            eventdata: "",
            heart: true,
            date: "",
            data: [
                { id: '1', name: { "title": "Male", "first": "Alan", "last": "Walker" }, img: profileImage, date: 'Sep 1, 2021', like: 'heart-o', noLike: 1, title: 'Title here', description: 'This is the description that users write', comment: 0, comments: '', delete: '', status: false },
                { id: '2', name: { "title": "Male", "first": "Tom", "last": "Holland" }, img: profileImage, date: 'Sep 1, 2021', like: 'heart-o', noLike: 2, title: 'Title here', description: 'This is the description that users write', comment: 0, comments: '', delete: '', status: false },
                { id: '3', name: { "title": "Female", "first": "Billie", "last": "Elish" }, img: profileImage, date: 'Sep 1, 2021', like: 'heart-o', noLike: 5, title: 'Title here', description: 'This is the description that users write', comment: 0, comments: '', delete: '', status: false },
                { id: '4', name: { "title": "Male", "first": "John", "last": "Cena" }, img: profileImage, date: 'Sep 1, 2021', like: 'heart-o', noLike: 10, title: 'Title here', description: 'This is the description that users write', comment: 0, comments: '', delete: '', status: false },
            ],
            isVisible: false,
            commentHolder: '',
            titleHolder: '',
            descriptionHolder: '',
            fadeAnim: new Animated.Value(0)
        }
        this.arrayholder = [];

    }

    changeLike = () => {
        let newState;
        if (this.state.data) {
            newState = {
                fav: false,
                noLike: this.state.noLike + 1,
            }
        } else {
            newState = {
                fav: true,
            }
        }
        // set new state value
        this.setState(newState)
    };

    componentDidMount() {
        this.arrayholder = this.state.data
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
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
            this.state.data.push({ id: id += 1, name: { "title": "Male", "first": "My", "last": "Name" }, img: profileImage, date: moment(this.state.currenDate).fromNow(), like: 'heart-o', noLike: 0, title: this.state.titleHolder, description: this.state.descriptionHolder, comment: 0, comments: '', delete: 'delete', status: false });
            this.arrayholder = this.state.data;
            this.setState({ isVisible: !this.state.isVisible })
            this.setState({ titleHolder: '' })
            this.setState({ descriptionHolder: '' })

            return true;
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

        Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 5000,
            easing: Easing.bounce
        }).start();
    }

    // removeLike(id) {
    //     const index = [this.state.data.findIndex(like => like.id === id)];
    //     //const index = this.state.data.map(function (x) { return x.id; }).indexOf(id);

    //     this.state.data[index].noLike -= 1;
    //     this.state.data[index].like = 'heart-o';

    //     console.log(this.state.data[index].noLike);
    // }

    fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 5000
        }).start();
    };

    fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 3000
        }).start();
    };

    render() {
        return (
            <View
                style={styles.container}>
                <View style={styles.contentContainer1}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.event}>Discussion Forum</Text>
                        <Icon size={25} style={{ marginRight: 20 }} name='person-add' color='#808080' onPress={() => this.props.navigation.navigate('BuddiesListScreen')} />
                        <Icon size={25} name='leaderboard' color='#808080' onPress={() => this.props.navigation.navigate('eventsScreen')} />
                    </View>
                </View>
                <FlatList
                    data={this.state.data}
                    keyExtractor={item => item.first}
                    renderItem={({ item }) => (
                        <View style={styles.cardView}>
                            <View style={styles.proRow}>
                                <View style={styles.proTitle}>
                                    <Image style={styles.proColumnName} source={item.img} />
                                </View>
                                <View style={styles.proTitle}>
                                    <Text style={styles.title}>{`${item.name.first} ${item.name.last}`}</Text>
                                    {/* <Text style={styles.proDetails}>{this.state.name}</Text> */}
                                    <Text style={styles.date}>{`${item.date}`}</Text>
                                </View>
                                <View style={styles.proTitle}>
                                    <TouchableOpacity onPress={() => this.delete(item.id)}><Icon2 size={25} name={item.delete} color='#808080' /></TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <View style={styles.proTitle}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.description}>{item.description}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.proRow}>
                                <View style={styles.proTitle}>
                                    <Font size={25} name={item.like} onPress={() => this.updateLike(item.id)} color='#FF4141' />
                                </View>
                                <View style={styles.icon}>
                                    <Text>{item.noLike}</Text>
                                </View>
                                <View style={styles.proTitle}>
                                    <Icon2 size={25} name='comment-outline' color='#808080' onPress={() => this.props.navigation.navigate('ForumDetailsScreen')} />
                                </View>
                                <View style={styles.icon}>
                                    <Text>{item.comment}</Text>
                                </View>
                            </View>

                            <View style={styles.proTitle}>
                                <View>
                                    {/* {this.renderBottomComponent()} */}
                                    <ScrollView horizontal={true} style={{ marginRight: 20 }}><Text>{item.comments ? <View><Text style={{ color: '#808080' }}>Comments</Text><Text>{item.comments}</Text></View> : []}</Text></ScrollView>

                                    {/* <FlatList
                                        data={this.state.comment}
                                        keyExtractor={item => item.comments}
                                        renderItem={({ item }) => (
                                            <View>
                                                <Text>{item.comments}</Text>
                                            </View>
                                        )}
                                    /> */}

                                    {/* <Text style={[styles.text]}>{this.state.showComment ? moment(this.state.date).fromNow() : []}</Text>
                                    <Text>{this.state.showComment ? this.state.comments:[]}</Text> */}
                                </View>
                            </View>

                            <View style={styles.proTitle}>
                                <View style={styles.proRow}>
                                    <TextInput style={styles.input}
                                        placeholder="Write a comment"
                                        onChangeText={comment_input => this.setState({ commentHolder: comment_input })}
                                        value={item.comment}
                                        multiline={true}
                                    />
                                    <Icon2 size={25} onPress={() => this.send(item.id)} name='send' style={[styles.text, !this.state.commentHolder ? styles.inactive : []]} />
                                </View>
                            </View>
                        </View>
                    )}
                />
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
                                <Text style={{ flex: 1, fontSize: 18, marginTop: 10, color: 'white' }}>Create Post</Text>
                                <TouchableOpacity onPress={this.createPost}>
                                    <View style={{ borderRadius: 10, backgroundColor: 'white', marginTop: 5, marginRight: 5, }}>
                                        <Text style={{ color: '#8352F2', alignItems: 'center', padding: 10 }}>
                                            POST
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <TextInput
                                style={{ margin: 40 }}
                                placeholder="Title"
                                onChangeText={data => this.setState({ titleHolder: data })}
                                underlineColorAndroid='transparent'
                            />
                            <TextInput
                                style={{ margin: 40 }}
                                placeholder="Write your post here"
                                onChangeText={data => this.setState({ descriptionHolder: data })}
                                underlineColorAndroid='transparent'
                            />
                        </View>
                    </Modal>
                    <View style={{ flexDirection: 'column', alignItems: 'flex-end', flex: 1 }}>
                        <Ant size={40} name='pluscircle' style={{ color: '#8352F2' }} onPress={() => { this.setState({ isVisible: true }) }} />
                    </View>
                </View>
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainer1: {
        marginTop: 30,
        padding: 20,
    },
    rowContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
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
        flex: 4,
    },
    inactive: {
        color: '#808080',
    },
    text: {
        color: '#8352F2',
        marginBottom: 20,
        flex: 1
    },
});