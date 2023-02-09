import { Text, View,SafeAreaView,PermissionsAndroid,StyleSheet} from 'react-native'
import React, { Component } from 'react'

export default class SplashScreen extends Component {
  constructor(props){
    super(props);

    this.state={

    }
  }
  componentDidMount = async () =>{
    setTimeout(() => {
      this.checkPermission();
    }, 2000);
  }

  checkPermission = async () => {
    try {
      if(Platform.OS=="android")
      {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      );
      console.log("granted",granted)
      if (granted) {
        this.props.navigation.navigate("Home");
      } else {
        console.log("Location permission denied");
        this.requestPermission();
      }

    }
    } catch (err) {
      console.warn(err);
    }
  };

  requestPermission = async () => {
    console.log("request");
    try {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION
).then((result) => {
        console.log("result",result)
        if (result === PermissionsAndroid.RESULTS.GRANTED)  {
         
          this.props.navigation.navigate("Home");
        } else {
          alert("Please give permission from setting to access location")
        }
      });
    } catch (err) {
      console.warn(err);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.maincontainer}>
        <Text style={{color:'black',fontSize:30,alignSelf: 'center',fontWeight:'bold'}}>Welcome</Text>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor:'white',
    justifyContent: 'center',
  },
})  