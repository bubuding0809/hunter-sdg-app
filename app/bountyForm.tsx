import {
  Dimensions,
  Platform,
  StyleSheet,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Modal,
  Keyboard,
  Touchable,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Image,
  Input,
  ScrollView,
  Select,
  TextArea,
  KeyboardAvoidingView,
  VStack,
  HStack,
} from "native-base";
import { Link, Stack } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import MapSelect from "../components/Map/MapSelect";
import { getDownloadURL } from "firebase/storage";
import useCreateBounty from "../utils/scripts/hooks/mutations/useCreateBounty";
import { useFirebaseSession } from "../context/FirebaseAuthContext";
import { getFirestore, GeoPoint } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { uuidv4 } from "@firebase/util";
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
    if (step < 2) {
      setStep(step + 1);
    }
  };

  // To pass the decoded location back to the form after getting it from MapSelect.tsx:
  const [locationName, setLocationName] = useState<string>("");

  // For mapView function
  const [showMapModal, setShowMapModal] = useState(false);

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

  const uploadImages = async images => {
    const uploadedImageUrls = [];

    // Creating a function to reference
    const storageRef = ref(storage, "images");

    // Uploading the images
    for (const imageUri of images) {
      try {
        // Generating a unique filename for each image
        const filename = uuidv4();
        // Generating a reference to the file
        const imageRef = ref(storageRef, `images/${filename}`);

        // Converting the image to a blob
        const response = await fetch(imageUri);
        const blob = await response.blob();

        // Uploading the image to Firebase Storage
        await uploadBytes(imageRef, blob);

        // Getting the download URL for the image
        const url = await getDownloadURL(imageRef);
        uploadedImageUrls.push(url);
      } catch (error) {
        console.log(error.message);
      }
    }

    return uploadedImageUrls;
  };

  // Below will be used to generate a new form
  const [bountyForm, setBountyForm] = useState<{
    lostName: string;
    age: string;
    gender: "Male" | "Female" | "Others";
    category: "Child" | "Adult" | "Pet" | "Elderly";
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
    gender: "Male",
    category: "Pet",
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
    setBountyForm(prev => ({ ...prev, [field]: value }));
  };

  // This prevents the user from spamming the submit button.
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    // Prevent the user from spamming the submit button
    if (submitting) {
      return;
    }

    // Set Submitting = true to disable the submit button:
    setSubmitting(true);

    // Performing Validation For The Form:
    if (
      !bountyForm.age ||
      !bountyForm.appearance ||
      !bountyForm.description ||
      !bountyForm.gender ||
      !bountyForm.lastSeen ||
      !bountyForm.lostName ||
      !bountyForm.images.length
    ) {
      alert(
        "Please enter all the fields in the form, and please at least submit one photo"
      );
      return;
    }
    // Uploading the images:
    const uploadedImageUrls = await uploadImages(bountyForm.images);

    // Logging the entire form data after it has been submitted
    console.log(bountyForm);
    createBounty(
      {
        gender: bountyForm.gender as "male" | "female" | "other",
        appearance: bountyForm.appearance,
        age: parseInt(bountyForm.age),
        category: bountyForm.category as "child" | "adult" | "pet" | "elderly",
        client: sessionData.uid,
        images: uploadedImageUrls,
        lastSeen: new Date(bountyForm.lastSeen),
        location: new GeoPoint(location.latitude, location.longitude),
        radius: radius,
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
        onSettled: () => {
          // Set submit back to false so that user will not spam the submit button.
        },
      }
    );
  };

  const nextStepAvailable = () => {
    if (!!!bountyForm.lostName) return false;
    if (!!!bountyForm.category) return false;
    if (!!!bountyForm.age) return false;
    if (!!!bountyForm.gender) return false;
    if (!!!bountyForm.lastSeen) return false;
    if (!!!bountyForm.location) return false;
    if (!!!bountyForm.appearance) return false;
    if (!!!bountyForm.description) return false;
    return true;
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
      allowsMultipleSelection: true, // Setting it to false first, want to try and get the image out on Google Firebase first. Following tutorial: https://www.youtube.com/watch?v=H-yXO46WDak
    });

    if (pickerResult.canceled) {
      return;
    }
    if (pickerResult.assets) {
      const uploadedURIs = pickerResult.assets.map(assets => assets.uri);
      setBountyForm(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedURIs],
      }));
    }
  };

  if (step === 1) {
    return (
      <>
        <Stack.Screen
          options={{
            title: "Create Bounty" + " - Step 1/2",
          }}
        />
        <View>
          <Center
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              height: "100%",
              backgroundColor: "#fff",
            }}
          >
            <Input
              isRequired
              onChangeText={val => handleFormChange("lostName", val)}
              marginBottom={5}
              fontFamily={"Inter_500Medium"}
              fontSize={16}
              placeholder="Name"
              bgColor="#F5F5F5"
              padding={4}
              w="95%"
              value={bountyForm.lostName}
            />

            <View style={{ flexDirection: "row" }}>
              <Select
                onValueChange={val => handleFormChange("category", val)}
                minWidth="350"
                mx="10"
                marginBottom={5}
                fontFamily={"Inter_500Medium"}
                fontSize={16}
                bgColor="#F5F5F5"
                placeholder="Choose the category"
                padding={4}
              >
                <Select.Item label="Child" value="Child" />
                <Select.Item label="Adult" value="Adult" />
                <Select.Item label="Pet" value="Pet" />
                <Select.Item label="Other" value="Other" />
              </Select>
            </View>

            <HStack space={3} w="95%">
              <Input
                flexGrow={1}
                isRequired
                fontFamily={"Inter_500Medium"}
                fontSize={16}
                bgColor="#F5F5F5"
                keyboardType="number-pad"
                onChangeText={val => handleFormChange("age", val)}
                marginBottom={5}
                placeholder="Age"
                padding={4}
                value={bountyForm.age}
              />
              <Select
                flexGrow={1}
                fontFamily={"Inter_500Medium"}
                fontSize={16}
                bgColor="#F5F5F5"
                placeholder="Gender"
                padding={4}
                onValueChange={val => handleFormChange("gender", val)}
              >
                <Select.Item label="Male" value="Male" />
                <Select.Item label="Female" value="Female" />
                <Select.Item label="Other" value="Other" />
              </Select>
            </HStack>

            <TouchableWithoutFeedback onPress={showDateTimePicker}>
              <Input
                isRequired
                fontFamily={"Inter_500Medium"}
                fontSize={16}
                bgColor="#F5F5F5"
                marginBottom={5}
                padding={4}
                width={350}
                placeholder="Last Seen"
                value={bountyForm.lastSeen ? date.toLocaleString() : ""}
                onTouchStart={showDateTimePicker}
                editable={true}
              />
            </TouchableWithoutFeedback>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                fontFamily={"Inter_400Regular"}
                bgColor="#F5F5F5"
                // @ts-ignore
                mode={Platform.OS === "ios" ? "datetime" : "date"}
                value={date}
                is24Hour={false}
                display="spinner"
                onChange={handleDateTimeChange}
              />
            )}
            <Input
              isRequired
              fontFamily={"Inter_500Medium"}
              fontSize={16}
              bgColor="#F5F5F5"
              marginBottom={5}
              padding={4}
              width={350}
              placeholder={locationName || "Choose Last Seen Location"}
              onPressIn={() => setShowMapModal(true)}
            ></Input>
            <Input
              isRequired
              mx="10"
              fontFamily={"Inter_500Medium"}
              fontSize={16}
              bgColor="#F5F5F5"
              marginBottom={5}
              padding={4}
              placeholder="Appearance"
              w="95%"
              value={bountyForm.appearance}
              onChangeText={val => handleFormChange("appearance", val)}
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <KeyboardAvoidingView
                h={{
                  base: "200px",
                  lg: "auto",
                }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <TextArea
                  value={bountyForm.description}
                  fontFamily={"Inter_500Medium"}
                  fontSize={16}
                  bgColor="#F5F5F5"
                  onChangeText={val => handleFormChange("description", val)}
                  placeholder="Additional Information"
                  autoCompleteType={undefined}
                  numberOfLines={4}
                  mx="10"
                  marginBottom={5}
                  w="95%"
                />
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
            <Button
              disabled={!nextStepAvailable()}
              mt={5}
              bgColor={!nextStepAvailable() ? "gray.400" : "black"}
              borderRadius="full"
              paddingRight={20}
              paddingLeft={20}
              _text={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
              }}
              onPress={nextStep}
              width={"95%"}
            >
              Next Step
            </Button>
          </Center>

          {showMapModal && (
            <MapSelect
              setOpen={setShowMapModal}
              setLocation={setLocation}
              setRadius={setRadius}
              setDecodedAddress={setLocationName}
            />
          )}
        </View>
      </>
    );
  }

  // Second Page of the form for image uploading & submission of the form
  if (step === 2) {
    const renderItem = ({ item, index }) => {
      return (
        <Image
          source={{ uri: item }}
          alt={`Bounty Image ${index}`}
          width={350}
          height={350}
          resizeMode="cover"
          borderRadius={10}
        />
      );
    };

    return (
      <>
        <Stack.Screen
          options={{
            title: "Create Bounty" + " - Step 2/2",
          }}
        />
        <SafeAreaView>
          <VStack h="full" justifyContent={"space-between"} px={4} py={2}>
            <VStack alignItems="center" space={2}>
              <FlatList
                data={bountyForm.images}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
              />
              <Button
                w="100%"
                onPress={handleMultipleImageUpload}
                paddingRight={20}
                paddingLeft={20}
                bgColor="black"
                borderRadius="full"
                _text={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                }}
              >
                Upload Images
              </Button>
            </VStack>
            <Button
              onPress={handleSubmit}
              mt={10}
              paddingLeft={20}
              paddingRight={20}
              bgColor="#FD7366"
              borderRadius="full"
              _text={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
              }}
            >
              Submit
            </Button>
          </VStack>
        </SafeAreaView>
      </>
    );
  }
};

export default NewBountyForm;

const styles = StyleSheet.create({});
