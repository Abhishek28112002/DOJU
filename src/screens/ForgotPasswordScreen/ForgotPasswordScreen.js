import {View, Text, StyleSheet, ScrollView,Alert} from 'react-native';
import React from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';

import AsyncStorage from '@react-native-async-storage/async-storage';
const ForgotPasswordScreen = () => {
  const {control, handleSubmit} = useForm();

  const navigation = useNavigation();

  const onResetPressed = async data => {
    await AsyncStorage.setItem("forgotuserInfo",JSON.stringify(data));
    console.log(data);
    const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  };
  try {
    await fetch(
      'https://pxssd9y628.execute-api.ap-south-1.amazonaws.com/prod/sendotp',
      requestOptions,
    ).then(response => {
      response.json().then(message => {
        Alert.alert('OTP sent to Your email');
       console.log(message);
    if(message.status === 'sucess')
    navigation.navigate('ConfirmEmail');
    else
    console.log(message.message);
      })
    });
  } catch (error) {
    console.error(error);
  }
  
};
    

  const onSigninPressed = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset Your Password</Text>
        <CustomInput
          placeholder="username"
          name="username"
          control={control}
          rules={{
            required: 'Username is required!',
          }}
        />
        <CustomInput
          name={'email'}
          placeholder="Enter Email"
          control={control}
          
          rules={{
            required: 'Email is required!',
          }}
        />

        <CustomButton
          text={'Send Verification Code'}
          onPress={handleSubmit(onResetPressed)}
        />

        <CustomButton
          text={'Back To Sign in'}
          onPress={onSigninPressed}
          type="SECONDARY"
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051c60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default ForgotPasswordScreen;
