import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackParamList } from '../../navigation/types'
import {View, StyleSheet, Text, Button } from 'react-native'

type props = NativeStackScreenProps<AppStackParamList, 'Home'>
export default function HomeScreen({navigation}: props){
  return (
    <View style = {styles.container}>
      <Text style ={styles.titleText} >Home</Text>
      <Text>Landing Page Placeholders</Text>

      <Button
        title='Go to settings' 
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 16,
    gap: 12
  },
  titleText:{
    fontSize: 20,
    fontWeight: 700
  }

})