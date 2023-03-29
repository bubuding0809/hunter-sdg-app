import { View, Image } from "react-native";
import React, { useEffect, useState } from "react";
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
  Button,
  Fab,
  Icon,
} from "native-base";
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import { useLocation } from "../../context/LocationContext";
import { rtdb } from "../../firebaseConfig";
import { ref, onValue, set } from "firebase/database";
import type { Unsubscribe } from "firebase/database";
import useGetBounty from "../../utils/scripts/hooks/queries/useGetBounty";
import useLeaveBounty from "../../utils/scripts/hooks/mutations/useLeaveBounty";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BountyMap from "../../components/Map/BountyMap";

const ActivityPage = () => {
  const router = useRouter();
  const { data: sessionData, isLoading: sessionLoading } = useFirebaseSession();
  const { location, heading } = useLocation();

  // Query hook to get the bounty data
  const { data: bountyData, isLoading } = useGetBounty({
    userId: sessionData?.uid,
  });

  // Mutation to leave the bounty
  const { mutate: leaveBounty } = useLeaveBounty();

  const [userLocations, setUserLocations] = useState<{
    [key: string]: {
      heading?: number;
      lat: number;
      long: number;
    };
  }>({});

  const [isLeaving, setIsLeaving] = useState(false);

  // Subscribe to the realtime database at the /bounties/test path
  useEffect(() => {
    // Subscribe to the database
    let unsubscribe: Unsubscribe | undefined;
    if (bountyData) {
      const bountyRef = ref(rtdb, "bounties/" + bountyData.id);
      unsubscribe = onValue(bountyRef, snapshot => {
        setUserLocations(snapshot.val());
      });
    }
    return unsubscribe;
  }, [bountyData]);

  // Update the location in the database when the location changes
  useEffect(() => {
    // Update the rtdb with the current location at /bounties/test/user1
    if (location && bountyData) {
      const bountyRef = ref(
        rtdb,
        `bounties/${bountyData?.id}/${sessionData?.uid}`
      );
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
  }, [location, heading, bountyData, sessionData]);

  if (isLoading) {
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
        _text={{
          fontFamily: "Inter_500Medium",
          fontSize: "lg",
        }}
      >
        Loading...
      </Center>
    );
  }

  if (!bountyData) {
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
        <Text fontFamily={"Inter_500Medium"} fontSize={"lg"}>
          You are not in a hunt
        </Text>
      </Center>
    );
  }

  return (
    <BountyMap hunterLocations={userLocations} bountyData={bountyData}>
      <Fab
        renderInPortal={false}
        top={4}
        right={4}
        w={10}
        h={10}
        shadow={2}
        borderRadius="md"
        bgColor="white"
        icon={
          <Icon
            color="black"
            as={MaterialCommunityIcons}
            name="exit-run"
            size="md"
          />
        }
        onPress={() => {
          setIsLeaving(true);
          leaveBounty(
            {
              bountyId: bountyData?.id,
              userId: sessionData?.uid,
            },
            {
              onSuccess: data => {
                router.push("(tabs)");
                setIsLeaving(false);
              },
              onError: err => {
                alert(err);
              },
            }
          );
        }}
      />
    </BountyMap>
  );

  // return (
  //   <Center
  //     style={{
  //       display: "flex",
  //       flexDirection: "column",
  //       justifyContent: "center",
  //       alignItems: "center",
  //       padding: 10,
  //       backgroundColor: "#fff",
  //       height: "100%",
  //     }}
  //   >
  //     <Button
  //       alignSelf="start"
  //       mb={2}
  //       bgColor="black"
  //       borderRadius="full"
  //       _text={{
  //         fontFamily: "Inter_500Medium",
  //       }}
  //       onPress={() => {
  //         setIsLeaving(true);
  //         leaveBounty(
  //           {
  //             bountyId: bountyData?.id,
  //             userId: sessionData?.uid,
  //           },
  //           {
  //             onSuccess: data => {
  //               router.push("(tabs)");
  //               setIsLeaving(false);
  //             },
  //             onError: err => {
  //               alert(err);
  //             },
  //           }
  //         );
  //       }}
  //     >
  //       {isLeaving ? "Leaving..." : "Leave Hunt"}
  //     </Button>
  //     <ScrollView width="full">
  //       <VStack space={2}>
  //         {Object.entries(userLocations ?? {}).map(([key, value]) => {
  //           return (
  //             <Flex
  //               key={key}
  //               direction="column"
  //               borderWidth={1}
  //               borderRadius={8}
  //               p={2}
  //               width="100%"
  //             >
  //               <Heading fontSize="md">UID: {key}</Heading>
  //               <HStack space={4}>
  //                 <Box>
  //                   <Text>Location</Text>
  //                   <Text color={"red.500"}>{value.lat ?? "No reading"}</Text>
  //                   <Text color={"red.500"}>{value.long ?? "No reading"}</Text>
  //                 </Box>
  //                 <Divider orientation="vertical" />
  //                 <Box>
  //                   <Text>Magnetic heading:</Text>
  //                   <Text color={"red.500"}>
  //                     {value.heading ?? "No reading"}
  //                   </Text>
  //                 </Box>
  //               </HStack>
  //             </Flex>
  //           );
  //         })}
  //       </VStack>
  //     </ScrollView>
  //   </Center>
  // );
};

export default ActivityPage;
