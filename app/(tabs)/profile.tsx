import { View, Text } from "react-native";
import React from "react";
import { Center, Link } from "native-base";

export default function profile() {
  return (
    <Center
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Profile goes here</Text>
    </Center>
  );
}
