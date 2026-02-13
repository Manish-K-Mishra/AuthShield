import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';

type props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({navigation}: props){

  return (
    <View style = {styles.container}>
      <Text style ={styles.loginText}>Login</Text>
      <Text>Plcegolder Screen </Text>

      <Button
        title='Go to Login again (Test)'
        onPress={() => navigation.push('Login')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 16,
    gap: 12
  },
  loginText:{
    fontSize: 20,
    fontWeight: 700
  }

})
