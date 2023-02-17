import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Modal,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import React, { useState } from "react";
import ModelUser from "./ModelUserProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fetchpostapi } from "../../../services/Apicalls";
const imgHeight = 100;
const FlatListComponent = (props) => {
  let data = props.data;
  const [modalVisible, setModalVisible] = useState(true);
  const [modeldata, setmodeldata] = useState();
  const DelteData = async ({ date }) => {
    let user = await AsyncStorage.getItem("user");
    user = JSON.parse(user);
    try {
      const data = await Fetchpostapi("deletewatchlater", {
        userId: user.username,
        date: date,
      });
      if (data.status == "sucess") {
        ToastAndroid.show(
          "Record Removed from Watch Later List",
          ToastAndroid.SHORT
        );
      } else Alert.alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setmodeldata(item);
          setModalVisible(false);
        }}
        style={{ width: "49%" }}
      >
        <View style={styles.item}>
          {props.watchlatar == "yes" && (
            <TouchableOpacity
              style={{
                position: "absolute",
                alignSelf: "center",
                right: 10,
                top: 10,
                fontSize: 20,
                fontWeight: "bold",
              }}
              onPress={() => DelteData(item)}
            >
              <Icon name={"delete"} size={20} color={"red"} />
            </TouchableOpacity>
          )}
          <Image
            style={styles.avatar}
            source={{
              uri: `${item.image}`,
            }}
            resizeMode="contain"
          />
          {item.solved ? (
            <Text style={styles.fontSize} style={{ color: "green" }}>
              {`${item.username}`}
            </Text>
          ) : (
            <Text style={styles.fontSize} style={{ color: "red" }}>
              {`${item.username}`}
            </Text>
          )}
          <Text
            style={styles.fontSize}
            style={{ color: "blue" }}
          >{`${item.fathername}`}</Text>
          <Text>{`${item.address}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <SafeAreaView style={styles.root}>
        {modalVisible ? (
          <FlatList
            numColumns={2}
            initialNumToRender={6}
            data={data}
            renderItem={renderItem}
          />
        ) : (
          <ModelUser data={modeldata} onhide={() => setModalVisible(true)} />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  fontSize: {
    marginTop: -1,
    fontSize: 15,
    color: "black",
  },
  image: {
    width: 100,
    height: imgHeight,
  },
  wrapText: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  item: {
    alignItems: "center",
    height: 210,
    overflowY: "hidden",
    marginBottom: 2,
    marginRight: 1,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    padding: 4,
  },
  container: {
    flex: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
  },
});
export default FlatListComponent;
