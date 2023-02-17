import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Modal,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { Fetchpostapi } from "../../../services/Apicalls";
function Comment(props) {
 let data = props.data;
   const [user, setuser] = useState();
 const [comment, setcomment] = useState("");
  useEffect(() => {
    (async () => {
      const userid = await AsyncStorage.getItem("user");
      const useri = JSON.parse(userid);
      setuser(useri.username);
    })();
  }, []);

  const postcomment = async () => {
    if (comment == "") {
      ToastAndroid.show("Empty comment is not allowed", ToastAndroid.SHORT);
      return;
    }
    let user = await AsyncStorage.getItem("user");
    user = JSON.parse(user);
    const userComment = {
      userId: user.username,
      comment: comment,
      date: data.date,
    };
    const userrecorddata = data;
    userrecorddata.userId = user.username;
    try {
      const response = await Fetchpostapi("addcomment", userComment);
      const watchlaterreq = Fetchpostapi("watchlater", userrecorddata);
      if (response.status == "sucess") {
        data.comment = data.comment ? data.comment : [];
        data.comment = [...data.comment, userComment];
        setcomment("");
        ToastAndroid.show("comment posted", ToastAndroid.SHORT);
      } else {
        Alert.alert(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const DeleteComment = async (item) => {
    const userComment = {
      date: data.date,
      commentdate: item.date,
    };

    try {
      const response = await Fetchpostapi("deletecomment", userComment);

      if (response.status == "sucess") {
        let index = 0;
        let x = data.comment;
        for (let i of x) {
          if (i.date == userComment.commentdate) {
            data.comment.splice(index, index + 1);
            break;
          }

          index++;
        }
        ToastAndroid.show("Comment Deleted", ToastAndroid.SHORT);
      } else {
        Alert.alert(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const renderItem = ({ item, index }) => {
    let time = new Date(item.date);
    const datestring = time.toString();

    let x = datestring.split("GMT");

    return (
      <View key={index} style={styles.message}>
        <View>
          <Text style={{ color: "red", fontSize: 15, fontWeight: "bold" }}>
            {" "}
            {user == item.userId ? "You" : `${item.userId}`}{" "}
          </Text>
          <Text
            style={{ color: "white", fontSize: 15 }}
          >{`${item.comment}`}</Text>
          <Text style={{ color: "white", fontSize: 10 }}>{x[0]}</Text>
        </View>
        {user == item.userId && (
          <View>
            <TouchableOpacity
              style={{
                position: "absolute",
                alignSelf: "center",
                right: -30,
                top: -50,
                fontSize: 15,
                fontWeight: "bold",
              }}
              onPress={() => DeleteComment(item)}
            >
              <Icon name={"remove"} size={20} color={"blue"} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{ height: 400 }}>
      <TextInput
        style={{
          width: 320,
          marginRight: 10,

          height: 35,
          padding: 5,
          fontSize: 15,
        }}
        value={comment}
        placeholder=" Type here"
        onChangeText={(text) => setcomment(text)}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 1,
          top: 8,
          fontSize: 15,
          fontWeight: "bold",
        }}
        onPress={() => postcomment()}
      >
        <Icon name={"send"} size={25} color={"blue"} />
      </TouchableOpacity>
      <FlatList
        style={{ marginTop: 10 }}
        data={data.comment}
        renderItem={renderItem}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  message: {
    fontSize: 15,
    backgroundColor: "blue",
    marginTop: 5,
    alignSelf: "flex-start",
    maxWidth: 310,
    borderRadius: 10,
    padding: 5,
    flex: 1,
    justifyContent: "flex-start",
  },
});

export default Comment;
