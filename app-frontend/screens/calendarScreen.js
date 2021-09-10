import {Agenda} from 'react-native-calendars';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
                '2021-09-05': [{time:"10:00AM - 10:30AM",plan:false}],
                '2021-09-23': [{name: 'sample name', time:"10:00AM - 10:30AM",plan:true}, {name: 'sample name 2', time:"10:00AM - 10:30AM",plan:true}],
                '2021-09-07': [],
                '2021-09-08': [{name: 'Running', time:"10:00AM - 10:30AM",plan:true}],
                '2021-09-07': [],
                '2021-09-09': [],
                '2021-09-10': [],
                '2021-09-11': [],
                '2021-09-12': [],
                '2021-09-13': [],
                '2021-09-14': [],
                '2021-09-15': [],
                '2021-09-16': [],
                '2021-09-17': [],
                '2021-09-18': [],
                '2021-09-19': [],
                '2021-09-20': [],
                '2021-09-21': [],
                '2021-09-22': [],
                '2021-09-24': [],
                '2021-09-25': [],
                '2021-09-26': [],
                '2021-09-27': [],
                '2021-09-28': [],
                '2021-09-29': [],
                '2021-09-30': [],
              },
        };
        
    }
    render() {
        return (
            
            <Agenda
                items={this.state.data}

                
                selected={this.state.currentDate}
                onDayPress={this.onDayPress.bind(this)}
                
 

                renderEmptyData = {() => {return (
                
                <View>
                    <TouchableOpacity style={styles.emptyItem} onPress={() => this.select(item)}>
                    //change style based on item plan property
                    <TouchableOpacity style={item.plan==true?styles.item:styles.emptyItem} onPress={() => this.select(item)}>
                        {item.plan==true
                        //if item plan property is true
                        ?<Text style={styles.itemText}>{item.time}</Text>
                        //if item plan property is false
                        :<View><Text style={styles.noitemText}>{item.time}</Text><Text style={styles.noItemText}>No plan today. Tap to create</Text></View>
                        }
                        {item.plan==true
                        //if item plan property is true
                        ?<Text style={styles.itemText}>{item.name}</Text>
                        //if item plan property is false
                        :null
                        }
                    </TouchableOpacity>
                    </TouchableOpacity>
                </View>
                    
                    
                );}}
                
                  // Specify how empty date content with no items should be rendered
                renderEmptyDate={() => {return (
                <View>
                    <TouchableOpacity style={styles.emptyItem} onPress={() => this.props.navigation.navigate('addEventCalendarScreen')}>
                        <View><Text style={styles.noItemText}>No plan today. Tap to create</Text></View>
                    </TouchableOpacity>
                </View>
                );}}

                renderItem={(item) => {return (
                    //change style based on item plan property
                    <TouchableOpacity style={item.plan==true?styles.item:styles.emptyItem} onPress={() => this.select(item)}>
                        {item.plan==true
                        //if item plan property is true
                        ?<Text style={styles.itemText}>{item.time}</Text>
                        //if item plan property is false
                        :<View><Text style={styles.noitemText}>{item.time}</Text><Text style={styles.noItemText}>No plan today. Tap to create</Text></View>
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
                    agendaDayTextColor: '#424242',
                    agendaDayNumColor: '#424242',
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
            this.props.navigation.navigate('calendarEventScreen');
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
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 15,
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
        color:"#808080",
        fontSize:16,
    },
  });