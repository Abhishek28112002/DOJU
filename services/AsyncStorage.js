import AsyncStorage from '@react-native-async-storage/async-storage';

const storeSession = async value => {
  try {
    await AsyncStorage.setItem('sessionn', value);
  } catch (error) {
    console.log(error.message);
  }
};


const getSession = async () => {
  try {
    const session = await AsyncStorage.getItem('sessionn');
    if (session !== null) {
      const data=await getuser();
      const requestOptions = {
        method: "POST",
        body: data,
      };
         fetch(
          "https://pxssd9y628.execute-api.ap-south-1.amazonaws.com/prod/loggedin",
          requestOptions
        ).then((response) => {
          response.json().then(async (data) => {
            console.log(data);
          });
        });
      return session;
    }
  } catch (error) {
    console.log(error);
  }
};

const removeSession = async () => {
  try {
    await AsyncStorage.removeItem('sessionn');
  } catch (error) {
    console.log(error);
  }
};


const storeuser = async value => {
  value=JSON.stringify(value);
  try {
    await AsyncStorage.setItem("user", value);
  } catch (error) {
    console.log(error.message);
  }
};


const getuser = async () => {
  try {
    const session = await AsyncStorage.getItem("user");
    if (session !== null) {
      return session;
    }
  } catch (error) {
    console.log(error);
  }
};

const storeaddress = async value => {
  value=JSON.stringify(value);
  try {
    await AsyncStorage.setItem("Address", value);
  } catch (error) {
    console.log(error.message);
  }
};


const getaddress = async () => {
  try {
    const session = await AsyncStorage.getItem("Address");
    if (session !== null) {
      return session;
    }
  } catch (error) {
    return "";
    console.log(error);
  }
};

const removeuser = async () => {
  try {
    await AsyncStorage.removeItem("user");
  } catch (error) {
    console.log(error);
  }
};

export {storeSession, getSession, removeSession,storeuser, getuser, removeuser,storeaddress, getaddress };

