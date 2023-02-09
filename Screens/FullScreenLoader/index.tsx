import React from 'react'
import { View,Text,Dimensions, StyleSheet, ActivityIndicator } from 'react-native'
import { Colors } from '../../Themes'

const{width,height}=Dimensions.get('window')

export default function FullScreenLoader({isLoading=false}:LoaderProps) {
    return (
        isLoading?
        <View style={styles.container}>
            <ActivityIndicator color={'black'} size="large"/>
        </View>
        :null
    )
}
const styles=StyleSheet.create({
    container:{
        width:width,
        height:height,
        backgroundColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        zIndex:100
    }
})

