import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Text,
  Alert,
  NativeModules,
} from "react-native";
import React from "react";
import Logo from "../../../assets/images/logo.jpeg";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import {
  storeSession,
  storeuser,
  getuser,
} from "../../../services/AsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SigninScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();

  const onSignInPress = async (data) => {
    console.log("Data ", data);

    const requestOptions = {
      method: "POST",
      // headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    try {
      await fetch(
        "https://pxssd9y628.execute-api.ap-south-1.amazonaws.com/prod/login",
        requestOptions
      ).then((response) => {
        response.json().then(async (data) => {
          console.log(data);
          if (data.status == "sucess") {
            await storeuser(data.user);
            const datauser = await getuser();
            console.log(datauser);
            await storeSession(data.token);
            navigation.navigate("Home");
          } else Alert.alert(data.message);
        });
      });
    } catch (error) {
      console.error(error);
    }
  };
  const onForgotPasswordPressed = () => {
     navigation.navigate("ForgotPassword");
    
  };

  const onSignupPressed = () => {
    navigation.navigate("SignUp");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
        <CustomInput
          placeholder="username"
          name="username"
          control={control}
          rules={{
            required: "Username is required!",
          }}
        />
        <CustomInput
          placeholder="Password"
          name="password"
          control={control}
          secureTextEntry
          rules={{
            required: "Password is required!",
            minLength: {
              value: 8,
              message: "Password should be atleast 8 character long",
            },
          }}
        />
        <CustomButton text={"Sign In"} onPress={handleSubmit(onSignInPress)} />
        <CustomButton
          text={"Forgot Password"}
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 28,
  },
  logo: {
    width: 150,
    height: 150,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 100,
    marginBottom: 20,
    marginTop: 50,
  },
});

export default SigninScreen;
