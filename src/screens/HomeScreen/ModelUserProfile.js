import React, { useState, Component, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Share,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import Iconf from "react-native-vector-icons/FontAwesome";
import Comment from "./comment";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Fetchpostapi } from "../../../services/Apicalls";
const marginBottomItem = 100;
const paddingItem = 20;
const imgHeight = 100;
const UserProfile = (props) => {
  const data = props.data;
  const [user, setuser] = useState();
  useEffect(() => {
    (async () => {
      let user1 = await AsyncStorage.getItem("user");
      user1 = JSON.parse(user1);
      setuser(user1);
    })();
  }, []);
  const saveData = async (data) => {
    data.solved=true;
    try {
      const response = await Fetchpostapi("solved", data);
      if (response.status == "sucess") {
        ToastAndroid.show("Tamil !!", ToastAndroid.SHORT);
      } else Alert.alert(response.message);
    } catch (error) {
      console.error(error);
    }
  };
  const onShare = async (data) => {
    try {
      const result = await Share.share({
        message: `Name:${data.username} ,C/O:${data.fathername} ,Address:${data.address}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
  
    <ScrollView  >
       <View style={styles.modalView}>
        <TouchableOpacity
          style={{
            position: "absolute",
            left: 5,
            top: 1,
            fontSize: 15,
            fontWeight: "bold",
          }}
          onPress={() => props.onhide()}
        >
          <Iconf name={"backward"} size={25} color={"blue"} />
        </TouchableOpacity>
        <View style={styles.icon}>
          {user && user.admin && (
            <TouchableOpacity onPress={() => saveData(data)}>
              {data.solved ? (
                <Iconf name={"play-circle"} size={25} color={"green"} />
              ) : (
                <Iconf name={"play-circle"} size={25} color={"blue"} />
              )}
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => onShare(data)}>
            <Icon name={"share"} size={25} color={"blue"} />
          </TouchableOpacity>
        </View>
        <Text
          style={styles.modalText}
          style={{ color: "blue", fontSize: 30 }}
        >{`${data.username}`}</Text>
        {data.fathername && (
          <Text style={styles.modalText}>C/O: {`${data.fathername}`}</Text>
        )}
        <Text style={styles.modalText}>ADDRESS: {`${data.address}`}</Text>
        {data.age && <Text style={styles.modalText}>Age: {`${data.age}`}</Text>}
        {data.caseno && (
          <Text style={styles.modalText}>Case No: {`${data.caseno}`}</Text>
        )}
        {data.courtname && (
          <Text style={styles.modalText}>
            Court Name: {`${data.courtname}`}
          </Text>
        )}
        {data.section && (
          <Text style={styles.modalText}>Section: {`${data.section}`}</Text>
        )}
        {data.description && (
          <Text style={styles.modalText}>
            Description: {`${data.description}`}
          </Text>
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Comment data={data} />
        </ScrollView>
        </View>
    </ScrollView>
   
  );
};
// 'https://img.icons8.com/color/70/000000/administrator-male.png'
const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
    position: "absolute",
    top: 0,
    display: "flex",
    flexDirection: "column",
    right: 1, // Keep some space between your left border and Image
  },

  modalView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    padding: 5,
height:'100%',
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalText: {
    color: "red",
    marginBottom: 4,
    textAlign: "center",
    fontWeight: "bold",
    textAlign: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
  },
});
export default UserProfile;
