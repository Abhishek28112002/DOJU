import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import FlatListComponent from "./FlatListComponent";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomInput from "../../components/CustomInput";
import { getaddress } from "../../../services/AsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fetchpostapi, Fetchgetapi } from "../../../services/Apicalls";
const RecentAdded = () => {
  const[modal,setmodal]=useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const getData = async () => {
    let user = await AsyncStorage.getItem("user");
    user = JSON.parse(user);
    try {
      const dt = await Fetchpostapi("getwatchlater", { userId: user.username });
      console.log(dt.Item);
      setFilteredDataSource(dt.Item.data);
      setData(dt.Item.data);
      console.log(filteredDataSource)
      ToastAndroid.show("Data Updated", ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const searchFilterFunction = async (text) => {
    setSearch(text);

    if (text.length > 0) {
      const newData = data.filter(function (item) {
        let itemData = item.username
          ? item.username.toUpperCase()
          : "".toUpperCase();
        let textData = text.toUpperCase();
        if (itemData.indexOf(textData) > -1) return true;
        itemData = item.address ? item.address.toUpperCase() : "".toUpperCase();
        textData = text.toUpperCase();
        if (itemData.indexOf(textData) > -1) return true;

        itemData = item.fir ? item.fir.toUpperCase() : "".toUpperCase();
        textData = text.toUpperCase();
        if (itemData.indexOf(textData) > -1) return true;

        itemData = item.section ? item.section.toUpperCase() : "".toUpperCase();
        textData = text.toUpperCase();
        if (itemData.indexOf(textData) > -1) return true;

        itemData = item.courtname
          ? item.courtname.toUpperCase()
          : "".toUpperCase();
        textData = text.toUpperCase();
        if (itemData.indexOf(textData) > -1) return true;

        itemData = item.age ? item.age.toUpperCase() : "".toUpperCase();
        textData = text.toUpperCase();
        if (itemData.indexOf(textData) > -1) return true;

        itemData = item.stationname
          ? item.stationname.toUpperCase()
          : "".toUpperCase();
        textData = text.toUpperCase();
        if (itemData.indexOf(textData) > -1) return true;

        itemData = item.fathername
          ? item.fathername.toUpperCase()
          : "".toUpperCase();
        textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
    } else {
      setFilteredDataSource(data);
    }
  };

  return (
    <>
     { modal &&
     <View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          placeholder="Search here"
        />
        <TouchableOpacity
          style={{ position: "absolute", alignSelf: "center", right: 7 }}
          onPress={() => getData()}
        >
          <Icon name={"refresh"} size={25} />
        </TouchableOpacity>
        <Text
          style={{
            position: "absolute",
            alignSelf: "center",
            right: 35,
            color: "red",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          {filteredDataSource.length}
        </Text>
      </View>

      {filteredDataSource.length == 0 ? (
        <Text
          style={{ flex: 1, paddingTop: 10, paddingLeft: 10, fontSize: 17 }}
        >
          You have no Record for Watch Later
        </Text>
      ) : (
        <FlatListComponent data={filteredDataSource} onHide={()=>setmodal(false)} watchlatar="yes" />
      )}
      </View>
}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  itemStyle: {
    padding: 10,
  },
  tinyLogo: {
    width: 30,
    height: 30,
  },
  textInputStyle: {
    height: 44,
    borderWidth: 1,
    paddingLeft: 15,
    margin: 4,
    borderColor: "red",

    borderShadow: "20px",
    backgroundColor: "#FFFFFF",
  },
});
export default RecentAdded;
