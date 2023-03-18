import { View, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Center, ScrollView, VStack, Text } from "native-base";
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

import { useQuery } from "react-query";
import useBountiesQuery from "../../utils/scripts/hooks/queries/useBounties";

const ActivityPage = () => {
  const router = useRouter();
  const { data: sessionData, isLoading } = useFirebaseSession();

  // Use query hook to get bounty data
  const { data: bountyData, isFetching } = useBountiesQuery({
    refetchInterval: 1000,
  });

  return (
    <Center
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
      }}
    >
      <ScrollView w="full" h="full">
        <VStack space={4} alignItems="center">
          {bountyData?.map((bounty, i) => (
            <Center
              key={i}
              w="80"
              h="20"
              bg="indigo.500"
              rounded="md"
              shadow={3}
              flexDirection="row"
              justifyContent={"start"}
              p={2}
            >
              {/* Image */}
              <Image
                source={{
                  uri: bounty.images[0],
                }}
                style={{ width: 50, height: 50 }}
                borderRadius={10}
              />
              <View
                style={{
                  marginLeft: 10,
                }}
              >
                <Text fontSize="xl">{bounty.title}</Text>
                <Text fontSize="md">{bounty.description}</Text>
              </View>
            </Center>
          ))}
        </VStack>
      </ScrollView>
    </Center>
  );
};

export default ActivityPage;
