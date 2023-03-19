import { View, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Center,
  ScrollView,
  VStack,
  Text,
  Box,
  Flex,
  Heading,
  HStack,
  Spinner,
} from "native-base";
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import useBountiesQuery from "../../utils/scripts/hooks/queries/useGetBounties";

const FeedPage = () => {
  const router = useRouter();
  const { data: sessionData, isLoading } = useFirebaseSession();

  // Use query hook to get bounty data
  const { data: bountyData, refetch } = useBountiesQuery();

  const [refreshing, setRefreshing] = useState(false);

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;

    // Check if we're close to the bottom of the list
    if (offsetY >= contentHeight - scrollViewHeight * 1.2) {
      // Get the next 10 bounties
      console.log("Getting next 10 bounties");
    }

    // Check if we pulled down to refresh
    if (offsetY <= -60) {
      // Refetch the bounty data
      console.log("Refreshing bounty data");
      if (!refreshing) {
        setRefreshing(true);
        refetch()
          .catch(err => console.log("Error refreshing bounty data: ", err))
          .finally(() => setTimeout(() => setRefreshing(false), 200));
      }
    }
  };

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
      <ScrollView
        w="full"
        h="full"
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {refreshing && (
          <HStack space={2} justifyContent="center" p={2}>
            <Spinner accessibilityLabel="Loading posts" color="black" />
            <Heading color="black" fontSize="md">
              Loading
            </Heading>
          </HStack>
        )}
        {/* Show drag down to refresh indicator when user pulls down screen */}
        <VStack space={4} alignItems="center">
          {bountyData?.map((bounty, i) => (
            <Center
              key={i}
              w="full"
              bg="white"
              borderWidth={1}
              rounded="md"
              shadow={3}
              flexDirection="row"
              justifyContent={"start"}
              alignItems="start"
              p={3}
            >
              {/* Image */}
              <Image
                source={{
                  uri: bounty.images[0],
                }}
                style={{ width: 50, height: 50 }}
                borderRadius={10}
              />
              <Box
                style={{
                  marginLeft: 10,
                }}
                flexShrink={1}
              >
                <Text fontSize="xl">{bounty.name}</Text>
                <Text fontSize="md" numberOfLines={2}>
                  {bounty.description}
                </Text>
              </Box>
              <Flex direction="column" h="full" grow={1}>
                <Text fontSize="md" textAlign="right">
                  age: {bounty.age}
                </Text>
                <Text fontSize="md" textAlign="right">
                  $$$ {bounty.reward}
                </Text>
              </Flex>
            </Center>
          ))}
        </VStack>
      </ScrollView>
    </Center>
  );
};

export default FeedPage;
