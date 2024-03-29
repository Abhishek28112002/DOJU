import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useForm } from "react-hook-form";
import { getuser } from "../../../services/AsyncStorage";
import * as ImagePicker from "expo-image-picker";
const PHONE_REGEX = /^[6-9]\d{9}$/;
const IMEI_REGEX = /^[0-9]{15}(,[0-9]{15})*$/;
import { RNS3 } from "react-native-aws3";
import { Fetchpostapi } from "../../../services/Apicalls";
const AddRecord = () => {
  const [photo, setPhoto] = React.useState(null);
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      name: "",
      fatherName: "",
      address: "",
      fir: "",
      age: "",
      courtname: "",
      caseno: "",
      solved:false,
      section: "",
      description: "",
    },
  });
  const option = {
    keyPrefix: "",
    bucket: "imagedoju",
    region: "ap-south-1",
    accessKey: "AKIAWGU44PD7NGKWCN6O",
    secretKey: "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",
    successActionStatus: 201,
  };
  const options = {
    title: "Select Image",
    type: "library",
    options: {
      selectionLimit: 1,
      mediaType: "photo",
      includeBase64: false,
    },
  };

  const createFormData = (photo, body = {}) => {
    const data = new FormData();
    data.append("photo", photo);
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
    return data;
  };

  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) setPhoto(result.assets[0]);
  };
  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const onRegisterPressed = async (data) => {
    var json = data;
    var imageurl = "";
    if (photo != null) {
      photo.type = "image/jpeg";
      photo.name = makeid(10);
      await RNS3.put(photo, option).then((response) => {
        if (response.status !== 201)
          throw new Error("Failed to upload image to S3");
        imageurl = response.body.postResponse.location;
      });
    }
    const useriid = await getuser();
    const userid = JSON.parse(useriid);
    json.userId = userid.username;
    json.url = imageurl;
    try {
      const data = await Fetchpostapi("record", json);
      if (data.status == "sucess") {
        Alert.alert("Case Sucessfully Added");
        reset();
      } else Alert.alert(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Add New Record</Text>
        <CustomInput
          name="name"
          placeholder="Name*"
          control={control}
          rules={{
            required: "Name is required!",
            minLength: {
              value: 3,
              message: "Name must be at least 3 character long.",
            },
            maxLength: {
              value: 50,
              message: "Name should not be greater then 50 character.",
            },
          }}
        />
        <CustomInput
          name="fatherName"
          placeholder="C/O *"
          control={control}
          rules={{
            // required: "Father's Name is required!",
            minLength: {
              value: 3,
              message: "Father's must be at least 3 character long.",
            },
            maxLength: {
              value: 50,
              message: "Father's should not be greater then 50 character.",
            },
          }}
        />
        <CustomInput
          name="address"
          placeholder="Address *"
          control={control}
          rules={{
            required: "Address is required!",
            minLength: {
              value: 6,
              message: "Name must be at least 6 character long.",
            },
          }}
        />
        <CustomInput
          name="age"
          placeholder="Age"
          control={control}
          // rules={{
          //   required: 'Description is required!',
          // }}
        />
        <CustomInput
          name="fir"
          placeholder="P.S*"
          control={control}
          rules={{
            required: "P.S is required!",
          }}
        />
        <CustomInput
          name="caseno"
          placeholder="Case No*"
          control={control}
          rules={{
            required: "Case No is required!",
          }}
        />
        <CustomInput name="section" placeholder="Section" control={control} />
        <CustomInput
          name="courtname"
          placeholder="Court Name"
          control={control}
        />

        <CustomInput
          name="description"
          placeholder="More Info"
          control={control}
          // rules={{
          //   required: 'Description is required!',
          // }}
        />
        <CustomButton text={"Upload Image"} onPress={openGallery} />

        <CustomButton
          text={"Add Record"}
          onPress={handleSubmit(onRegisterPressed)}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    paddingHorizontal: 28,
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

export default AddRecord;
