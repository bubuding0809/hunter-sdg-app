import React, { useEffect, useState } from "react";
import { Center, Text, Fab, Icon } from "native-base";
import { useRouter } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import { useLocation } from "../../context/LocationContext";
import { rtdb } from "../../firebaseConfig";
import { ref, onValue, set } from "firebase/database";
import type { Unsubscribe } from "firebase/database";
import useGetBounty from "../../utils/scripts/hooks/queries/useGetBountyByUserId";
import useLeaveBounty from "../../utils/scripts/hooks/mutations/useLeaveBounty";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BountyMap from "../../components/Map/BountyMap";

const ActivityPage = () => {
  const router = useRouter();
  const { data: sessionData } = useFirebaseSession();
  const { location, heading } = useLocation();

  // Query hook to get the bounty data
  const { data: bountyData, isLoading } = useGetBounty({
    userId: sessionData?.uid,
  });

  // Mutation to leave the bounty
  const { mutate: leaveBounty } = useLeaveBounty();

  // State to store the live locations of the users in the bounty
  const [userLocations, setUserLocations] = useState<{
    [key: string]: {
      heading?: number;
      lat: number;
      long: number;
    };
  }>({});
  // State to prevent the user from updating the location in the database when they are leaving
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
    if (location && bountyData && !isLeaving) {
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
    <>
      <BountyMap hunterLocations={userLocations} bountyData={bountyData}>
        {/* Leave bounty button */}
        <Fab
          isLoading={isLeaving}
          _loading={{
            bgColor: "black",
          }}
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
    </>
  );
};

export default ActivityPage;
