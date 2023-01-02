import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
const marginBottomItem = 100;
const paddingItem = 20;
const imgHeight = 100;
const UserProfile = ({data}) => {
    
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Image
          style={styles.avatar}
          source={{
            uri: `${data.image}`,
          }}
        />
        <Text style={styles.modalText}>{`${data.username}`}</Text>
        { data.fathername && ( <Text style={styles.modalText}>Father Name: {`${data.fathername}`}</Text>)}
        <Text style={styles.modalText}>FIR: {`${data.fir}`}  Section: {`${data.section}`}</Text>
        { data.age && ( <Text style={styles.modalText}>Age: {`${data.age}`}</Text>)}
        { data.mobile && ( <Text style={styles.modalText}>Phone No: {`${data.mobile}`}</Text>)}
        { data.imei&& ( <Text style={styles.modalText}>IMEI: {`${data.imei}`}</Text>)}
        <Text style={styles.modalText}>ADDRESS: {`${data.address}`}</Text>
        { data.courtname && ( <Text style={styles.modalText}>Court Name: {`${data.courtname}`}</Text>)}
        { data.releasedfirdate && ( <Text style={styles.modalText}>Released FIR Date: {`${data.releasedfirdate}`}</Text>)}
        { data.stationname && ( <Text style={styles.modalText}>Station Name: {`${data.stationname}`}</Text>)}
        { data.chassNumber && ( <Text style={styles.modalText}>ChassNumber: {`${data.chassNumber}`}</Text>)}
        { data.engineNumber && ( <Text style={styles.modalText}>EngineNumber: {`${data.engineNumber}`}</Text>)}
        { data.description && ( <Text style={styles.modalText}>Description: {`${data.description}`}</Text>)}
      </View>
    </View>
  );
};
// 'https://img.icons8.com/color/70/000000/administrator-male.png'
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    width:250,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalText: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
  },
});
export default UserProfile;
