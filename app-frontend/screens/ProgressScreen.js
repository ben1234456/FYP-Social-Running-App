import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Picker, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default class App extends Component {
    state = {
        genderSelected: '',
        categorySelected: '',
    }

    category = {
        week: '',
        month: '',
        year: '',
    }

    render() {
        const screenWidth = 330;
        const data = {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [
                {
                    data: [6.75, 8.45, 10.3, 16.2, 9.63, 5.5],
                    color: (opacity = 1) => `rgba(131, 82, 242, ${opacity})`, // optional
                    strokeWidth: 2 // optional
                }
            ],
            legend: ["Distance (km)"] // optional
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
                <View style={styles.contentContainer}>
                    <Text style={styles.statis}>Statistics</Text>
                    <View style={styles.rowContainer}>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={this.state.activitySelected}
                                onValueChange={(itemValue) => this.setState({ activitySelected: itemValue })}>

                                <Picker.Item label="Running" value="Running" color='#999999' />
                                <Picker.Item label="Walking" value="Walking" color='#999999' />
                                <Picker.Item label="Hiking" value="Hiking" color='#999999' />
                            </Picker>
                        </View>
                        <View style={styles.category}>
                            <Picker
                                selectedValue={this.state.categorySelected}
                                backgroundColor={'white'}
                                onValueChange={(itemValue, itemPosition) => this.setState({ categorySelected: itemValue, category: itemPosition })}>

                                <Picker.Item label="WEEK" value="Week" color='#999999'/>
                                <Picker.Item label="MONTH" value="Month" color='#999999' />
                                <Picker.Item label="YEAR" value="Year" color='#999999' />
                            </Picker>
                            <Text style={styles.categoryDisplay}>25 March - 01 April 2021</Text>
                        </View>
                    </View>
                    <Text style={styles.distance}>Distance (km)</Text>
                    <Text style={styles.disValue}>6.95</Text>

                </View>
                <View style={styles.chart}>
                    <LineChart
                        data={data}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                    />
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.contentContainer2}>
                        <Text style={styles.distance}>Avg. Pace (min/km)</Text>
                        <Text style={styles.disValue}>10:77</Text>
                    </View>
                    <View style={styles.contentContainer2}>
                        <Text style={styles.distance}>Duration</Text>
                        <Text style={styles.disValue}>09:56:35</Text>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.contentContainer2}>
                        <Text style={styles.distance}>Avg. Speed (km/hr)</Text>
                        <Text style={styles.disValue}>12.63</Text>
                    </View>
                    <View style={styles.contentContainer2}>
                        <Text style={styles.distance}>Calories Burned</Text>
                        <Text style={styles.disValue}>100.55</Text>
                    </View>
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
        marginTop: 30,
        padding: 40,
    },
    contentContainer2: {
        paddingLeft: 40,
        paddingTop: 10,
    },
    rowContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20,
    },
    statis: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#373737',
    },
    picker: {
        backgroundColor: 'white',
        borderRadius: 30,
        marginTop: 15,
        width: '45%',

        //ios
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,

        //android
        elevation: 5,
    },
    category: {
        position: 'absolute',
        left: 210,
        top: 15,
        width: '27%',
        color: '#999999'
    },
    categoryDisplay: {
        color: '#8352F2',
        position: 'absolute',
        textAlign: 'center',
        right: 0,
        top: 40,
        width: 90,
    },
    distance: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#8352F2',
        marginTop: 30,
    },
    disValue: {
        color: '#373737',
        fontSize: 25,
        fontWeight: 'bold',
    },
    chart: {
        marginLeft: 20,
    }
});