import { View, Image, Button } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Center,
  ScrollView,
  VStack,
  Text,
  Box,
  Flex,
  HStack,
  Heading,
  Divider,
} from "native-base";
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import { useLocation } from "../../context/LocationContext";
import { rtdb } from "../../firebaseConfig";
import { ref, onValue, set, get } from "firebase/database";

const ActivityPage = () => {
  const router = useRouter();
  const { data: sessionData, isLoading: sessionLoading } = useFirebaseSession();
  const { location, heading } = useLocation();

  const [userLocations, setUserLocations] = useState<{
    [key: string]: {
      heading?: number;
      lat: number;
      long: number;
    };
  }>({});

  // Access live data from the database
  useEffect(() => {
    // Subscribe to the database
    const bountyRef = ref(rtdb, "bounties" + "/test");
    const unsubscribe = onValue(bountyRef, snapshot => {
      setUserLocations(snapshot.val());
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Update the rtdb with the current location at /bounties/test/user1
    if (location) {
      const bountyRef = ref(rtdb, "bounties" + "/test/" + sessionData.uid);
      const data: {
        lat: number;
        long: number;
        heading?: number;
      } = {
        lat: location.coords.latitude,
        long: location.coords.longitude,
      };

      heading && (data.heading = heading.magHeading);
      set(bountyRef, data);
    }
  }, [location, heading]);

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
      <ScrollView width="full">
        <VStack space={2}>
          {Object.entries(userLocations).map(([key, value]) => {
            return (
              <Flex
                key={key}
                direction="column"
                borderWidth={1}
                borderRadius={8}
                p={2}
                width="100%"
              >
                <Heading fontSize="md">UID: {key}</Heading>
                <HStack space={4}>
                  <Box>
                    <Text>Location</Text>
                    <Text color={"red.500"}>{value.lat ?? "No reading"}</Text>
                    <Text color={"red.500"}>{value.long ?? "No reading"}</Text>
                  </Box>
                  <Divider orientation="vertical" />
                  <Box>
                    <Text>Magnetic heading:</Text>
                    <Text color={"red.500"}>
                      {value.heading ?? "No reading"}
                    </Text>
                  </Box>
                </HStack>
              </Flex>
            );
          })}
        </VStack>
      </ScrollView>
    </Center>
  );
};

export default ActivityPage;
