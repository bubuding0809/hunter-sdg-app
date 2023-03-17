import { View, Text } from "react-native";
import React from "react";
import { Button, Center, Link as NativeLink } from "native-base";
import { Link } from "expo-router";

export default function profile() {
  return (
    <Center
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        gap: 10,
      }}
    >
      <Text>Profile goes here</Text>
      <Button>
        <Link href="bountyForm">Create bounty</Link>
      </Button>
    </Center>
  );
}
