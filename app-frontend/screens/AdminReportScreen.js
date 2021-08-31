import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Picker, TouchableOpacity, FlatList, LogBox, YellowBox } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Entypo';
import Font from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

YellowBox.ignoreWarnings([""]);

export default class AdminReportScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: "",
            categoryPosition: '',
            categorySelected: '25 March - 01 April 2021',
            activityData: '',
            month: '',
        };


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

            fetch('http://192.168.0.192:8000/api/activity/users/' + this.state.user_id, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success')
                    this.setState({
                        activityData: data
                    });
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

        getData();

    }

    // increment() {
    //     this.setState({ categorySelected: this.categorySelected + 1 }, () => {
    //       this.result();
    //       this.forceUpdate();
    //     });
    //   }

    render() {
        const screenWidth = 330;
        const data = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July"],
            datasets: [
                {
                    data: [6.75, 8.45, 10.3, 16.2, 9.63, 5.5],
                    color: (opacity = 1) => `rgba(131, 82, 242, ${opacity})`, // optional
                    strokeWidth: 2 // optional
                }
            ],
            legend: ["Total Number of Downloads"] // optional
        };
        const data2 = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July"],
            datasets: [
                {
                    data: [2, 4, 10, 6, 8, 5],
                    color: (opacity = 1) => `rgba(131, 82, 242, ${opacity})`, // optional
                    strokeWidth: 2 // optional
                }
            ],
            legend: ["Total Number of Active Users"] // optional
        };
        const data3 = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July"],
            datasets: [
                {
                    data: [8.92, 23.46, 29.27, 12.32, 24.21, 8.47],
                    color: (opacity = 1) => `rgba(131, 82, 242, ${opacity})`, // optional
                    strokeWidth: 2 // optional
                }
            ],
        };
        const chartConfig = {
            backgroundGradientFrom: "#FFFFFF",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#FFFFFF",
            color: (opacity = 1) => `rgba(55, 55, 55, ${opacity})`,
            barPercentage: 0.5,
        };

        return (

            <ScrollView style={styles.container}>
                <View style={styles.activityContainer}>
                    <FlatList
                        data={this.state.activityData}
                        keyExtractor={item => item.id.toString()}
                        renderItem={item => this.renderItemComponent(item)}
                    />

                    {/* <TouchableOpacity>
                        <View style={styles.rowContainer}>
                            <Icon name="run" style={styles.icon} size={30} color={'#8352F2'} />
                            <View style={styles.activityInfo}>
                                <Text style={styles.activityDistance}>3.55 km</Text>
                                <Text style={styles.activityDuration}>00:40:00</Text>
                            </View>
                            <Text style={styles.date}>2021-03-03</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
                        <View style={styles.rowContainer}>
                            <Font name="bicycle" style={styles.icon} size={30} color={'#8352F2'} />
                            <View style={styles.activityInfo}>
                                <Text style={styles.activityDistance}>6.34 km</Text>
                                <Text style={styles.activityDuration}>01:00:00</Text>
                            </View>
                            <Text style={styles.date}>2021-02-02</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.rowContainer}>
                            <Icon name="hiking" style={styles.icon} size={30} color={'#8352F2'} />
                            <View style={styles.activityInfo}>
                                <Text style={styles.activityDistance}>5.67 km</Text>
                                <Text style={styles.activityDuration}>01:10:00</Text>
                            </View>
                            <Text style={styles.date}>2021-01-01</Text>
                        </View>
                    </TouchableOpacity> */}
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.statis}>Statistics</Text>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="chevron-left" size={30} color={'#8352F2'} />
                            <Picker style={styles.picker}
                                selectedValue={this.state.categorySelected}
                                backgroundColor={'white'}
                                onValueChange={(itemValue, itemPosition) => this.setState({ categorySelected: itemValue, categoryPosition: itemPosition })}>

                                <Picker.Item label="WEEK" value="25 March - 01 April 2021" color='#999999' />
                                <Picker.Item label="MONTH" value="April 2021" color='#999999' />
                                <Picker.Item label="YEAR" value="2021" color='#999999' />
                            </Picker>
                            <Icon name="chevron-right" size={30} color={'#8352F2'} /*onPress={() => this.setState({categorySelected:this.state.categorySelected+1})}*/ />
                        </View>
                    </View>
                    <Text style={styles.categoryDisplay}>{this.state.categorySelected}</Text>

                </View>

                <View style={styles.rowContainer2}>
                    <View style={styles.contentContainer2}>
                        <Text style={styles.distance}>App Downloads</Text>
                    </View>
                </View>
                <View style={styles.chart}>
                    <LineChart
                        data={data}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                    />
                </View>

                <View style={styles.rowContainer2}>
                    <View style={styles.contentContainer2}>
                        <Text style={styles.distance}>Active Users</Text>
                    </View>
                </View>
                <View style={styles.chart}>
                    <LineChart
                        data={data2}
                        width={screenWidth}
                        height={220}
                        //verticalLabelRotation={30}
                        chartConfig={chartConfig}
                        bezier
                    />
                </View>

                <View style={styles.rowContainer2}>
                    <View style={styles.contentContainer2}>
                        <Text style={styles.distance}>Average Visit Time</Text>
                    </View>
                </View>
                <View style={styles.chart}>
                    <BarChart
                        data={data3}
                        width={screenWidth}
                        height={220}
                        //yAxisLabel="$"
                        chartConfig={chartConfig}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainer: {
        padding: 40,
    },
    contentContainer2: {
        paddingLeft: 40,
        paddingTop: 40,
    },
    activityContainer: {
        marginTop: 30,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 30,
        paddingLeft: 40,
        paddingRight: 40,
    },
    rowContainer2: {
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowContainer3: {
        paddingTop: 20,
    },
    more: {
        color: '#8352F2',
        fontSize: 16,
    },
    icon: {
        flex: 0,
        marginRight: 30
    },
    activityInfo: {
        flex: 1,
    },
    activityDistance: {
        color: '#373737',
    },
    activityDuration: {
        color: '#808080',
    },
    activityTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#373737',
    },
    statis: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#373737',
    },
    picker: {
        backgroundColor: 'white',
        borderRadius: 30,
        width: 100,

        //ios
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,

        //android
        elevation: 5,
    },
    categoryDisplay: {
        color: '#8352F2',
        textAlign: 'center',
    },
    distance: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#8352F2',
    },
    chart: {
        marginLeft: 20,
    },
});