import { View, Text, Image, Button } from "react-native";
import React from "react";
import { Center } from "native-base";
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";

export default function Home() {
  const router = useRouter();

  return (
    <Center
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Text>List of relevant bounties here</Text>
    </Center>
  );
}
