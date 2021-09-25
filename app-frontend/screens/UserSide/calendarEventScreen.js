import React,{ Component } from "react";
import { View,Text,StyleSheet,Image } from "react-native";
import { TouchableOpacity } from 'react-native';
import Logo from '../../images/logo.png'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class calendarEventScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            eventName:"Join for the Spartan Run!",
            eventTime:"Tuesday, 10:00AM - 10:30AM",
            remindTime:"1 hour",
            remindHour:1,
            remindDay:0,
            remindMinute:0,
        };
        
    }
    mark=()=>{
        
    };
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>
                        {this.state.eventName}
                    </Text>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.row}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={Logo} />
                        </View>
                        <View style={styles.eventTextContainer}>
                            <View style={styles.column}>
                                <View style={styles.eventInfoContainer}>
                                    <Text style={styles.infoText}>
                                        {this.state.eventName}
                                    </Text>
                                </View>
                                <View style={styles.eventInfoContainer}>
                                    <Text style={styles.infoText}>
                                        {this.state.eventTime}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        
                    </View>
                    
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.row}>
                        <View style={styles.imageContainerBot}>
                            <Image style={styles.image} source={Logo} />
                        </View>
                        <View style={styles.eventTextContainer}>
                            <Text>
                                {this.state.remindTime} before
                            </Text>
                        </View>
                        
                    </View>
                    
                </View>
                <View style={styles.botSpace}>
                    <TouchableOpacity onPress={this.mark}>
                        <Text style={styles.botText}>
                            Mark as done
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export const styles=StyleSheet.create({
    container:{
        backgroundColor:"white",
        flex:1,
        padding:"10%",
    },
    title:{
        flex:1,
    },
    titleText:{
        fontSize:20,
    },
    infoText:{
        fontSize:15,
    },
    row:{
        flexDirection:"row",
        flex:1,
    },
    column:{
        flexDirection:"column",
        flex:1,
    },
    infoContainer:{
        flex:1,
        justifyContent:"center",
    },
    
    imageContainer:{
        flex:1,
        marginRight:"5%",    
    },
    imageContainerBot:{
        flex:1,
        marginRight:"5%",   
        justifyContent:"center", 
    },
    image:{
        width: '100%',
        height: undefined,
        aspectRatio: 1,

    },
    eventInfoContainer:{
        flex:1,
    },
    botSpace:{
        flex:6,
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"flex-end",
    },
    botText:{
        color:"#8352F2",
        fontSize:20,
    },
    eventTextContainer:{
        flex:9,
        justifyContent:"center",
    },
});