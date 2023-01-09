import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SigninScreen from "../screens/SigninScreen";
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import { getSession } from "../../services/AsyncStorage";
import * as Notifications from "expo-notifications";
import { useNotification } from "../screens/HomeScreen/Notification";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  }, []);
  const [location, setlocation] = useState();
  const myApiKey = "AIzaSyDLAaWAcUe2TkjzyyUDD-P1WKZiwrUebO4";
  useEffect(() => {
    (async () => {
      const token = await getSession();
      token && setSession(token);
      !token && setSession(null);
    })();
  }, []);
  const { registerForPushNotificationsAsync, handleNotificationResponse } =
    useNotification();
  const checkloggedin = async () => {
    const requestOptions = {
      method: "POST",
      body: "",
    };
    try {
      await fetch(
        "https://pxssd9y628.execute-api.ap-south-1.amazonaws.com/prod/notification",
        requestOptions
      ).then((response) => {
        response.json().then(async (data) => {
          console.log(data);
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  //   useEffect(()=>{
  //     const getLocation= async()=>{
  //       let response= await Location.requestForegroundPermissionsAsync();
  //       console.log(response.granted)
  //       if(!response.granted)
  //       {
  //         Alert.alert("Permission Denied");
  //         console.log("permisson Denied");
  //         return ;
  //       }
  //       let currentlocation=await Location.getCurrentPositionAsync()
  //       console.log("location",currentlocation.coords);
  //       const myLat=currentlocation.coords.latitude;
  //       const myLon=currentlocation.coords.longitude;
  //      const myApiKey="AIzaSyDmAYFIsWU6HqP1Zt6LGTugP7qgzg9JykI"
  //   //  console.log("mylat",typeof(myLat)," ",myLon)
  //     //   fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + myLat + ',' + myLon + '&key=' + myApiKey)
  //     //         .then((response) => response.json())
  //     //         .then((responseJson) => {
  //     //           console.log("lkj")
  //     //             console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
  //     // })

  //      var reverseGeocodedAddress = Location.reverseGeocodeAsync({
  // latitude:myLat,
  // longitude:myLon
  //      });

  //         console.log("Rev Geocoded:");
  //         console.log(await reverseGeocodedAddress);
  //         setlocation(reverseGeocodedAddress)
  // // await AsyncStorage.setItem("Userlocation",JSON.stringify(location));
  //     }
  //     getLocation();
  //       },[])

  setInterval(checkloggedin, 86400000);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session !== null ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SigninScreen} />
            {/* <Stack.Screen name="SignUp" component={SignupScreen} /> */}
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
