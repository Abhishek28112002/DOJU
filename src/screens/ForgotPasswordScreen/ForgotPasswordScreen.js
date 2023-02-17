import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ToastAndroid,
} from "react-native";
import React from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Fetchpostapi, Fetchgetapi } from "../../../services/Apicalls";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ForgotPasswordScreen = () => {
  const { control, handleSubmit } = useForm();

  const navigation = useNavigation();

  const onResetPressed = async (data) => {
    AsyncStorage.setItem("forgotuserInfo", JSON.stringify(data));

    try {
      const message = await Fetchpostapi("sendotp", data);
      if (message.status === "sucess") {
        ToastAndroid.show("OTP sent to Your email", ToastAndroid.SHORT);
        navigation.navigate("ConfirmEmail");
      } else console.log(message.message);
    } catch (error) {
      console.error(error);
    }
  };
  const onSigninPressed = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset Your Password</Text>
        <CustomInput
          placeholder="username"
          name="username"
          control={control}
          rules={{
            required: "Username is required!",
          }}
        />
        <CustomInput
          name={"email"}
          placeholder="Enter Email"
          control={control}
          rules={{
            required: "Email is required!",
          }}
        />

        <CustomButton
          text={"Send Verification Code"}
          onPress={handleSubmit(onResetPressed)}
        />

        <CustomButton
          text={"Back To Sign in"}
          onPress={onSigninPressed}
          type="SECONDARY"
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051c60",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
});

export default ForgotPasswordScreen;
