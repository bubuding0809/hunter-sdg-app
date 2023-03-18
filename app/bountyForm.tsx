import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { Box, Button, Center, Container, Image, Input } from "native-base";
import { Link } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult, ImagePickerSuccessResult } from 'expo-image-picker';


// Edit this file
import MapSelect from "../components/Map/MapSelect";

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
    lostName: "",
    breed: "",
    age: "",
    gender: "",
    lastSeen: "",
    location: {
      latitude: 0,
      longitude: 0,
    },
    radius: 0,
    image: "",
    appearance:"",
    description: "",


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
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
  
    if (pickerResult.canceled) {
      return;
    }
  
    if (pickerResult.assets[0].uri) {
      const successResult = pickerResult as ImagePickerSuccessResult;
      setBountyForm({ ...bountyForm, image: pickerResult.assets[0].uri });
      // @bubuding0809 need your help here my lead developer: https://docs.expo.dev/versions/latest/sdk/imagepicker/
      // you can Cmd F to find the specific docs i tried to refer to "if(!result.canceled")
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
          style = {{
            flexDirection: "column"
          }}
          >
            <Input
            mx ="10"
            marginBottom={5}
            placeholder ="Name of lost item"
            w = "95%"
            padding={4}
            value = {bountyForm.lostName}
            onChangeText = {(val) =>
              setBountyForm((prev) => ({...prev, lostName:val}))
            }
            />
            <Input
            mx ="10"
            marginBottom={5}
            placeholder ="Breed"
            w = "95%"
            padding = {4}
            value = {bountyForm.breed}
            onChangeText = {(val) =>
              setBountyForm((prev) => ({...prev, breed:val}))
            }
            />

        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Box alignItems="center" marginRight={9}>
            <Input
              mx="10"
              marginBottom={5}
              placeholder="Age"
              w="150%"
              padding = {4}
              value={bountyForm.age}
              onChangeText={(val) =>
                setBountyForm((prev) => ({ ...prev, age: val }))
              }
            />
          </Box>
          <Box alignItems="center" marginLeft={9}>
            <Input
              mx="10"
              placeholder="Gender"
              w="150%"
              padding = {4}
              value={bountyForm.gender}
              onChangeText={(val) =>
                setBountyForm((prev) => ({ ...prev, gender: val }))
              }
            />
          </Box>
        </View>
        <View
          style = {{
            flexDirection: "column"
          }}
          >
            <Input
            mx ="10"
            marginBottom={5}
            padding = {4}
            placeholder ="Last Seen"
            w = "95%"
            value = {bountyForm.lastSeen}
            onChangeText = {(val) =>
              setBountyForm((prev) => ({...prev, lastSeen:val}))
            }
            />
            <Input
            mx ="10"
            marginBottom={5}
            padding = {4}
            placeholder ="Appearance"
            w = "95%"
            value = {bountyForm.appearance}
            onChangeText = {(val) =>
              setBountyForm((prev) => ({...prev, appearance:val}))
            }
            />
            <Input
            mx ="10"
            marginBottom={5}
            paddingTop = {8}
            paddingBottom = {8}
            placeholder ="Additional Information"
            w = "95%"
            value = {bountyForm.description}
            onChangeText = {(val) =>
              setBountyForm((prev) => ({...prev, description:val}))
            }
            />


          </View>

        {bountyForm.image && (
          <Image
            source={{ uri: bountyForm.image }}
            alt="Bounty Image"
            size="2xl"
            resizeMode="contain"
          />
        )}
        <Button
          onPress={handleImageUpload}
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          Upload Image
        </Button>
        <Button onPress={() => setShowMapSelect(true)} style={{ marginBottom: 10 }}>
          Select Location
        </Button>
        {showMapSelect && (
          <MapSelect
            setOpen={setShowMapSelect}
            setLocation={setLocation}
            setRadius={setRadius}
          />
        )}
        <Text>Latitude: {location.latitude}</Text>
        <Text>Longitude: {location.longitude}</Text>
        <Text>Radius: {radius}</Text>
      </Center>
    </View>
  );
  
};

export default NewBountyForm;

const styles = StyleSheet.create({});
