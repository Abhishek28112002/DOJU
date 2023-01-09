import * as Location from 'expo-location';
import React, {useEffect, useState} from 'react';

const GetLocation=()=>{
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      

      let address = await Location.reverseGeocodeAsync(location.coords);
     
      console.log(address);
      return address;
    })();
  }, []);
}
export {GetLocation};