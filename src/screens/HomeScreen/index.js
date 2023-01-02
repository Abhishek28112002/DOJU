import React from 'react';
import {
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import BottomNavigator from './BottomNavigator';
import IC from '../../../assets/images/logo.jpeg';
import {removeSession,getuser} from '../../../services/AsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
const HomeScreen = () => {
  const navigation = useNavigation();
  const Logout=async()=>{
    try {
      await removeSession();
      Alert.alert("You have logged out Refresh app")
    } catch (error) {
      console.log(error);
    }
  }
  return (
   <>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
        <Image style={styles.user} source={IC} resizeMode="cover" />
        </View>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerText]}>RECORD-BOOK</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
      style={styles.headerText}  onPress={Logout}><Text   style={styles.headerText} >LogOut</Text></TouchableOpacity>
        </View>
      </View>
      <BottomNavigator />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 16,
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
  user: {
    width: 40,
    height: 40,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 50,
    marginTop:3
  },
  header: {
    flex: 0.08,
    flexDirection: 'row',
    backgroundColor: '#100b30',
  },
  headerText: {
    color: 'white',
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 20,
  },
  headerLeft: {
    flex: 0.2,
  },
  headerCenter: {
    flex: 0.6,
    alignItem: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
