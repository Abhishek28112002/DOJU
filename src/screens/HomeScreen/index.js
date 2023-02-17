import React from 'react';
import {
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomNavigator from './BottomNavigator';
import IC from '../../../assets/images/logo.jpeg';
import {removeSession,getuser} from '../../../services/AsyncStorage';
const HomeScreen = () => {
  const Logout=async()=>{
    try {
      await removeSession();
      Alert.alert("You logged out Refresh app")
    } catch (error) {
      console.log(error);
    }
  }
  return (
   <>
    <StatusBar
    style={{color:'black'}}
      />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
        <Image style={styles.user} source={IC} resizeMode="cover" />
        </View>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerText]}>RECORD-BOOK</Text>
        </View>
        <View style={styles.headerRight}>
        <TouchableOpacity
        style={styles.headerText}
          style={{ position: "absolute", alignSelf: "center", right: 5 }}
          onPress={Logout}
        >
          <Icon name={'logout'} color={'white'} size={30}/>
        </TouchableOpacity>
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
  tinyLogo: {
    width: 30,
    height: 30,
    borderRadius:10,
  
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
  user: {
    width: 35,
    height: 35,
   
    borderRadius: 50,
    marginTop:5,
    marginLeft:15
  },
  header: {
    flex: 0.07,
    zIndex:-1,
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
