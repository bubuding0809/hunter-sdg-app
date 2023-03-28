import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  Image,
  Input,
  ScrollView,
  Select,
  TextArea,
} from "native-base";
import { Link } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import MapSelect from "../components/Map/MapSelect";
import { getDownloadURL } from "firebase/storage";
import useCreateBounty from "../utils/scripts/hooks/queries/mutations/useCreateBounty";
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

  const uploadImages = async (images) => {
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
    setBountyForm((prev) => ({ ...prev, [field]: value }));
  };

  // Trying to debug the form changes for the mapchanges
  const handleMapChange = (newLocation, newRadius) => {
    setLocation(newLocation);
    setRadius(newRadius);
    handleFormChange("location", newLocation);
    handleFormChange("radius", newRadius);
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

    // Logging the form data:
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
      const uploadedURIs = pickerResult.assets.map((assets) => assets.uri);
      setBountyForm((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedURIs],
      }));
    }
  };

  // Image carousell rendering function
  const renderItem = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Image
          source={{ uri: item }}
          alt={`Bounty Image ${index}`}
          style={{
            width: Dimensions.get("window").width * 0.8,
            height: Dimensions.get("window").width * 0.6,
            resizeMode: "contain",
            margin: 10,
          }}
        />
      </View>
    );
  };

  if (step === 1) {
    const renderItem = ({ item }) => (
      <View>
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
          <View style={{ flexDirection: "column" }}>
            <Input
              isRequired
              onChangeText={(val) => handleFormChange("lostName", val)}
              mx="10"
              marginBottom={5}
              fontFamily={"Inter_400Regular"}
              fontSize={14}
              placeholder="Name"
              bgColor="#F5F5F5"
              padding={3}
              w="95%"
              value={bountyForm.lostName}
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <Select
              onValueChange={(val) => handleFormChange("category", val)}
              minWidth="350"
              mx="10"
              marginBottom={5}
              fontFamily={"Inter_400Regular"}
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
          <View style={{ flexDirection: "row" }}>
            <Box alignItems="center" marginLeft={0} marginRight={1}>
              <Input
                isRequired
                minWidth={100}
                fontFamily={"Inter_400Regular"}
                bgColor="#F5F5F5"
                keyboardType="number-pad"
                onChangeText={(val) => handleFormChange("age", val)}
                mx="10"
                marginBottom={5}
                placeholder="Age"
                w="80%"
                padding={4}
                value={bountyForm.age}
              />
            </Box>
            <Box alignItems="center" marginLeft={3} marginRight={3}>
              <Select
                minWidth="170"
                fontFamily={"Inter_400Regular"}
                bgColor="#F5F5F5"
                placeholder="Gender"
                padding={4}
                onValueChange={(val) => handleFormChange("gender", val)}
              >
                <Select.Item label="Male" value="Male" />
                <Select.Item label="Female" value="Female" />
                <Select.Item label="Other" value="Other" />
              </Select>
            </Box>
          </View>
          <TouchableWithoutFeedback onPress={showDateTimePicker}>
            <Input
              isRequired
              fontFamily={"Inter_400Regular"}
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
            mx="10"
            fontFamily={"Inter_400Regular"}
            bgColor="#F5F5F5"
            marginBottom={5}
            padding={4}
            placeholder="Appearance"
            w="95%"
            value={bountyForm.appearance}
            onChangeText={(val) => handleFormChange("appearance", val)}
          />
          <TextArea
            value={bountyForm.description}
            fontFamily={"Inter_400Regular"}
            bgColor="#F5F5F5"
            onChangeText={(val) => handleFormChange("description", val)}
            placeholder="Additional Information"
            autoCompleteType={undefined}
            numberOfLines={4}
            mx="10"
            marginBottom={5}
            w="95%"
          />
          {showMapSelect && (
            <MapSelect
              setOpen={setShowMapSelect}
              setLocation={setLocation}
              setRadius={setRadius}
            />
          )}
          <Button
            mt={10}
            bgColor="black"
            borderRadius="full"
            paddingRight={20}
            paddingLeft={20}
            _text={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
            }}
            onPress={() => setShowMapSelect(true)}
            style={{ marginBottom: 10 }}
          >
            Select Location
          </Button>
          <Button
            mt={10}
            bgColor="black"
            borderRadius="full"
            paddingRight={20}
            paddingLeft={20}
            _text={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
            }}
            onPress={nextStep}
          >
            Next Step
          </Button>
        </Center>
      </View>
    );

    return (
      <FlatList
        data={[{ key: "step1" }]}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    );
  }

  if (step === 2) {
    const renderItem = ({ item, index }) => {
      return (
        <View
          key={index}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={{ uri: item }}
            alt={`Bounty Image ${index}`}
            style={{
              width: Dimensions.get("window").width * 0.8,
              height: Dimensions.get("window").width * 0.6,
              resizeMode: "contain",
            }}
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
            <FlatList
              data={bountyForm.images}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            />
            <Button
              onPress={handleMultipleImageUpload}
              mt={10}
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
            <Button
              onPress={handleSubmit}
              mt={10}
              paddingLeft={20}
              paddingRight={20}
              bgColor="blue.500"
              borderRadius="full"
              _text={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
              }}
            >
              Submit Bounty
            </Button>
          </Center>
        </ScrollView>
      </View>
    );
  }
};

export default NewBountyForm;

const styles = StyleSheet.create({});
