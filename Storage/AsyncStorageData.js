import AsyncStorage from '@react-native-community/async-storage';
// import * as HelpherFile from '@storage/HelpherFile'

export const KEY={
USER_DATA:'USER_DATA',
}


export const setValue = async (key,value) => {
    let status=false
    try {
      await AsyncStorage.setItem(key, value)
      status=true
    } catch(e) {
      console.log(e)
      status=false
    }
    return status
  }


  export const getValue = async (key) => {
    try {
      let data=  await AsyncStorage.getItem(key)
      if(data==null){

        return ''
        console.log("data",data);
      }
    else
      return  data
      console.log("data",data);
    } catch(e) {
      console.log(e)
      return ''
    }

  }

  


  export const removeAyncDataByKey = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
      return true
    } catch(e) {
      // remove error
      return false
    }
    console.log('Done.')
  }


  