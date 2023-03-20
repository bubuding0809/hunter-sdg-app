import { View, Image, Button, RefreshControl } from "react-native";
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
  Divider,
  FlatList,
} from "native-base";
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import useBountiesQuery, {
  BountyQueryType,
} from "../../utils/scripts/hooks/queries/useGetBounties";

const FeedPage = () => {
  const router = useRouter();
  const { data: sessionData, isLoading } = useFirebaseSession();

  // Use query hook to get bounty data
  const { data: bountyData, refetch } = useBountiesQuery();

  const [refreshing, setRefreshing] = useState(false);

  // const handleScroll = event => {
  //   const offsetY = event.nativeEvent.contentOffset.y;
  //   const contentHeight = event.nativeEvent.contentSize.height;
  //   const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;

  //   // Check if we're close to the bottom of the list
  //   if (offsetY >= contentHeight - scrollViewHeight * 1.2) {
  //     // Get the next 10 bounties
  //     console.log("Getting next 10 bounties");
  //   }

  //   // Check if we pulled down to refresh
  //   if (offsetY <= -60) {
  //     // Refetch the bounty data
  //     console.log("Refreshing bounty data");
  //     if (!refreshing) {
  //       setRefreshing(true);
  //       refetch()
  //         .catch(err => console.log("Error refreshing bounty data: ", err))
  //         .finally(() => setTimeout(() => setRefreshing(false), 200));
  //     }
  //   }
  // };

  const bountyCard = (bountyItem: BountyQueryType) => {
    return (
      <Center
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
            uri: bountyItem.images[0],
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
          <Text fontSize="xl">{bountyItem.name}</Text>
          <Text fontSize="md" numberOfLines={2}>
            {bountyItem.appearance}
          </Text>
          <Divider my={2} />
          <Text fontSize="md" numberOfLines={2}>
            {bountyItem.additionalInfo?.length > 0
              ? bountyItem.additionalInfo
              : "No additional info"}
          </Text>
          <Divider my={2} />
          <Text fontSize="md" textAlign="left">
            Last seen: {bountyItem.lastSeen.toDate().toString()}
          </Text>
        </Box>
        <Divider orientation="vertical" mx={2} />
        <Flex direction="column" h="full" grow={1}>
          <Text fontSize="md" textAlign="right">
            type: {bountyItem.category}
          </Text>
          <Text fontSize="md" textAlign="right">
            breed: {bountyItem.breed ?? "unknown"}
          </Text>
          <Text fontSize="md" textAlign="right">
            age: {bountyItem.age ?? "unknown"}
          </Text>
          <Text fontSize="md" textAlign="right">
            $$$ {bountyItem.reward ?? "unknown"}
          </Text>
          <Text fontSize="md" textAlign="right">
            Sex: {bountyItem.gender}
          </Text>
          <Text fontSize="md" textAlign="right">
            Lat: {bountyItem.location.toJSON().latitude}
          </Text>
          <Text fontSize="md" textAlign="right">
            Long: {bountyItem.location.toJSON().longitude}
          </Text>
        </Flex>
      </Center>
    );
  };

  return (
    <Center
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: "#fff",
      }}
    >
      <FlatList
        style={{ width: "100%", minHeight: "100%" }}
        data={bountyData}
        renderItem={({ item }) => bountyCard(item)}
        keyExtractor={item => item.createdAt.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              refetch()
                .catch(err =>
                  console.log("Error refreshing bounty data: ", err)
                )
                .finally(() => setRefreshing(false));
            }}
          />
        }
        ItemSeparatorComponent={() => (
          <Divider backgroundColor="transparent" p={2} />
        )}
        onEndReached={() => {
          console.log("Getting next 10 bounties");
        }}
      />
    </Center>
  );
};

export default FeedPage;
