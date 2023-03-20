import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Image,
  Input,
  ScrollView,
  TextArea,
} from "native-base";
import { Link } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Carousel from "react-native-snap-carousel";
import MapSelect from "../components/Map/MapSelect";
import "firebase/storage"; // Needed for storing of images...
import useCreateBounty from "../utils/scripts/hooks/queries/mutations/useCreateBounty";
import { useFirebaseSession } from "../context/FirebaseAuthContext";
import { getFirestore, GeoPoint, DocumentReference } from "firebase/firestore";

interface NewBountyFormProps {}

const NewBountyForm: React.FC<NewBountyFormProps> = () => {
  const { data: sessionData } = useFirebaseSession();
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [radius, setRadius] = useState(0);

  // To create a multi page form
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep(step + 1);
  };

  // For mapView function
  const [showMapSelect, setShowMapSelect] = useState(false);

  // For Date time picker:
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const handleDateTimeChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      handleFormChange("lastSeen", selectedDate);
    }
  };
  const showDateTimePicker = () => {
    setShow(true);
  };

  // Ding said that the below will be used to generate the form
  const [bountyForm, setBountyForm] = useState<{
    lostName: string;
    age: string;
    gender: "male" | "female" | "other";
    lastSeen: string;
    location: {
      latitude: number;
      longitude: number;
    };
    radius: number;
    images: string[];
    appearance: string;
    description: string;
  }>({
    lostName: "",
    age: "",
    gender: "male",
    lastSeen: "",
    location: {
      latitude: 0,
      longitude: 0,
    },
    radius: 0,
    images: [],
    appearance: "",
    description: "",
  });

  // Get mutation hook for creating bounty
  const { mutate: createBounty } = useCreateBounty();

  // A way to check if the form is updated or
  const handleFormChange = (field, value) => {
    setBountyForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Performing Validation For The Form:
    if (
      !bountyForm.age ||
      !bountyForm.appearance ||
      !bountyForm.description ||
      !bountyForm.gender ||
      !bountyForm.lastSeen ||
      !bountyForm.lostName
    ) {
      alert(
        "Please enter all the fields in the form, and please at least submit one photo"
      );
      return;
    }

    const uploadedImageUrls = [];
    // 1.  Uploading Images to Firebase Cloud Storage by using the collected URIs in bountyForm.images
    // 2.  await URLs from cloud storage and append to uploadedImageUrls

    createBounty(
      {
        gender: bountyForm.gender as "male" | "female" | "other",
        appearance: bountyForm.appearance,
        age: parseInt(bountyForm.age),
        category: "child",
        client: sessionData.uid,
        images: uploadedImageUrls,
        lastSeen: new Date(bountyForm.lastSeen),
        location: new GeoPoint(location.latitude, location.longitude),
        name: bountyForm.lostName,
      },
      {
        onSuccess: () => {
          alert("Created bounty");
        },
        onError: (error, variables, context) => {
          alert("An error occurred");
          console.log(error);
        },
      }
    );
  };

  // Image Picker Function
  const handleMultipleImageUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to images have not been granted!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [16, 9],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (pickerResult.canceled) {
      return;
    }
    if (pickerResult.assets) {
      const uploadedURIs = pickerResult.assets.map((assets) => assets.uri);
      setBountyForm((prev) => ({
        ...prev,
        image: [...prev.images, ...uploadedURIs],
      }));
    }
  };

  // Image carousell rendering function
  const renderItem = ({ item, index }) => {
    return (
      <View>
        <Image
          key={index}
          source={{ uri: item }}
          alt={"Bounty Image ${index}"}
          width={300}
          height={200}
          size="2xl"
          resizeMode="contain"
        />
      </View>
    );
  };

  if (step === 1) {
    return (
      <View
        style={{
          height: "100%",
        }}
      >
        <ScrollView>
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
              style={{
                flexDirection: "column",
              }}
            >
              <Input
                isRequired
                mx="10"
                marginBottom={5}
                placeholder="Name of lost item"
                w="95%"
                padding={4}
                value={bountyForm.lostName}
                onChangeText={(val) => handleFormChange("lostName", val)}
              />
              {/* <Select /> TODO - Edit Here */}
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Box alignItems="center" marginRight={9}>
                <Input
                  keyboardType="number-pad"
                  mx="10"
                  marginBottom={5}
                  placeholder="Age"
                  w="150%"
                  padding={4}
                  value={bountyForm.age}
                  onChangeText={(val) => handleFormChange("age", val)}
                />
              </Box>
              <Box alignItems="center" marginLeft={9}>
                <Input
                  mx="10"
                  placeholder="Gender"
                  w="150%"
                  padding={4}
                  value={bountyForm.gender}
                  onChangeText={(val) => handleFormChange("gender", val)}
                />
              </Box>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            ></View>
            <Input
              marginBottom={5}
              width={360}
              placeholder="Last Seen"
              value={bountyForm.lastSeen ? date.toLocaleString() : ""}
              onTouchStart={showDateTimePicker}
              editable={true}
            />
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                // The mode allows the users to pick the time. HOWEVER, it is only available for iOS devices.
                // @ts-ignore
                mode={Platform.OS === "ios" ? "datetime" : "date"}
                value={date}
                is24Hour={false}
                display="default"
                onChange={handleDateTimeChange}
              />
            )}
            <Input
              mx="10"
              marginBottom={5}
              padding={4}
              placeholder="Appearance"
              w="95%"
              value={bountyForm.appearance}
              onChangeText={(val) => handleFormChange("appearance", val)}
            />
            <TextArea
              value={bountyForm.description}
              mx="10"
              marginBottom={5}
              placeholder="Additional Information"
              w="95%"
              onChangeText={(val) => handleFormChange("description", val)}
              autoCompleteType={undefined}
              numberOfLines={4}
            />
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
            <Button
              onPress={() => setShowMapSelect(true)}
              style={{ marginBottom: 10 }}
            >
              Select Location
            </Button>
          </Center>
          <Button onPress={nextStep}>Next Step: Uploading Images</Button>
        </ScrollView>
      </View>
    );
  }

  if (step == 2) {
    const renderItem = ({ item, index }) => {
      return (
        <View
          key={index}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={{ uri: item }}
            alt={`Bounty Image ${index}`}
            width={Dimensions.get("window").width * 0.8}
            height={Dimensions.get("window").width * 0.6}
            resizeMode="contain"
          />
        </View>
      );
    };
    return (
      <View
        style={{
          height: "100%",
        }}
      >
        <ScrollView>
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
            <Text> Upload Images </Text>
            {bountyForm.images.map((imageUri, index) => (
              <Image
                key={index}
                source={{ uri: imageUri }}
                alt={`Bounty Image ${index}`}
                width={100}
                height={100}
                size="2xl"
                resizeMode="contain"
              />
            ))}
            <Button
              onPress={handleMultipleImageUpload}
              style={{ marginTop: 10, marginBottom: 10 }}
            >
              Upload Images
            </Button>
          </Center>
        </ScrollView>
        <Button onPress={handleSubmit}> Submit </Button>
      </View>
    );
  }
};

export default NewBountyForm;

const styles = StyleSheet.create({});
