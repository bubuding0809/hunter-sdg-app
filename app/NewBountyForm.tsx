import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { Button, Center, Container, Image } from "native-base";
import { Link } from "expo-router";
import MapSelectModal from "./MapSelectModal";
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult, ImagePickerSuccessResult } from 'expo-image-picker';


// Edit this file

interface NewBountyFormProps {}


const NewBountyForm: React.FC<NewBountyFormProps> = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [showMapSelect, setShowMapSelect] = useState(false);
  const [radius, setRadius] = useState(0);
  // Ding said that the below will be used to generate the form
  const [bountyForm, setBountyForm] = useState({
    title: "",
    description: "",
    location: {
      latitude: 0,
      longitude: 0,
    },
    radius: 0,
    image: null,
  });

  const handleFormChange = () => {
    console.log("form change");
  };

  const handleSubmit = () => {
    console.log("submitting bounty form");
    // API CALL TO firebase
  };

  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false){
      alert('Permission to images have not been granted!');
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
  
    if (pickerResult.canceled) {
      return;
    }
  
    if ('uri' in pickerResult) {
      const successResult = pickerResult as ImagePickerSuccessResult;
      setBountyForm({ ...bountyForm, image: successResult.uri });
    }
  };

  return (
    <View
      style={{
        height: "100%",
      }}
    >
      <Center
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          height: "100%",
        }}
      >
        <View 
          style ={{
          flexDirection:"column"
          }}>
          {bountyForm.image && (
            <Image source={{ uri: bountyForm.image }} alt="Bounty Image" size="2xl" resizeMode="contain" />
          )}
          <Button onPress={handleImageUpload} style={{ marginBottom: 10 }}>Upload Image</Button>
          <Button onPress={() => setShowMapSelect(true)} style ={{marginBottom:10}}>Select Location</Button>
        </View>
        {showMapSelect && (
          <MapSelectModal
            setOpen={setShowMapSelect}
            setLocation={setLocation}
            setRadius={setRadius}
          />
          )}
        <Text>Latitude: {location.latitude}</Text>
        <Text>Longitude: {location.longitude}</Text>
        <Text>Radius: {radius}</Text>

        <Button onPress={()=> setBountyForm(true)} style = {{marginTop:10}}> Input Description </Button>
      </Center>
    </View>
  );
};

export default NewBountyForm;

const styles = StyleSheet.create({});
