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
} from "react-native";
import React, { useState } from "react";
import ModelUser from "./ModelUserProfile";
const marginBottomItem = 20;
const paddingItem = 10;
const imgHeight = 100;
const FlatListComponent = ({ data }) => {
const [modalVisible, setModalVisible] = useState(false);
const [modeldata, setmodeldata] = useState();
const renderItem = ({ item, index }) => {
return (
  <TouchableOpacity
    key={index}
    onPress={() => {
      setmodeldata(item);
      setModalVisible(true);
    }}
    style={{ width: "49%" }}
  >
    <View style={styles.item}>
      <Image
        style={styles.avatar}
        source={{
          uri: `${item.image}`,
        }}
        resizeMode="contain"
      />

      <Text style={styles.fontSize}> {`${item.username}`}</Text>
      <Text style={styles.fontSize}>{`${item.fathername}`}</Text>
      <Text>{`${item.address}`}</Text>
    </View>
  </TouchableOpacity>
);
  };
  return (
    <>
      <SafeAreaView style={styles.root}>
        <FlatList numColumns={2} data={data} renderItem={renderItem} />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ModelUser data={modeldata} />
        </Modal>
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
