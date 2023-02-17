import React,{useEffect,useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import RecentAdded from './RecentAdded';
import AllRecord from './AllRecord';
import AddRecord from './AddRecord';
import { getuser } from "../../../services/AsyncStorage";
import WatchLatter from './WatchLater';
const Tab = createBottomTabNavigator();

const BottomNavigator =() => {
  const [user,setuser]=useState();
  useEffect(() => {
    (async () => {
      const user = await getuser();
      setuser(JSON.parse(user));
    })();
  }, []);
  
  
  return (
   
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Recent':
              iconName = 'time-slot';
              break;
            case 'All Record':
              iconName = 'flow-tree';
              break;
            case 'Watch Later':
              iconName = 'save';
              break;
            case 'Add Record':
              iconName = 'evernote';
              break;
          }

          return <Icon name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Recent" component={RecentAdded} />
      <Tab.Screen name="All Record" component={AllRecord} />
      <Tab.Screen name="Watch Later" component={WatchLatter} />
    { user&&user.admin&&
      <Tab.Screen name="Add Record" component={AddRecord} />
}
    </Tab.Navigator>
  );
};

export default BottomNavigator;
