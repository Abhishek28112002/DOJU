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
          console.log("llj");
          setmodeldata(item);
          setModalVisible(true);
          console.log({ item });
        }}
      >
        <View style={styles.item}>
          <Image
            style={styles.avatar}
            source={{
              uri: `${item.image}`,
            }}
            resizeMode="contain"
            contentContainerStyle={{ padding: 20 }}
          />
          <View style={styles.wrapText}>
            <Text style={styles.fontSize}> {`${item.username}`}</Text>
            <Text style={styles.fontSize}>
              <Text style={{ color: "red" }}>Father Name: </Text> {`${item.fathername}`}
            </Text>
            <Text style={styles.fontSize}>
              <Text style={{ color: "red" }}>Section: </Text> {`${item.section}`}
            </Text>
            <Text style={styles.fontSize}>
              <Text style={{ color: "red" }}>FIR NO: </Text> {`${item.fir}`}
            </Text>
            <Text style={styles.fontSize}>
              <Text style={{ color: "red" }}>CourtName: </Text>
              {`${item.courtname}`}
            </Text>
            <Text style={styles.fontSize}>
              
              <Text style={{ color: "red" }}>Address: </Text> {`${item.address}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <SafeAreaView style={styles.root}>
        <FlatList data={data} renderItem={renderItem} />
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
    flexDirection: "row",
    marginBottom: 2,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    padding: paddingItem,
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
