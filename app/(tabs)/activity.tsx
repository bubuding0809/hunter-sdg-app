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
    const getInitialUsers = async () => {
      const bountyRef = await get(ref(rtdb, "bounties" + "/test"));

      // Set the initial state of the user locations
      setUserLocations(bountyRef.val());
    };

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

  useEffect(() => {
    // If user is jIk747p2cjXnVL3z6SO8N2uXMT33, set a interval fo 1s to update the location randomly
    let interval: NodeJS.Timer | undefined;
    if (sessionData?.uid === "jIk747p2cjXnVL3z6SO8N2uXMT33") {
      console.log("Starting interval for jIk747p2cjXnVL3z6SO8N2uXMT33");
      interval = setInterval(() => {
        const bountyRef = ref(rtdb, "bounties" + "/test/" + sessionData.uid);

        // Every 1s increment or decrement the location by 0.0001
        const data: {
          lat: number;
          long: number;
          heading?: number;
        } = {
          lat: userLocations[sessionData?.uid]?.lat + Math.random() * 0.0001,
          long: userLocations[sessionData?.uid]?.long + Math.random() * 0.0001,
        };

        heading && (data.heading = heading.magHeading);
        set(bountyRef, data);
      }, 1000);
    }

    return () => {
      console.log(
        "Clearing interval for jIk747p2cjXnVL3z6SO8N2uXMT33",
        interval
      );
      clearInterval(interval);
    };
  }, []);

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
                <Heading fontSize="md">Bounty: {key}</Heading>
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
