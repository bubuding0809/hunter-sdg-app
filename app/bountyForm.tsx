import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Center } from "native-base";
import { Link } from "expo-router";
import MapSelect from "../components/Map/MapSelect";

interface NewBountyFormProps {}

const NewBountyForm: React.FC<NewBountyFormProps> = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [showMapSelect, setShowMapSelect] = useState(false);
  const [radius, setRadius] = useState(0);
  const [bountyForm, setBountyForm] = useState({
    title: "",
    description: "",
    location: {
      latitude: 0,
      longitude: 0,
    },
    radius: 0,
  });

  const handleFormChange = () => {
    console.log("form change");
  };

  const handleSubmit = () => {
    console.log("submitting bounty form");
    // API CALL TO firebase
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
        <Button onPress={() => setShowMapSelect(true)}>select location</Button>
        {showMapSelect && (
          <MapSelect
            setOpen={setShowMapSelect}
            setLocation={setLocation}
            setRadius={setRadius}
          />
        )}
      </Center>
    </View>
  );
};

export default NewBountyForm;

const styles = StyleSheet.create({});
