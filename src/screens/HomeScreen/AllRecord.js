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
import { Fetchgetapi } from "../../../services/Apicalls";
const RecentAdded = () => {
  const[visiblesearch,setvisiblesearch] =useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
const[tamil,setTamil] = useState(0);
  const getData = async () => {
    setTamil(0);
    try {
      const dt = await Fetchgetapi("record");
      await dt.Items.sort(function (a, b) {
       
       
        if (a.username < b.username) {
          return -1;
        }
        if (a.username > b.username) {
          return 1;
        }
       
        return 0;
      });
      await dt.Items.sort(function (a, b) {
        if(a.solved && b.solved)
        return 0;
        if(a.solved)
        return 1;
        if(b.solved)
        return -1
     
      });
      await dt.Items.map((user)=>{
        if(user.solved)
        setTamil((tamil)=>tamil+1);
      })
      
      // let textData1 = await AsyncStorage.getItem("Address");
      // textData1 = JSON.parse(textData1);
      // if (textData1 != null) {
      //   await dt.Items.sort(function (a, b) {
      //     for (let city of textData1) {
      //       if (a.address.indexOf(city) > -1 && b.address.indexOf(city) == -1 && !a.solved ) {
      //         return -1;
      //       }
      //       if (a.address.indexOf(city) == -1 && b.address.indexOf(city) > -1 && !b.solved) {
      //         return 1;
      //       }
      //       if(a.solved)
      //     return 1;
      //     if(b.solved)
      //     return -1;
      //     }
         
      //     return 0;
      //   });
      // }
      setFilteredDataSource(dt.Items);
      setData(dt.Items);
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
          {filteredDataSource.length}/{tamil}
        </Text>
      </View>

      {filteredDataSource.length > 0 && (
        <FlatListComponent data={filteredDataSource} />
      )}
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
