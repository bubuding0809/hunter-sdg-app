import { View, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Center, ScrollView, VStack, Text } from "native-base";
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";

const ActivityPage = () => {
  const router = useRouter();
  const { data: sessionData, isLoading } = useFirebaseSession();

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
      <Text>Map view of current activity</Text>
    </Center>
  );
};

export default ActivityPage;
