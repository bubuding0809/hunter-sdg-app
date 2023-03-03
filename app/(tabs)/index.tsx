import { View, Text, Image, Button } from "react-native";
import React from "react";
import { Center } from "native-base";
import { Link, Stack, usePathname, useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();
  const [count, setCount] = React.useState(0);
  return (
    <Center
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/modal">Present modal</Link>
    </Center>
  );
}
