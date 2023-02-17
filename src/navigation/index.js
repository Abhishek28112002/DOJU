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
import FetchLocation from "../../services/FetchLocation";
const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [session, setSession] = useState(null);
   const { registerForPushNotificationsAsync, handleNotificationResponse } =
    useNotification();
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
  useEffect(() => {
    (async () => {
      //FetchLocation();
      const token = await getSession();
      token && setSession(token);
      !token && setSession(null);
    })();
  }, []);




  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session !== null ? (
          <>
          <Stack.Screen name="Home" component={HomeScreen} />
          </>
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
