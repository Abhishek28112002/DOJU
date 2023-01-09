import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const useNotification=()=>{
   const registerForPushNotificationsAsync = async () => {
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          await AsyncStorage.setItem("AppToken",JSON.stringify(token));
          console.log("token",token);
         
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      };
      const handleNotification = (notification: Notifications.Notification) => {
        // could be useful if you want to display your own toast message
        // could also make a server call to refresh data in other part of the app
      };
    
      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      const handleNotificationResponse = (
        response: Notifications.NotificationResponse
      ) => {
        const data: { url?: string } = response.notification.request.content.data;
    
        if (data?.url) Linking.openURL(data.url);
      };
      return {registerForPushNotificationsAsync,handleNotification,handleNotificationResponse}
}