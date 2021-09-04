import React,{ Component } from "react";
import { View,Text,StyleSheet,Image,TextInput,Picker,TouchableOpacity,Button } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import PickerModal from 'react-native-picker-modal-view';

export default class editEventCalendarScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            eventName:"Join for the Spartan Run!",
            eventTime:"Tuesday, 10:00AM - 10:30AM",
            //default value (empty option)
            remindTime:{"Name":"Add new notifications"},
            remindHour:1,
            remindDay:0,
            remindMinute:0,
            allDay:"ON",
            //remindtime will be data selected
            data:[{
                "Name": "15 minutes before",
                "Value": "15 minutes before",
            },
            {
                "Name": "30 minutes before",
                "Value": "30 minutes before", 
            },
            {
                "Name": "45 minutes before",
                "Value": "45 minutes before",
            },
            {
                "Name": "1 hours before",
                "Value": "1 hours before", 
            },
            {
                "Name": "2 hours before",
                "Value": "2 hours before", 
            },
            {
                "Name": "3 hours before",
                "Value": "3 hours before", 
            },
            {
                "Name": "4 hours before",
                "Value": "4 hours before", 
            },
            ],
        };
        
    }
    toggle=()=>{
        if(this.state.allDay=="ON"){
            this.setState({ allDay: "OFF" });
        }
        if(this.state.allDay=="OFF"){
            this.setState({ allDay: "ON" });
        }
    };
    select=(selected)=>{
        this.setState({ remindTime: selected });
        return selected;
    };
    onClosed=()=>{
        console.log('back key pressed');
    };
    back=()=>{
        console.log('back key pressed');
    };
    testing=()=>{
        console.log(this.state.remindTime);
    };
    render(){
        const { remindTime } = this.state;
        return(
            <View style={styles.container}>
                {/* first row */}
                <View style={styles.row}>
                    <View style={styles.iconContainer}>
                        <Icon onPress={this.testing} name={"calendar"} size={30} color={"grey"} />
                    </View>
                    <View style={styles.infoContainer}>
                        <TextInput
                            style={styles.infoText}
                            placeholder = "Event Name"
                            onChangeText={(name) => this.setState({eventName:name})}
                            value = {this.state.eventName}
                        />
                    </View>
                </View> 
                {/* second row */}
                <View style={styles.row}>
                    <View style={styles.iconContainer}>
                        <Icon1 name={"notifications-none"} size={30} color={"grey"} />
                    </View>
                    <View style={styles.infoContainer}>
                        <PickerModal
                            renderSelectView={(disabled, selected, showModal) =>
                                <View>
                                    <TouchableOpacity onPress={showModal}>
                                        <Text>
                                            {this.state.remindTime.Name}
                                        </Text> 
                                    </TouchableOpacity>
                                </View>
                            }
                            onSelected={this.select}
                            items={this.state.data}
                            sortingLanguage={'tr'}
                            showToTopButton={true}
                            showAlphabeticalIndex={false}
                            autoGenerateAlphabeticalIndex={true}
                            selectPlaceholderText={'Choose one'}
                            searchPlaceholderText={'Search'}
                            requireSelection={false}
                            autoSort={false} 
                        />
                    </View>
                </View> 
                {/* third row */}
                <View style={styles.rowLast}>
                    <View style={styles.iconContainer}>
                        <Icon onPress={this.testing} name={"clock-outline"} size={30} color={"grey"} />
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.infoRowContainer}>
                            <View style={styles.infoContainerLeft}>
                                <Text>
                                    All-day
                                </Text>
                            </View>
                            <View style={styles.infoContainerRight}>
                                <TouchableOpacity style={(this.state.allDay=="ON")?styles.toggle:styles.toggled} onPress={this.toggle}>
                                    <Text style={(this.state.allDay=="ON")?styles.toggleText:styles.toggledText}>
                                        {this.state.allDay}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.infoRowContainer}>
                            <View style={styles.infoContainerLeft}>
                                <Text>
                                    Thu,Jun 9,2021
                                </Text>
                            </View>
                            <View style={styles.infoContainerRight}>
                                <Text>
                                    9:00AM
                                </Text>
                            </View>
                        </View>
                        <View style={styles.infoRowContainer}>
                            <View style={styles.infoContainerLeft}>
                                <Text>
                                    Fri,Jun 10,2021
                                </Text>
                            </View>
                            <View style={styles.infoContainerRight}>
                                <Text>
                                    8:30AM
                                </Text>
                            </View>
                        </View>
                    </View>
                    
                </View> 
                <View style={styles.botBtnContainer}>
                    <TouchableOpacity style={styles.botBtn}>
                        <Text style={styles.btnText}>
                            Save
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
    row:{
        flexDirection:"row",
        marginBottom:"5%",
    },
    iconContainer:{
        flex:1,
    },
    rowLast:{
        flexDirection:"row",
        height:"40%",
    },
    infoContainer:{
        flex:9,
        marginLeft:"5%",
        justifyContent:"center",
    },
    infoRow:{
        flex:9,
        marginLeft:"5%",
        
    },
    infoContainerLeft:{
        justifyContent:"center",
        flex:9,
    },
    infoContainerRight:{
        justifyContent:"center",
        flex:2,
    },
    infoText:{
        fontSize:15,
        borderBottomWidth:1,
        marginRight:"20%",
    },
    toggle:{
        backgroundColor:"#8352F2",
        borderRadius:15,
        alignItems:"center",
        paddingTop:"1%",
        paddingBottom:"1%",
    },
    toggled:{
        backgroundColor:"white",
        borderRadius:15,
        alignItems:"center",
        paddingTop:"1%",
        paddingBottom:"1%",
        borderColor:"#8352F2",
        borderWidth:1,
    },
    toggleText:{
        color:"white",
    },
    toggledText:{
        color:"#8352F2",
    },
    infoRowContainer:{
        flexDirection:"row",
        marginBottom:"5%"
    },
    botBtnContainer:{
        justifyContent:"flex-end",
        flex:1,
    },
    botBtn:{
        alignItems:"center",
        backgroundColor:"#8352F2",
        borderRadius:30,
        padding:"5%",
    },
    btnText:{
        color:"white",
    },
});