import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import FlatListComponent from "./FlatListComponent";
import CustomInput from "../../components/CustomInput";
import RefreshIcon from "../../../assets/images/refreshIcon.png";

const RecentAdded = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  //  Location.setGoogleApiKey("AIzaSyD5GUOMMrDY5Ml8JOQ5j7z7p9f8GaGCDBg");
  const [refreshing, setRefreshing] = React.useState(false);

  const getData = async () => {
    try {
      const row = await fetch(
        "https://pxssd9y628.execute-api.ap-south-1.amazonaws.com/prod/record"
      );
      const dt = await row.json();
      setData(dt.Items.slice(0, 100));
      setFilteredDataSource(dt.Items.slice(0, 100));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const searchFilterFunction = (text) => {
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
          style={{ position: "absolute", alignSelf: "center", right: 10 }}
          onPress={() => getData()}
        >
          <Image style={styles.tinyLogo} source={RefreshIcon} />
        </TouchableOpacity>
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
    width: 50,
    height: 50,
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
