import { Text, View,SafeAreaView,StyleSheet,TouchableOpacity,FlatList} from 'react-native'
import React, { Component } from 'react'
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import FullScreenLoader from '../Screens/FullScreenLoader';
export default class Home extends Component {
  constructor(props){
    Geocoder.init("AIzaSyBxvzSaxB2OhMHLmQbUGAR-UE8t_P6pV4U");
    super(props)
    this.state={
      latitude:0,
      longitude:0,
      isLoading:false,
      error: null,
      Address: null,
      AddressArray:[],
    }
  } 
  componentDidMount = async () =>{
    this.setState({isLoading:true});
    setInterval(() => {
      Geolocation.getCurrentPosition(
        position => {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          this.setState({latitude:latitude,longitude:longitude});
        },
        error =>alert(JSON.stringify("Something went wrong, please try again later!!!")),
      );
      this.getPostion();
    }, 10000)
   
    
  } 
  getPostion = async () =>{
    this.setState({isLoading:true});
    Geocoder.from(this.state.latitude, this.state.longitude)
      .then(json => {
          // console.log(json);
          var addressComponent = json.results[0].formatted_address //json.results[0].address_components;
          
          let time = moment().format('DD/MM/YYYY hh:mm:ss');
          const array = {'Address':addressComponent,'Time:':time}
          if(addressComponent !=''){
            this.state.AddressArray.push(array);
            const {AddressArray}=this.state;
            firestore()
              .collection('Users')
              .doc('ABC')
              .set({
                AddressArray
              })
              .then(() => {
                console.log('User added!');
              });
              this.setState({isLoading:false});
          }
          })
      .catch(error => console.warn(error));
      (error) => {
      // See error code charts below.
      this.setState({ error: error.message}),
      console.log(error.code, error.message);
      },      
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 100000
      }
} 

  render() {
    const {Address,AddressArray,isLoading} = this.state;
    return (
      <SafeAreaView style={styles.maincontainer}>
        <FullScreenLoader isLoading={isLoading} />
        <View style={{flex:1,height: '100%',}}>
        <Text style={styles.heading}>My Location List</Text>
        <FlatList style={{marginTop:10,marginBottom:10}}  
          data={AddressArray}
          ListEmptyComponent={()=>!AddressArray.length&&<View style={{flex:1,alignItems:'center',justifyContent:'center',height:400}}><Text style={{textAlign:'center',color:'black',fontSize:16,}}>Please Wait, Data is loading</Text></View>}
          renderItem={({ item, index }) => (
            <View style={styles.location_View}>
              <Text style={styles.headerTxt}>Address:</Text>
              <Text style={styles.addresstxt}>{item.Address}</Text>
            </View>
          )}
          />
        </View>
     </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  location_View:{
    backgroundColor:'white',
    elevation:10,
    flex:1,
    height:40,
    borderRadius:5,
    flexDirection: 'row',
    marginLeft:15,
    marginRight:15,
    marginTop:5,
    marginBottom:10
  },
  heading:{
    color:'black',
    fontSize:18,
    alignSelf:'center',
    fontWeight:'bold',
    marginTop:10
  },
  headerTxt:{
    color:'black',
    fontSize:16,
    marginLeft:5,
    fontWeight:'bold'
  },
  addresstxt:{
    color:'black',
    fontSize:14,
    marginLeft:5,
    flex:1
  }
});