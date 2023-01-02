import React, {useEffect, useState} from 'react';
import {View,Text, SafeAreaView,TextInput,StyleSheet,ScrollView} from 'react-native';
import FlatListComponent from './FlatListComponent';
import CustomInput from '../../components/CustomInput';

const AllRecord = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
 
  useEffect(() => {
    const getData = async () => {
      try {
        const row = await fetch(
          'https://pxssd9y628.execute-api.ap-south-1.amazonaws.com/prod/record',
        );
        const dt = await row.json();
        setData(dt.Items);
        setFilteredDataSource(dt.Items);
      } catch (error) {
        console.log(error);
      }
    };
     getData();
  }, []);
  const searchFilterFunction = (text) => {
    // console.log("text",text.length);
    setSearch(text);
    if (text.length>0) {
      const newData = data.filter(
        function (item) {
          let itemData = item.username
          ? item.username.toUpperCase()
          : ''.toUpperCase();
        let textData = text.toUpperCase();
        if(itemData.indexOf(textData) > -1)
        return true;
       itemData = item.address
          ? item.address.toUpperCase()
          : ''.toUpperCase();
         textData = text.toUpperCase();
        if(itemData.indexOf(textData) > -1)
        return true;

        itemData = item.fir
          ? item.fir.toUpperCase()
          : ''.toUpperCase();
         textData = text.toUpperCase();
        if(itemData.indexOf(textData) > -1)
        return true;

        itemData = item.section
          ? item.section.toUpperCase()
          : ''.toUpperCase();
         textData = text.toUpperCase();
        if(itemData.indexOf(textData) > -1)
        return true;

        itemData = item.courtname
          ? item.courtname.toUpperCase()
          : ''.toUpperCase();
         textData = text.toUpperCase();
        if(itemData.indexOf(textData) > -1)
        return true;


        itemData = item.age
          ? item.age.toUpperCase()
          : ''.toUpperCase();
         textData = text.toUpperCase();
        if(itemData.indexOf(textData) > -1)
        return true;

        itemData = item.stationname
          ? item.stationname.toUpperCase()
          : ''.toUpperCase();
         textData = text.toUpperCase();
        if(itemData.indexOf(textData) > -1)
        return true;


        itemData = item.fathername
          ? item.fathername.toUpperCase()
          : ''.toUpperCase();
        textData = text.toUpperCase();
        return(itemData.indexOf(textData) > -1)
      });
      setFilteredDataSource(newData);
    } else {
      setFilteredDataSource(data);
     
    }
  };

  return <>
  <View>
  <TextInput
      style={styles.textInputStyle}
       onChangeText={(text) => searchFilterFunction(text)}
       value={search}
      
       placeholder="Search here"
     />
     </View>
  {filteredDataSource.length > 0 && <FlatListComponent 
  data={filteredDataSource} />}
  </>;
};

export default AllRecord;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: 'red',
  
    borderShadow: '20px',
    backgroundColor: '#FFFFFF',
  },
});


