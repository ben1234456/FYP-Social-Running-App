import React, { Component} from 'react';
import { View, Image, Text, StyleSheet, Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Logo from '../images/logo.png';

/*const switchtoLogin = () => {
    Actions.start()
}*/



export default class SplashScreen extends Component {

    state = {
        LogoAnime: new Animated.Value(0),
        LogoText: new Animated.Value(0),
        LoadingSpinner: false,
    };

    componentDidMount() {

        Animated.parallel([
            Animated.timing(this.state.LogoAnime, {
                toValue: 1,
                tension: 10,
                friction: 2,
                duration: 1000,
                useNativeDriver: true,
            }).start(),

            Animated.timing(this.state.LogoText, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start(() => {
            this.state.LoadingSpinner = true,
            setTimeout(()=>{this.props.navigation.navigate('start')}, 500);
            this.props.navigation.replace('start');
        });
    }

    render() {
            return (
                <View style={styles.container}>
                     <Animated.View
                        style={{
                            opacity: this.state.LogoAnime,
                        }}>
                        <Image style={styles.image} source={Logo} />
                    </Animated.View>
                    <Animated.View style={{ opacity: this.state.logoText }}>
                        <Text style={styles.logoText}>SocialRunningApp</Text>
                    </Animated.View>
                </View>
            );
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#8352F2",
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoText: {
        color: '#FFFFFF',
        fontSize: 30,
        marginTop: 20,
        fontWeight: 'bold',
    },

    image: {
        width: 100,
        height: 100,
    },
});
