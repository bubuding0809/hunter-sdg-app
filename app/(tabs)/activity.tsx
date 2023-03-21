import { View, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Center, ScrollView, VStack, Text, Box } from "native-base";
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import { useLocation } from "../../context/LocationContext";

const ActivityPage = () => {
  const router = useRouter();
  const { data: sessionData, isLoading: sessionLoading } = useFirebaseSession();
  const { location, heading } = useLocation();

  return (
    <Center
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      <Box>
        <Text>Magnetic heading:</Text>
        <Text color={"red.500"}>{heading?.magHeading ?? "No reading"}</Text>
      </Box>
      <Box>
        <Text>Location</Text>
        <Text color={"red.500"}>
          {location?.coords.latitude ?? "No reading"}
        </Text>
        <Text color={"red.500"}>
          {location?.coords.longitude ?? "No reading"}
        </Text>
      </Box>
    </Center>
  );
};

export default ActivityPage;
