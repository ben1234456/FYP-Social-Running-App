import {Agenda} from 'react-native-calendars';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
export default class calendarScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate:new Date(),
            currentMonth:new Date().getMonth+1,
            //load monthly data
            //load every day even is empty
            data:{
                //scheduled
                '2021-09-03': [{name: 'sample name', time:"10:00AM - 10:30AM",plan:true}],
                '2021-09-04': [{name: 'sample name', time:"10:00AM - 10:30AM",plan:true}],
                //not scheduled
                '2021-09-05': [{plan:false}],
                '2021-09-23': [{name: 'sample name', time:"10:00AM - 10:30AM",plan:true}, {name: 'sample name 2', time:"10:00AM - 10:30AM",plan:true}],
              },
        };
        
    }
    render() {
        return (
            
            <Agenda
                items={this.state.data}
                
                selected={this.state.currentDate}
                onDayPress={this.onDayPress.bind(this)}
                
                renderItem={(item) => {return (
                    //change style based on item plan property
                    <TouchableOpacity style={item.plan==true?styles.item:styles.emptyItem} onPress={() => this.select(item)}>
                        {item.plan==true
                        //if item plan property is true
                        ?<Text style={styles.itemText}>{item.time}</Text>
                        //if item plan property is false
                        :<Text style={styles.noItemText}>No plan today. Tap to create</Text>
                        }
                        {item.plan==true
                        //if item plan property is true
                        ?<Text style={styles.itemText}>{item.name}</Text>
                        //if item plan property is false
                        :null
                        }
                    </TouchableOpacity>
                );
                }}
                
                rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
                theme={{
                    agendaDayTextColor: 'green',
                    agendaDayNumColor: 'green',
                    agendaTodayColor: 'red',
                  }}
                
            />
        );}
        //trigger when a day in the calendar is pressed
        onDayPress=(day)=>{
            //load data based on day.month
        };
        //trigger when user select an activity
        select=(item)=>{
            this.props.navigation.navigate('calendarDetailScreen');
        };
}
const styles = StyleSheet.create({
    //activity scheduled
    item: {
        backgroundColor: '#8352F2',
        flex: 1,
        borderRadius: 15,
        justifyContent:"center",
        padding: "5%",
        marginRight: "3%",
        marginTop: "5%",
        marginBottom:"5%",
    },
    //no activity scheduled
    emptyItem: {
        
        flex: 1,
        borderRadius: 5,
        justifyContent:"center",
        padding: "5%",
        marginRight: "3%",
        marginTop: "5%",
        marginBottom:"5%",
    },
    //text when activity scheduled
    itemText:{
        color:"white",
        fontSize:15,
    },
    //text when no activity scheduled
    noItemText:{
        color:"grey",
        fontSize:20,
    },
  });