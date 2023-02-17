import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import React from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fetchpostapi, Fetchgetapi } from "../../../services/Apicalls";
const ConfirmEmailScreen = () => {
  const { control, handleSubmit } = useForm();

  const navigation = useNavigation();
  const onVerifyPressed = async (data) => {
    const useri = await AsyncStorage.getItem("forgotuserInfo");
    const code = data.code;
    const userii = JSON.parse(useri);
    const user = { otp: code, username: userii.username, email: userii.email };
    try {
      const message = await Fetchpostapi("verifyotp", user);

      if (message.status === "sucess") {
        Alert.alert("OTP Verified");
        navigation.navigate("NewPassword");
      } else {
        console.log(message.message);
        Alert.alert("Incorrect OTP");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onResendCode = async () => {
    const useri = await AsyncStorage.getItem("forgotuserInfo");
    const user = JSON.parse(useri);
    try {
      const message = await Fetchpostapi("sendotp", data);
      if (message.status === "sucess") {
        ToastAndroid.show("OTP sent to Your email", ToastAndroid.SHORT);
      }
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
        <Text style={styles.title}>Verify Your Email</Text>
        <CustomInput
          name={"code"}
          placeholder="Enter Your Confirmation Code"
          control={control}
          rules={{
            required: "Confirmation code is required",
          }}
        />

        <CustomButton text={"Verify"} onPress={handleSubmit(onVerifyPressed)} />

        <CustomButton
          text={"Resend Code"}
          onPress={onResendCode}
          type="SECONDARY"
        />
        <CustomButton
          text={"Back To Sign In"}
          onPress={onSigninPressed}
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

export default ConfirmEmailScreen;
