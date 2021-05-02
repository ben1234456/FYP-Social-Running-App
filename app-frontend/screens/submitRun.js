import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView,TouchableOpacity} from 'react-native';
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux';
import Event from '../images/event.png';
import * as ImagePicker from 'expo-image-picker';
import addImage from '../images/addImage.png';
import Run from '../images/running.jpg';
//import { createAppContainer } from "react-navigation";

export default class submitRun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDistance:1,
      imageSource:addImage,
    };
  }

  increase = () => {
    this.setState({ currentDistance: this.state.currentDistance+1});
  };
  decrease = () => {
    if(this.state.currentDistance!=1){
      this.setState({ currentDistance: this.state.currentDistance-1 });
    }
  };
  chooseImage=async()=>{
    try{
      permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (pickerResult.cancelled === true) {
        return;
      }
    if (pickerResult.uri !== null) {
      this.setState({ imageSource: {uri: pickerResult.uri }});
    }
    }
    catch(err){
      console.error(err);
    }

      
    
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.infoBack}>
          <Text style={styles.title}>
              Upload the screenshot of your distance
          </Text>
          <TouchableOpacity onPress={this.chooseImage} style={styles.cameraBack}>
              <Image source={this.state.imageSource} style={(this.state.imageSource==addImage)?styles.camera:styles.selectedImage} />
          </TouchableOpacity>
          <Text style={styles.distance}>
              Distance submitted (km):
          </Text>
          <View style={styles.selectDistance}>
            <TouchableOpacity style={styles.column} onPress={this.decrease}>
              <View  >
                <Text style={styles.choose} > 
                    -
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.column}>
              <Text style={styles.distance}>
                  {this.state.currentDistance}
              </Text>
            </View>
            <TouchableOpacity style={styles.column} onPress={this.increase}>
              <View  >
                  <Text style={styles.choose} >
                      +
                  </Text>
              </View>
            </TouchableOpacity>
          </View>  
        </View>
        <View style={styles.submitBack}>
          <Button block style={styles.submitBtn}>
              <Text style={styles.btnText}>SUBMIT</Text>
          </Button>
        </View>
          
      </View>
      
    );
  }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:"column",
      },
      camera: {
        width:40,
        height:40,
        margin:"5%",
      },
      title: {
        color:"#4d535c",
        fontSize: 20,
        fontWeight:"bold",
      },
      cameraBack: {
        alignSelf:"center",
        backgroundColor: '#e4e7ed',
        borderRadius: 15,
        padding:"5%",
        marginTop:"5%",
        width:"20%",
        marginBottom:"5%",
      },
      distance: {
        color:"#4d535c",
        fontSize: 20,
        alignSelf:"center",
      },
      selectDistance:{
          flexDirection:"row",
          marginTop:"5%",
          borderRadius: 15,
          width:"auto",
          borderWidth:1,
          alignSelf:"center",
      },
      column:{
        marginRight:"5%",
        marginLeft:"5%",
        
      },
      choose:{
        fontSize: 20,
        fontWeight:"bold"
      },
      submitBtn:{
        alignSelf:"center",
        borderRadius: 30,
        width:"auto",
        paddingLeft:"30%",
        paddingRight:"30%",
        backgroundColor:"#8100e3",
        
      },
      btnText:{
        color:"#ffffff",
        fontWeight:"bold",
      },
      submitBack:{
        flex:1,
        justifyContent:"center",
      },
      
      infoBack:{
        flex:9,
        justifyContent:"center",
      },
      selectedImage:{
        height:200,
        width:200,
      },
});


