import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import React from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fetchpostapi, Fetchgetapi } from "../../../services/Apicalls";
const NewPasswordScreen = () => {
  const { control, handleSubmit, watch } = useForm();
  const navigation = useNavigation();
  const pwd = watch("password");

  const onResetPressed = async (data) => {
    const useri = await AsyncStorage.getItem("forgotuserInfo");
    const userii = JSON.parse(useri);
    userii.password = data.password;
    try {
      const message = await Fetchpostapi("resetpassword", userii);
      if (message.status === "sucess") {
        Alert.alert("Password Changed");
        navigation.navigate("SignIn");
      } else {
        console.log(message.message);
        Alert.alert("Incorrect OTP");
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
        <Text style={styles.title}>Set New Password</Text>
        <CustomInput
          name={"password"}
          placeholder="Create New Password"
          control={control}
          rules={{
            required: "Password is required!",
            minLength: {
              value: 8,
              message: "Password should be atleast 8 character long",
            },
          }}
          secureTextEntry
        />
        <CustomInput
          name={"cpassword"}
          placeholder="Confirm New Password"
          control={control}
          rules={{
            validate: (value) => value === pwd || "Password do not match",
          }}
          secureTextEntry
        />

        <CustomButton text={"Reset"} onPress={handleSubmit(onResetPressed)} />

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

export default NewPasswordScreen;
