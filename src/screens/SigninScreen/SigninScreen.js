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
import { Fetchpostapi, Fetchgetapi } from "../../../services/Apicalls";
const SigninScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const { control, handleSubmit, reset } = useForm();

  const onSignInPress = async (data) => {
    const apptoken = await AsyncStorage.getItem("AppToken");
    data.apptoken = apptoken;
    try {
      const response = await Fetchpostapi("login",data);
      if (response.status == "sucess") {
        reset();
        storeuser(response.user);
        storeSession(response.token);
        navigation.navigate("Home");
      } else Alert.alert(response.message);
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
    width: 100,
    height: 100,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 100,
    marginBottom: 20,
    marginTop: 120,
  },
});

export default SigninScreen;
